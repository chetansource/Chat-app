import express from 'express'
import { getUserContacts } from '../Controllers/controller.js'

export const router = express.Router()

router.get('/:user_id', getUserContacts)
