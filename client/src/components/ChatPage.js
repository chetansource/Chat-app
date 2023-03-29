import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { useNavigate } from 'react-router-dom'
import ChatBox from './ChatBox'
import ConnectBox from './ConnectBox'
import { getFriendsList, getUserName } from '../requests.js'

function ChatPage({ socket }) {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState('') // userInfo object for userid and
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

    const userFriendsList = async () => {
      if (userId === null) return
      {
        let friendsList = await getFriendsList(userId)
        friendsList = friendsList.sort(
          (a, b) =>
            (a.last_message_time === null) - (b.last_message_time === null)
        )
        friendsList = friendsList.map((list) => list.user_name)
        setUserList(friendsList)
      }
    }
    userFriendsList()
  }, [socket, userId])

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
                <div
                  className="userlist"
                  onClick={() => {
                    setFocusedUser(user)
                  }}
                >
                  <p className="friendsName"> {user}</p>
                </div>
              </div>
            ))}
          </ol>
        </div>
        <ChatBox
          socket={socket}
          selectedUser={focusedUser}
          userid={userId}
          userList={userList}
          setUserList={setUserList}
        />
        <ConnectBox
          userid={userId}
          userList={userList}
          setUserList={setUserList}
        />
      </div>
    </div>
  )
}

export default ChatPage
//half duplex
