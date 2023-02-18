// Schema  声明表结构   对表的数据进行约束  (表字段的 类型校验)
/**
 * 属性名
字段说明
user id
用户编号
user name
用户名
password
密码
true name
真实姓名
address
地址
createtime
创建时间
deleted state
别除状态
email
邮箱
tele numeber
电话号码
99
9Q
role_permission
角色权限
 */
const { Schema } = require("../../connect");

module.exports = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  true_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createtime: {
    type: Date,
    required: true,
  },
  deleted_state: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  qq: {
    type: Number,
  },
  role_permission: {
    type: Number,
    required: true,
  },
});
