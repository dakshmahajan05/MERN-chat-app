import jwt from 'jsonwebtoken'


//middleware to protect route 
import User from "../models/user.model.js"

export const protectRoute = async(req,res,next)=>{
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user  = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.json({message:"cant find the user",sucess:false})
        }

        req.user = user;
        next();


    } catch (error) {
        console.log(error.message);
        return res.json({sucess:false,message:error.message})
    }
}