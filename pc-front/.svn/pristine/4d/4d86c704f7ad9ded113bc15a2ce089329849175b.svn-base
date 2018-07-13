local json = require("cjson")
local redis = require("resty.redis")
local lualibPath = ngx.var.lualib_path

local dbConf = require(lualibPath .. "luame.dbConf")

local redisPath = dbConf.redis.ip or "127.0.0.1"
local port = dbConf.redis.port or 6379

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

local limit = {}

function limit.findRedis(id, mid, goodsLimitedId)
	local redisOne = nil
	redisOne = redis:new()
	redisOne:set_timeout(3000)
	redisOne:connect(redisPath, port)
	redisOne:select(dbConf.redis.db)
	local num = redisOne:exists('goods_limited_'..id..'_'..mid..'_'..goodsLimitedId)
	if tonumber(num) ~= 0 then
		num = redisOne:get('goods_limited_'..id..'_'..mid..'_'..goodsLimitedId)
	end	
	close_db(redisOne)
	return num
end	

return limit