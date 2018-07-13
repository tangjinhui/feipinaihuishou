local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local dbConf = require(lualibPath .. "luame.dbConf")
local sentine = require(lualibPath .. "luame.sentinelink")
local redis = sentine.link()
local mysql = require("resty.mysql")

local login = require(lualibPath .. "luame.checkLogin")

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

redis:select(dbConf.sentinel.detail_db)

ngx.header.content_type = "application/json;"

local header_obj = ngx.req.get_headers()
local ajaxFlag = header_obj['x-requested-with']
if ajaxFlag == nil or string.lower(ajaxFlag) ~= 'xmlhttprequest' then
    return false
end

local uri_args = ngx.req.get_uri_args()
local id = uri_args['commId']

local isLogin = login.checkLogin()

if isLogin == false then 
	local result = getResult('000000', '用户未登录')
	ngx.say(result)
	return false
end	

local mid = isLogin

local flag = redis:hget('agree_'..id, mid)
local mysqlOne = nil

if flag == ngx.null or flag == nil or flag == '' then
	redis:hset('agree_'..id, mid, os.time())
	if not mysqlOne then
		mysqlOne = mysql:new()
	end
	local props = dbConf.mysql
	mysqlOne:connect(props)
	mysqlOne:query("INSERT INTO ES_COMMENT_YOUYONG(ES_COMMENT_ID,MEMBER_ID) values("..id..","..mid..")")
	close_db(mysqlOne);
	ngx.say(getResult('000001', ''))
else 
	ngx.say(getResult('000002', '同一个评价,您只能点击一次哦~'))
end	