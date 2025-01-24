import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Add this import
import userModel from "../models/usermodel.js";
import { generatetokenAndSetToken } from "../utils/genereatTokenAnssetCookie.js"

// const createtoken =(id) =>{
//     return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"3h"} )
//     res.cookie("token" ,createtoken)
// }
// // routes for user login
// const loginuser = async ( req,res) => {
//     try {
//         const {email,password}= req.body

//         const user = await userModel.findOne({email})

//         if (!user) {

//             return res.json({success:false,message:"user does not exit"})
            
//         }
//         const ismatch = await bcrypt.compare(password, user.password)

//         if (!ismatch) {
//             return res.json({success:false, message:"wrong password"})
//         }

//         const token= jwt.sign({name : user.id}, process.env.JWT_SECRET,{expiresIn:"3h"})
//         res.cookie("token", token,{httpOnly:true, maxAge:360000})
//         return res.json({ token, status:true,message:"login successfully"})
//         console.log(token)
//     } catch (error) { 
//         console.log(error)
//         res.json({success:false,message:error.message}   )

//     } 

// } 
// // routes for user registrration
// const registeruser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const exist = await userModel.findOne({ email });

//         if (exist) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Validating email and strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         if (password?.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         // Hashing user's password
//         const salt = await bcrypt.genSalt(10);
    
//         const hashedpassword = await bcrypt.hash(password, salt)
//         const newuser = new userModel({
//             name,
//             email,
//             password: hashedpassword
//         });

//         const user = await newuser.save();

//         // const token = createtoken(user._id);

//         // res.json({ success: true,token});

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };


// // routes for adimn login

const adminelogin = async (req,res) =>{
    try {
        
        const {email,password}  = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            
            res.json({success:true,token})

            
        } else{
            res.json({success:false,message:"not admin"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}   )
        
    }

}

// export {loginuser,registeruser, adminelogin}



const registeruser = async (req,res) =>{
    const {name,email,password} = req.body
    try {
        if(!name|| !email || !password) {
            throw new Error ("All fields are required")
        }

        const userAlreadyexist = await userModel.findOne({email})
        if (userAlreadyexist){
            return res.status(400).json({success:false, message:"user already exist"})
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const verificationToken = Math.floor(100000 + Math.random()* 900000).toString()
        const user = new userModel ({
            email,
            password: hashedpassword,
            name,
            verificationToken,
            verificationexpireat:Date.now() +24 *60 *60 * 1000

        })
        await user.save()

        // jwt
        generatetokenAndSetToken(res,user._id)
        res.status(201).json({
            success:true,
            message:"user created successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
        
    }

}

const loginuser= async (req,res) =>{
    try {

        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if (!user) {
       return res.status(400).json({success:false, message:"invalid credentials"})
        }

        const ispasswordvalid = await bcrypt.compare(password, user.password)

        if (!ispasswordvalid) {
       return res.status(400).json({success:false, message:"wrong password"})

            
        }
        generatetokenAndSetToken(res, user._id)
        user.lastlogindate= new Date(),
        await user.save()
        res.status(201).json({
            success:true,
            message:"logged in successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
        
        
    } catch (error) {
        console.log(error)
    }
    
}

const logout = async (req,res) =>{
    res.clearCookie("token")
    res.status(200).json({success:true,message:"logged out"})
    
}

const checkauths = async (req,res)=>{


try {
    const user = await user.userModel.findById(req.userid).select("-password")
if (!user) {
    return res.status(400).json
({success:false, message:"user not found"})    
}
res.status(200).json({success:true,user:{
    
    ...user._doc,
    password:undefined
}})
} catch (error) {
    
}
}


const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

// 

const verifiedUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Error verifying user:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

 export {loginuser,registeruser, adminelogin , logout, checkauths,verifyToken , verifiedUser}
