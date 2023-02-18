//1.导入模块
const express = require("express");
const session = require('express-session')
// 导入自定义路由模块
// const router = require('./router')
const AdminRouter = require("./router/admin/AdminRouter");
const HouseRouter = require("./router/HouseRouter");
const UserRouter = require('./router/UserRouter')
const erroCode = require("./errorcode");

const { verifyToken, secret } = require("./utils/token");
const { decrypto } = require('./utils/crypto')

const UserModel = require("./model/UserModel");


//2.创建服务器
let app = express();
// 7、处理跨域
app.use(require("cors")());

// 4、暴露资源文件
app.use(express.static("public"));
// 5、配置请求体参数解析
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 8、配置模板引擎
// app.engine("html", require("express-art-template"));
// app.set("views", "views");

// 9.token配置
// //白名单
const whiteList = [
  "/api/user/login",
  "/api/user/sendcaptcha",
  "/api/user/captlogin",
  "/admin/register",
  "/test/getcommentlist",
  "/test/deletecomment",
  "/test/addcomment",
  "/test/updatecomment",
  "/test/1",
];

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
}))


//数据解密
app.use((req, res, next) => {
  console.log(req.url);
  console.log("params=>", req.params);
  console.log("body => ", req.body);
  console.log("query => ", req.query);
  console.log("method => ", req.method);



  if (req.method === 'POST' || req.method === 'PATCH') {
    const data = req.body.data;
    if (data != undefined) {
      req.body = decrypto(data)

    }
    console.log("解密后req.body=>", req.body)

  }
  next()
})

//token鉴权
app.use((req, res, next) => {

  console.log("Authorization =>", req.headers.Authorization)
  let token = '';
  if (req.headers.Authorization && req.headers.Authorization != undefined) {

    token = req.headers['Authorization'].split('')[0];
  }
  console.log("token=>", token);
  // 除白名单内以外的请求
  if (!whiteList.includes(req.url) && req.method !== 'GET') {
    // 判断token是否存在
    if (token) {
      verifyToken(token)
        .then((resdata) => {
          console.log("resdata", resdata);

          next();
        })
        .catch((error) => {
          res.send({
            code: 3001,
            msg: "token错误或者过期,请重新登录",
            result: null,
            error,
          });
        });
    } else {
      res.send({
        code: 3001,
        msg: "token不存在,请重新登录",
        data: null,
        test: req.body?.encrypted
      });
    }
  } else {
    next();
  }
});






// 6、路由的模块化
// app.use(router)
app.use("/admin", AdminRouter);
app.use("/api/user", UserRouter)
app.use("/api/house", HouseRouter);
// 全局错误中间件
// app.use((err, req, res, next) => {
//   console.log(err);
//   //获取到抛出错误的信息
//   const message = err.message;
//   // console.log(message)
//   // res.status(500).send({ code: message, msg: erroCode[message] });
//   next()
// });

//3.开启服务器
app.listen(3020, () => console.log("success"));
