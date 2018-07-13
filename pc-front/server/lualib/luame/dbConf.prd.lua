
local dbconfig = {
	mysql =  {
		host = "172.17.1.1", -- 生产mysql IP
		password = "pUs2GQ7xxzbD", -- mysql 密码
		port = 3306,
		database = "ctces_release",
		user = "jinbi_write"
	},
	redis = {
		ip = "172.19.1.78",  -- 生产redis
		port = 6379,
		db = 0
	},
	cookie = {
		domain = '.chinagoldcoin.net',
		expiresNum = os.time() + (60*60*8)  +  (60*30)
	},
	sentinel = {
		path = "redis://172.19.5.52:26379", --生产哨兵
		detail_db = 6,
		user_db = 8,
		storage_db = 0,
		domain = '.chinagoldcoin.net'
	}
}
return dbconfig