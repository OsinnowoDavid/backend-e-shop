import {v2 as cloudinary} from "cloudinary"

import hotmodels from "../models/hotmodels.js"

const listhotproduct = async (req,res) => {
    try {
        const hotproducts = await hotmodels.find()
        res.status(200).json({succes:true,hotproducts})
    } catch (error) {
        console.log(error)
        res.status(500).json({succes:false, message:"error"})
    }
}

const addhotproducts = async (req,res) =>{
    try {
        const {name,description,rate,category,subcategory,price,bestseller}= req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const  images = [image1,image2,image3,image4].filter((item) => item !== undefined)


        let imageurl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image", 
                     background_removal: "cloudinary_ai"
                     })
                return result.secure_url
            })
        )
        const hotproductdetails = {
            name,
            description,
            category,
            subcategory,
            price:Number(price),
            bestseller:bestseller === "true"? true:false,
            // size:JSON.parse(size),
            rate,
            image:imageurl,
            date:Date.now()
        }

        const hotdetail = new hotmodels(hotproductdetails)
        await hotdetail.save({success:true,message:"product saved"})
    } catch (error) {
        
        console.log(error)
        res.json({succes:false, message:error.message})
        
    }
}

const removehotproduct = async (req,res)=> {
    const id = req.params.is
    try {

        const removehot = await hotmodels.findByIdAndDelete(id)
        res.json({succes:true,message:"hot product removed"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({sucess:false,message:"error "})
        
    }
}

const singlehotproducts = async (req,res)=>{
    try {
        const id = req.params.id;
        const product = await hotmodels.findById(id); // Corrected this line
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export{listhotproduct,addhotproducts,removehotproduct,singlehotproducts}