const https = require("https");
const fs = require("fs");
const cheerio = require("cheerio");
// const params = {
//   appid: "jsapi_v3",
//   logid: "pv",
//   key: "NDEBZ-JVUWP-DZ3DM-VMIUQ-276MO-PXB4H",
//   v: "1.3.0.0",
//   lt: "34017632",
//   d: "m.flyco.com",
//   dpr: 3.000000118046273,
//   lss: 1,
//   gls: 1,
//   ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
//   dt: "Windows",
//   dvn: "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU Direct3D11 vs_5_0 ps_5_0, D3D11)",
//   random: "lb3izxz9",
// };
// url地址
// 数据数组
let data = [];
const get_data = function (url) {
 
  // url要爬取网站的地址
  https.get(url ,function (res) {
    // 分段返回的 自己拼接
    let html = "";
    // 有数据产生的时候 拼接
    res.on("data", function (chunk) {
      html += chunk;
    });
    // 拼接完成
    res.on("end", function () {
      console.log(html);
    
    //  return data;
    });
    // return data;
    console.log(data);
    // console.log(Object.prototype.toString.call(test),"test");
  });
 
};
let url = "https://m.lianjia.com/chuzu/wh/zufang/WH1706605334535077888.html";

// let url1 = "https://m.flyco.com/b2c/comment/0-0/commentList/FR5251?pageNum=1&pageSize=7"
let url2 = "https://m.flyco.com/b2c/init/0-0/init?token=1770984780c2408daa6b0bbc999ecadet4ux4nylaq"


let url3 ="https://pr.map.qq.com/pingd?appid=jsapi_v3&logid=pv&key=NDEBZ-JVUWP-DZ3DM-VMIUQ-276MO-PXB4H&v=1.3.0.0&lt=36005727&d=m.flyco.com&dpr=3.000000118046273&lss=1&gls=1&ua=Mozilla/5.0%20(iPhone;%20CPU%20iPhone%20OS%2013_2_3%20like%20Mac%20OS%20X)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.3%20Mobile/15E148%20Safari/604.1&dt=Windows&dvn=ANGLE%20(NVIDIA,%20NVIDIA%20GeForce%20RTX%203060%20Laptop%20GPU%20Direct3D11%20vs_5_0%20ps_5_0,%20D3D11)&random=lb3k6jzx"
get_data(url2)

// fs.writeFileSync("./test4.json", JSON.stringify(data), function (err) {
//       if (!err) {
//         console.log("文件写入完毕");
//       }
//     });
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
  


