import express from 'express'
import { getMessages } from '../Controllers/controller.js'

export const router = express.Router()

router.get('/:id', getMessages)
