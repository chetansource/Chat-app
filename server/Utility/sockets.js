import { Server } from 'socket.io'

export function socketConnection(httpServer) {
  const io = new Server(httpServer, { cors: { origin: ['http://localhost:3000'] }, cookie: true })

  let users = {}

  io.on('connection', (socket) => {
    console.log('new client connected')

    // receiving the message from one user and sending to another
    socket.on('chat-message', (args) => {
      let id
      id = users[args.name]
      console.log('id', id)
      let newMessage = args.message
      io.to(id).emit('message', newMessage)
    })

    // adding the new user
    socket.on('newuser', (name, id) => {
      users[name] = id
      io.emit('newUserResponse', users)
    })
  })
}
