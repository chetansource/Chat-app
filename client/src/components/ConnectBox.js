import React, { useEffect, useState } from 'react'
import './ConnectBox.css'

function ConnectBox({ socket }) {
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function addFriend() {
    setUserName('')
    socket.emit('adding_frd', userName)
  }

  useEffect(() => {
    socket.on('connectedList', (data) => {
      if ((typeof data === 'string') & (data === 'user not available in the app')) {
        setErrorMessage(data)
      }
    })
  })
  return (
    <div>
      <div className="connectBar">
        <label className="l1">New Contact</label>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="aduser"
            placeholder="Enter username.."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <button className="addbtn" onClick={addFriend}>
            ADD
          </button>
          <p className="errMsg">{errorMessage}</p>
        </form>
      </div>
    </div>
  )
}

export default ConnectBox
