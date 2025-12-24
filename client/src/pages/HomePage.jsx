import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const {selectedUser} = useContext(ChatContext)


  return (
    <div className="w-full h-screen sm:px-[15%] sm:py-[5%] bg-[url('/bgImage.png')] bg-cover bg-center">
      
      <div
        className={`
          grid h-full rounded-2xl overflow-hidden
          bg-white/20 backdrop-blur-xl border border-white/20
          
          ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr]" : "md:grid-cols-[1fr_1fr]"}
        `}
      >
        <Sidebar
        />

        <ChatContainer
        />

        {/* IMPORTANT: RightSidebar exists ONLY when user exists */}
        {selectedUser && <RightSidebar />}
      </div>
    </div>
  )
}

export default HomePage