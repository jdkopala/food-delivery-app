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

// Middleware lives here
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
const foodItemsRouter = require("./routes/food_items");
const orderItemsRouter = require("./routes/order_items");
const ordersRouter = require("./routes/orders");
const smsRouter = require('./routes/sms');
const smsResponseRouter = require('./routes/sms');

// Here are the routes for our pages, mostly for db acccess
app.use("/food_items", foodItemsRouter(db));
app.use("/order_items", orderItemsRouter(db));
app.use("/orders", ordersRouter(db));
app.use("/sms", smsRouter(db));
app.use("/sms-response", smsResponseRouter(db));

// Home page(s)

// When you land on the main page below
// It should auto populate with the entire menu

app.get("/", (req, res) => {
  req.cookies.user_id = 1;
  let cookie = req.cookies;
  const templateVars = { user_id: cookie.user_id }
  res.render("index", templateVars);
});

app.get("/1", (req, res) => {
  req.cookies.user_id = 2;
  let cookie = req.cookies;
  const templateVars = { user_id: cookie.user_id }
  res.render("admin", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
