const express = require('express');
const router = express.Router();
const db = require('../db/db');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT id FROM orders
    ORDER BY id`;
    console.log(query);
   return db.query(query)
      .then(data => {
        const orders = data.rows;
        console.log("data:", data);
       return res.json({
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
  return router;
};
