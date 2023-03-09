import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ChatPage from './components/ChatPage'
import LoginPage from './components/LoginPage'
import { io } from 'socket.io-client'
import SignUpPage from './components/SignUpPage'
import ChatBox from './components/ChatBox'

const socket = io('http://localhost:3001', { autoConnect: false, transports: ['websocket'] })

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="chatpage" element={<ChatPage socket={socket} />} />
          {/* <Route path="chatBox/name?" element={<ChatBox />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
