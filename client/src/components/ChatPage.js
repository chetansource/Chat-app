import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'

function ChatPage({ socket }) {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      const User = localStorage.getItem('UserName')
      const usernames = Object.keys(data)
      const users = usernames.filter((user) => user !== User)
      setUserList(users)
    })
  }, [socket, userList])

  function goBack() {
    navigate(-1)
  }

  const userName = localStorage.getItem('UserName')

  return (
    <div className="container">
      <div className="header">
        <label className="label">LinkUp</label>
        <div className="showLoginName">
          <label className="loginName">{userName}</label>
        </div>
        <button className="navbtn" onClick={goBack}>
          Logout
        </button>
      </div>
      <div className="chatpage">
        <div className="list">
          <label className="heading">UserList</label>
          <ol className="orderedList">
            {userList.map((user, index) => (
              <div key={index}>
                <div className="userlist" onClick={() => setFocusedUser(user)}>
                  {user}
                </div>
              </div>
            ))}
          </ol>
        </div>
        <ChatBox socket={socket} selectedUser={focusedUser} />
      </div>
    </div>
  )
}

export default ChatPage
