import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const {authUser,updateProfile} = useContext(AuthContext)
  const navigate = useNavigate()

  const [selectedimage,setselectedimage]=useState(null)
  const [name,setname]= useState("")
  const [bio,setbio] = useState("")

  useEffect(()=>{
    if(authUser){
      setname(authUser.fullName || "")
      setbio(authUser.bio || "")
    }
  },[authUser])

  const handlesubmmit =async(e)=>{
      e.preventDefault();

      if(!selectedimage){

        const res = await updateProfile({fullName:name,bio})
          if(res?.success){
            navigate('/')
            return ;
          }
       }
      const reader = new FileReader();
      reader.readAsDataURL(selectedimage);
      reader.onload= async ()=>{
        const base64Image = reader.result
        const res = await updateProfile({profilePic:base64Image,fullName:name,bio})
        if(res.success){
          navigate('/')
        }
      }
      reader.onerror=()=>{
        console.log("image read failed");
        
      }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center backdrop-blur-2xl'>

      {/* container */}

      <div className='w-5/6 max-w-2xl backdrop-blur-3xl shadow-lg text-gray-500  border-gray-500 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>

      {/* left side form */}

        <form action="" onSubmit={handlesubmmit} className='flex flex-col gap-5 p-10 flex-1'>

          <h3 className='text-2xl font-semibold '>Profile Details</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
              <input onChange={(e)=>{setselectedimage(e.target.files[0])}}  type="file" id='avatar' accept='.png,.jpg,.jpeg' hidden  />

             <img src={selectedimage?URL.createObjectURL(selectedimage): authUser?.profilePic || assets.avatar_icon} className={`w-12 h-12 ${authUser?.profilePic && 'rounded-full'} ${selectedimage &&  'rounded-full'}`} alt="" />
             
             upload profile image
          </label>

          <input onChange={(e)=>{setname(e.target.value)}} value={name} type="text" required placeholder='Your Name' className='p-2 border  border-gray-700 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-green-400'/>
          <textarea onChange={(e)=>{setbio(e.target.value)}} value={bio} name="" placeholder='write profile bio' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-green-400' rows={4} id=""></textarea>

          <button type='submit' className='bg-gradient-to-r from-green-300 to-green-600 p-2 rounded-full text-lg cursor-pointer text-white'>Save</button>

        </form>

        {/* right side image */}

        <img src={selectedimage?URL.createObjectURL(selectedimage):authUser?.profilePic || assets.logo_icon} className={` ${selectedimage?'sm:w-40':''} ${authUser.profilePic?'sm:w-40':''} max-w-70 aspect-square rounded-full mx-10  max-sm:mt-10  ${selectedimage && 'rounded-full'} ` } alt="" />
      </div>
      
    </div>
  )
}

export default ProfilePage