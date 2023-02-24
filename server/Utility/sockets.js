import { Server } from 'socket.io'
import { insertMessage, userIds } from '../Model/database.js'
import cookie from 'cookie'

export function socketConnection(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: ['http://localhost:3000'] },
    cookie: true,
    httpOnly: true,
  })

  // let users = {}
  // console.log('users obj>>', users)

  //middleware

  io.use((socket, next) => {
    try {
      // const sessionid = socket.request.headers
      const sessionid = socket.handshake.headers.cookie

      console.log('', sessionid)
      next()
    } catch (error) {
      return next(new Error('Not authorized'))
    }
  })

  let userCount = 0
  io.on('connection', (socket) => {
    userCount += 1
    console.log('Total users connected', userCount) //get the token

    // receiving the message from one user and sending to another
    socket.on('chat-message', async (args) => {
      console.log('args>>', args)
      const data = await userIds(args.receiver_name, args.sender_name)
      const receiverId = data[0].user_id
      const senderId = data[1].user_id
      let newMessage = args.message
      console.log(newMessage, senderId, receiverId)
      await insertMessage(newMessage, senderId, receiverId)
      io.to(receiverId).emit('message', newMessage)
    })

    //retriving the friends list
    socket.on('connectedList', () => {})
    // adding the new user
    // socket.on('newuser', (name, id) => {

    //   users[name] = id
    //   io.emit('newUserResponse', users)
    // })
  })
}
