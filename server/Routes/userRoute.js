import express from 'express'
import { addUser, getUserContacts } from '../Controllers/controller.js'

const router = express.Router()

router.get('/:id', getUserContacts)
router.post('/', addUser)
