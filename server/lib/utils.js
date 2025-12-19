import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//function to generate token

export const genToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET)
    return token
}