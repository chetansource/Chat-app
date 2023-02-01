import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

let users = []

io.on('connection', (socket) => {
  socket.on('chat-message', (args) => {
    console.log(args)
    let receiverId = args.socketID
    let newMessage = args.message
    // io.emit('message', args)

    //sending the message to the particular client
    io.to(receiverId).emit('message', newMessage)
    // console.log('emitting from server', io.to(id).emit('message', message))
  })

  // console.log(`${socket.id} the user just connected to `)
  socket.on('newuser', (user) => {
    users.push(user)
    console.log('usernames>>', users)
    io.emit('newUserResponse', users)
  })
})

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
