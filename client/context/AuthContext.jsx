
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'


const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL=backendUrl;


export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [token,setToken] = useState(localStorage.getItem("token"))
    const [authUser,setAuthUser] = useState(null)
    const [onlineUsers,setOnlineUsers]= useState([])
    const [socket,setSocket]= useState()

    //check is user is authenticated, set the user data and connect the socket

    const checkAuth = async()=>{
        try {
            const {data} = await axios.get('/api/auth/check')
            if( data.success){
                console.log("TOKEN SENT TO SERVER:", token);
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
const login = async (state, credentials) => {
    try {
        const { data } = await axios.post(`/api/auth/${state}`, credentials);
        console.log("Full Data from Server:", data); 

        if(data.success){
            localStorage.setItem("token", data.token);
            
            axios.defaults.headers.common["token"] = data.token;
            
            setToken(data.token);
            setAuthUser(data.user); 
            if (data.user) {
                connectSocket(data.user);
            }
            toast.success(data.message);
        } else {
            toast.error(data.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.response?.data?.message || error.message);
    }
}
    const logout = async()=>{
            localStorage.removeItem("token")
            setToken(null)
            setAuthUser(null)
            setOnlineUsers([])
            delete axios.defaults.headers.common["token"]
            toast.success("logged out successfully")
            socket.disconnect()
    }


const updateProfile = async (body) => {
  try {
    const res = await axios.put("/api/auth/update-profile", body)

    if (res.data.success) {
      setAuthUser(res.data.user)
      toast.success("Profile updated successfully")
      return { success: true }
    }

    return { success: false }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message)
    return { success: false }
  }
}
    //connect socket funciton to handle socket connection and store online users 
    const connectSocket =(userData)=>{
        if(!userData || socket?.connected) return ;

        const newSocket = io(backendUrl,{query:{
            userId:userData._id,
        }
    })
    newSocket.connect();
    setSocket(newSocket)

    newSocket.on("getOnlineUsers",(userIds)=>{
        setOnlineUsers(userIds);
    })
    }

    //execute this automatically
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"]=token
            checkAuth()
        }
    },[token])
    const value = {
        axios,authUser,onlineUsers,socket,login,logout,updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}