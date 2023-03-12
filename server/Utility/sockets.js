import { Server } from 'socket.io'
import {
  insertMessage,
  getReceiverID,
  getUserId,
  getContacts,
  insertSocketId,
  getUserMessages,
  userNameAvailable,
  getUserDetails,
  insertContactList,
  getSocketId,
  deleteSession,
} from '../Model/database.js'

export function socketConnection(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: ['http://localhost:3000'] },
    cookie: true,
    httpOnly: true,
  })

  //middleware

  io.use(async (socket, next) => {
    try {
      const cookiee = socket.handshake.headers.cookie.split('=')[1]
      await insertSocketId(socket.id, cookiee)
      const user = await getUserId(cookiee)
      socket.userId = user.user_id
      next()
    } catch (error) {
      return next(new Error('Not authorized'))
    }
  })

  let userCount = 0
  io.on('connection', async (socket) => {
    userCount += 1

    //send userid
    socket.emit('userId', socket.userId)

    //retriving the friends list
    // const friendsList = await getContacts(socket.userId)
    // friendsList.forEach((friend) => socket.emit('connectedList', friend))

    //retriving the past messages
    socket.on('previous-msg', async (args) => {
      if (args.receiverName.length > 0) {
        //invert the if block and return early
        const data = await getReceiverID(args.receiverName)
        const receiverId = data.user_id
        const messages = await getUserMessages(socket.userId, receiverId)
        messages.forEach((message) => {
          //
          if (messages.length > 0) {
            socket.emit('message', message)
          }
        })
      }
    })

    // receiving the message from one user and sending to another
    socket.on('chat-message', async (args) => {
      const data = await getReceiverID(args.receiverName)
      const receiverId = data.user_id

      const socketId = await getSocketId(receiverId)
      if (socketId !== undefined) {
        let newMessage = args.message //
        const msgTime = args.message_time
        await insertMessage(newMessage, socket.userId, receiverId)
        io.to(socketId.socket_id).emit('message', {
          message: newMessage,
          message_time: msgTime,
        })
      }
    })

    //adding friend to friendsList
    socket.on('adding_frd', async (args) => {
      const isFriendNotAvailable = await userNameAvailable(args)
      if (isFriendNotAvailable) {
        return socket.emit('connectedList', 'user not found')
      }

      const data = await getReceiverID(args)

      const receiverId = data.user_id
      if (socket.userId !== receiverId) {
        await insertContactList(socket.userId, receiverId)
      }
      const friendName = await getUserDetails(args)
      socket.emit('connectedList', friendName)
    })

    socket.on('logout', async (userid) => {
      await deleteSession(userid)
      userCount -= 1
    })
  })
}
//why to use sockets to access friends list not with rest //
