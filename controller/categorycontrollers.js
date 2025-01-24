import catecorymodel from "../models/categorymodel.js"
import productmodel from "../models/productmodel.js"

const addcategory = async (req,res) =>{

    try {

        const{name,price,rate,category ,subcategory,size,description} = req.body

        const image2 = req.files.image2 && req.files.image1[0]
        const image1 = req.files.image1 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        

        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)
 let imageurl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image", 
                     background_removal: "cloudinary_ai"
                     })
                return result.secure_url
            })
        )

        const productdate = {
            name,
            price:Number(price),
            description,
            rate,
            category,
            subcategory,
            size: JSON.parse(size),
            image:imageurl,
    bestseller:bestseller === "true"? true:false,
    date:Date.now()

        }

        const categorydetails = new catecorymodel(productdate)

        await categorydetails.save({succes:true, message:"category save succesfully"}) 

    } catch (error) {
        
    }

}

const listcategory = async (req,res)=>{
    try {
        const categoryproduct = await catecorymodel.find()
        res.status(200).json({succes:true, categoryproduct})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
        
    }
}
const singlecategory = async () => {
    try {
        const {categoryid} = req.body
        const singleproduct= await catecorymodel.findById(categoryid)
        res.json({succes:true,singleproduct})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });

    }
}

 const remvecategory = async (req,res) =>{
    try {
        await productmodel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"categort Deleted"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });

        
    }
 }

export {addcategory,listcategory,singlecategory,remvecategory}