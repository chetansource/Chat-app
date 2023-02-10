import React, { useState } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'

function LoginPage({ socket }) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  function addUser() {
    if (userName.trim() === '') return
    localStorage.setItem('UserName', userName)
    // console.log('sid', socket.id)
    socket.emit('newuser', userName, socket.id)
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
