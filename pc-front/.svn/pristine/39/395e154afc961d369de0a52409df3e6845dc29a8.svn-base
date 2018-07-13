local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local dbConf = require(lualibPath .. "luame.dbConf")
local sentine = require(lualibPath .. "luame.sentinelink")
local mysql = require("resty.mysql")
local redis = sentine.link()

local login = require(lualibPath .. "luame.checkLogin")

local mysqlOne = nil

local function getResult(code, msg)
	local args={}
	args['code'] = code
	args['msg'] = msg
	sentine.close_db(redis)
	return json.encode(args)
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

local isLogin = login.checkLogin()

if isLogin == false then 
	local result = getResult('000002', '用户未登录')
	ngx.say(result)
	return false
end	

local mid = isLogin

local id = uri_args['id']

if id == nil or id == '' or id == ngx.null then
    return false
end

redis:select(dbConf.sentinel.detail_db)

local flag = redis:exists('goods_'..id..'_detail')
local alive = redis:hget('goods_'..id..'_detail', 'alive')

if tonumber(flag) == 0 or alive ~= '1' then
	local result = getResult('000001', '商品已下架，不能添加到关注')
    ngx.say(result)
    return false
end

redis:select(dbConf.sentinel.user_db)

-- 判断用户是否存在
local user_bool = redis:exists('mid_'..mid)
if tonumber(user_bool) == 0 then
	local result = getResult('000002', '用户不存在')
	ngx.say(result)
    return false
end

if not mysqlOne then
	mysqlOne = mysql:new()
end

local props = dbConf.mysql
mysqlOne:connect(props)

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


local res = mysqlOne:query("SELECT FID FROM es_favory WHERE MEMBER_ID = "..mid.." AND GOODS_ID = "..id.."")

if #res == 0 then
	local date=os.date("%Y-%m-%d %H:%M:%S")
	local result = mysqlOne:query(" INSERT INTO es_favory (MEMBER_ID,GOODS_ID,FDATE) VALUES ("..mid..","..id..",'"..date.."')")
	ngx.say(getResult('000004', '成功添加到关注'))
	close_db(mysqlOne)
else
	ngx.say(getResult('000003', '该商品已在您的关注中，请不要重复添加！'))
	close_db(mysqlOne)
end	

