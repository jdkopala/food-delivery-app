const express = require('express');
const router = express.Router();
const db = require('../db/db');
//const sendMsg = require('../scripts/send-sms');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT orders.*, users.name
    FROM orders
    JOIN users ON users.id = orders.customer_id
    ORDER BY id
    `;
    console.log(query);
   return db.query(query)
      .then(data => {
        const orders = data.rows;
        // console.log("data:", data.rows);
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

  router.post('/', (req, res) => {
    let currentOrder = req.body.currentOrder
    console.log('currentOrder: ', currentOrder)
    let query = `
    INSERT INTO orders (customer_id, order_date)
    VALUES ('1', Now())
    RETURNING *;
    `
    return db.query(query)
      .then((data) => {
        console.log('order_id ', data.rows[0].id);
        query = `
        INSERT INTO order_items (order_id, food_id)
        `
        for (let i = 0; i < currentOrder.length; i++) {
          query += `
          VALUES (${data.rows[0].id}, ${currentOrder[i]['id']});
          `
          if (i !== currentOrder.length - 1) {
            query +=`
            INSERT INTO order_items (order_id, food_id)
            `
          }
        }
        console.log(query)
        return db.query(query)
          .then (() => {
            console.log(data)
            return res.send('success')
          })
      })
  })
  return router;
};
