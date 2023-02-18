const https = require("https");
const fs = require("fs");
const cheerio = require("cheerio");
// const { each } = require("cheerio/lib/api/traversing");


// 数据数组
let data = [];
let num = 0
const get_data = function (url, handler = '') {

  var houseInfo_card1 = []
  // url要爬取网站的地址
  https.get(url, function (res) {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
    // 分段返回的 自己拼接
    let html = "";
    if (res.statusCode != 200) {
      console.log("Error")
      return false
    }

    // 有数据产生的时候 拼接
    res.on("data", function (chunk) {
      // console.log(chunk.toString())
      html += chunk;
    });

    // 拼接完成
    res.on("end", function () {


      fs.writeFileSync(`./house/武汉自如首页${num}.html`, html, function (err) {
        if (!err) {
          console.log("文件写入完毕");
        }
      });
      const $ = cheerio.load(html);
      // console.log(Object.prototype.toString.call(handler))
      if (Object.prototype.toString.call(handler) === '[object Function]') {


        handler(html)
        return false
      }

      $('div[class="Z_list-box"]').each(function (i, val) {

        // console.log(num++)
        // console.log(i, val);
        // console.log($(val).html());
        // console.log($('[class="item"]',this))



        $('[class="item"]', this).map(function (i, val) {


          // console.log($(val).html())
          var obj = {
            href: $('a[class="pic-wrap"]', val).attr('href'),
            image_path: $('img[class="lazy"]', val).attr('src'),
            alt: $('img[class="lazy"]', val).attr('alt'),
            price: `${Math.floor(Math.random() * (4000 - 800) + 800)} /月`,
            tags: (
              function () {
                let arr = []
                $('[class="tag"]>span', val).each(function (i, elem) {


                  arr.push($(elem).text())
                })

                return arr
              }
            )(),
            location: $('div[class="location"]', val).text().trim(),
            des: $('div[class="desc"]>div:first-child', val).text().trim(),
            area: $('div[class="desc"]>div:first-child', val).text().trim().split('|')[0],
            title:$(' div.info-box > h5 > a',val).text().trim()



          }
          obj.href = 'https:' + $('a[class="pic-wrap"]', val).attr('href')

          // console.log(obj)
          houseInfo_card1.push(obj)

        })


      })
      // console.log(houseInfo_card1.length)
       fs.writeFileSync(`./house/houseInfo_card3.json`,JSON.stringify(houseInfo_card1) , function (err) {
        if (!err) {
          console.log("文件写入完毕");
        }
      });

    });


  });

};


exports.HttpRequest = get_data
// url地址
let url = "https://wh.ziroom.com/z/";




//获取房源列表卡片的信息
// function getHouseCard1

get_data(url)



