import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import ConnectBox from './ConnectBox'
import { getUserName } from '../requests.js'

function ChatPage({ socket, username }) {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')
  // username = getUserName()

  useEffect(() => {
    socket.connect()

    socket.on('userId', (userid) => {
      getUserName(userid)
    })

    socket.on('connectedList', (data) => {
      const users = data.map((user) => user.user_name)
      setUserList(users)
    })

    return () => {
      socket.off('connectedList')
    }
  }, [socket])

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
