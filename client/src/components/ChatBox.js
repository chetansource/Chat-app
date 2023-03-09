import React, { useEffect, useState } from 'react'
import './ChatBox.css'

function ChatBox({ socket, selectedUser, userList, setUserList, userid }) {
  const [userId, setUserId] = useState(0)
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  function addText() {
    if (text.trim() === '') return

    setTextList([
      ...textList,
      { message: text.trim(), sender_id: userid, message_time: Date.now() },
    ])

    socket.emit('chat-message', {
      message: text,
      receiverName: selectedUser,
      message_time: Date.now(),
    })

    const foundIdx = userList.findIndex((el) => el === selectedUser)
    let tempUserList = userList.splice(foundIdx, 1)
    tempUserList = [...tempUserList, ...userList]
    console.log('temp2', userList)
    setUserList(tempUserList)

    setText('')
  }

  useEffect(() => {
    socket.on('userId', (userid) => {
      setUserId(userid)
    })

    socket.on('message', (args) => {
      setTextList((currentTextList) => [...currentTextList, args])
    })

    return () => {
      socket.off('message')
    }
  }, [socket])

  useEffect(() => {
    setTextList([])

    socket.emit('previous-msg', { receiverName: selectedUser })
  }, [socket, selectedUser, userList, setUserList])

  function formateDate(date) {
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return (
      (hours % 12) + ':' + minutes.toString().padStart(2, '0') + ' ' + (hours > 11 ? 'PM' : 'AM')
    )
  }

  return (
    <div>
      <div className="chatbody">
        <div className="displaySenderName">
          <input className="senderName" value={selectedUser} readOnly></input>
        </div>
        <div className="container3">
          <ol className="listdis">
            {textList.length !== 0 || selectedUser.length !== 0 ? (
              <>
                {textList.map((data, index) =>
                  data.sender_id === userId ? (
                    <span className="sendMessage" key={index}>
                      {data.message}
                      <br />
                      <span className="msg-time">{formateDate(new Date(data.message_time))}</span>
                    </span>
                  ) : (
                    <span className="acceptMessage" key={index}>
                      {data.message}
                      <br />
                      <span className="msg-time">{formateDate(new Date(data.message_time))}</span>
                    </span>
                  )
                )}
              </>
            ) : (
              <p className="defaultMsg">click on the user to chat</p>
            )}
          </ol>
        </div>
      </div>
      <div className="chatfooter">
        <form className="form " onSubmit={(e) => e.preventDefault()}>
          <input
            className="textbox"
            placeholder="write a message.."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button className="send-btn" onClick={addText}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox
