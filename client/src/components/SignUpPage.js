import React, { useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../requests.js'

function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  async function registerUser() {
    if (username.trim().length === 0) return
    setUsername('')
    if (passWord.trim().length < 6) {
      return [setErrorMessage('password needs atleast 6 characters'), setPassWord('')]
    }
    setPassWord('')
    if (confirmPassword.trim().length < 6) {
      return [setErrorMessage('password needs atleast 6 characters'), setConfirmpassword('')]
    }
    setConfirmpassword('')
    const data = await userSignup(username.trim(), passWord.trim(), confirmPassword.trim())
    if (data.message === 'username already exist') {
      setErrorMessage('choose different user name')
    } else if (data.message === 'Invalid Credentials') {
      setErrorMessage('password doesnt match')
    } else {
      navigate('/')
    }
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
            />
            <label className="">Password</label>
            <input
              type="password"
              className="pass"
              placeholder="enter password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              className="pin"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <p className="usrName">{errorMessage}</p>
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
