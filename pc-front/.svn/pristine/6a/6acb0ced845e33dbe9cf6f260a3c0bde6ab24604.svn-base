local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local dbConf = require(lualibPath .. "luame.dbConf")
local sentine = require(lualibPath .. "luame.sentinelink")

local _M = {}

function _M.checkLogin()

	local token = ngx.var.cookie_token

	if token == '' or token == nil or token == ngx.null then  
		return false
	end	

	local redis = sentine.link()

	redis:select(dbConf.sentinel.storage_db)

	local user_bool = redis:exists('member:loginInfo:'..token)
	if tonumber(user_bool) == 0 then
		return false
	end

	return redis:hget('member:loginInfo:'..token, 'memberId')

end	

return _M