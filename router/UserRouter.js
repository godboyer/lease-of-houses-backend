// 所有用户模块相关的路由
const router = require('express').Router()
const multer = require('multer')
const UserController = require('../controller/UserController')
// const { createToken, verifyToken } = require("./utils/token")



// 载入文件上传模块

const path = require('path')
const { extname } = require('path')
// 基本文件上传的配置文件接收器
// const upload = multer({dest:'uploads'})

// 添加文件后缀
const storage = multer.diskStorage({
  //指定文件的存储目录
  destination: "public/uploads",
  filename: function (req, file, cb) {
    // const extName = path.parse(file.originalname).ext
    console.log(file);

    const extName = path.parse(file.originalname).ext
    let filename = `${file.fieldname}_${Date.now()}_${Math.random().toString().slice(2)}${extName}`;
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })



//获取用户信息
router.get('/getUserInfo',UserController.getUserInfo)
//登录
router.post('/login',UserController.login)

//注册
router.post('/register', UserController.register)
router.get('/phoneprefix', UserController.GetPhonePrefixList)
router.post('/sendcaptcha', UserController.SendCaptcha)
router.post('/captlogin',UserController.CaptchaLogin)
// // 短信登录
// router.post("/api/sms",UserController.smsLogin)
// //上传文件
// router.post('/upload', upload.single('img'), UserController.upload)
// // 多文件上传方式1
// router.post('/uploadMoreOne', upload.array('img'), UserController.uploadMoreOne)




module.exports = router