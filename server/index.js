import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { router as userRouter } from './Routes/userRoute.js'
import { router as msgRouter } from './Routes/messageRoute.js'

const app = express()
app.use(express.json()) //It parses incoming requests with JSON payloads

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

app.use('/users', userRouter)
app.use('/messages', msgRouter)

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
    console.log('usernames>>', users)
    io.emit('newUserResponse', users)
  })
})

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
