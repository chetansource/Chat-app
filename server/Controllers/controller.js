import {
  insertUser,
  insertMessage,
  getUsers,
  getUserMessages,
  userNameAvailable,
} from '../Model/database.js'
import bcrypt from 'bcrypt'

// console.log(bcrypt)

export async function registerUser(req, res) {
  try {
    const userNameAvailableORNot = await userNameAvailable(req.body.userName)
    if (userNameAvailableORNot === 'UnAvailable')
      return res.status(400).json({ message: 'username already exist' })
    // console.log('useravailable>>>', userNameAvailableORNot)
    // console.log('name>>', req.body.userName)
    // console.log('pass>>', req.body.password)
    // console.log('confirmpass>>', req.body.confirmpwd)
    if (req.body.password === req.body.confirmpwd) {
      const salt = bcrypt.genSaltSync()
      console.log('salt>>', salt)
      const hash = bcrypt.hashSync(req.body.password, salt)
      console.log('hashed>>', hash)
      const user = await insertUser(req.body.userName, hash)
      console.log('controller_user>>', user)
      res.json(user)
    } else {
      res.status(401).json({ message: 'Invalid Credentials' }) //when the client provides no credentials or invalid credentials
    }
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}

export async function getUserContacts(req, res) {
  try {
    const users = await getUsers(req.params.userId)
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
    const messagesInfo = await getUserMessages(
      req.params.sender_id,
      req.params.receiver_id
    )
    res.json(messagesInfo)
  } catch (error) {
    res.sendStatus(500)
  }
}
