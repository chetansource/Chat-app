import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  socket.on('chat-message', (args) => {
    console.log('args>>>>>', args.text)
    io.emit('message', args)
  })
})

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
