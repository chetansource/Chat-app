import React, { useEffect, useState } from 'react'
import './ConnectBox.css'
import { addFrdtoContacts } from '../requests.js'

function ConnectBox({ userid, userList, setUserList }) {
  const [userName, setUserName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function addFriend() {
    setUserName('')
    const data = await addFrdtoContacts(userid, userName)
    setErrorMessage(data.message)
    if (data === 200) {
      setUserList([...userList, userName])
    }
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
          <p className="errMsg">{errorMessage}</p>
        </form>
      </div>
    </div>
  )
}

export default ConnectBox
