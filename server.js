// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const foodItemsRouter = require("./routes/food_items");
const orderItemsRouter = require("./routes/order_items");
const ordersRouter = require("./routes/orders");
const smsRouter = require('./routes/sms');
const smsResponseRouter = require('./routes/sms');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/food_items", foodItemsRouter(db));
app.use("/order_items", orderItemsRouter(db));
app.use("/orders", ordersRouter(db));
app.use("/sms", smsRouter(db));
app.use("/sms-response", smsResponseRouter(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// When you land on the main page below
// It should auto populate with the entire menu

app.get("/1", (req, res) => {
  req.cookies.user_id = 1;
  console.log('cookie: ', req.cookies)
  res.render("index");
});

app.get("/2", (req, res) => {
  req.cookies.user_id = 2;
  console.log('cookie: ', req.cookies)
  res.render("admin");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
