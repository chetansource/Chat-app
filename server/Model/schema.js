const users = `CREATE TABLE users(
    user_id serial PRIMARY KEY,
    user_name VARCHAR UNIQUE NOT NULL,
    password VARCHAR UNIQUE NOT NULL
    );`

const messages = `CREATE TABLE messages( 
    message_id serial PRIMARY KEY,
    message VARCHAR NOT NULL, 
    message_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    CONSTRAINT fk_sender_id FOREIGN KEY(sender_id) REFERENCES users(user_id),
    CONSTRAINT fk_receiver_id FOREIGN KEY(receiver_id) REFERENCES users(user_id) 
 );`

const contacts = `CREATE TABLE contacts( 
    contact_id serial PRIMARY KEY, 
    userID integer NOT NULL, 
    connected_id integer NOT NULL, 
    CONSTRAINT fk_user_id FOREIGN KEY(userID) REFERENCES users(user_id), 
    CONSTRAINT fk_connected_id FOREIGN KEY(connected_id) REFERENCES users(user_id)
    );`

const sessions = `CREATE TABLE sessions(
    session_id VARCHAR UNIQUE NOT NULL,
    user_id integer NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id)
);`

const insertUser = `INSERT INTO users(user_name) VALUES('chetan');`
const insertMessage = `INSERT INTO messages(message,sender_id,receiver_id) VALUES('hey hello',1,2);`
const getContactList = `select receiver_id from contacts where sender_id = id`
