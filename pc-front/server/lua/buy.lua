local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local luaServerPath = ngx.var.luaserver_path 
local dbConf = require(lualibPath .. "luame.dbConf")
local sentine = require(lualibPath .. "luame.sentinelink")
local mysql = require("resty.mysql")
local redis = sentine.link()

local buyLimit = require(luaServerPath.."lua.limit")
local login = require(lualibPath .. "luame.checkLogin")

local mysqlOne = nil

local function getResult(code, msg)
	local args={}
	args['code'] = code
	args['msg'] = msg
	sentine.close_db(redis)
	return json.encode(args)
end

local function close_db(db)
    if not db then
        return
    end
    --释放连接(连接池实现)
    local pool_max_idle_time = 10000 --毫秒
    local pool_size = 1000 --连接池大小
    local ok, err = db:set_keepalive(pool_max_idle_time, pool_size)
    if not ok then
        ngx.log(ngx.DEBUG, err)
    end
end

function decodeURI(s)
	s = string.gsub(s, '%%(%x%x)', function(h) return string.char(tonumber(h, 16)) end)
	return s
end

ngx.header.content_type = "application/json;"

local header_obj = ngx.req.get_headers()
local ajaxFlag = header_obj['x-requested-with']
if ajaxFlag == nil or string.lower(ajaxFlag) ~= 'xmlhttprequest' then
    return false
end

ngx.req.read_body()
local uri_args = ngx.req.get_post_args()

local id = uri_args['id']
local num = tonumber(uri_args['num'])

local isLogin = login.checkLogin()

if isLogin == false then 
	local result = getResult('000000', '用户未登录')
	ngx.say(result)
	return false
end	

local mid = isLogin

if id == nil or id == '' or id == ngx.null then
    return false
end

if math.floor(num) < num then
	return false
end 	

redis:select(dbConf.sentinel.detail_db)

local flag = redis:exists('goods_'..id..'_detail')
local alive = redis:hget('goods_'..id..'_detail', 'alive')

local goodsNo = redis:hget('goods_'..id..'_detail', 'goodsNo')
-- 仓库 QuMingyang
local storageId = '001002002002'
storageId = redis:hget('goods_'..id..'_detail', 'storehouseCode')

local orderType = '2'

if tonumber(flag) == 0 or alive ~= '1' then
	local result = getResult('000001', '商品已下架')
    ngx.say(result)
    return false
end

-- 判断是否需要实名制
local is_real = redis:hget('goods_'..id..'_detail', 'is_real')

redis:select(dbConf.sentinel.user_db)

-- 判断用户是否存在
local user_bool = redis:exists('mid_'..mid)
if tonumber(user_bool) == 0 then
	local result = getResult('000003', '用户不存在')
	ngx.say(result)
    return false
end

-- 需要实名认证
if tonumber(is_real) == 2 then
	local is_identity = redis:hget('mid_'..mid, 'is_identity')
	if tonumber(is_identity) ~= 1 then
		local result = getResult('000002', '需要实名制审核')
		ngx.say(result)
	    return false
	end
end

redis:select(dbConf.sentinel.detail_db)

local leastBuyNum = redis:hget('goods_'..id..'_detail', 'leastBuyNum')

if tonumber(num) < tonumber(leastBuyNum) then
	local result = getResult('000010', '该商品最小起购数量为'..leastBuyNum..'枚/套，请你重新设定购买数量。')
	ngx.say(result)
    return false
end	

local isPanda = redis:hget('goods_'..id..'_detail', 'isPanda')

if not mysqlOne then
	mysqlOne = mysql:new()
end

local props = dbConf.mysql
mysqlOne:connect(props)

if tonumber(isPanda) == 1 then -- 如果为实时熊猫币
	orderType = 'panda'
	local res = mysqlOne:query("SELECT PARAMETER_VALUE FROM core_parameter WHERE PARAMETER_CODE = 'pandacoins_perform'")
	local pv = res[1]['PARAMETER_VALUE'];
	redis:select(1)
	local pandaTime = redis:get('parameterKV:pandacoins_perform_time')
	if tonumber(pv) == 0 then
		local pandaTimeSub = string.gsub(pandaTime, ':', '')
		local index = string.find(pandaTimeSub, '-');
		local startTime = string.sub(pandaTimeSub,1,index - 1) 
		local endTime = string.sub(pandaTimeSub,index+1,string.len(pandaTimeSub)) 
		local getHour = tonumber(os.date("%H%M"))
		local getMon = tonumber(os.date("%w",os.time()))
		if getHour < tonumber(startTime) or getHour > tonumber(endTime) then -- 判断实时熊猫币是否在交易时间
			local result = getResult('000005', '实时熊猫币交易已经闭市，欢迎您下个交易日继续选购。</br>实时熊猫币交易时间：'..pandaTime)
    		ngx.say(result)
    		close_db(mysqlOne)
			return false;
		end	
	elseif tonumber(pv) == 2 then
		local result = getResult('000004', '实时熊猫币交易已经闭市，欢迎您下个交易日继续选购。</br>实时熊猫币交易时间：'..pandaTime)
    	ngx.say(result)
    	close_db(mysqlOne)
		return false;
	end	

end	

--判断限购
local res = mysqlOne:query("select IFNULL(is_limited,0) as res from es_goods where goods_id="..id.."")
local limit =  res[1]['res']

if tonumber(limit) == 1 then

	local esMem = mysqlOne:query("SELECT level_id,is_identity FROM ES_MEMBER  WHERE MEMBER_ID="..mid.."")
	local level_id = esMem[1]['level_id']
	local is_identity = esMem[1]['is_identity']

	local column_type = 'realname_member_limit'
	if tonumber(is_identity) ~= 1 then
		column_type = 'common_member_limit'
	end	

	local column_level = 'member_level1_limit'
	if tonumber(level_id) == 2 then
		column_level = 'member_level2_limit'
	elseif tonumber(level_id) == 5 then
		column_level = 'member_level3_limit'
	elseif tonumber(level_id) == 6 then	
		column_level = 'member_level4_limit'
	elseif tonumber(level_id) == 7 then
		column_level = 'member_level5_limit'
	end	

	local newTime = os.date("%Y-%m-%d %H:%M:%S")

	local goods_limited = mysqlOne:query("SELECT id,goods_id,start_time,end_time,"..column_type..","..column_level..",is_strictly FROM es_goods_limited WHERE goods_id = "..id.." AND start_time <= '"..newTime.."' AND end_time >= '"..newTime.."' AND is_delete = 0")

	if #goods_limited ~= 0 then
		local memberTypeLimit = goods_limited[1][column_type]
		local memberLevelLimit = goods_limited[1][column_level]
		local is_strictly = goods_limited[1]['is_strictly']
		local goodsLimitedId = goods_limited[1]['id']

		local limitedNumber0 = 999999999

		if tonumber(is_strictly) == 0 then
			if tonumber(memberTypeLimit) <= tonumber(memberLevelLimit) then
				limitedNumber0 = memberTypeLimit
			else 	
				limitedNumber0 = memberLevelLimit
			end	
		else 
			if tonumber(memberTypeLimit) >= tonumber(memberLevelLimit) then
				limitedNumber0 = memberTypeLimit
			else 	
				limitedNumber0 = memberLevelLimit
			end	
		end	

		if tonumber(limitedNumber0) ~= 999999999 then
			local limit1 = tonumber(limitedNumber0)
			local goodsNumber = buyLimit.findRedis(id, mid, goodsLimitedId)
			local limit2 = limit1 - tonumber(goodsNumber)
			if (limit2 - num) < 0 then
				if limit2 < 0 then 
					limit2 = 0
				end	
				ngx.say(getResult('000006', "此商品单用户限购【"..limit1.."】枚/套，您还可以购买【"..limit2.."】枚/套，请您重新选购，谢谢！"))
				close_db(mysqlOne)
				return false
			end 
		end	
	end	

end	


redis:select(dbConf.sentinel.storage_db)

local storage = redis:get('storage_'..goodsNo..'_'..storageId..'_aviQty')

if (tonumber(storage) - num) < 0 then
	ngx.say(getResult('000007', "抱歉该商品库存不足，请调整购买数量!"))
	return false
end	

local orderParam = ngx.encode_base64(ngx.encode_base64(id..':'..num))

if tonumber(isPanda) == 1 then
	ngx.say(getResult('000008', orderParam))
	close_db(mysqlOne)
	return false
end	

ngx.say(getResult('000009', orderParam))

close_db(mysqlOne)