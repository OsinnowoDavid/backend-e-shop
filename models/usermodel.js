import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String ,Require:true},
    email:{type:String, require:true,unique:true},
    password:{type:String,require:true},
    lastlogindate:{type:Date,default:Date.now},
    resetpasswordToken :String,
    resetpasswordexpireAT: Date,
    verificationToken:String,
    verificationexpireat:Date,
    cartdata:{type:Object,default:{}}

} ,{timestamps:true},{minimize:false})

const userModel = mongoose.model.user || mongoose.model("user",userSchema)

export default userModel