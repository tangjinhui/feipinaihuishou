local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local dbConf = require(lualibPath .. "luame.dbConf")
local sentine = require(lualibPath .. "luame.sentinelink")
local redis = sentine.link()

local function getResult(code, msg)
	local args={}
	args['code'] = code
	args['msg'] = msg
	sentine.close_db(redis)
	return json.encode(args)
end

redis:select(dbConf.sentinel.detail_db)

ngx.header.content_type = "application/json;"

local header_obj = ngx.req.get_headers()
local ajaxFlag = header_obj['x-requested-with']
if ajaxFlag == nil or string.lower(ajaxFlag) ~= 'xmlhttprequest' then
    return false
end

local uri_args = ngx.req.get_uri_args()
local ids = uri_args['arrId']

local agreeNum = {}

for i = 1 , #ids , 1 
do 
   local flag = redis:exists('agree_'..ids[i])
   local len = 0
   if tonumber(flag) ~= 0 then
   	   len = redis:hlen('agree_'..ids[i])
   end
   table.insert(agreeNum, ids[i]..'|'..len)
end

ngx.say(getResult('000001', agreeNum))