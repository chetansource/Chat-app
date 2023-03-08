import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

const databaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

const pool = new Pool(databaseConfig)

console.log('Connected to the database')

//checking if the username already exists or not
// change return type to boolean
export async function userNameAvailable(username) {
  const query = 'SELECT user_name from users WHERE user_name = $1'
  const params = [username]
  const res = await pool.query(query, params)
  if (res.rowCount === 1) return true
  return false
}

// add the user to the database when i user logged in
export async function insertUser(username, passwd) {
  const query = 'INSERT INTO users(user_name,password) VALUES($1,$2)'
  const params = [username, passwd]
  const res = await pool.query(query, params)
  console.log('adduser>>', res)
  return res
}
//fetch  data for login
export async function getUserDetails(username) {
  const query = `SELECT * from users WHERE user_name = $1`
  const params = [username]
  const res = await pool.query(query, params)
  return res.rows[0]
}

//creating user Session
export async function userSession(Sessionid, Userid) {
  const query = `INSERT INTO sessions(session_id,user_id) VALUES($1,$2)`
  const params = [Sessionid, Userid]
  const res = await pool.query(query, params)
  return res
}

//get receiverId
export async function getReceiverID(receiverName) {
  const query = `SELECT user_id,user_name from users WHERE user_name=$1`
  const params = [receiverName]
  const res = await pool.query(query, params)
  return res.rows[0]
}
//getting userId from sessionId
export async function getUserId(sessionId) {
  const query = `SELECT user_id from sessions WHERE session_id=$1 `
  const params = [sessionId]
  const res = await pool.query(query, params)
  return res.rows[0]
}

//insert socketId
export async function insertSocketId(socketid, sessionid) {
  const query = `UPDATE sessions SET socket_id=$1 WHERE session_id=$2`
  const params = [socketid, sessionid]
  const res = await pool.query(query, params)
  return res
}

//getting socketId
export async function getSocketId(userId) {
  const query = `SELECT socket_id from sessions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1`
  const params = [userId]
  const res = await pool.query(query, params)
  return res.rows[0]
}

//getting userName
export async function getUser(id) {
  const query = `SELECT user_name from users WHERE user_id=$1`
  const params = [id]
  const res = await pool.query(query, params)
  return res.rows[0]
}

//send message to a frd
export async function insertMessage(msg, senderId, receiverId) {
  const query = 'INSERT INTO messages(message,sender_id,receiver_id) VALUES($1,$2,$3)'
  const params = [msg, senderId, receiverId]
  const res = await pool.query(query, params)
  return res
}

//insert into contactList
export async function insertContactList(senderId, receiverId) {
  const query = 'INSERT INTO contacts(userid,connected_id) VALUES($1,$2)'
  const params = [senderId, receiverId]
  const res = await pool.query(query, params)
  return res
}

//get the contact list which user have connected to
export async function getContacts(id) {
  const query = `SELECT user_name FROM users 
  INNER JOIN( 
  SELECT userid FROM contacts  WHERE connected_id=$1
  UNION
  SELECT connected_id FROM contacts WHERE userid=$1
  ) as u 
  ON users.user_id = u.userid`
  const params = [id]
  const res = await pool.query(query, params)
  return res.rows
}

//get the messages of a particular friend when  clicked on him.
export async function getUserMessages(sender_id, receiver_id) {
  const query = `SELECT * from messages WHERE sender_id = $1 AND receiver_id = $2 
    UNION 
    SELECT * from messages WHERE sender_id = $2 AND receiver_id = $1 ORDER BY message_time`
  const params = [sender_id, receiver_id]
  const res = await pool.query(query, params)
  return res.rows
}

// deleting session id
export async function deleteSession(userId) {
  const query = `Delete from sessions where user_id=$1`
  const params = [userId]
  await pool.query(query, params)
}
