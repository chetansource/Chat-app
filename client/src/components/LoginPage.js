import React, { useState } from 'react'
import './LoginPage.css'

function LoginPage() {
  const [userName, setUserName] = useState('')

  function addUser() {
    if (userName.trim() === '') return
    setUserName('')
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
