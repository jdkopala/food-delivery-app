const express = require('express');
const router = express.Router();
const db = require('./db');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM order_items`;
    let param = [req.session.userCookie]
    console.log(query, param);
    db.query(query, param)
      .then(data => {
        const order_items = data.rows;
        res.json({ order_items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
