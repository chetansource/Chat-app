import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'

function LoginPage({ socket }) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function addUser() {
    if (userName.trim() === '') return
    localStorage.setItem('UserName', userName)
    socket.emit('newuser', userName, socket.id)
    setUserName('')
    navigate('/chatpage')
  }
  function routeChange() {
    navigate('/signup')
  }

  return (
    <div className="loginpage">
      <div className="loginbar">
        <button className="barelement" onClick={routeChange}>
          signup
        </button>
      </div>
      <form className="loginform" onSubmit={(e) => e.preventDefault()}>
        <div className="container">
          <div className="title">LoginPage</div>
          <div className="elements">
            <label>Username</label>
            <input
              className="username"
              placeholder="Enter UserName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            ></input>
            <label className="passlabel">Password</label>
            <input
              className="password"
              placeholder="Enter password"
              value={password}
              onchange={(event) => setPassword(event.tagert.value)}
            ></input>
            <button className="addUser" onClick={addUser}>
              SignIn
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
