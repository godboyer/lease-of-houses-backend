/**
 * 房屋点评表
 * 属性名
字段说明
comment_id
编号
housed
房屋编号
user_id
用户编号
evaluation_content
评价内容
create_time
创建时间
deleted state
删除状态
 */

const { Schema } = require("../../connect");

module.exports = new Schema({
    comment_id: {
    type: Number,
    required: true,
  },
  housed: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  evaluation_content: {
    type: String,
  },
  create_time: {
    type: Date,
    required: true,
  },
  deleted_state: {
    type: Number,
    required: true,
  },
});
