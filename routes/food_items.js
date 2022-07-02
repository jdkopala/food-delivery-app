const express = require('express');
const router = express.Router();
const db = require('./db');

module.exports = () => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM food_items`;
    db.query(query)
      .then(data => {
        const food_items = data.rows;
        res.json({ food_items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}
