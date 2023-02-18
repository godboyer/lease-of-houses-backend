/**
 * 房屋租赁表
 * 
 * 属性名
字段说明
houselease id
房屋租赁编号
house_id
房屋编号
user id
用户编号
create time
创建时间
lease_long
租赁时间
lease price
租赁价格
 */

const { Schema } = require("../../connect");

module.exports = new Schema({
  houselease_id: {
    type: Number,
    required: true,
  },
  house_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  create_time: {
    type: Date,
    required: true,
  },
  lease_long: {
    type: Number,
    required: true,
  },
  lease_price: {
    type: Number,
    required: true,
  },
});
