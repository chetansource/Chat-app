import { Server } from 'socket.io'
import { insertMessage, userIds, userId, getContacts } from '../Model/database.js'

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
    console.log('Total users connected', userCount) //get the token

    //send userid
    socket.emit('userId', socket.userId)

    //retriving the friends list
    const data = await getContacts(socket.userId)
    socket.emit('connectedList', data)

    // receiving the message from one user and sending to another
    socket.on('chat-message', async (args) => {
      // console.log('args>>', args)
      const data = await userIds(args.receiver_name, args.sender_name)
      const receiverId = data[0].user_id
      const senderId = data[1].user_id
      let newMessage = args.message
      console.log(newMessage, senderId, receiverId)
      await insertMessage(newMessage, senderId, receiverId)
      io.to(receiverId).emit('message', newMessage)
    })
  })
}
