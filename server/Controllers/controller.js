import {
  insertUser,
  insertMessage,
  getUsers,
  getUserMessages,
} from '../Model/database.js'

export async function addUser(req, res) {
  try {
    const user = insertUser(req.body.userName)
    res.json(user)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function getUserContacts(req, res) {
  try {
    const users = getUsers(req.params.userId)
    res.json(users)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function sendMessage(req, res) {
  try {
    const message = insertMessage(req.params.id, req.body)
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(500)
  }
}

export async function getUserMessage(req, res) {
  try {
    const messagesInfo = getUserMessages(
      req.params.sender_id,
      req.params.receiver_id
    )
    res.json(messagesInfo)
  } catch (error) {
    res.sendStatus(500)
  }
}
