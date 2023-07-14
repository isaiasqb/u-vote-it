// import express
const express = require('express');
const mysql = require('mysql2');

//add PORT designation & app expression
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ enconded: false }));
app.use(express.json());


//connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'sqlpass1sa', //your SQL password
  database: 'covent_election'
  },
  console.log('Connected to the Covent Election database')
)


//TEST the connection with a GET test route 
app.get('/', (req, res) => {
  res.json({
    message: 'Long reign to the new SUPREME!'
  })
});

// Default reponse for any other requests (Not Found) - ALWAYS last call or it will override others
app.use((req, res) => {
  res.status(404).end();
})

//function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
  console.log(`You have summoned a new server for the ULTIMA SUPREME election on port ${PORT}`)
});