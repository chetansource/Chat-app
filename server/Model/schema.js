const users = `CREATE TABLE users(
    user_id serial PRIMARY KEY,
    user_name VARCHAR UNIQUE NOT NULL
    );`

const messages = `CREATE TABLE messages( 
    message_id serial PRIMARY KEY,
    message VARCHAR NOT NULL, 
    message_time TIMESTAMP NOT NULL, 
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    CONSTRAINT fk_sender_id FOREIGN KEY(sender_id) REFERENCES users(user_id),
    CONSTRAINT fk_receiver_id FOREIGN KEY(receiver_id) REFERENCES users(user_id) 
 );`

const contacts = `CREATE TABLE contacts( 
    contact_id serial PRIMARY KEY, 
    user_id integer NOT NULL, 
    connected_id integer NOT NULL, 
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id), 
    CONSTRAINT fk_connected_id FOREIGN KEY(connected_id) REFERENCES users(user_id)
    );`

const insertUser = `INSERT INTO users(user_name) VALUES('chetan');`
const insertMessage = `INSERT INTO messages(message, message_time,sender_id,receiver_id) VALUES('hey hello',current_timestamp,1,2);`
