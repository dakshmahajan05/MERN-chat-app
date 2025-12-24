import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import assets from '../assets/assets'

const Sidebar = () => {

   const { getUsers, users, selectedUser, setSelectedUser, unseenMessages } = useContext(ChatContext)

    const [input,setinput ] = useState(false)

    const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase()) ) :users ;

    const navigate = useNavigate()
    const {logout,onlineUsers} = useContext(AuthContext)

    useEffect(()=>{
        getUsers()
    },[users])
  return (
<div
  className={`bg-[#b5f1b1]/10 h-full p-5 rounded-xl overflow-y-scroll text-white ${
    selectedUser ? "max-md:hidden" : ""}`}>
        <div className='pb-5'>

            {/* logo and options */}
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt="" className='max-w-40 ' />
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} className='max-h-5 cursor-pointer' alt="" />
                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#57aa53] text-gray-100 hidden group-hover:block' >
                            <p className='cursor-pointer' onClick={()=>navigate('/profile')}>Edit Profile</p>
                            <hr  className='my-2 border-t border-gray-600'/>
                            <p onClick={()=>logout()} className='cursor-pointer text-sm'>Logout</p>
                        </div>
                </div>
            </div>

            {/* search bar */}
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-1 px-4 mt-2'>
                <img className='w-3' src={assets.search_icon} alt="" />
                <input value={input} onChange={(e)=>setinput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1' placeholder='Search User'/>

            </div>
        </div>
            {/* user list */}
        <div className='flex flex-col'>
            {filteredUsers.map((user,index)=>(
                <div
                key={user._id}
                onClick={()=>{setSelectedUser(user)}}
                className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max:sm:text-sm ${selectedUser?._id===user._id && 'bg-green-300/50 '}`}>
                    <img src={user?.profilePic || assets.avatar_icon} className='w-[35px] aspect-[1/1] rounded-full' alt="" />

                    <div className='flex flex-col leading-5'>
                        <p className='text-slate-500'>{user.fullName}</p>
                        {
                            onlineUsers.includes(user._id)
                            ? <span className='text-green-500 text-xs '> online</span>
                            : <span className='text-neutral-400 text-xs'>offline</span>
                        }
                    </div>

                    {unseenMessages[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-green-300'>{unseenMessages[user._id]}</p> }
                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar