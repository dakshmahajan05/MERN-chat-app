import { Router } from 'express'
import { protectRoute } from '../middlewares/auth.js'
import { getMessages, getUserForSidebar, markMesaageSeen, sendmessage } from '../Controllers/message.controllers.js'

const messageRouter =Router()

messageRouter.get('/users',protectRoute,getUserForSidebar)
messageRouter.get('/:id',protectRoute,getMessages)
messageRouter.put('/mark/:id',protectRoute,markMesaageSeen)

messageRouter.post('/send/:id',protectRoute,sendmessage)

export default messageRouter