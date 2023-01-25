import './App.css'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')
console.log('client side >>>', socket)
socket.emit('hello', { name: 'chetan' })

socket.on('hello', (args) => {
  console.log('hello event>>', args)
})
//
// connection is established
function App() {
  return (
    <div className="App">
      <label className="AppHeading">LinkUp</label>
      {/* <ChatBox/> */}
    </div>
  )
}

export default App
