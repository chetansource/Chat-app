import React, { useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../requests.js'

function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')

  async function registerUser() {
    if (username.trim().length === 0) return
    setUsername('')
    if (passWord.trim().length < 6) return
    setPassWord('')
    if (confirmPassword.trim().length < 6) return
    setConfirmpassword('')
    await userSignup(username.trim(), passWord.trim(), confirmPassword.trim())
    navigate('/')
  }

  function changeRoute() {
    navigate('/')
  }

  return (
    <div className="wrapper">
      <div className="signbar">
        <button className="barele" onClick={changeRoute}>
          Login
        </button>
      </div>
      <form className="signupform" onSubmit={(e) => e.preventDefault()}>
        <div className="smallwrapper">
          <div className="sign-label">signup</div>
          <div className="details">
            <label className="">Username</label>
            <input
              className="usr"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label className="">Password</label>
            <input
              type="password"
              className="pass"
              placeholder="enter password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            ></input>
            <label>Confirm Password</label>
            <input
              type="password"
              className="pin"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            ></input>
            <button className="btn" onClick={registerUser}>
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage
