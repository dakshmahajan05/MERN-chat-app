import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [currstate,setcurrstate]= useState('Sign Up')
  const [fullName,setfullName]= useState('')
  const [email,setemail]= useState('')
  const [password,setpassword]= useState('')
  const [bio,setbio]= useState('')
  const [datasubmitted,setdatasubmitted]= useState(false)

const {login,authUser} = useContext(AuthContext)
const navigate = useNavigate();

useEffect(()=>{
  if(authUser){
    navigate('/')
  }
},[authUser]);

const onsubmithandler = async (e) => {
    e.preventDefault();

    // Pehla step: Agar Sign up hai aur details bhar di, toh bio dikhao
    if(currstate === "Sign Up" && !datasubmitted){
        if(!fullName || !email || !password) {
            return toast.error("Please fill all fields");
        }
        setdatasubmitted(true);
        return; 
    }

    // Dusra step: Payload taiyar karo
    const payload = {
        fullName,
        email,
        password,
        bio: currstate === "Sign Up" ? bio : undefined
    };

    console.log("Calling API with payload:", payload);

    // API Call
    await login(currstate === "Sign Up" ? "signup" : "login", payload);
};


  return (
    <div className='flex min-h-screen bg-center bg-cover items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} className='w-[min(30vw,250px)]' alt="" />

      {/* right */}
    <form onSubmit={onsubmithandler} className='border- bg-white/8 text-gray border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg' action="">
      <h2 className='font-medium text-2xl flex justify-between items-center'>
        {currstate}
        {datasubmitted && <img onClick={()=>{setdatasubmitted(false)}} src={assets.arrow_icon} className='w-5 cursor-pointer' alt="" /> 
        }
        
      </h2>

      {/* {currstate=='Sign Up' && (
        <input type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' />
      )} */}

       {currstate=='Sign Up' && !datasubmitted && (
        <input onChange={(e)=>{setfullName(e.target.value)}} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' />
      )}

      {!datasubmitted && (
        <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus-ring-green-400' />
      )}

      {!datasubmitted && (
        <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus-ring-green-400' />
      )}

      {
        currstate=='Sign Up' && datasubmitted && (
          <textarea rows={4} placeholder='Provide a short bio..' required onChange={(e)=>{setbio(e.target.value)}} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus-ring-green-400' name="" id=""></textarea>
        )
      }

      <button className='py-3 bg-gradient-to-r from-green-300 to-green-500 text-white rounded-md cursor-pointer' type='submit'>
        {currstate=='Sign Up'?"Create Account":"Login Now"}
      </button>

      <div className='flex items-center gap-2 text-sm text-gray-500 '>
        <input type="checkbox" />
        <p>Agree to the terms of use & privacy policy</p>
      </div>

      <div className='flex flex-col gap-2'>
        {currstate=='Sign Up'?(
            <p onClick={()=>{setcurrstate("Login");setdatasubmitted(false)}} className='text-sm text-gray-600'>Already have an account <span className='font-medium text-green-500 cursor-pointer'>Login here</span></p>
        ):(
            <p onClick={()=>{
              setcurrstate("Sign Up")
            }} className='text-sm text-gray-600'>Don't have an account <span className='font-medium text-green-500 cursor-pointer'>Click here</span></p>
           
        )}
      </div>

    </form>

    </div>
  )
}

export default LoginPage