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

async function executeQuery(query, params) {
  const client = await pool.connect()
  const res = client.query(query, params)
  client.release()
  return res
}

// add the user to the database when i user logged in
export async function insertUser(username) {
  const query = 'INSERT INTO users(user_name) VALUES($1)'
  const params = [username]
  const res = await executeQuery(query, params)
  console.log('adduser>>', res)
  return res
}

//send message to a frd
export async function insertMessage(msg) {
  const query =
    'INSERT INTO messages(message,sender_id,receiver_id) VALUES($1,$2,$3)'
  const params = [msg.text, msg.senderId, msg.receiverId]
  const res = await executeQuery(query, params)
  console.log('message>>', res)
  return res
}

//get the contact list which i have connected to
export async function getUsers(id) {
  const query =
    'select user_name from users  inner join contacts on user_id = contacts.connected_id and userid=$1'
  const params = [id]
  const res = await executeQuery(query, params)
  console.log('array>>', res.rows)
  return res.rows
}

//get the messages of a particular friend when  clicked on him.
export async function getUserMessages(sender_id, receiver_id) {
  const query =
    'select message, message_time from messages where sender_id=$1 and receiver_id=$2'
  const params = [sender_id, receiver_id]
  const res = await executeQuery(query, params)
  console.log('messages>>', res.rows)
  return res.rows
}
