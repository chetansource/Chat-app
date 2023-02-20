import express from 'express'
import { registerUser, loginUser } from '../Controllers/controller.js'

export const router = express.Router()

router.post('/signup', registerUser) //usersignup
router.post('/login', loginUser)
