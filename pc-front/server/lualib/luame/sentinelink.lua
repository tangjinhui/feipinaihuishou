local json = require("cjson")
local lualibPath = ngx.var.lualib_path
local dbConf = require(lualibPath .. "luame.dbConf")
local redis_connector = require(lualibPath .. "luame.connector")
local sentinelPath = dbConf.sentinel.path or "127.0.0.1"
local redisOne = nil

-- 连接烧饼并实例化redis----------------------------------------------------------------------------------------

local _M = {}

function _M.link()
	if not redisOne then
	  redisOne = redis_connector.new()
	end

	local sentinel, err = redisOne:connect{ 
	    url = sentinelPath
	}
	if not sentinel then
	    ngx.log(ngx.DEBUG, '--------------连接哨兵失败-------------\n', err,'\n')
	    return
	end

	local redis_sentinel = require "resty.redis.sentinel"

	local master, err = redis_sentinel.get_master(sentinel, "mymaster")
	if not master then
	    ngx.log(ngx.DEBUG, '--------------redis_sentinel.get_master失败-------------\n', err ,'\n')
	    return
	end

	local hosts = {
	    { host = master.host, port = master.port }
	}
	ngx.log(ngx.DEBUG, '--------------host-------------\n', master.host ," ",master.port ,'\n')

	local redis, err, previous_errors = redisOne:try_hosts(hosts)
	if not redis then
		ngx.log(ngx.DEBUG, '--------------try_hosts失败-------------\n', master.host ," ",master.port ," ",err,'\n')
		return
	end

	return redis
end

-- 关闭数据库
-- db 数据链接实例
function _M.close_db(db)
	if not db then
		return
	end
	--释放连接(连接池实现)
	local pool_max_idle_time = 10000 --毫秒
	local pool_size = 5000 --连接池大小
	local ok, err = db:set_keepalive(pool_max_idle_time, pool_size)
	if not ok then
		ngx.log(ngx.DEBUG, err)
	end
end

return _M
