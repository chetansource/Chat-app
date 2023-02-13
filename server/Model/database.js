import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

// console.log('before>>>', dotenv.config())

const databaseConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}

// console.log('after>>>', databaseConfig)

const pool = new Pool(databaseConfig)

console.log('Connected to the database')

//checking if the username already exists or not
export async function userNameAvailable(username) {
  const query = 'SELECT user_name from users WHERE user_name = $1'
  const params = [username]
  const res = await pool.query(query, params)
  if (res.rowCount === 1) return 'UnAvailable'
  return 'Available'
}

// add the user to the database when i user logged in
export async function insertUser(username) {
  const query = 'INSERT INTO users(user_name) VALUES($1)'
  const params = [username]
  const res = await pool.query(query, params)
  console.log('adduser>>', res.rows)
  return res.rows
}

//send message to a frd
export async function insertMessage(msg) {
  const query =
    'INSERT INTO messages(message,sender_id,receiver_id) VALUES($1,$2,$3)'
  const params = [msg.text, msg.senderId, msg.receiverId]
  const res = await pool.query(query, params)
  console.log('message>>', res)
  return res
}

//get the contact list which i have connected to
export async function getUsers(id) {
  const query = `SELECT user_name FROM users 
  INNER JOIN( 
  SELECT userid FROM contacts  WHERE connected_id=$1
  UNION
  SELECT connected_id FROM contacts WHERE userid=$1
  ) as u 
  ON users.user_id = u.userid`
  const params = [id]
  const res = await pool.query(query, params)
  console.log('array>>', res.rows)
  return res.rows
}

//get the messages of a particular friend when  clicked on him.
export async function getUserMessages(sender_id, receiver_id) {
  const query = `SELECT message, message_time from messages WHERE sender_id = $1 AND receiver_id = $2 
    UNION 
    SELECT message, message_time from messages WHERE sender_id = $2 AND receiver_id = $1`
  const params = [sender_id, receiver_id] // i am just retriving the messages which 1 sent to 2 not the messages which are 2 sent to  1.
  const res = await pool.query(query, params)
  console.log('messages>>', res.rows)
  return res.rows
}
