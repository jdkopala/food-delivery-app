/*
 * All routes for food_items are defined here
 * Since this file is loaded in server.js into api/food_items,
 *   these routes are mounted onto /food_items
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/db');

module.exports = (db) => {
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

  router.get("/:category", (req, res) => {
    let category = req.params.category;
    return db.query(`
    SELECT *
    FROM food_items
    WHERE menu_category = $1;
    `, [category])
    .then((data) => {
      console.log(data.rows);
      res.json(data.rows);
    })
  });
  return router;
};
