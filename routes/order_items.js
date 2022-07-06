const express = require('express');
const router = express.Router();
const db = require('../db/db');

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let orderId = req.params.id
    let query = `
    SELECT order_items.*, food_items.name, food_items.price_cents, food_items.prep_time_minutes
    FROM order_items
    JOIN food_items ON food_items.id = order_items.food_id
    WHERE order_id = $1
    `;
    db.query(query, [orderId])
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
