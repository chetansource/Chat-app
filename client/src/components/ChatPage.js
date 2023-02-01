import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

function ChatPage() {
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')

  function focusUser(socketid) {
    setFocusedUser(socketid)
  }

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      const User = localStorage.getItem('UserName')
      const users = data.filter((user) => user.userName !== User)
      setUserList(users)
    })
  }, [userList])
  // console.log('users>>>', userList)

  function goBack() {
    navigate(-1)
  }

  return (
    <div className="container">
      <div className="header">
        <label className="label">LinkUp</label>
        <button className="navbtn" onClick={goBack}>
          LoginPage
        </button>
        <div>
          <label>UserList</label>
          <ol>
            {userList.map((user) => (
              <div key={user.socketID}>
                <input
                  className="userlist"
                  value={user.userName}
                  readOnly
                  onClick={() => focusUser(user.socketID)}
                ></input>
              </div>
            ))}
          </ol>
        </div>
      </div>
      <ChatBox socket={socket} selectedUser={focusedUser} />
    </div>
  )
}

export default ChatPage
