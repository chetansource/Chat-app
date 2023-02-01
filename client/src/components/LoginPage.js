import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

function LoginPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  function addUser() {
    if (userName.trim() === '') return
    localStorage.setItem('UserName', userName)
    socket.emit('newuser', { userName, socketID: socket.id })
    setUserName('')
    navigate('/chatpage')
  }

  return (
    <div className="loginpage">
      <div className="title">LoginPage</div>
      <form className="loginform" onSubmit={(e) => e.preventDefault()}>
        <input
          className="username"
          placeholder="UserName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        ></input>
        <button className="addUser" onClick={addUser}>
          ADD USER
        </button>
      </form>
    </div>
  )
}

export default LoginPage
