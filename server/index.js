import express from 'express'
import { createServer } from 'http'
import { router as userRouter } from './Routes/userRoute.js'
import { router as msgRouter } from './Routes/messageRoute.js'
import { router as userListRouter } from './Routes/userListRoute.js'
import { socketConnection } from './Utility/sockets.js'
import cors from 'cors'

const app = express()
app.use(cors()) //{ methods: ['GET', 'POST', 'DELETE', 'PUT'] }
app.use(express.json()) //It parses incoming requests with JSON payloads

const httpServer = createServer(app)
socketConnection(httpServer)

app.use('/users', userRouter)
app.use('/messages', msgRouter)
app.use('/contacts', userListRouter)

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
