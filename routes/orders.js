const express = require('express');
const router = express.Router();
const db = require('../db/db');

module.exports = (db) => {
  // GET order id and customer id for orders from the table
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
  // POST to make changes to order in the database,
  // this request associates an order id with the items in the order in a many to many table
  router.post('/', (req, res) => {
    let currentOrder = req.body.currentOrder
    let query = `
    INSERT INTO orders (customer_id, order_date)
    VALUES ('1', Now())
    RETURNING *;
    `
    return db.query(query)
      .then((data) => {
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
        return db.query(query)
          .then (() => {
            return res.send('success')
          })
      })
  })
  // PUT request to update order status to confirmed
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
  // PUT request to update order status to declined
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
  // PUT request to update order status to Complete
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
