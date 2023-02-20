import React, { useState } from 'react'
import './ConnectBox.css'

function ConnectBox() {
  const [userName, setUserName] = useState('')

  function newUser() {
    setUserName('')
  }
  return (
    <div>
      <div className="connectBar">
        <label className="l1">New Contact</label>
        <input
          className="aduser"
          placeholder="Enter username.."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button className="addbtn" onClick={newUser}>
          ADD
        </button>
      </div>
    </div>
  )
}

export default ConnectBox
