import express from 'express'
import { createServer } from 'http'
import { router as userRouter } from './Routes/userRoute.js'
import { router as msgRouter } from './Routes/messageRoute.js'
import { socketConnection } from './Utility/sockets.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json()) //It parses incoming requests with JSON payloads
app.use(cookieParser()) //which parses cookies attached to the client request object.

const httpServer = createServer(app)
socketConnection(httpServer)

app.use('/users', userRouter)
app.use('/messages', msgRouter)

httpServer.listen(3001, () => {
  console.log('SERVER RUNNING...')
})
