
const fs = require('fs');
const { HttpRequest } = require('./test')
const cheerio = require("cheerio");
const data = JSON.parse(fs.readFileSync('./house/houseInfo_card3.json', 'utf-8'))
// console.log(data)
// 租房类型E
const ExamStatus = [
    {
        code: 1001,
        value: "整租"
    },
    {
        code: 1002,
        value: "合租"
    },

    {
        code: 1003,
        value: "二手房"
    },

]

console.log(data)

GetHouseInfo(data)
function GetHouseInfo(data) {
    let houseUrls = []
    data.forEach((item) => {
        for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
                if (key === 'href') {
                    houseUrls.push(item[key])
                }


            }
        }

    })
    var houseinfo = []
    houseUrls.forEach((url, index) => {
        let Info = {
            house_id: '',
            user_id: '',
            city_id: '',
            address: data[index].location,
            create_time: Date.now(),
            lease_state: false,
            deleted_state: false,
            image_path: data[index].image_path,
            price: data[index].price,
            house_description: '',
            house_category: '',
            exam_status: '',
            area: data[index].area,
            decoration_condition: '',
            swiper_pic: [],
            swiper_BigPic: [],
            video: '',
            location_content: '',
            rental_category: ''
        }
        //提取房屋ID
        extractHouseId(url, Info, data[index]);

        HttpRequest(url, (html) => {
            const $ = cheerio.load(html);
            //提取地址信息
            extractLocationContent($, Info);
            //提取房源轮播图信息
            extractSwiperPic($, Info, data[index]);
            // fs.writeFileSync(`./house/houseInfo_card2.json`, JSON.stringify(data), function (err) {
            //     if (!err) {
            //         console.log("文件写入完毕");
            //     }
            // });
            extractSwiperBigPic($, Info);
            //提取房源视频
            extractVideo($, Info);
            //提取房源介绍
            extractHouseDescription($, Info);
            //提取房源设备信息
            extractFacilities($, Info);
            //提取租约信息
            extractRentInfo($, Info);
            //提取房源其它详情信息
            extractHouseDetail($, Info);
            //提取室友信息
            extractRoommateInfo($, Info);
            //提取房东(用户)信息
            extractLandlordInfo($, Info);
            houseinfo.push(Info);
            fs.writeFileSync(`./house/houseInfoup3.json`, JSON.stringify(houseinfo), function (err) {
                if (!err) {
                    console.log("文件写入完毕");
                }
            });

        });

    });


    return houseinfo;
}


function extractHouseId(url, Info, data) {
    let numbers = url?.match(/\d+/g);
    console.log(numbers)
    Info.house_id = numbers[0];
    Info.city_id = "4201";
    data.house_id = numbers[0]


}

function extractLocationContent($, Info) {
    Info.location_content = getCityName($('meta[name="location"]').attr('content'));
}

function extractSwiperPic($, Info, data) {
    let swiper_pic = [];
    $('#Z_swiper_box > div.Z_swiper_thumb > ul > li').map((i, val) => {
        let imgSrc = "";
        if ($('img', val).attr('src').startsWith('https:')) {
            imgSrc = $('img', val).attr('src');
        } else {
            imgSrc = 'https:' + $('img', val).attr('src');
        }
        swiper_pic.push(imgSrc);
    });
    Info.swiper_pic = swiper_pic;
    data.swiper_pic = swiper_pic;
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            Info[key] = data[key];
            if (key == 'title') {
                Info[key] = data[key];
                Info.exam_status = data[key].split('·')[0]
            }
        }
    }
}
function extractSwiperBigPic($, Info) {
    let swiper_BigPic = [];
    $('#Z_swiper_box>.Z_sliders>ul>li[class="Z_slider"]').map((i, val) => {
        let imgSrc = "";
        if ($('img', val).attr('src').startsWith('https:')) {
            imgSrc = $('img', val).attr('src');
        } else {
            imgSrc = 'https:' + $('img', val).attr('src');
        }
        swiper_BigPic.push(imgSrc);
    });
    Info.swiper_BigPic = swiper_BigPic;
}

function extractVideo($, Info) {
    let video = $('li[data-type="video"]').attr('data-videosrc')
    if (!video) {
        video = '';
    }
    Info.video = video;
}

function extractHouseDescription($, Info) {
    Info.house_description = $('div[class="Z_rent_desc"]').text().trim()
}

//房源设备
function extractFacilities($, Info) {
    let facilities = { title: '房屋设施', data: [] }
    $('#homedesc > div.Z_info_icons > dl').map(function (i, elem) {
        // console.log($(elem).html())
        facilities.data.push({
            name: $('dt', elem).text().trim(),
            icon: $('dd>i', elem).attr('class').split(' ')[1]
        })
        // console.log(facilities)
    })
    Info.facilities = facilities
}

function extractRentInfo($, Info) {
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
}
//房源详情
function extractHouseDetail($, Info) {
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
}


function extractLandlordInfo($, Info) {
    let Homeowner_info = {
        user_id: $('div[class="Z_keeper_img"]>img').attr('src')?.match(/\/([0-9]+)\.png/)[1],
        house_name: $('div[class="Z_order"]>h5').text().trim(),
        username: $('div[class="Z_order"] p[class="n"]').text().trim(),
        phone: $('div[class="Z_order"] p[class="t"]').text().trim(),
        pic: $('div[class="Z_order"] div[class="Z_keeper_img"]>img').attr('src')

    }
    if (Homeowner_info.user_id == null) {
        Info.lease_state = '已出租'
    }
    Info.user_id = Homeowner_info.user_id

    Info.Homeowner_info = Homeowner_info

}

function extractRoommateInfo($, Info) {
    let Roommate_Info = {
        title: $('#meetinfo>h2').text().trim(),
        data: []
    }
    $('div[class="Z_info_body"]>ul[class="rent_list clearfix"]>li').each(function (i, elem) {


        if ($(elem).attr('class') === 'rent') {
            Roommate_Info.data.push({
                qibla: $('div.info > p.person.mt10 > span:nth-child(3)', elem).text().trim(),
                area: $(' div.info > p.person.mt10 > span:first-child', elem).text().trim(),
                pic: 'https:' + $('div[class="headimg"]>img', elem).attr('src'),
                housename: $('span[class="housename"]', elem).text().trim()

            })
        } else {
            Roommate_Info.data.push({
                time: $('span[class="time"]', elem).text().trim(),
                sex: $(' div.info > p.person.mt10 > span:nth-child(1)', elem).text().trim(),
                star_sign: $('div.info > p.person.mt10 > span:nth-of-type(2)', elem).text().trim(),
                work: $('div.info > p.person.mt10 > span:nth-of-type(3)', elem).text().trim(),
                pic: 'https:' + $('div[class="headimg"]>img', elem).attr('src'),
                housename: $('span[class="housename"]', elem).text().trim()

            })
        }

    })
    console.log(Roommate_Info)
    Info.Roommate_Info = Roommate_Info

}

function getCityName(str) {
    // 使用正则表达式提取出 city=XXX 中的城市名
    const cityReg = /city=([^;]+)/;
    const match = str.match(cityReg);
    console.log(match);
    if (match) {
        // 如果正则表达式匹配成功，返回匹配到的第二个括号中的内容
        return match[1];
    } else {
        // 如果匹配失败，返回空字符串或 null
        return "";
    }
}