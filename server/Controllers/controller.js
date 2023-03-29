import {
  insertUser,
  userNameAvailable,
  userSession,
  getUserDetails,
  getUser,
  getContacts,
  getUserMessages,
  getReceiverID,
  insertContactList,
} from '../Model/database.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export async function registerUser(req, res) {
  try {
    const isUsernameAvailable = await userNameAvailable(req.body.userName)
    if (!isUsernameAvailable) {
      return res.status(400).json({ message: 'username already exist' })
    }

    if (req.body.password !== req.body.confirmpwd) {
      return res.status(401).json({ message: 'Invalid Credentials' }) // when the client provides no credentials or invalid credentials
    }

    const salt = await bcrypt.genSalt() //by default it uses 12 salt rounds
    const hash = await bcrypt.hash(req.body.password, salt)
    const user = await insertUser(req.body.userName, hash)

    return res.json(user)
  } catch (error) {
    console.log('error', error)

    return res.sendStatus(500)
  }
}

export async function loginUser(req, res) {
  try {
    const user = await getUserDetails(req.body.userName)

    if (user === undefined) {
      return res.status(404).json({ message: 'user doesnt exist' }) //bad request
    }

    const result = await bcrypt.compare(req.body.password, user.password)
    if (!result) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }

    const sessionId = uuidv4()
    await userSession(sessionId, user.user_id)
    const expires = new Date(Date.now() + 3600000)

    return res
      .cookie('session', sessionId, { expires, httpOnly: true })
      .json({ username: user.user_name })
  } catch (error) {
    console.log('error', error)

    res.sendStatus(500)
  }
}

export async function getUserinfo(req, res) {
  try {
    const user = await getUser(req.params.id)
    return res.json(user)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export async function getUserContacts(req, res) {
  try {
    const friendsList = await getContacts(req.params.id)
    return res.json(friendsList)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export async function getMessages(req, res) {
  try {
    const ids = req.params.id
    const arrId = ids.split(',')
    const sId = arrId[0]
    const rId = arrId[1]
    const msgs = await getUserMessages(sId, rId)
    return res.json(msgs)
  } catch (error) {
    return res.sendStatus(500)
  }
}

export async function addFriend(req, res) {
  try {
    const uId = req.params.id
    const isFriendNotAvailable = await userNameAvailable(req.body.userName)
    if (isFriendNotAvailable) {
      return res.status(400).json({ message: 'user not found' })
    }
    const receiverId = await getReceiverID(req.body.userName)
    const recId = receiverId.user_id
    const data = await insertContactList(uId, recId)
    return res.json(data)
  } catch (error) {
    return res.sendStatus(500)
  }
}
