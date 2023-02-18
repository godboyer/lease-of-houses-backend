// 所有用户模块相关的路由
const router = require('express').Router()
const houseController = require('../controller/HouseController')

router.post('/add', houseController.AddHouse)
router.get("/getall", houseController.GetHouseInfoAll)
router.get("/getpage",houseController.GetHouseInfoPage)
router.get("/getcardpage",houseController.GetCardsInfoPage)
router.get("/getpageinfo",houseController.GetPageingInfo)
router.get("/get/:id", houseController.GetHouseInfoOne)
router.patch("/update/:id", houseController.UpHouseInfo)
router.delete("/del/:id", houseController.DelHouseInfo)
router.get('/getcards',houseController.GetCardsInfo)
module.exports = router