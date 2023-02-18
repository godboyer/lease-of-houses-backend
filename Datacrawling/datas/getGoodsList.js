const fs = require('fs')


const data1 = fs.readFileSync("./goodsList.json", 'utf8');

const temp = JSON.parse(data1)

fs.writeFileSync("./GoodsList.json", JSON.stringify(Object.values(temp)), function (err) {
  if (!err) {
    console.log("文件写入完毕");
  }
});