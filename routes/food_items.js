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
    let query = `SELECT * FROM food_items ORDER BY price_cents DESC;`;
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

  router.get("/favourites", (req, res) => {
    let category = req.params.category;
    return db.query(`
    SELECT user_favourites.*, food_items.name, food_items.description, food_items.prep_time_minutes, food_items.price_cents, food_items.rating, food_items.menu_category, food_items.thumbnail_url
    FROM user_favourites
    JOIN users ON customer_id = users.id
    JOIN food_items ON food_id = food_items.id
    WHERE customer_id = 1
    ORDER BY price_cents DESC;
    `, [category])
    .then((data) => {
      res.json(data.rows);
    })
  });

  router.get("/:category", (req, res) => {
    let category = req.params.category;
    return db.query(`
    SELECT *
    FROM food_items
    WHERE menu_category = $1
    ORDER BY price_cents DESC;
    `, [category])
    .then((data) => {
      res.json(data.rows);
    })
  });
  return router;
};
