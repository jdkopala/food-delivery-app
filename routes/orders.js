const express = require('express');
const router = express.Router();
const db = require('../db/db');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `
    SELECT orders.*, users.name
    FROM orders
    JOIN users ON users.id = orders.customer_id
    ORDER BY orders.id DESC;
    `;
   return db.query(query)
      .then(data => {
        const orders = data.rows;
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

  router.put('/:id/confirm', (req, res) => {
    let id = req.params.id
    console.log('id: ', id);
    let query = `
    UPDATE orders
    SET status = 'Confirmed'
    WHERE id = $1;
    `
    return db.query(query, [id])
    .then(() => {
      res.send('success')
    })
  })

  router.put('/:id/decline', (req, res) => {
    let id = req.params.id
    console.log('id: ', id);
    let query = `
    UPDATE orders
    SET status = 'Declined'
    WHERE id = $1;
    `
    return db.query(query, [id])
    .then(() => {
      res.send('success')
    })
  })

  router.put('/:id/complete', (req, res) => {
    let id = req.params.id
    console.log('id: ', id);
    let query = `
    UPDATE orders
    SET status = 'Complete'
    WHERE id = $1;
    `
    return db.query(query, [id])
    .then(() => {
      res.send('success')
    })
  })

  return router;
};
