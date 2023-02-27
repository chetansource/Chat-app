import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import ConnectBox from './ConnectBox'
import { getUserName } from '../requests.js'

function ChatPage({ socket }) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')

  useEffect(() => {
    socket.connect()

    socket.on('userId', async (userid) => {
      const name = await getUserName(userid)
      const username = name[0].user_name
      setUserName(username)
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
        <ChatBox socket={socket} selectedUser={focusedUser} user={userName} />
        <ConnectBox />
      </div>
    </div>
  )
}

export default ChatPage
