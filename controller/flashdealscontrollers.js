import flashmodel from "../models/flashmodels.js"

const addflashproduct = async (req,res) =>{
    try {
            bestseller
            bestseller
            const {name,rate,price,category,subcategory,size,description,bestseller
        } = req.body

        const image1 = req.body.files.image1 && req.files.image1[0]
        const image2 = req.body.files.image1 && req.files.image2[0]
        const image3 = req.body.files.image1 && req.files.image3[0]
        const image4 = req.body.files.image1 && req.files.image4[0]
        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

        let imageurl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image", 
                     background_removal: "cloudinary_ai"
                     })
                return result.secure_url
            })
        )

        const flastproduct = {
            name,
            price:Number(price),
            description,
            rate,
            category,
            subcategory,
            size:JSON.parse(size),
            image:imageurl,
            bestseller:bestseller ==="true"? true:false,
            date:Date.now()


        }
        const flastproductsdetailsv= new flashmodel(flastproduct)

        await flastproductsdetailsv.save({succes:true, message:"flash product added succesfully"})
    } catch (error) {

        console.log(error)
    
        
    }
}
const singleflashproduct = async (req,res) =>{
    try {
        const {flashid} = req.body
          const singproducts = await flashmodel.findById(flashid)
          res.status(500).json({succes:true,singproducts})
        
    } catch (error) {
        
    }
}
const removeflashproduct = async (req,res) =>{
    try {
        await flashmodel.findIdAndDelete(req.body.id)
        res.json({success:true,message:"categort Deleted"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });

    }
}

const listflashproduct = async (req,res) =>{
    try {
        const listflash = await flashmodel.find()
        res.status(200).json({succes:true, listflash})
        
    } catch (error) {
        console.error(error);

        res.status(500).json({ success: false, message: error.message });
   
        
    }
}

export {addflashproduct,removeflashproduct,listflashproduct,singleflashproduct}