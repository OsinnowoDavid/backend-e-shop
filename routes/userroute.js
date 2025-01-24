import express from "express"
import { loginuser,registeruser,adminelogin,logout,checkauths,verifyToken , verifiedUser} from "../controller/usercontroller.js"
// import { verfiedtoken } from "../middlewear/verfiedToken.js"
import requirequth from "../middlewear/auth.js"
const userrouter= express.Router()

userrouter.post("/register",registeruser)
userrouter.post("/login",loginuser)
userrouter.post("/admin",adminelogin)
userrouter.post("/logout",logout)
userrouter.post("/verified",verifyToken ,verifiedUser)
// userrouter.get("/check-auth",verfiedtoken,checkauths)

export default userrouter