import {
  insertUser,
  insertMessage,
  getUsers,
  getUserMessages,
  userNameAvailable,
} from '../Model/database.js'

export async function addUser(req, res) {
  try {
    const userNameAvailableORNot = await userNameAvailable(req.body.userName)
    if (userNameAvailableORNot === 'UnAvailable')
      return res.status(400).json({ message: 'username already exist' })
    const user = await insertUser(req.body.userName)
    res.json(user)
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
