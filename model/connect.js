//导入mongoose
const mongoose = require('mongoose')

// //链接服务器
// mongoose.connect('mongodb://localhost:27017/blog')
// //导出链接对象
// module.exports = mongoose

const hostname = "localhost"
const port = 27017
const dbName = "house"

const CONN_DB_URl = `mongodb://${hostname}:${port}/${dbName}`


mongoose.connect(CONN_DB_URl, (err) => {
  if (err) {
    console.log("数据库链接失败了");
  } else {
    console.log("数据库链接成功")
  }

})


//导出链接对象
module.exports = mongoose