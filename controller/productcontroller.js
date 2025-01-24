import {v2 as cloudinary} from "cloudinary"
import productmodel from "../models/productmodel.js"
// import Product from '../models/productModel.js';

// function for  add product

const addproduct = async (req,res)=>{
    try {
        const {name,description,price,rate,   }= req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image1[0]
        const image3 = req.files.image3 && req.files.image1[0]
        const image4 = req.files.image4 && req.files.image1[0]

        const  images = [image1,image2,image3,image4].filter((item) => item !== undefined)
        // console.log( name,description,price)
        let imageurl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image", 
                     background_removal: "cloudinary_ai"
                     })
                return result.secure_url
            })
        )
const productdata = {
    name,
    description,
    price:Number(price),
    // bestseller:bestseller === "true"? true:false,
    // size:JSON.parse(size),
    rate,
    image:imageurl,
    date:Date.now()
}
const product = new productmodel(productdata)

await product.save({succes:true,message:"product added"})
res.status(200).json({success:true, message:"add successfully"})
    } catch (error) {
        console.log(error)
        res.json({succes:false, message:error.message})
    }
}
const listproduct = async (req, res) => {
    try {
        // Fetch products with a query timeout of 7000 ms
        const products = await productmodel.find().maxTimeMS(7000);

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);

        res.status(500).json({ success: false, message: error.message });
    }
};



const removeproduct = async (req, res) => {
    const { id } = req.params; // Correctly extract the id parameter
    try {

        const product = await productmodel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const singleproduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productmodel.findById(id); // Corrected this line
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateproduct = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedProduct = await productmodel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                rate: req.body.rate,
                image: req.body.image
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const cartdate = async () => {
    // Your cartdate function implementation here
};

export {addproduct,listproduct,removeproduct,singleproduct,updateproduct,cartdate}