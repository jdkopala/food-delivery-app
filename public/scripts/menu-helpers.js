const db = require('../../db/db.js')

const getMenuByCategory = (category) => {
  return db.query(`
  SELECT *
  FROM food_items
  WHERE menu_category = $1;
  `, [category])
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
};

const getUserFavourites = (userId) => {
  return db.query(`
  SELECT *
  FROM user_favourites
  WHERE user_id = $1;
  `, [userId])
  .then((res) => {
    console.log(res.rows);
    return res.rows;
  })
};

const loadMenu = () => {
  $.get("/food_items")
    .then((data) => {
      $('#tweets-container').empty(),
      renderTweets(data);
    });
};

module.exports = {
  getMenuByCategory,
  getUserFavourites
}
