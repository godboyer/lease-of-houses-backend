


exports.FindOneDataFromTable = ({
  model,
  query = {},
  field = {},
  next,
  res,
  msg = '查询成功'
}) => {
  model.findOne(query, field)
    .then(result => {
      if (next) {
        next(result)   // 下一步的操作
      } else {
        res.json({
          code: 200,
          msg: msg,
          result
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.json({
        code: 500,
        msg: '服务器异常',
        err,
        result: {}
      })
    })
}

// Promise 
exports.FindOneDataFromTableAsync = ({
  model, // 操作的表  必须
  query = {}, // 条件 
  field = {}, // 显示的字段
  next, // 判断是否有下一步操作 
  res, // res 响应对象  必须
  msg = '查询成功' // 提示 
}) => {
  return new Promise((resolve, reject) => {
    model.findOne(query, field)
      .then(result => {
        if (next) {
          // next(result)   // 下一步的操作
          resolve(result)   // then 执行下一步操作 
        } else {
          res.json({
            code: 200,
            msg: msg,
            result
          })
        }
      })
      .catch(err => {
        console.log("err", err)
        res.json({
          code: 500,
          msg: '服务器异常',
          err,
          result: {}
        })
        reject(err)
      })
  })
}

// 增删改查

// 修改 
exports.UpdateDataFromTableAsync = ({
  model, // 操作的表  必须
  res, // res 响应对象  必须
  query = {}, // 条件 
  data = {},  // 修改数据 
  next, // 判断是否有下一步操作 
  msg = '修改成功' // 提示 
}) => {
  return new Promise((resolve, reject) => {
    model.updateMany(query, {
      $set: data
    })
      .then(result => {
        if (next) {
          // next(result)   // 下一步的操作
          resolve(result)   // then 执行下一步操作 
        } else {
          res.json({
            code: 200,
            msg: msg,
            result
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.json({
          code: 500,
          msg: '服务器异常',
          err,
          result: {}
        })
        reject(err)
      })
  })
}


// 查询
exports.FindAllDataFromTableAsync = ({
  model, // 操作的表  必须
  res, // res 响应对象  必须


  query = {}, // 条件 
  field = {}, // 显示的字段
  next, // 判断是否有下一步操作 
  msg = '查询成功', // 提示 
  limit = 0,
  sort = {},
  skip = 0
}) => {
  return new Promise((resolve, reject) => {
    model.find(query, field)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .then(result => {
        if (next) {
          resolve(result)   // then 执行下一步操作 
        } else {
          res.json({
            code: 200,
            msg: msg,
            result
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.json({
          code: 500,
          msg: '服务器异常',
          err,
          result: {}
        })
        reject(err)
      })
  })
}


// 删除
exports.RemoveDataFromTableAsync = ({
  model, // 操作的表  必须
  res, // res 响应对象  必须
  query = {}, // 条件 
  next, // 判断是否有下一步操作 
  msg = '删除成功', // 提示 
}) => {
  return new Promise((resolve, reject) => {
    model.remove(query)
      .then(result => {
        if (next) {
          resolve(result)   // then 执行下一步操作 
        } else {
          res.json({
            code: 200,
            msg: msg,
            result
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.json({
          code: 500,
          msg: '服务器异常',
          err,
          result: {}
        })
        reject(err)
      })
  })
}

// 添加 
exports.InsertDataFromTableAsync = ({
  model, // 操作的表  必须
  res, // res 响应对象  必须
  data = {}, // 添加的数据
  next, // 判断是否有下一步操作 
  msg = '添加成功', // 提示 
}) => {
  return new Promise((resolve, reject) => {
    model.insertMany(data)
      .then(result => {
        if (next) {
          resolve(result)   // then 执行下一步操作 
        } else {
          res.json({
            code: 200,
            msg: msg,
            result
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.json({
          code: 500,
          msg: '服务器异常',
          err,
          result: {}
        })
        reject(err)
      })
  })
}
