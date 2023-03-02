import React, { useEffect, useState } from 'react'
import './ChatBox.css'

function ChatBox({ socket, selectedUser }) {
  const [userId, setUserId] = useState(0)
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  function addText() {
    if (text.trim() === '') return
    textList.push(text.trim())
    setTextList([...textList, { message: text.trim() }])
    socket.emit('chat-message', {
      message: text,
      receiver_name: selectedUser,
    })
    setText('')
  }

  useEffect(() => {
    socket.on('userId', (userid) => {
      setUserId(userid)
    })

    socket.on('message', (args) => {
      setTextList([...textList, ...args])
    })

    return () => {
      socket.off('message')
    }
  }, [socket, textList])

  useEffect(() => {
    setTextList([])
    socket.emit('previous-msg', { receiver_name: selectedUser })
  }, [socket, selectedUser])

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
                <div className="sendMessage" key={index}>
                  {data.message}
                </div>
              ) : (
                <div className="acceptMessage" key={index}>
                  {data.message}
                </div>
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
