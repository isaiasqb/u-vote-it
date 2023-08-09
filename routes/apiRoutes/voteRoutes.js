const express = require('express');
const router = express.Router();
const db = require('../../database/connection');
const inputCheck = require('../../utils/inputCheck');

//CREATE a vote
router.post('/vote', ({body}, res) => {
  const errors = inputCheck(body, 'witch_id', 'supreme_id');
  if (errors) {
    res.status(400).json({ error: errors});
    return;
  }
  const sqlCommand = `INSERT INTO votes (witch_id, supreme_id) VALUES (?,?)`;
  const params = [body.witch_id, body.supreme_id];
  db.query(sqlCommand, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Your vote has been casted to elect the new Ultima Supreme',
      data: body,
      changes: result.affectedRows
    });
  });
});

router.get('/votes', (req, res) => {
  const sqlCommand = `SELECT supremes.*, orders.name AS order_name, COUNT(supreme_id) AS vote_count
                      FROM votes
                      LEFT JOIN supremes ON votes.supreme_id = supremes.id
                      LEFT JOIN orders ON supremes.order_id = orders.id
                      GROUP BY supreme_id ORDER BY vote_count DESC;`
  db.query(sqlCommand, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return
    }
    res.json({
      message: 'Here are all the votes so far',
      data: rows
    })
  })

})

module.exports = router;