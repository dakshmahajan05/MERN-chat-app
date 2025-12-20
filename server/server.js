import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'

//creating express app and http server
const app = express()
const server = http.createServer(app)

//middleware 
app.use(express.json({limit:"4mb"}))
app.use(cors({

}))
app.use("/api/status",(req,res)=>{
    res.send("server working")
})

//connect to mongodb
await connectDB();

//user route setup
app.use('/api/user',userRouter)
app.use('/api/messages',messageRouter)

const port =process.env.PORT || 3000
app.listen(port,()=>{
    console.log("server is running on port: " + port);
    
})

