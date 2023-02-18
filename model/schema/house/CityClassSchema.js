const { Schema } = require("../../connect");
// city_id: 城市编号  deleted_state : 删除状态  city_name:城市名
// 城市分类表

module.exports = new Schema({
  city_id: {
    type: Number,
    required: true,
  },
  deleted_state: {
    type: Number,
    required: true,
  },
  city_name: {
    type: String,
    required: true,
  },
});
