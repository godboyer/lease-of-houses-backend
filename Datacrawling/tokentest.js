const jwt = require("jsonwebtoken")
//撒盐，加密时候混淆
// const secret = '113Bmongojsdalkfnxcvmas'

// //生成token
// //info也就是payload是需要存入token的信息
// function createToken(info) {
//   let token = jwt.sign(info, secret, {
//     //Token有效时间 单位s
//     expiresIn: 60 * 60 * 10
//   })
//   return token
// }

// //验证Token
// function verifyToken(token) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, secret, (error, result) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }


let payload = { name: '张三', admin: true };
let secret = 'I_LOVE_JING';
let token = jwt.sign(payload, secret);
console.log(token)
let tmp = jwt.verify(token, secret)
console.log(tmp)
