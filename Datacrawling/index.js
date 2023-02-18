const https = require("https");
const fs = require("fs");
const cheerio = require("cheerio");

// url地址
// 数据数组
let data = [];
const get_data = function (url) {
 
  // url要爬取网站的地址
  https.get(url,async function (res) {
    // 分段返回的 自己拼接
    let html = "";
    // 有数据产生的时候 拼接
    res.on("data", function (chunk) {
      html += chunk;
    });
    // 拼接完成
   let test =  await res.on("end", function () {
      // console.log(html);
      const $ = cheerio.load(html);
      let allFilms = [];
      $('div[class="list__wrapper"]>div').each(function (item) {
        // console.log(item, "item");
        // 小区名称
        const title = $(".content__item__title", this).text().trim();
        // 房屋信息
        const houseInfo = $(".content__item__content", this).text().trim().replace(/\s+/g, "");;
        // 图片
        const picLink = $(".content__item__aside",this).attr("data-src");

       
        // 标签
        const tag = [];

        $(".content__item__tag--wrapper>i", this).each((i, val) => {
          tag.push($(val).text())
        })


        // 租金
        const Price = $(".content__item__bottom", this)
          .text()
          .trim()
          .replace(/\s+/g, "");
        // console.log(title, houseInfo, Price, tag);
        data.push({ title, houseInfo, Price, tag, picLink });
      });
      // console.log($('div[class="list__wrapper"]'));
      console.log(data);
    //  return data;
    });
    // return data;
    // console.log(data);
    // console.log(Object.prototype.toString.call(test),"test");
  });
 
};
let url = "https://m.lianjia.com/chuzu/wh/zufang/WH1706605334535077888.html";
get_data(url)

fs.writeFileSync("./test4.json", JSON.stringify(data), function (err) {
      if (!err) {
        console.log("文件写入完毕");
      }
    });
// let k = 1
// let timer = setInterval( async ()=>{
//   let url = "https://m.lianjia.com/chuzu/wh/zufang/WH1706605334535077888.html" + k;
 
//   await get_data(url)
//   console.log("data:", data);
//   k++
//   fs.writeFileSync("./test1.json", JSON.stringify(data), function (err) {
//     if (!err) {
//       console.log("文件写入完毕");
//     }
//   });
// },1000)
 
// if(k === 5){
//   console.log("object");
//   clearInterval(timer)
 

// }
  


