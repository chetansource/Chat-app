import React, { useEffect, useState } from 'react'
import './ChatBox.css'

function ChatBox({ socket, selectedUser }) {
  // console.log('chat with user>>', selectedUser)
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  function addText() {
    if (text.trim() === '') return
    textList.push(text.trim())
    // console.log('userid>>', selectedUser)
    socket.emit('chat-message', {
      message: text,
      name: selectedUser,
    })
    setText('')
  }

  useEffect(() => {
    socket.on('message', (args) => {
      console.log('received')
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
            <li key={index}>{data}</li>
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
