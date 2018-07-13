
local dbconfig = {
	mysql =  {
		host = "172.19.1.157",
		password = "r4Ebrc2Qrh5x", 
		port = 3306,
		database = "ctces_release",
		user = "jinbi_write"
	},
	redis = {
		ip = "172.19.1.155",   
		port = 6379,
		db = 0
	},
	cookie = {
		domain = '.chinagoldcoin.net', 
		expiresNum = os.time() + (60*60*8)  +  (60*30)
	},
	sentinel = {
		path = "redis://172.19.1.155:26379", 
		detail_db = 6,
		user_db = 8,
		storage_db = 0,
		domain = '.chinagoldcoin.net'
	}
}
return dbconfig