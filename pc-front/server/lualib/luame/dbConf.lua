
local dbconfig = {
	mysql =  {
		host = "172.168.100.55", --测试
		password = "8u4jmEQnt8Ek", --测试
		port = 3306,
		database = "ctces_release",
		user = "jinbi_write"
	},
	redis = {
		ip = "172.168.100.53",  -- 测试环境
		port = 6379,
		db = 0
	},
	cookie = {
		domain = '.ecgci.com', -- 测试
		expiresNum = os.time() + (60*60*8)  +  (60*30)
	},
	sentinel = {
		path = "redis://172.168.100.53:26379",
		detail_db = 6,
		user_db = 8,
		storage_db = 0,
		domain = '.ecgci.com'
	}
}
return dbconfig