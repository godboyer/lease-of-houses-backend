const baseModel = require("./baseModel");
const HouseLeaseSchema = require("./schema/house/HouseLeaseSchema");
class HouseLeaseModel extends baseModel {
  constructor() {
    super("houseleases", HouseLeaseSchema);
  }
  // 查询单条数据
  findOne(filter = {}) {
    return this.model.findOne(filter);
  }
  // 写入单条数据的方法
  insertOne(data) {
    return this.model.insertMany([data]); //插入数据
  }

  delete

}

module.exports = new HouseLeaseModel();
