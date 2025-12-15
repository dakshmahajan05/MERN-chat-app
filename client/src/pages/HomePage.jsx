import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false)

  return (
    <div className="w-full border h-screen sm:px-[15%] sm:py-[5%] bg-[url('/bgImage.png')] bg-cover bg-center">
      
      <div
        className={`grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr] h-full border border-white/20 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-xl relative
        ${
          selectedUser
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_2fr_1fr]'
            : 'grid-cols-2'
        }
        `}
      >
        <Sidebar selecteduser={selectedUser} setselecteduser={setSelectedUser} />

        <ChatContainer selecteduser={selectedUser} setselecteduser={setSelectedUser}/>
        <RightSidebar selecteduser={selectedUser} setselecteduser={setSelectedUser}/>

      
      </div>
    </div>
  )
}

export default HomePage