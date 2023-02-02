import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

let users = []

io.on('connection', (socket) => {
  console.log('new client connected')

  //receiving the message from one user and sending to another
  socket.on('chat-message', (args) => {
    console.log('server side>>', args)
    let receiverName = args.name
    // console.log(receiverName)
    let id
    for (let user of users) {
      if (user.userName === receiverName) {
        id = user.socketID
      }
      console.log('socketId', id)
    }
    let newMessage = args.message
    io.to(id).emit('message', newMessage)
  })

  // adding the new user
  socket.on('newuser', (user) => {
    users.push(user)
    console.log('usernames>>', users)
    io.emit('newUserResponse', users)
  })
})

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
