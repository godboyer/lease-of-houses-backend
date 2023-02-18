/**
 * 留言表
 * 属性名
字段说明
leaveword_id
留言编号
user id
用户编号
create time
创建时间
recovery_state
回复状态
content
内容
 */

const { Schema } = require("../../connect");
module.exports = new Schema({
  leaveword_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  create_time: { type: Date, default: Date.now },
  recovery_state: { type: Number, required: true, unique: true },
  content: { type: Number, required: true, unique: true },
});
