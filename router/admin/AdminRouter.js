// 所有用户模块相关的路由
const AdminRouter = require('express').Router()


const AdminController = require("../../controller/admin/adminController")

// 添加  { username,phone,password }
AdminRouter.post('/register', AdminController.RegiSter)


// 登录
AdminRouter.post("/login", AdminController.Login)

// 判断手机号是否存在
AdminRouter.post("/chechphone", AdminController.ChechPhone)

// 生成token
AdminRouter.post("/gettoken", AdminController.GetToken)

// 获取用户信息
AdminRouter.post("/getuserinfo", AdminController.GetUserInfo)

// 修改密码  不要token
AdminRouter.post("/changepass", AdminController.ChangePass)

// 修改用户信息 复用 
AdminRouter.post("/changeuserinfo", AdminController.ChangeUserInfo)

// 上传文件
// 上传文件 
const multer = require("multer")
const storage = multer.diskStorage({  // 存储对象   diskStorage 硬盘存储
  destination: function (req, file, cb) {   // 存储的目录 
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {  // 存储的文件名 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, "WH2214_" + uniqueSuffix + "_" + file.originalname)  // 1.jpg  避免命名冲突 
  }
})
const upload = multer({ storage: storage }).any()   // 接受任何类型格式的文件 
AdminRouter.post("/uploadfile", upload, AdminController.UpLoadFile)


//角色列表
AdminRouter.post("/getrolelist", AdminController.GetRoleList)

// 删除权限
AdminRouter.post("/roledelete", AdminController.RoleDelete)

// 添加权限
AdminRouter.post("/roleadd", AdminController.RoleAdd)

// 修改权限
AdminRouter.post("/roleupdate", AdminController.RoleUpData)

// 添加公告
AdminRouter.post("/annoadd", AdminController.AnnoAdd)

module.exports = AdminRouter