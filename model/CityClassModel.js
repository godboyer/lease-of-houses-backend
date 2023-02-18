const baseModel = require("./baseModel");
const CityClassSchema = require("./schema/house/CityClassSchema");
class CityClassModel extends baseModel {
  constructor() {
    super("cityclass", CityClassSchema);
  }
  // 查询单条数据
  findOne(filter = {}) {
    return this.model.findOne(filter);
  }
  // 写入单条数据的方法
  insertOne(data) {
    return this.model.insertMany([data]); //插入数据
  }
}

module.exports = new CityClassModel();
