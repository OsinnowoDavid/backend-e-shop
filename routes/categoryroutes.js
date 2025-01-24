import express from "express";
import upload from "../middlewear/multer.js"

import {addcategory,listcategory,remvecategory,singlecategory} from "../controller/categorycontrollers.js"

const categoryrouter= express.Router()



categoryrouter.get("/getcactegory",listcategory)
categoryrouter.post("/addcategory", upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1} ]),addcategory)
categoryrouter.post("/removecategory",remvecategory)
categoryrouter.post("/singlecategory",singlecategory)


export default categoryrouter