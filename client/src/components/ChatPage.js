import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import ConnectBox from './ConnectBox'
import { getUserName } from '../requests.js'

function ChatPage({ socket }) {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userList, setUserList] = useState([])
  const [focusedUser, setFocusedUser] = useState('')

  useEffect(() => {
    socket.connect()

    //fetching the userName
    socket.on('userId', async (userid) => {
      setUserId(userid)
      const name = await getUserName(userid)
      const username = name.user_name
      setUserName(username)
    })
  }, [socket])

  useEffect(() => {
    socket.on(
      'disconnect',
      () => {
        setUserList([])
      },
      []
    )

    socket.on('connectedList', (data) => {
      if (typeof data === 'object') {
        setFocusedUser(data.user_name)
        // const users = data.map((user) => user.user_name)
        setUserList((currentUserList) => [...currentUserList, data.user_name])
      }
    })
    return () => {
      socket.off('connectedList')
    }
  }, [socket, userList])

  function navLogin() {
    socket.emit('logout', userId)
    socket.disconnect()
    navigate('/')
  }

  return (
    <div className="container1">
      <div className="header">
        <label className="label">LinkUp</label>
        <div className="showLoginName">
          <label className="login-Name">{userName}</label>
        </div>
        <button className="navbtn" onClick={navLogin}>
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
        <ChatBox socket={socket} selectedUser={focusedUser} userid={userId} />
        <ConnectBox socket={socket} />
      </div>
    </div>
  )
}

export default ChatPage
