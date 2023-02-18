
const { roleModel, userModel, annoModel } = require("../../model/AdminModel")
const { username } = require("../../index")
const { createToken, verifyToken } = require("../../utils/token")
let { FindOneDataFromTable, FindOneDataFromTableAsync, InsertDataFromTableAsync, UpdateDataFromTableAsync, FindAllDataFromTableAsync, RemoveDataFromTableAsync } = require("../../utils/index")

console.log("名字",username);

class AdminController {

  RegiSter(req, res) {
    console.log("注册请求!");
    var body = req.body;
    console.log(body);
    userModel.findOne({
      $or: [    // 或者 $inc 
        {
          username: body.username,
        },
        {
          phone: body.phone
        }
      ]
    }).then(result => {
      console.log(result);
      if (result) {
        // 已经注册 
        res.send({
          code: 401,
          msg: '当前用户名或者手机已经被注册',
        })
      } else {
        body.time = new Date()
        console.log("注册信息", body);
        userModel.insertMany(body)
          .then(data => {
            res.send({
              code: 200,
              msg: '注册成功',
              result: data
            })
          })
      }
    })
      .catch(err => {
        res.send({
          code: 500,
          msg: '服务器异常',
          err,
          result: {}
        })
      })
  }

  Login(req, res) {
    
    console.log("登录请求", req.body ,username);
    var body = req.body;
    userModel.findOne({
      $or: [
        { tel: body.tel },  // account 可能是手机号也有可能是用户名 
       
      ]
    })
      .then(result => {
        if (result) {
          if (result.password == body.password) {

            // 创造token 
            var token = createToken({
              username: result.username,
              phone: result.phone,
              password: result.password,
            })

            res.send({
              code: 200,
              msg: '登录成功',
              data: result,
              token: token
            })
          } else {
            res.send({
              code: 401,
              msg: '账号或者密码不匹配',
              data: {}
            })
          }
        } else {
          res.send({
            code: 401,
            msg: '账号不存在,请先去注册',
            data: {}
          })
        }
      })
      .catch(err => {
        res.send({
          code: 500,
          msg: '服务器异常',
          err,
          data: {}
        })
      })
  }

  async ChechPhone(req, res) {
    var body = req.body;

    // 3. 
    let result = await FindOneDataFromTableAsync({
      model: userModel,
      res,
      query: {
        phone: body.phone,
      },
      next: 1  // 有下一步
    })
    if (result) {
      res.send({
        code: 200,
        msg: '手机号存在',
        flag: true,
        result
      })
    } else {
      res.send({
        code: 401,
        msg: '手机号尚未注册',
        flag: false
      })
    }

   
  }
  GetToken(req, res) {
    var data = req.body;    // 需要加密的数据 
    var token = createToken(data)
    res.send({
      code: 200,
      msg: '成功',
      token
    })
  }
  GetUserInfo(req, res) {

    console.log("获取用户信息",req.body);
    let username = req.body.username
    console.log("用户名:", username);

    FindOneDataFromTableAsync({
      model: userModel,
      res,
      query: {
        username
      },

    })

  }
  ChangePass(req, res) {
    var body = req.body;
    UpdateDataFromTableAsync({
      model: userModel,
      res,
      query: {
        phone: body.phone,
      },
      data: {
        password: body.password
      }
    })
  }


  ChangeUserInfo(req, res) {
    var body = req.body;
    
    let username = req.body.username
      UpdateDataFromTableAsync({
        model: userModel,
        res,
        query: {
          username
        },
        data: body
      })
    
  }
  UpLoadFile(req, res) {
    
      var file = req.files[0]
      res.send({
        code: 200,
        msg: '文件上传成功',
        file,
        path: file.path   // 上传文件 目的就是为了得到 文件在服务器的路径 
      })
   
  }
  GetRoleList(req, res) {
    var body = req.body;
    var keyword = body.keyword
    var query = {
      label: new RegExp(keyword)   // 模糊搜索 
    }
  
      FindAllDataFromTableAsync({
        model: roleModel,
        res,
        query
      })
    
  }

  RoleDelete(req, res) {
    var body = req.body;
   
      RemoveDataFromTableAsync({
        model: roleModel,
        query: {
          _id: body._id
        },
        res   // 必传的 
      })
    
  }
 async RoleAdd(req, res) {
    var body = req.body;
   

      let result = await FindOneDataFromTableAsync({
        model: roleModel,
        res,
        query: {
          value: body.value
        },
        next: 1 // 下一步操作 
      })
      // 数组的值  All  []
      //  对象    One   null  
      // then 回调  
      if (result) {
        res.send({
          code: 401,
          msg: '当前权限已存在,请重新插入',
          result: result
        })
      } else {
        // 插入 
        InsertDataFromTableAsync({
          model: roleModel,
          data: body,
          res   // 必传的 
        })
      }
    
  }
 async RoleUpData(req, res) {
    var body = req.body;
    

      let result = await FindOneDataFromTableAsync({
        model: roleModel,
        res,
        query: {
          value: body.value,
          label: body.label,
        },
        next: 1
      })
      if (result) {
        res.send({
          code: 401,
          msg: '当前权限已存在,请重新修改',
          result: result
        })
      } else {
        // 修改
        UpdateDataFromTableAsync({
          model: roleModel,
          query: {
            _id: body._id,
          },
          data: body,
          res   // 必传的 
        })
      }
    
  }
  AnnoAdd(req, res) {
    var body = req.body;
    
      // 插入 
      body.time = new Date()
      InsertDataFromTableAsync({
        model: annoModel,
        data: body,
        res   // 必传的 
      })
    
  }


}




module.exports = new AdminController