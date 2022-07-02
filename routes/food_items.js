/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = () => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM food_items`;
    db.query(query)
    .then(data => {
      const food_items = data.rows;
      res.json( { food_items });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  });
  return router;
}
