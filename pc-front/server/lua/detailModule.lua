local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local dbConf = require(lualibPath .. "luame.dbConf")
local sentine = require(lualibPath .. "luame.sentinelink")
local redis = sentine.link()


local function getResult(code, msg, size, id)
	local args={}
	args['code'] = code
	args['msg'] = msg
	args['size'] = size or 0
	args['goodsId'] = id
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
local id = uri_args['id'] or 1
local mdu = uri_args['module'] or 'record'
local startRow = uri_args['startRow'] or 0
local pageSize = uri_args['pageSize'] or 3
local row = uri_args['row'] or 3

local detail_bool = redis:exists('goods_'..mdu..'_'..id)

if detail_bool == 0 then
    ngx.say(getResult('000001', ''))
    sentine.close_db(redis)
    return false
end

local result = redis:lrange('goods_'..mdu..'_'..id, startRow, pageSize)
local size = redis:llen('goods_'..mdu..'_'..id) / row;

ngx.say(getResult('000002', result, size, id))
