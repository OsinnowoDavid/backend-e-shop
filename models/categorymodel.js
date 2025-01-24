import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type:String, require:true},
    description:{type:String, require:true},
    price:{type:Number, require:true},
    image:{type:Array, require:true},
    category:{type:String, require:true},
    subcategory:{type:String, require:true},
    sizes:{type:Array, require:true},
    bestseller:{type:Boolean, require:true},
    date:{type:Number, require:true},
})

const catecorymodel = mongoose.model.categoryDate || mongoose.model("categoryDate" ,categorySchema)
export default catecorymodel