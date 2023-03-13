import express from 'express'
import {
  registerUser,
  loginUser,
  getUserinfo,
  getUserContacts,
  addFriend,
} from '../Controllers/controller.js'

export const router = express.Router()

router.post('/signup', registerUser) //usersignup
router.post('/login', loginUser)
router.get('/:id', getUserinfo)
router.get('/contacts/:id', getUserContacts)
router.post('/:id', addFriend)
