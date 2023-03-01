import { Server } from 'socket.io'
import {
  insertMessage,
  userIds,
  userId,
  getContacts,
  insertSocketId,
  getUserMessages,
  userNameAvailable,
  userDetails,
  insertContactList,
  getSocketId,
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
      const user = await userId(cookiee)
      socket.userId = user[0].user_id
      next()
    } catch (error) {
      return next(new Error('Not authorized'))
    }
  })

  let userCount = 0
  io.on('connection', async (socket) => {
    userCount += 1
    console.log('Total users connected', userCount, socket.id) //get the token

    //send userid
    socket.emit('userId', socket.userId)

    //retriving the friends list
    const data = await getContacts(socket.userId)
    socket.emit('connectedList', data)

    //retriving the past messages
    socket.on('previous-msg', async (args) => {
      if (args.receiver_name.length > 0 || args.length > 0) {
        const data = await userIds(args.receiver_name)
        const receiverId = data[0].user_id
        const messages = await getUserMessages(socket.userId, receiverId)
        socket.emit('message', messages)
      }
    })

    // receiving the message from one user and sending to another
    socket.on('chat-message', async (args) => {
      const data = await userIds(args.receiver_name)
      const receiverId = data[0].user_id
      const socketId = await getSocketId(receiverId)
      let newMessage = args.message
      await insertMessage(newMessage, socket.userId, receiverId)
      io.to(socketId[0].socket_id).emit('message', [{ message: newMessage }])

      // const messages = await getUserMessages(socket.userId, receiverId)
      // console.log('>>', messages)
      // socket.emit('message', messages)
    })

    //adding friend to friendsList
    socket.on('adding_frd', async (args) => {
      const friendAvailable = await userNameAvailable(args)
      if (friendAvailable === 'Available') {
        socket.emit('connectedList', 'user not available in the app')
      }

      const data = await userIds(args)

      if (data.length > 0) {
        const receiverId = data[0].user_id
        await insertContactList(socket.userId, receiverId)
        const friendName = await userDetails(args)
        socket.emit('connectedList', friendName)
      }
    })
  })
}
