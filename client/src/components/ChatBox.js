import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './ChatBox.css'

const socket = io('http://localhost:3001')

function ChatBox() {
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  function addText() {
    if (text.trim() === '') return
    textList.push(text.trim())
    socket.emit('chat-message', text)
    console.log('array>>>>', textList)
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
  }, [textList])

  return (
    <div className="container">
      <div className="chatbody">
        <ol>
          {textList.map((text, index) => (
            <li key={index}>{text}</li>
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
