const fs = require('fs');
const { HttpRequest } = require('./test')
const cheerio = require("cheerio");
const data = JSON.parse(fs.readFileSync('./house/houseInfo_card1.json', 'utf-8'))
// console.log(data)

let houseUrl = []
data.forEach((item) => {
    for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
            if (key === 'href') {
                houseUrl.push(item[key])
            }


        }
    }

})




GetHouseInfo(houseUrl)
//获取房屋详情信息
function GetHouseInfo(houseUrl) {

    var houseinfo = []


    houseUrl.forEach((url, index) => {
        let swiper_pic = []
        let swiper_BigPic = []
        let Info = {
            house_id: '',
            user_id: '',
            city_id: '',
            address: '',
            create_time: '',
            lease_state: '',
            deleted_state: '',
            image_path: '',
            price: `${Math.floor(Math.random() * (4000 - 800) + 800)} /月`,
            house_description: '',
            house_category: '',
            exam_status: '',
            area: '',
            decoration_condition: '',
            swiper_pic: [],
            swiper_BigPic: [],
            video: '',
            location_content: ''



        }
        let numbers = url.match(/\d+/g);
        Info.house_id = numbers[0]
        let num = 0
        HttpRequest(url, function (html) {

            //    console.log(html)
            const $ = cheerio.load(html);
            // fs.writeFileSync(`./house/housedetail.html`,html, function (err) {
            //     if (!err) {
            //       console.log("文件写入完毕");
            //     }
            //   });

            console.log($('meta[name="location"]').attr('content'))
            //地址信息
            Info.location_content = $('meta[name="location"]').attr('content')
            //获取轮播小图的src
            $('#Z_swiper_box > div.Z_swiper_thumb > ul > li').map(function (i, val) {
                // console.log('https:'+$('img',val).attr('src'))
                //    console.log(num++)
                let imgSrc = ""
                if ($('img', val).attr('src').startsWith('https:')) {
                    imgSrc = $('img', val).attr('src')
                } else {
                    imgSrc = 'https:' + $('img', val).attr('src')
                }
                swiper_pic.push(imgSrc)

            })
            Info.swiper_pic = swiper_pic

            //获取轮播大图的src
            $('#Z_swiper_box>.Z_sliders>ul>li[class="Z_slider"]').each(function (i, el) {
                let imgSrc = ""
                if ($('img', el).attr('src').startsWith('https:')) {
                    imgSrc = $('img', el).attr('src')
                } else {
                    imgSrc = 'https:' + $('img', el).attr('src')
                }
                swiper_BigPic.push(imgSrc)

                // console.log($(el).html())   

            })
            Info.swiper_BigPic = swiper_BigPic
            // 视频
            let videosrc = $('li[data-type="video"]').attr('data-videosrc')
            Info.video = videosrc
            // console.log(videosrc)
            //房源简介
            Info.house_description = $('div[class="Z_rent_desc"]').text().trim()
            // console.log($('div[class="Z_rent_desc"]').text().trim())
            //房源设备
            let facilities = []
            $('#homedesc > div.Z_info_icons > dl').map(function (i, elem) {
                // console.log($(elem).html())
                facilities.push({
                    name: $('dt', elem).text().trim(),
                    icon: $('dd>i', elem).attr('class').split(' ')[1]
                })
                // console.log(facilities)
            })
            Info.facilities = facilities
            //租约信息
            let rentinfo = { title: '', data: [] }
            rentinfo.title = $('#rentinfo > h2').text().trim()
            $('#rentinfo ul.jiance li').each(function () {
                const label = $(this).find('.info_label').text();
                const value = $(this).find('.info_value').text();
                rentinfo.data.push({
                    label: label.trim(),
                    value: value.trim(),
                })

            });
            Info.rentinfo = rentinfo
            // console.log(rentinfo)
            //房源详情
            let houseDetail = { title: '', data: [] }
            houseDetail.title = "房源详情"
            $('div[class="Z_home_b clearfix"]>dl').map(function (i, elem) {
                const label = $(this).find('dt').text();
                const value = $(this).find('dd').text();
                houseDetail.data.push({
                    label: label.trim(),
                    value: value.trim(),
                })
            })
            $('ul[class="Z_home_o"]>li').each(function () {
                const label = $(this).find('span[class="la"]').text();
                const value = $(this).find('span[class="va"]').text();
                houseDetail.data.push({
                    label: label.trim(),
                    value: value.trim(),
                })

            })
            Info.houseDetail = houseDetail
            console.log(houseDetail)
            //房主卡片
            let Homeowner_info = {
                user_id: $('div[class="Z_keeper_img"]>img').attr('src')?.match(/\/([0-9]+)\.png/),
                house_name: $('div[class="Z_order"]>h5').text().trim(),
                username: $('p[class="n"]').text().trim(),
                phone: $('p[class="t"]').text().trim(),
                pic: $('div[class="Z_keeper_img"]>img').attr('src')

            }
            if (Homeowner_info.user_id == null) {
                Info.lease_state = '已出租'
            }

            Info.Homeowner_info = Homeowner_info

            console.log(Homeowner_info)

            houseinfo.push(Info)
            // console.log(houseinfo)
            fs.writeFileSync(`./house/houseInfo.json`, JSON.stringify(houseinfo), function (err) {
                if (!err) {
                    console.log("文件写入完毕");
                }
            });

        })

        // console.log(Info)

      

    })







}

// console.log(houseUrl)