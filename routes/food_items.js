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
  // GET items from the food items table
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
  // GET items stored in the user_favourites table. Need enough info to populate menu
  router.get("/favourites", (req, res) => {
    return db.query(`
    SELECT user_favourites.*,
    food_items.name,
    food_items.description,
    food_items.prep_time_minutes,
    food_items.price_cents,
    food_items.rating,
    food_items.menu_category,
    food_items.thumbnail_url
    FROM user_favourites
    JOIN users ON customer_id = users.id
    JOIN food_items ON food_id = food_items.id
    WHERE customer_id = 1
    ORDER BY price_cents DESC;
    `)
    .then((data) => {
      res.json(data.rows);
    })
  });
  // POST to favourites, stores an item in the favourites table
  router.post("/favourites", (req, res) => {
    let meal = req.body.addMeal;
    let food_id = meal.id
    console.log(meal);
    return db.query(`
    INSERT INTO user_favourites (customer_id, food_id)
    VALUES (1, $1)
    `, [food_id])
    .then((data) => {
      return res.json(data.rows);
    })
  });
  // Retrieve items from the food items table based on the menu_category column
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
