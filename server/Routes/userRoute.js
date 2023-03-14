import express from 'express'
import {
  registerUser,
  loginUser,
  getUserinfo,
  getUserContacts,
  addFriend,
} from '../Controllers/controller.js'
import { authenticateToken } from '../Utility/middleware.js'

export const router = express.Router()

router.post('/signup', registerUser) //usersignup
router.post('/login', loginUser)
router.get('/:id', authenticateToken, getUserinfo)
router.get('/contacts/:id', authenticateToken, getUserContacts)
router.post('/:id', authenticateToken, addFriend)
