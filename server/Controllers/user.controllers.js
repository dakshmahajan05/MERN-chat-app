import cloudinary from "../lib/cloudinary.js";
import { genToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

//sign up a new User
export const signup=async(req,res)=>{
    try {
        const {fullName,email,password,bio} = req.body;
        if(!fullName || !email || !password || !bio){
            return res.status(400).json({message:"missing details",success:false})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(401).json({message:"accoubtn already exists",success:false})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)

        const newUser = await new User({
            fullName,email,password:hashPass,bio
        })

        const token = genToken(newUser._id)

        return res.status(200).json({message:"new user register successfull",user:newUser,token:token})

    } catch (error) {
        console.log(error);
        
        return res.json({message:error.message,success:false})

    }
}

//controller for user login\

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user doesn't exist",success:false})
        }

        const ispassCorrect = await bcrypt.compare(password,user.password)
        if(!ispassCorrect){
            return res.status(401).json({message:"incorrect password",success:false})
        }

        const token = genToken(user._id)
        return res.status(200).json({message:"login successfull",success:true})

        
    } catch (error) {
        return res.status(400).json({message:"login faiiled",success:false})
    }
}


//controller to check if user is authenticated or not

export const checkAuth = (req,res)=>{
    res.json({success:true,message:"user verified",user:req.user})
}


//controller tpo update user profile image

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic,bio,fullName} = req.body;
        const userId = req.user._id;

        let updateduser;
        if (!updateProfile){
            await User.findByIdAndUpdate(userId,{bio,fullName},{new:true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updateduser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true})

        }

        res.json({success:true,message:"user profile updated",user:updateduser})

    } catch (error) {
        console.log(error.message);
        return res.json({message:error.message,success:false})
        
    }
}