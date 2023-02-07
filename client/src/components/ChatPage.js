import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'

function ChatPage({ socket }) {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')

  function focusUser(socketUser) {
    // use setFocusedUser
    setFocusedUser(socketUser)
  }

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      const User = localStorage.getItem('UserName')
      const users = data.filter((user) => user.userName !== User)
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
            {userList.map((user) => (
              <div key={user.socketID}>
                <input //use p tag or div tag
                  className="userlist"
                  value={user.userName}
                  readOnly
                  onClick={() => focusUser(user.userName)}
                ></input>
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
