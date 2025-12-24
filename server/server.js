import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import { Server } from 'socket.io'



//creating express app and http server
const app = express()
const server = http.createServer(app)

//initializing socket.io setrver 

export const io= new Server(server,{
    cors:{origin:"*"}
})

//store online users in an object 
export const userSocketMap = {} //{userId : socketId}

//socket.io connnection handler 
io.on("connection",(socket)=>{

    const userId = socket.handshake.query.userId;
    console.log("user connected: ",userId);


    //mapping user ids to socket ids
    if(userId) userSocketMap[userId]= socket.id


    //emit online users to all connected clients 
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("user disconnected",userId);
        delete userSocketMap[userId];

        io.emit("getOnlineUsers",Object.keys(userSocketMap))
        
    })
    
})




//middleware 
app.use(express.json({limit:"4mb"}))
app.use(cors({
origin:"*"
}))
app.use("/api/status",(req,res)=>{
    res.send("server working")
})

//connect to mongodb
await connectDB();

//user route setup
app.use('/api/auth',userRouter)
app.use('/api/messages',messageRouter)


if(process.env.NODE_ENV!=='production'){
    const port =process.env.PORT || 3000
    
    server.listen(port,()=>{
        console.log("server is running on port: " + port);  
    })
}
//exporting for vercel
export default server;
