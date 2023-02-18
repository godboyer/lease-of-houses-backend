const baseModel = require("./baseModel")

// const UserSchema = require("./schema/user/UserSchema")



// class RoleModel extends baseModel {

//   constructor() {
//     super('roles', RoleSchema)
//   }
//   insertMany(body) {
//     return this.model.insertMany(body)
//   }

//   findOne(params, field) {
//     console.log("查询权限信息", params);

//     return this.model.findOne(params, field)
//   }
//   find(params, field) {


//     return this.model.find(params, field)
//   }




// }

// class UserModel extends baseModel {
//   constructor() {
//     super('ad_users', UserSchema)
//   }
//   findOne(params, field) {
//     console.log("查询用户信息", params);

//     return this.model.findOne(params, field)
//   }
//   find(params, field) {


//     return this.model.find(params, field)
//   }

//   insertMany(body) {
//     return this.model.insertMany(body)
//   }

//   updateMany(query, { }) {
//     return this.model.updateMany(query, {})
//   }

//   remove(query) {
//     return this.model.remove(query)
//   }

// }

// class AnnoModel extends baseModel {
//   constructor() {
//     super("ad_annos", AnnoSchema)
//   }
//   insertMany(body) {
//     return this.model.insertMany(body)
//   }

//   findOne(params, field) {
//     console.log("查询公告信息", params);

//     return this.model.findOne(params, field)
//   }
//   find(params, field) {


//     return this.model.find(params, field)
//   }
// }







// exports.roleModel = new RoleModel
// exports.userModel = new UserModel
// exports.annoModel = new AnnoModel