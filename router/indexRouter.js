const router = require('express').Router()
router.get('/', (request, response) => {

  let data = {
    nickname: '前后端不分离做法',
    like: ['麻将', 'lol', '敲代码'],
    age: 20,
    lmj: {
      name: '李明杰',
      height: 159
    }
  }
  //渲染的数据暂时是自己给定
  //后面通过配置mongoose来获取服务端数据并渲染

  // 配置完成之后就可以指定文件名称渲染页面
  response.render('index.html', data)
})

module.exports = router