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
local id = uri_args['detail_id']

local detail_bool = redis:exists('goods_'..id..'_detail')

if detail_bool == 0 then
    ngx.say(getResult('000001', '数据不存在'))
    sentine.close_db(redis)
    return false
end

local result = {}

result['alive'] = redis:hget('goods_'..id..'_detail', 'alive')
result['goodsName'] = redis:hget('goods_'..id..'_detail', 'goodsName')
result['shopPrice'] = redis:hget('goods_'..id..'_detail', 'shopPrice')
result['goodsNameLong'] = redis:hget('goods_'..id..'_detail', 'goodsNameLong')
result['isChangeAble'] = redis:hget('goods_'..id..'_detail', 'isChangeAble')
result['reservetype'] = redis:hget('goods_'..id..'_detail', 'reservetype')
result['isReturnAble'] = redis:hget('goods_'..id..'_detail', 'isReturnAble')
result['reserveId'] = redis:hget('goods_'..id..'_detail', 'reserveId')
local bestBuyNum = redis:hget('goods_'..id..'_detail', 'bestBuyNum') 
local leastBuyNum = redis:hget('goods_'..id..'_detail', 'leastBuyNum') 
result['showNum'] = leastBuyNum
result['reserveEnd'] = redis:hget('goods_'..id..'_detail', 'reserveEnd')
-- 仓库 QuMingyang
local storageId = redis:hget('goods_'..id..'_detail', 'storehouseCode')
result['storageId'] = storageId

if storageId == nil or storageId == ngx.null or storageId == 'null' then
	ngx.say(getResult('000003', result))
	return false;
end	

if bestBuyNum == nil or bestBuyNum == ngx.null or bestBuyNum == 'null' then
	bestBuyNum = 1
end	

if tonumber(bestBuyNum) >= tonumber(leastBuyNum) then
	result['goodsNumber'] = bestBuyNum
else 
	result['goodsNumber'] = leastBuyNum
end	

redis:select(dbConf.sentinel.detail_db)
-- 套装ID
local goodsNo = redis:hget('goods_'..id..'_detail', 'goodsNo')

redis:select(dbConf.sentinel.storage_db)
-- 判断商品库存是否存在
local isFlag = redis:exists('storage_'..goodsNo..'_'..storageId..'_aviQty')

if tonumber(isFlag) == 0 then
	result['isStorage'] = 2
	ngx.say(getResult('000002', result))
	return false;
end	

local storage = redis:get('storage_'..goodsNo..'_'..storageId..'_aviQty')

local isStorage = 3

if tonumber(storage) > 0 and tonumber(storage) < 10 then
	isStorage = 1 --库存紧张
elseif tonumber(storage) <= 0 then
	isStorage = 2 --暂无库存
end	

result['isStorage'] = isStorage



ngx.say(getResult('000002', result))
