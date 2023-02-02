import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ChatPage from './components/ChatPage'
import LoginPage from './components/LoginPage'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', { transports: ['websocket'] })

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage socket={socket} />} />
          <Route path="chatpage" element={<ChatPage socket={socket} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
