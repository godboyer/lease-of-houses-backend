const UserModel = require("../model/UserModel");
const axios = require('axios')
const fs = require('fs')
// const { createToken, verifyToken } = require("../utils/token")
const { createToken } = require("../utils/token");
const { response } = require("express");
class UserController {
  // 获取用户信息
  async getUserInfo(request, response) {
    let res = await UserModel.findOne()

    response.send();
  }
  // 实现头像上传
  upload(request, response) {
    //单个文件用 file
    console.log("文件信息为", request.file);
    response.send(`http://114.132.198.2:3020/${request.file.path}`);
  }
  // 手机号登录
  async login(request, response) {
    console.log(request.body);
    let data = {
      tele_number: request.body.tele_number,
      password: request.body.password,
    };

    // 从mongodb数据库查询数据
    console.log(data);
    let user = await UserModel.findOne(data); //查询账户密码是否正确
    // 没查到报错
    if (!user) {
      response.send({
        code: 200,
        msg: "用户名或者密码错误",
      });
      return;
    }

    //创建token
    let token = createToken(request.body);


    // 返回响应参数
    response.send({
      code: 200,
      data: {
        id: user.id,
        username: user.tel,
        token: token,
      },
      msg: "登录成功!",
    });
  }
  // 注册
  async register(request, response) {
    console.log(request.body);
    //验证用户是否存在
    let user = await userModel.findOne({
      tel: request.body.tel,
    });

    if (user) {
      response.send({
        code: 1,
        msg: "用户名已经存在",
      });
      return;
      // throw new Error(102)
    }
    // 拿到用户注册信息
    const userInfo = {
      tel: request.body.tel,
      password: request.body.password,
      avator: request.body.avator ? request.body.avator : "",
    };
    // 创建token
    let token = createToken(userInfo);
    await userModel.insertOne({
      ...userInfo,
      token,
    });
    //返回响应数据
    response.send({
      code: 0,
      msg: "注册成功",
    });
  }

  // 短信验证登录
  smsLogin(request, response, next) {
    const reg_tel = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    console.log(request.body)
    console.log(request.body.flag)
    // 利用正则判断手机号是否正确
    if (!reg_tel.test(request.body.tel)) {
      response.send({ code: 0, msg: "请输入正确的手机号!" })
      return
    }
    // 随机验证码
    let params = Math.floor(Math.random() * (9999 - 1000) + 1000)
    response.send({ code: 200, data: { sms: params, flag: request.body.flag }, msg: "验证码获取成功!" })



  }
  //发送验证码
  async SendCaptcha(req, res) {
    console.log(req.body)
    let result = await axios({
      url: 'http://114.132.198.2:3000/captcha/sent',
      method: 'GET',
      params: req.body
    })
    // console.log(result)
    if (result.status === 200) {
      const { data } = result
      // console.log("data", data)
      if (data.code == 200) {
        res.send({
          ...data,
          msg: '获取成功'
        })
      } else {
        res.send({
          ...data
        })
      }

    } else {
      res.send({
        code: 500,
        msg: '获取失败',
        data: result.data
      })
    }

  }
  //验证码登录
  async CaptchaLogin(req, res) {
    console.log(req.body)

    try {
      let result = await axios({
        url: 'http://114.132.198.2:3000/captcha/verify',
        method: 'GET',
        params: req.body
      })

      const { data } = result
      console.log("data", data)
      if (data.code == 200 && data.data) {
        //验证码验证成功
        //查询账户是否存在
        //如果存在表明已经注册,直接跳转登录,
        //否则没有注册, 引导用户完善注册信息,再登录
        //通过字段isRegistration 来判断
        let user = await UserModel.FindOne({
          phone: req.body.phone
        }); //查询账户密码是否正确
        console.log(user)
        if (!user) {
          res.send({
            ...data,
            msg: '获取成功',
            isRegistration: false
          })
        } else {
          res.send({
            ...data,
            msg: '获取成功',
            isRegistration: true,
            userInfo:user
          })
        }



      } else {
        res.send({
          ...data
        })
      }

    } catch (e) {
      res.send({
        code: 500,
        msg: '验证失败',
        data: e
      })
    }



  }
  uploadMoreOne() { }


  // 获取收藏
  /**
   * 
   * @param {object} request 请求信息
   * @param {object} response 响应信息
   */
  async getColletInfo(request, response) {
    console.log(request.body);
    let params = {
      user_token: request.body.token,
      productSn: request.body.productSn,
    };
    // 从mongodb数据库查询数据
    let collect = await CollectModel.findOne(params); //查询账户密码是否正确

    // 没查到报错
    if (!collect) {
      response.send({
        code: 2,
        msg: "token无效，请重新登录",
      });
      return;
    }

    // 返回响应参数
    response.send({
      code: 200,
      data: collect,
      msg: "获取收藏信息成功",
    });
  }

  //获取手机区号列表
  async GetPhonePrefixList(req, res) {
    let result = await axios({
      url: 'https://www.wellcee.com/api/user/getPhonePrefixList',
      method: 'GET',
    })
    if (result.status === 200) {
      const { data } = result
      // console.log("data", data)
      res.send(data)
    } else {
      res.send({
        code: 500,
        msg: '获取失败',
        data: result.data
      })
    }


  }


}

//导出的是实例对象
module.exports = new UserController();
