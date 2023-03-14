import { Server } from 'socket.io'
import {
  insertMessage,
  getReceiverID,
  getUserId,
  insertSocketId,
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

    //send receiverId
    socket.on('selectedUser', async (args) => {
      if (args.receiverName.length > 0) {
        const data = await getReceiverID(args.receiverName)
        const receiverId = data.user_id
        socket.emit('recId', receiverId)
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

    socket.on('logout', async (userid) => {
      await deleteSession(userid)
      userCount -= 1
    })
  })
}
