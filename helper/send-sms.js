require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const sendMsg = function(body) {
  client.messages
    .create({
       body,
       from: '+19707158485',
       to: process.env.MY_PHONE_NUMBER
     })
    .then(message => console.log(message.sid));
}

module.exports = sendMsg;
