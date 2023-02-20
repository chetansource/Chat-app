import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../requests.js'

function LoginPage({ socket }) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function LoginUser() {
    if (userName.trim().length === 0) return
    setUserName('')
    if (password.trim().length < 6) return
    setPassword('')
    loginUser(userName, password)

    // localStorage.setItem('UserName', userName)
    // socket.emit('newuser', userName, socket.id)

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
          <div className="title">Login</div>
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
              type="password"
              className="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button className="addUser" onClick={LoginUser}>
              SignIn
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
