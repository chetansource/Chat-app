import express from 'express'
import { getUserMessage } from '../Controllers/controller.js'

export const router = express.Router()

router.get('/', getUserMessage) //use query params authorization token for sending userid
