import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })
console.log(io)
io.on('connection', (socket) => {
  socket.on('hello', (args) => {
    console.log('args>>>>>', args.name)
  })
})

// io.on('connection', (socket) => {
//   socket.emit('hello', 'world')
// })
//
httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
