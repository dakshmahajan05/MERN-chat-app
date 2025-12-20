import { Router } from 'express'
import { protectRoute } from '../middlewares/auth.js'
import { getMessages, getUserForSidebar, markMesaageSeen } from '../Controllers/message.controllers.js'

const messageRouter =Router()

messageRouter.get('/users',protectRoute,getUserForSidebar)
messageRouter.get('/:id',protectRoute,getMessages)
messageRouter.put('/mark/:id',protectRoute,markMesaageSeen)

export default messageRouter