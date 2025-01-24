import express from "express"
import { getusercartdata,addtocart,updateproductscart } from "../controller/cartcontroller.js"
import authuser from "../middlewear/auth.js"
const cartroute = express.Router()

cartroute.post("/addcart",authuser,addtocart)
cartroute.get("/get",authuser,getusercartdata)
cartroute.put("/updatecart",authuser,updateproductscart)

export default cartroute