import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../requests.js'

function LoginPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function LoginUser() {
    if (userName.trim().length === 0) return [setErrorMessage('please enter username')]
    if (password.trim().length < 6) {
      return [setErrorMessage('password needs atleast 6 characters'), setPassword('')]
    }
    setPassword('')

    const loginData = await loginUser(userName, password)
    userErrors(loginData)
  }

  function userErrors(data) {
    if (data.message === 'user doesnt exist') {
      setErrorMessage('please enter correct user name')
    } else if (data.message === 'Invalid Credentials') {
      setErrorMessage('Incorrect password')
    } else if (data[0] === 200) {
      navigate('/chatpage')
    }
  }
  function signupRoute() {
    navigate('/signup')
  }

  return (
    <div className="loginpage">
      <div className="loginbar">
        <button className="barelement" onClick={signupRoute}>
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
            <p className="loginError">{errorMessage}</p>
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
