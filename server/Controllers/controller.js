import {
  insertUser,
  insertMessage,
  getContacts,
  getUserMessages,
  userNameAvailable,
  userDetails,
  userSession,
} from '../Model/database.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export async function registerUser(req, res) {
  try {
    const userNameAvailableORNot = await userNameAvailable(req.body.userName)
    if (userNameAvailableORNot === 'UnAvailable')
      return res.status(400).json({ message: 'username already exist' })
    if (req.body.password === req.body.confirmpwd) {
      const salt = await bcrypt.genSalt() //by default it uses 12 salt rounds
      const hash = await bcrypt.hash(req.body.password, salt)
      const user = await insertUser(req.body.userName, hash)
      res.json(user)
    } else {
      res.status(401).json({ message: 'Invalid Credentials' }) //when the client provides no credentials or invalid credentials
    }
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}

export async function loginUser(req, res) {
  try {
    const user = await userDetails(req.body.userName)
    console.log(user)
    if (user[0] === undefined) {
      return res.status(404).json({ message: 'user doesnt exists' }) //bad request
    }
    bcrypt.compare(req.body.password, user[0].password, async function (error, result) {
      if (result === true) {
        const sessionId = uuidv4()
        await userSession(sessionId, user[0].user_id)
        res
          .cookie('session', sessionId, { expires: new Date(Date.now() + 3600000), httpOnly: true })
          .status(200)
          .json({ username: user[0].user_name })
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}

export async function getUserContacts(req, res) {
  try {
    const users = await getContacts(req.params.userId)
    res.json(users)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function sendMessage(req, res) {
  try {
    const message = await insertMessage(req.params.id, req.body)
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function getUserMessage(req, res) {
  try {
    const messagesInfo = await getUserMessages(req.params.sender_id, req.params.receiver_id)
    res.json(messagesInfo)
  } catch (error) {
    res.sendStatus(500)
  }
}
