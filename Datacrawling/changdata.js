const fs = require('fs')
// let gdetail = []
// for(let i = 0 ;i< 13; i++){
//   const data1 = fs.readFileSync(`./flyco/${i}.json`, 'utf8');	
//   write(data1)
// }

// const data1 = fs.readFileSync(`./flyco/14.json`, 'utf8');	
// write(data1)

// 将商品详情信息整合在一个数组中
function write(data) {
  //读取json文件
  let temp = JSON.parse(data)	//将数据解析为json对象
  console.log(temp);
  const data2 = temp.list


  data2.forEach(item => {
    gdetail.push(item["product"])

  })





  console.log(data2);
}


// 拼接两个文件的json数据 ,同类型的

function content(fileURl) {
  const data1 = fs.readFileSync(fileURl[0], 'utf8');
  const data2 = fs.readFileSync(fileURl[1], 'utf8');

  const temp = JSON.parse(data1).concat(JSON.parse(data2))

  fs.writeFileSync("./datas/完全商品详情数据.json", JSON.stringify(temp), function (err) {
    if (!err) {
      console.log("文件写入完毕");
    }
  });

}
// content(["./datas/商品详情数据.json", "./datas/商品详情数据补加.json"])

// detailMobileHtml  手机端详情页面

function getDetailMobile(fileURl) {
  const data1 = fs.readFileSync(fileURl, 'utf8');
  const tmp = []
  JSON.parse(data1).forEach(item => {
    tmp.push({
      "user_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOjE4NTcxMzUxNDM4LCJwYXNzd29yZCI6IjI0MTI0IiwiYXZhdG9yIjoiIiwiaWF0IjoxNjY5Nzg3OTU5LCJleHAiOjE2Njk4MjM5NTl9.zTww1xqmGX3UzOXpuPm6-G9DyGNXHh8a6OMTejSIvRI",
      "user_tel": 18571351438,
      "productSn": item.productSn,
      "name": item.name,
      "productId": item.id,
      "subTitle": item.subTitle,
      "pro_num": 1,
      "price": item.price,
      "pic": item.pic,
     
  })

  })

  fs.writeFileSync("./datas/购物车数据.json", JSON.stringify(tmp), function (err) {
    if (!err) {
      console.log("文件写入完毕");
    }
  });
}
getDetailMobile("./datas/完全商品详情数据.json")

// content
// 获取content
function getContent(fileURl) {

  const data1 = fs.readFileSync(fileURl, 'utf8');
  const tmp = JSON.parse(data1).content


  fs.writeFileSync("./datas/详情页可能轮播图.json", JSON.stringify(JSON.parse(tmp)), function (err) {
    if (!err) {
      console.log("文件写入完毕");
    }
  });

}
// getContent("./flyco/详情页轮播图.json")

// fs.writeFileSync("./datas/商品详情数据补加.json", JSON.stringify(gdetail), function (err) {
//   if (!err) {
//     console.log("文件写入完毕");
//   }
// });