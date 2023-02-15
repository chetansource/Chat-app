import express from 'express'
import { addUser } from '../Controllers/controller.js'

export const router = express.Router()

router.post('/signup', registerUser) //usersignup
