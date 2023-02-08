import pg from 'pg'
import dotenv from 'dotenv'
import { query } from 'express'

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

async function addUser(username) {
  const query = 'INSERT INTO users(user_name) VALUES($1)'
  const params = [username]
  const res = await executeQuery(query, params)
  console.log('adduser>>', res)
  return res
}

async function insertMessage(msg) {
  const query =
    'INSERT INTO messages(message, message_time,sender_id,receiver_id) VALUES($1,$2,$3,$4)'
  const params = [msg.text, current_timestamp, msg.senderId, msg.receiverId]
  const res = await executeQuery(query, params)
  return res
}

async function getUsers() {
  const query = 'select * from users'
  const res = await executeQuery(query)
  return res
}

async function getMessages() {
  const query = 'select * from messages'
  const res = await executeQuery(query)
  return res
}
// const data = await pool.query('select * from users')
// console.log('data>>>', data.rows)
// const message = await pool.query('select * from messages')
// console.log('messages>>', message.rows)
