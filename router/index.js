// 路由的入口文件

// 导入fs模块
const fs = require('fs')
const path = require('path')
// 获取路由对象
const router = require('express').Router()
// 路由模块的自动载入
fs.readdirSync(__dirname).forEach(item => {
    if (item == 'index.js') return
    router.use(require(path.join(__dirname, item)))
})

module.exports = router