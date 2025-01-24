import expres from "express"

import { addproduct,listproduct,singleproduct,removeproduct ,updateproduct} from "../controller/productcontroller.js"
import upload from "../middlewear/multer.js"
import adminauth from "../middlewear/adminauth.js"
const productrouter= expres.Router()

productrouter.post("/add",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addproduct)
productrouter.delete("/remove/:id",removeproduct)
productrouter.get("/list",listproduct) 
productrouter.get("/single/:id",singleproduct)
productrouter.put("/update/:id",upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),updateproduct)

export default productrouter