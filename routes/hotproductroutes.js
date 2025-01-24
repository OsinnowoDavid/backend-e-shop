import express from "express"
import { singlehotproducts,listhotproduct,addhotproducts,removehotproduct } from "../controller/hotdealscontroller.js"
import upload from "../middlewear/multer.js"
const hotproductroutes = express.Router()

hotproductroutes.post ("/addhotproduct",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addhotproducts)
hotproductroutes.get("/listhotproducts",listhotproduct)
hotproductroutes.get("/singlehotproducts/:id",singlehotproducts)
hotproductroutes.post("/removehotproducts",removehotproduct)

export default hotproductroutes