import express from 'express'
import { getUserMessage, sendMessage } from '../Controllers/controller.js'

const router = express.Router()

router.get('/:receiver_id', getUserMessage)
router.post('/:receiver_id', sendMessage)