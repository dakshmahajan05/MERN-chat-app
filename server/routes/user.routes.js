import express, { Router } from 'express'
import { checkAuth, login, signup, updateProfile } from '../Controllers/user.controllers.js'
import { protectRoute } from '../middlewares/auth.js'

const userRouter = Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.put('/update-profile',protectRoute,updateProfile)
userRouter.get('/check',protectRoute,checkAuth)

export default userRouter