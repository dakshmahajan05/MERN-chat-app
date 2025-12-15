import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({selecteduser,setselecteduser}) => {
    const navigate = useNavigate()
  return (
<div
  className={`bg-[#b5f1b1]/10 h-full p-5 rounded-xl overflow-y-scroll text-white ${
    selecteduser ? "max-md:hidden" : ""}`}>
        <div className='pb-5'>

            {/* logo and options */}
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt="" className='max-w-40 ' />
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} className='max-h-5 cursor-pointer' alt="" />
                        <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#57aa53] text-gray-100 hidden group-hover:block' >
                            <p onClick={()=>navigate('/profile')}>Edit Profile</p>
                            <hr  className='my-2 border-t border-gray-600'/>
                            <p className='cursor-pointer text-sm'>Logout</p>
                        </div>
                </div>
            </div>

            {/* search bar */}
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-1 px-4 mt-2'>
                <img className='w-3' src={assets.search_icon} alt="" />
                <input type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder:[#c8c8c8] flex-1' placeholder='Search User'/>

            </div>
        </div>

        <div className='flex flex-col'>
            {userDummyData.map((user,index)=>(
                <div
                onClick={()=>{setselecteduser(user)}}
                className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max:sm:text-sm ${selecteduser?._id===user._id && 'bg-green-300/50 '}`}>
                    <img src={user?.profilePic || assets.avatar_icon} className='w-[35px] aspect-[1/1] rounded-full' alt="" />

                    <div className='flex flex-col leading-5'>
                        <p className='text-slate-500'>{user.fullName}</p>
                        {
                            index<3
                            ? <span className='text-green-500 text-xs '> online</span>
                            : <span className='text-neutral-400 text-xs'>offline</span>
                        }
                    </div>

                    {index>2 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-green-300'>{index}</p> }
                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar