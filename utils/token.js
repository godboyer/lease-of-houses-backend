const jwt = require("jsonwebtoken")

//撒盐，加密时候混淆
const secret = 'cheems要去码头整点薯条吗?'
exports.secret = secret
//生成token
//info也就是payload是需要存入token的信息
exports.createToken = function (info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10
  })
  return token
}

//验证Token
exports.verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

