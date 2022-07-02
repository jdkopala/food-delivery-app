/*
 * All routes for food_items are defined here
 * Since this file is loaded in server.js into api/food_items,
 *   these routes are mounted onto /food_items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
