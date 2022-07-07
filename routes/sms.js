const express = require('express');
const router = express.Router();
const messagingResponse = require('twilio').twiml.MessagingResponse;
const db = require('../db/db');
const sendMsg = require('../helper/send-sms');

module.exports = () => {
  // POST request to send data out to restaurant/customer for notification
  router.post("/", (req, res) => {
    console.log(req.body.messageToCustomer);
    const message = req.body.messageToCustomer
    sendMsg(message)
    res.send('success')
  });

  return router;
};

