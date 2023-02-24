import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import ConnectBox from './ConnectBox'

function ChatPage({ socket, username }) {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')

  useEffect(() => {
    socket.connect()
    socket.on('connectedList', (data) => {
      const User = localStorage.getItem('UserName')
      const usernames = Object.keys(data)
      const users = usernames.filter((user) => user !== User)
      setUserList(users)
    })

    return () => {
      socket.off('connectedList')
    }
  }, [socket, userList])

  function goBack() {
    navigate('/')
  }

  return (
    <div className="container1">
      <div className="header">
        <label className="label">LinkUp</label>
        <div className="showLoginName">
          <label className="loginName">{username}</label>
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
        <ChatBox socket={socket} selectedUser={focusedUser} user={username} />
        <ConnectBox />
      </div>
    </div>
  )
}

export default ChatPage
