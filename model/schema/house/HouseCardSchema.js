const { Schema } = require('../../connect')


module.exports = new Schema({
    href: String,
    image_path: String,
    alt: String,
    tags: Array,
    localtion: String,
    des: String,
    area: String,
    title: String,
    house_id: String,
    swiper_pic: Array,
})