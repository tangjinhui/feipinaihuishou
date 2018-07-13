local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local mysql = require("resty.mysql")

local dbConf = require(lualibPath .. "luame.dbConf")
local login = require(lualibPath .. "luame.checkLogin")

local function getResult(code, msg)
	local args={}
	args['code'] = code
	args['msg'] = msg
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
local id = uri_args['id']
local ad_type = uri_args['type']
local content = uri_args['content']
local postTime = os.date("%Y-%m-%d %H:%M:%S")

local isLogin = login.checkLogin()

if isLogin == false then 
	local result = getResult('000000', '用户未登录')
	ngx.say(result)
	return false
end	

local mid = isLogin

local mysqlOne = nil

if not mysqlOne then
	mysqlOne = mysql:new()
end
local props = dbConf.mysql
mysqlOne:connect(props)

mysqlOne:query("insert into es_goods_consulting (MEMBER_ID,GOODS_ID,CONTENT,POST_TIME,REPLY_USER,REPLY_TIME,REPLY_CONTENT,REPLY_SATISFACTION,SEQ_NO,STATUS,CONSULTING_TYPE) values ("..mid..", "..id..",'"..content.."','"..postTime.."','','','','','','','"..ad_type.."')")

ngx.say(getResult('000001', ''))