const express = require('express');
const router = express.Router();
const db = require('../../database/connection');



//GET all ORDERS
 router.get('/orders', (req, res) => {
  const sqlCommand = `SELECT * FROM orders`;
  db.query(sqlCommand, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

//GET a SINGLE order
 router.get('/order/:id', (req, res) => {
  const sqlCommand = `SELECT * FROM orders WHERE id = ?`;
  const params = [req.params.id];
  db.query(sqlCommand, params, (err, row) => {
    if(err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

//DELETE a single ORDER
 router.delete('/order/:id', (req,res) => {
  const sqlCommand = `DELETE FROM orders WHERE id = ?`;
  const params = [req.params.id];
  db.query(sqlCommand, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      //checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'This order does not exists'
      });
    } else {
      res.json({
        message: 'Deleted', 
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  })
});

module.exports = router;