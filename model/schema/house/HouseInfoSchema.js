/**
 * 房屋信息表
 * 属性名
字段说明
house id
房屋编号
user id
用户编号
city_id
城市编号
address
地址
create time
创建时间
lease state
租赁状态
deleted state
删除状态
image_path
图片路径
price
价格
 
房屋描述
house_category
房屋类别
Rental_category
租房类别
exam_status
审核状态
area
面积
decoration condition
装修状况
 */

const { Schema } = require("../../connect");

module.exports = new Schema({
  house_id: {
    type: String,
    required: true,

  },
  user_id: {
    type: Number,
    required: true,
    ref: "User",
  },
  city_id: {
    type: Number,
    required: true,
    ref: "City",
  },
  address: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    required: true,
  },
  lease_state: {
    type: String,
    required: true,
  },
  deleted_state: {
    type: Number,
    required: true,
  },
  image_path: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  house_description: {
    type: String,
    required: true,
  },
  house_category: {
    type: String,
    required: true,
  },
  exam_status: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  decoration_condition: {
    type: String,
    required: true,
  },
  rental_category: {
    type: String,
    required: true,
  },
  swiper_BigPic: {
    type: Array,
  },
  swiper_pic: {
    type: Array,
  },
  video: {
    type: String,
  },
  location_content: {
    type: String,
  },
  href: {
    type: String,
  },
  alt: {
    type: String,
  },
  tags: {
    type: Array,
  },
  des: {
    type: String,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  facilities: {
    type: Object
  },
  rentinfo: {
    type: Object
  },
  houseDetail: {
    type: Object
  },
  Roommate_Info: {
    type: Object
  },
  Homeowner_info: {
    type: Object
  }


});
