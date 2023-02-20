import express from 'express'
import { createServer } from 'http'
import { router as userRouter } from './Routes/userRoute.js'
import { router as msgRouter } from './Routes/messageRoute.js'
import { router as userListRouter } from './Routes/userListRoute.js'
import { socketConnection } from './Utility/sockets.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({ origin: ['http://localhost:3000'], credentials: true })) //{ methods: ['GET', 'POST', 'DELETE', 'PUT'] }
app.use(express.json()) //It parses incoming requests with JSON payloads
app.use(cookieParser())

const httpServer = createServer(app)
socketConnection(httpServer)

app.use('/users', userRouter)
app.use('/messages', msgRouter)
app.use('/contacts', userListRouter)

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
