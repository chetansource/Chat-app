import express from 'express'
import { registerUser } from '../Controllers/controller.js'

export const router = express.Router()

router.post('/signup', registerUser) //usersignup
