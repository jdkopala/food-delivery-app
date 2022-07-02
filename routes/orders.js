const express = require('express');
const router = express.Router();
const db = require('./db');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT id FROM orders
    ORDER BY id`;
    console.log(query);
    db.query(query)
      .then(data => {
        const orders = data.rows;
        res.json({
          orders
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });
};
