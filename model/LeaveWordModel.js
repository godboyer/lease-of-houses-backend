const baseModel = require("./baseModel");
const LeaveWordSchema = require("./schema/house/LeaveWordSchema");
class LeaveWordModel extends baseModel {
  constructor() {
    super("leavewords", LeaveWordSchema);
  }
  // 查询单条数据
  FindOne(filter = {}) {
    let filterData = {
      _id:filter
    }
    return this.model.findOne(filterData);
  }
  // 写入单条数据的方法
   // Insert a single house record
   Create(data) {
    return this.model.create(data); // insert data
  }

  FindMany(filter = {}) {
    return this.model.find(filter);
  }
  // Update a house record by id
  UpdateOneById(id, updateData) {
    return this.model.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  // Delete a house record by id
  DeleteOneById(id) {
    return this.model.findByIdAndDelete(id);
  }
  //分页查询
  PagedQuery(config = {
    query : {}, // 条件 
    field :{}, // 显示的字段
    limit :0,
    sort: {},
    skip : 0
  }) {  
    let {query,field,limit,sort,skip} = config
    return this.model.find(query, field)
    .limit(limit)
    .skip(skip)
    .sort(sort)
  }
}

module.exports = new LeaveWordModel();
