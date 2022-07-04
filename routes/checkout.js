const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    console.log("Made it here!")
    res.render('../views/checkout')
  })
  return router;
};
