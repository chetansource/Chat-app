import express from 'express'
import { registerUser, loginUser, userDetail } from '../Controllers/controller.js'

export const router = express.Router()

router.post('/signup', registerUser) //usersignup
router.post('/login', loginUser)
router.get('/:id', userDetail)
