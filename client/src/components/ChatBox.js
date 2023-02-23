import React, { useEffect, useState } from 'react'
import './ChatBox.css'

function ChatBox({ socket, selectedUser, user }) {
  // console.log('chat with user>>', socket.id)
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  function addText() {
    if (text.trim() === '') return
    textList.push(text.trim())
    socket.emit('chat-message', {
      message: text,
      receiver_name: selectedUser,
      sender_name: user,
    })
    setText('')
  }

  useEffect(() => {
    socket.on('message', (args) => {
      console.log('received from server', args)
      setTextList([...textList, args])
    })
    return () => {
      socket.off('message')
    }
  }, [socket, textList])

  return (
    <div>
      <div className="chatbody">
        <div className="displaySenderName">
          <input className="senderName" value={selectedUser}></input>
        </div>
        <ol>
          {textList.map((data, index) => (
            <div className="acceptMessage" key={index}>
              {data}
            </div>
          ))}
        </ol>
      </div>
      <div className="chatfooter">
        <form className="form " onSubmit={(e) => e.preventDefault()}>
          <input
            className="textbox"
            placeholder="write a message.."
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></input>
          <button className="send-btn" onClick={addText}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox
