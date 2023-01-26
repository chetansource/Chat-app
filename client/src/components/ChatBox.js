import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

function ChatBox() {
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  function addText() {
    if (text.trim() === '') return
    textList.push(text)
    socket.emit('chat-message', text)
    console.log('array>>>>', textList)
    setText('')
  }

  useEffect(() => {
    socket.on('message', (args) => {
      console.log('received from server', args)
      setTextList([...textList, args])
    })
  })

  return (
    <div className="ChatFooter">
      <ol>
        {textList.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ol>
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
  )
}

export default ChatBox
