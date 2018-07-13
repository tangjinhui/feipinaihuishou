
local dbconfig = {
  mysql =  {
    host = "192.168.170.235", --开发
    password = "123.com", --开发
    port = 3306,
    database = "ctces_release",
    user = "root"
  },
  redis = {
    ip = "192.168.170.235",  -- 开发环境
    port = 6379,
    db = 0
  },
  cookie = {
    domain = '.ecgci.com', -- 开发
    expiresNum = os.time() + (60*60*8)  +  (60*30)
  },
  sentinel = {
    path = "redis://192.168.170.235:26379",
    detail_db = 6,
    user_db = 8,
    storage_db = 0,
    domain = '.ecgci.com'
  }
}
  return dbconfig