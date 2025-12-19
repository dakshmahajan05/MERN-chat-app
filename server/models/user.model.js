import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email:{
        unique:true,
        reuired:true,
        type:String
    },
    fullName:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:''
    },
    bio:{
        type:String
    }

},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User;