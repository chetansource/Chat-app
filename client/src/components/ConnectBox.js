import React, { useState } from 'react'
import './ConnectBox.css'

function ConnectBox({ socket }) {
  const [userName, setUserName] = useState('')

  function addFriend() {
    setUserName('')
    socket.emit('adding_frd', userName)
  }
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
        </form>
      </div>
    </div>
  )
}

export default ConnectBox
