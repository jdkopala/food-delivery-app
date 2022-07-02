const foodItems = function(){
  return db.query(`SELECT * FROM food_items`,)
  .then(res => res.rows);
}
exports.foodItems = foodItems;
