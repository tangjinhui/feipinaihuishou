local json = require("cjson")
local lualibPath = ngx.var.lualib_path
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

local isLogin = login.checkLogin()

if isLogin == false then 
	local result = getResult('000000', '用户未登录')
	ngx.say(result)
	return false
end	

local result = getResult('000001')
ngx.say(result)