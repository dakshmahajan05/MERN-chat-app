
import Message from "../models/message.model.js";



// get all users  accept the logged in user ....with no. of messages they sent..
export const getUserForSidebar = async(req,res)=>{
    try {
        const userId= req.user._id;


        //filtering users accept the one who is logged in
        const filteredUsers = await User.find({_id :{$ne:userId}}).select("-password")

        
        //count number of messages not seen
        const unseenMessages = {}
        //making poromise for each user  
        const promises = filteredUsers.map(async(user)=>{
            // the sender's id is of filtered users,who are mapped, and the receiver's id is the one who is logged in 
            const messages =await Message.find({senderId:user._id,receiverId:userId,seen:false})

            if(messages.length>0){
                unseenMessages[user._id]=messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteredUsers,unseenMessages})



    } catch (error) {
        console.log(error.messages);
        res.json({success:false,messages:error.messages})
        
    }
}


//get alll messages of selected User

export const getMessages = async(req,res)=>{
    try {
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:selectedUserId},
                {senderId:selectedUserId,receiverId:myId}
            ]
            })
               await Message.updateMany({senderId:selectedUserId,receiverId:myId},{seen:true});
               res.json({success:true,messages})
    } catch (error) {
        console.log(error.messages);
        res.json({messages:error.messages,success:false})
        
    }
}


//api to mark message as seen using message _id

export const markMesaageSeen = async()=>{
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{seen:true});
        res.json({success:true})
    } catch (error) {
          console.log(error.messages);
        res.json({messages:error.messages,success:false})
    }
}
