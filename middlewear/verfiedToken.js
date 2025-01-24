import jwt from "jsonwebtoken"

export const  verfiedtoken = (req,res,next) =>{


    const token = req.cookies.token
    if (!token)return res.status(401).json({success:false,message:"unauthorized"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({success:false, message:"unauthorized - invalid token"})
            
        }
        req.userid = decoded.userid
    next()
        
    } catch (error) {
        console.log (error)
        return res.status(500).json({success:false, message:"server error"})
        
    }

}