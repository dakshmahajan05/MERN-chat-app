import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const ProfilePage = () => {
  const [selectedimage,setselectedimage]=useState(null)
  const navigate = useNavigate()
  const [name,setname]= useState("martin jhosnon")
  const [bio,setbio] = useState("heyyy everyone am using chatty")


  const handlesubmmit =async(e)=>{
      e.preventDefault()
      navigate('/')
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

             <img src={selectedimage?URL.createObjectURL(selectedimage): assets.avatar_icon} className={`w-12 h-12 ${selectedimage &&  'rounded-full'}`} alt="" />
             
             upload profile image
          </label>

          <input onChange={(e)=>{setname(e.target.value)}} value={name} type="text" required placeholder='Your Name' className='p-2 border  border-gray-700 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-green-400'/>
          <textarea onChange={(e)=>{setbio(e.target.value)}} value={bio} name="" placeholder='write profile bio' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-green-400' rows={4} id=""></textarea>

          <button type='submit' className='bg-gradient-to-r from-green-300 to-green-600 p-2 rounded-full text-lg cursor-pointer text-white'>Save</button>

        </form>

        {/* right side image */}

        <img src={assets.logo_icon} className='max-w-70 aspect-square rounded-full mx-10 max-sm:mt-10 ' alt="" />
      </div>
      
    </div>
  )
}

export default ProfilePage