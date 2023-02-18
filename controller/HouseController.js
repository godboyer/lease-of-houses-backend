const HouseInfoModel = require("../model/HouseInfoModel");
const HouseLeaseModel = require("../model/HouseLeaseModel");
const CityClassModel = require("../model/CityClassModel");
const HouseEvalModel = require("../model/HouseEvalModel");
const LeaveWordModel = require("../model/LeaveWordModel");
const NoticeModel = require("../model/NoticeModel");
const HouseCardModel = require("../model/HouseCardModel");
const { encrypto } = require("../utils/crypto");

const fs = require("fs");
class HouseController {
  //添加房屋信息
  async AddHouse(req, res) {
    const newHouseInfo = req.body;
    try {
      const addedHouseInfo = await HouseInfoModel.Create(newHouseInfo);
      if (addedHouseInfo) {
        crypted = encrypto(JSON.stringify(addedHouseInfo));
      }
      res.send({
        code: 200,
        msg: "添加房屋信息成功",
        data: addedHouseInfo,
      });
    } catch (error) {
      res.send({
        code: 500,
        msg: "添加房屋信息失败",
        data: error,
      });
    }
  }
  //修改房屋信息
  async UpHouseInfo(req, res) {
    const updatedHouseInfo = req.body;
    const id = updatedHouseInfo._id;
    try {
      const result = await HouseInfoModel.UpdateOneById(id, updatedHouseInfo);
      if (result) {
        crypted = encrypto(JSON.stringify(result));
      }
      res.send({
        code: 200,
        msg: "修改房屋信息成功",
        data: result,
      });
    } catch (error) {
      res.send({
        code: 500,
        msg: "修改房屋信息失败",
        data: error,
      });
    }
  }

  //删除房屋信息
  async DelHouseInfo(req, res) {
    const houseId = req.params.id;
    try {
      const result = await HouseInfoModel.DeleteOneById(houseId);
      if (result) {
        crypted = encrypto(JSON.stringify(result));
      }
      res.send({
        code: 200,
        msg: "删除房屋信息成功",
        data: result,
      });
    } catch (error) {
      res.send({
        code: 500,
        msg: "删除房屋信息失败",
        data: error,
      });
    }
  }

  // 获取房屋信息
  //所有
  async GetHouseInfoAll(req, res) {
    let crypted = null;

    let data = await HouseInfoModel.FindMany();
    if (data) {
      crypted = encrypto(JSON.stringify(data));
    }
    res.send({
      code: 200,
      msg: "获取成功",
      data,
    });
  }
  // 分页获取房源信息
  async GetHouseInfoPage(req, res) {
    console.log(req.query);
    if (JSON.stringify(req.query) == "{}") {
      res.send({
        code: 300,
        msg: "参数错误",
      });

      return false;
    }
    let config = {
      query: {}, // 条件
      field: {}, // 显示的字段
      limit: req.query.pageSize,
      sort: {},
      skip: (req.query.page - 1) * req.query.pageSize,
    };
    let result = await HouseInfoModel.PagedQuery(config);
    if (result) {
      res.send({
        code: 200,
        msg: "获取成功",
        data: result,
        total: result.length,
      });
    }

    console.log(req.query);
    return true;
  }

  //获取一个房源信息
  async GetHouseInfoOne(req, res) {
    console.log(req.params);
    const houseId = req.params.id;
    let crypted = null;
    let data = await HouseInfoModel.FindOne(houseId);
    if (data) {
      crypted = encrypto(JSON.stringify(data));
    }
    console.log(data);
    res.send({
      code: 200,
      msg: "获取成功",
      data: data,
    });
  }

  async GetCardsInfo(req, res) {
    try {
      let result = await HouseInfoModel.FindMany();

      // console.log(cardsData)

      if (result && result.length > 0) {
        let cardsData = result.map((card) => {
          let payload = {
            href: card.href,
            image_path: card.image_path,
            alt: card.alt,
            price: card.price,
            tags: card.tags,
            location: card.location,
            des: card.des.split("|")[1],
            area: card.area,
            title: card.title,
            house_id: card.house_id,
            swiper_pic: card.swiper_pic,
            Homeowner_info: card.Homeowner_info,
          };

          return payload;
        });
        res.send({
          code: 200,
          msg: "获取成功",
          data: cardsData,
        });
      }
    } catch (error) {
      res.send({
        code: 500,
        msg: "获取失败",
        data: error,
      });
    }
  }

  //卡片分页获取
  async GetCardsInfoPage(req, res) {
    if (req.query === "{}") {
      res.send({
        code: 300,
        msg: "参数错误",
      });

      return false;
    }
    console.log("query=>在这");
    let config = {
      query: {}, // 条件
      field: {}, // 显示的字段
      limit: req.query.pageSize,
      sort: {},
      skip: (req.query.page - 1) * req.query.pageSize,
    };
    let result = await HouseInfoModel.PagedQuery(config);
    if (result && result.length > 0) {
      let cardsData = result.map((card) => {
        let payload = {
          href: card.href,
          image_path: card.image_path,
          alt: card.alt,
          price: card.price,
          tags: card.tags,
          location: card.location,
          des: card.des.split("|")[1],
          area: card.area,
          title: card.title,
          house_id: card.house_id,
          swiper_pic: card.swiper_pic,
          Homeowner_info: card.Homeowner_info,
        };

        return payload;
      });
      res.send({
        code: 200,
        msg: "获取成功",
        data: cardsData,
        total: result.length,
      });
    } else {
      res.send({
        code: 500,
        msg: "获取失败",
      });
    }

    console.log(req.query);
    return true;
  }

  //获取分页相关信息
  async GetPageingInfo(req, res) {
    if (req.query === "{}") {
      res.send({
        code: 300,
        msg: "参数错误",
      });

      return false;
    }
    try {
      let result = await HouseInfoModel.FindMany();
      if (result && result.length > 0) {
        res.send({
          code: 200,
          msg: "获取成功",
          data: {
            totalPage: result.length,
            pageCount: Math.ceil(result.length / req.query.pageSize)
          },

        });


      }
    } catch (error) {
      res.send({
        code: 500,
        msg: "获取失败",
        data: error,
      });
    }
  }
}

//导出的是实例对象
module.exports = new HouseController();
