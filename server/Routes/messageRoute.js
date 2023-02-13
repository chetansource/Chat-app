import express from 'express'
import { getUserMessage, sendMessage } from '../Controllers/controller.js'

export const router = express.Router()

router.get('/', getUserMessage) //use query params authorization token for sending userid
router.post('/', sendMessage) //senderid receiverid  specify in body
