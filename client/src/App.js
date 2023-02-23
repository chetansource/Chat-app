import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ChatPage from './components/ChatPage'
import LoginPage from './components/LoginPage'
import { io } from 'socket.io-client'
import SignUpPage from './components/SignUpPage'
import { useState } from 'react'

const socket = io('http://localhost:3001')

function App() {
  const [userName, setUserName] = useState('')
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={<LoginPage userName={userName} setUserName={setUserName} socket={socket} />}
          />
          <Route path="chatpage" element={<ChatPage username={userName} socket={socket} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
