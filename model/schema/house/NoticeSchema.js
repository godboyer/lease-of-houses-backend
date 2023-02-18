const { Schema } = require("../../connect");
// 属性名字段说明
/*  公告表
notice_id公告编号
notice title公告标题
notice content公告内容
create time创建时间
deleted state删除状态

*/
module.exports = new Schema({
  notice_id: {
    type: Number,
    required: true,
  },
  notice_title: {
    type: String,
    required: true,
  },
  notice_content: {
    type: String,
    required: true,
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
