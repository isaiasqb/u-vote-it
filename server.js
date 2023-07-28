// import express
const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

// GET ALL the supremes from the database
app.get('/api/supremes', (req, res) => {
  const sqlCommand =`SELECT supremes.*, orders.name
                      AS order_name
                      FROM supremes
                      LEFT JOIN orders
                      ON supremes.order_id = orders.id`;
  db.query(sqlCommand, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return
    }
    res.json({
      message: 'success',
      data: rows
    })
  })
})


// GET a SINGLE supreme
app.get('/api/supreme/:id', (req, res) => {
  const sqlCommand =`SELECT supremes.*, orders.name
                      AS order_name
                      FROM supremes
                      LEFT JOIN orders
                      ON supremes.order_id = orders.id
                      WHERE id = ?`;
  const params = [req.params.id];

  db.query(sqlCommand, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    })
  });
})

// DELETE a single CANDIDATE
app.delete('/api/supreme/:id', (req, res) => {
  const sqlCommand = `DELETE FROM supremes WHERE id = ?`;
  const params = [req.params.id];

  db.query(sqlCommand, params, (err, result) => {
    if (err){
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Supreme is not in the database'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// CREATE another supreme candidate
app.post('/api/supreme', ({body}, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'royal_lineage');
  if (errors) {
    res.status(400).json({ error: errors, message: "Not formated correctly"});
    return
  }

  const sqlCommand = `INSERT INTO supremes (first_name, last_name, royal_lineage) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.royal_lineage];

  db.query(sqlCommand, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


//GET all ORDERS
app.get('/api/orders', (req, res) => {
  const sqlCommand = 
})


// DEFAULT reponse for any other requests (Not Found) - ALWAYS last call or it will override others
app.use((req, res) => {
  res.status(404).end();
})

//function that will start the Express.js server on port 3001.
app.listen(PORT, () => {
  console.log(`You have summoned a new server for the ULTIMA SUPREME election on port ${PORT}`)
});