const express = require('express');
const router = express.Router();
const db = require('../../database/connection');
const inputCheck = require('../../utils/inputCheck');


// GET ALL supremes
router.get('/supremes', (req, res) => {
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


// GET SINGLE supreme
router.get('/supreme/:id', (req, res) => {
  const sqlCommand =`SELECT supremes.*, orders.name
                      AS order_name
                      FROM supremes
                      LEFT JOIN orders
                      ON supremes.order_id = orders.id
                      WHERE supremes.id = ?`;
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


// CREATE supreme
router.post('/supreme', ({body}, res) => {
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

//UPDATE a supreme's ORDER
router.put('/supreme/:id', (req, res) => {
  const errors = inputCheck(req.body, 'order_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sqlCommand = `UPDATE supremes SET order_id = ?
  WHERE id = ?`;
  const params = [req.body.order_id, req.params.id];
  db.query(sqlCommand, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      //check if arecord id found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Supreme is not part of the election'
      });
    } else {
      res.json({ 
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  })
});
 
// DELETE a suprme
  router.delete('/supreme/:id', (req, res) => {
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

  module.exports = router;