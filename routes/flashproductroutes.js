import express from "express"
import { addflashproduct,removeflashproduct,listflashproduct,singleflashproduct } from "../controller/flashdealscontrollers.js"
import upload from "../middlewear/multer.js"
const flashproductroute= express.Router()

flashproductroute.post("/addflashproduct",upload.fields([{name:"image1",maxcount:1},{name:"image2",maxcount:1}, {name:"image3",maxcount:1},{namw:"image4",maxcount:4}]),addflashproduct)
flashproductroute.get("/getflashproduct",listflashproduct)
flashproductroute.post("/api/flashproduct",removeflashproduct)
flashproductroute.post("/singleflashproduct",singleflashproduct)

export default flashproductroute