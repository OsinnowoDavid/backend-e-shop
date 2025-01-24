import userModel from "../models/usermodel.js"

// add product to user cart 
const addtocart = async (req,res) =>{

    try {
        const {userId, itemId,size} = req.body
        const userdata = await userModel.findById(userId)
        let cartdate = await userdata.cartdate
        if (cartdate[itemId]) {
            if (cartdate[itemId][size]) {
                cartdate[itemId][size] +=1
                
            }
            else{
                cartdate[item][size]=1
            }
        } else{
            cartdate[itemId] ={}
            cartdate[itemId][size]=1
        }
        
        await userModel.findByIdAndUpdate(userId,{cartdate})
        res.json({success:true,message:"added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}   )

        
    }
    
}


const getusercartdata = async (req,res) =>{
    if (condition) {
        
    }
}

const updateproductscart = async (req,res) =>{

    // try {
    // const {userId,itemId,size,quantity} = req.body
    //     const userdata = await userModel.findById(userId)
    //     let cartdate = await userdata.cartdate

    //     cartdate[item][sixe] = quantity
    //     await userModel.findByIdAndUpdate(userId,{cartdate})

    // } catch (error) {
        
    // }
    if (condition) {
        
    }
}

export {addtocart,updateproductscart,getusercartdata}