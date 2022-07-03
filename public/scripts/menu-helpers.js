
// const getUserFavourites = (userId) => {
//   return db.query(`
//   SELECT *
//   FROM user_favourites
//   WHERE user_id = $1;
//   `, [userId])
//   .then((res) => {
//     console.log(res.rows);
//     return res.rows;
//   })
// };

const loadMenu = () => {
  $.get("/food_items")
    .then((data) => {
      console.log(data),
      renderMenu(data.food_items);
    });
};

const loadCategory = (category) => {
  $.get(`/food_items/${category}`)
    .then((data) => {
      console.log(data),
      renderMenu(data);
    });
};

// Create HTML element and inject meal data so it renders on the page
const createMenuElement = (mealData) => {
  let $meal = (
    `<article class="food-item">

    <div class="meal-info">
      <div class="food-name">${mealData.name}</div>
      <div class="meal-price">$${mealData.price_cents / 100}</div>
      <div class="food-description">
        <p>${mealData.description}</p>
      </div>

      <div class="food-detail">
        <i class="fa-solid fa-heart" id="heart"></i>
        <div class="prep-time">prep-time: ${mealData.prep_time_minutes} mins</div>
        <i class="fa-solid fa-cart-shopping" id="add-food"></i>
      </div>
    </div>

    <div class="food-img">
      <img class="food-pic" src="https://questionjapan.com/wp-content/uploads/2019/09/japanese-food.jpg" >
    </div>
  </article>`);

  return $meal;
};

const renderMenu = (data) => {
  $('.main-page').empty();
  for (let d of data) {
    console.log(d)
    let $meal = createMenuElement(d);
    $(".main-page").prepend($meal); // Put the meal in the container on the page
  }
};
