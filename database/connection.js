const mysql = require ('mysql2')

//connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'sqlpass1sa', //your SQL password
  database: 'covent_election'
  },
  console.log('Connected to the Covent Election database')
);

module.exports = db;