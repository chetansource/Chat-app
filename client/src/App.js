import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ChatBox from './components/ChatBox'
import LoginPage from './components/LoginPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="chatbox" element={<ChatBox />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
