import React, { useEffect, useState } from 'react'
import './ChatBox.css'

function ChatBox({ socket, selectedUser, userid }) {
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
  }, [socket, textList])

  useEffect(() => {
    setTextList([])
    socket.emit('previous-msg', { receiverName: selectedUser })
  }, [socket, selectedUser])

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
