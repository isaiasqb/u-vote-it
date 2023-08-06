const express = require('express');
const router = express.Router();
const db = require('../../database/connection');
const inputCheck = require('../../utils/inputCheck');

//GET all witches
router.get('/witches', (req, res) => {
  const sqlCommand = `SELECT * FROM witches ORDER BY last_name DESC`;
  db.query(sqlCommand, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message:'Success',
      data: rows,
    });
  });
});

//GET a single witch
router.get('/witch/:id', (req, res) => {
  const sqlCommand = `SELECT * FROM witches WHERE id = ?`;
  const params = [req.params.id];
  db.query(sqlCommand, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

//POST a new voter
router.post('/witch', ({body}, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'element');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sqlCommand = `INSERT INTO witches (first_name, last_name, element) VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.element];
  db.query(sqlCommand, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: `${body.first_name} ${body.last_name} is now registered as a voter.`,
      data: body
    });
  });
});

//UPDATE a witch's element
router.put('/witch/:id', (req, res) => {
  const errors = inputCheck(req.body, 'element');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sqlCommand = `UPDATE witches SET element = ? WHERE id = ?`;
  const params = [req.body.element, req.params.id];
  db.query(sqlCommand, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({ 
        message: 'This witch is not participating in the election'
      })
    } else {
      res.json({ 
        message: 'Success', 
        data: req.body, 
        changes: result.affectedRows
      });
    }
  });
});

// DELETE a witch
router.delete('/witch/:id', (req, res) => {
  const sqlCommand = `DELETE FROM witches WHERE id = ?`;
  db.query(sqlCommand, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Witch is not part of this election'
      });
    } else {
      res.json({
        message: 'delete',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;