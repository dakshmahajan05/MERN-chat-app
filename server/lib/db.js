import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to Chatty's database!!");
        
    } catch (error) {
        console.log("err while connecting to database",error);
        
    }
}