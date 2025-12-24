import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMesageTime } from '../lib/utils'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import toast from 'react-hot-toast'


const ChatContainer = () => {
  const scrollEnd=useRef()
     const { messages, selectedUser,sendMessage, setSelectedUser, getMessages } = useContext(ChatContext)

     const {authUser,onlineUsers} =useContext(AuthContext)


     const [input,setInput] = useState('');

     const handleSendMessage = async(e)=>{
        e.preventDefault()
        if(input.trim()==='') return null;
        await sendMessage({text:input.trim()});
        setInput("");
     }

     //handle image send
    const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Agar file nahi hai to return
    if (!file.type.startsWith("image/")) {
        return toast.error("Select an image file");
    }

    const reader = new FileReader(); // Fixed typo here
    reader.onloadend = async () => {
        const base64Image = reader.result;
        await sendMessage({ image: base64Image });
        e.target.value = ''; // Input reset
    };
    reader.readAsDataURL(file);
};
      useEffect(()=>{
        if(selectedUser){
          getMessages(selectedUser._id)
        }
      },[selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
        setTimeout(() => {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }
}, [messages]);
  return selectedUser?(
  <div className='h-full overflow-scroll relative backdrop-blur-lg'>

    {/* header */}


      <div className='flex  items-center gap-3 py-3 mx-4 border-b border-stone-500'>
      <img src={selectedUser.profilePic || assets.avatar_icon} className='w-8 rounded-full' alt="" />
     <p className='flex flex-1 text-lg text-gray-600 items-center gap-2'>
  {selectedUser.fullName}
  
  {/* Logic: Agar user online hai tabhi span dikhao */}
  {onlineUsers.includes(selectedUser._id) && (
    <span className='w-2 h-2 rounded-full bg-green-500'></span>
  )}
</p>

      <img src={assets.arrow_icon} className='md:hidden max-w-7' 
      onClick={()=>{setSelectedUser(null)}} alt="" />
      <img src={assets.help_icon} className='max-md:hidden max-w-10' alt="" />

    </div>

    {/* chat area */}

    <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 '>
      {messages.map((msg,index)=>(
        <div className={`flex items-end gap-2 justify-end ${msg.senderId!==authUser._id ? `flex-row-reverse`:''}`} key={index}>

          {msg.image?(
            <img src={msg.image} className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' alt="" />
          ):(
            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-green-400 text-white ${msg.senderId==authUser._id?'rounded-br-none':'rounded-bl-none'}`}>{msg.text}</p>
          )}
            {/* profile image and time  */}
          <div className='text-center text-xs '>
            <img src={msg.senderId===authUser._id?authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} className='w-7 rounded-full ' alt="" />
            <p  className='text-gray-500'>{formatMesageTime(msg.createdAt)}</p>

          </div>
        </div>
      ))}
      <div ref={scrollEnd}></div>
    </div>

      {/* bottom area .... chat write and send ui */}

     <div className="absolute flex gap-6 bottom-0 left-0 right-0 p-3 backdrop-blur-lg">
  <div className="flex items-center gap-3">

      <input
        type="file"
        onChange={handleSendImage}
        id="image"
        accept="image/png, image/jpeg, image/svg+xml"
        hidden
      />
      <label htmlFor="image">
        <img
          src={assets.gallery_icon}
          className="w-10 left-0 top-4 cursor-pointer absolute "
          alt=""
        />
      </label>
    </div>

    <div className="flex flex-1 items-center px-4 rounded-full relative bg-gray-100/10">
      <input
        type="text"
        placeholder="Send a message"
        className="flex-1 bg-transparent p-3 text-sm text-gray-600 outline-none placeholder:text-gray-400"
        value={input}
           onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>e.key==='Enter'?handleSendMessage(e):null}
      />

    <img
      src={assets.send_button}
      onClick={handleSendMessage}
      className="w-15 backdrop-blur-lg absolute right-0 cursor-pointer"
      alt=""
    />
  </div>
</div>

  </div>
  ):(
    <div className='flex flex-col items-center justify-center  text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-70' alt="" />
      <p className='text-lg font-medium text-slate-500'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer