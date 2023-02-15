import React, { useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [passWord, setPassWord] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')

  function registerUser() {
    console.log(username.trim().toLowerCase())
    if (username.trim() === '') return

    setUsername('')
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
          <div className="sign-label">signup Page</div>
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
              className="pass"
              placeholder="enter password"
              value={passWord}
              onchange={(e) => setPassWord(e.target.value)}
            ></input>
            <label>Confirm Password</label>
            <input
              className="pin"
              placeholder="confirm password"
              value={confirmPassword}
              onchange={(e) => setConfirmpassword(e.target.value)}
            ></input>
            <button className="btn" onClick={registerUser}>
              {' '}
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage
