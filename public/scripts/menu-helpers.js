
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
    $('.main-page').empty();
      console.log(data);
      renderMenu(data.food_items);
    });
};

const loadCategory = (category) => {
  $.get(`/food_items/${category}`)
    .then((data) => {
      $('.main-page').empty();
      console.log(data);
      renderMenu(data);
    });
};

// Create HTML element and inject meal data so it renders on the page
const createMenuElement = (mealData) => {
  let $meal = (`
  <article class="food-item" data-order-object='${JSON.stringify(mealData)}'>

    <div class="meal-info">
      <div class="food-name" id='food-name'>${mealData.name}</div>
      <div class="meal-price">$${mealData.price_cents / 100}</div>
      <div class="food-description">
        <p>${mealData.description}</p>
      </div>

      <div class="food-detail">
        <i class="fa-solid fa-heart heart-food heart"></i>
        <div class="prep-time">prep-time: ${mealData.prep_time_minutes} mins</div>
        <i class="fa-solid fa-cart-shopping add-food"></i>
      </div>
    </div>

    <div class="food-img">
      <img class="food-pic" src=${mealData.thumbnail_url}>
    </div>
  </article>`);

  return $meal;
};

const renderMenu = (data) => {
  for (let d of data) {
    let meal = createMenuElement(d);
    $(".main-page").prepend(meal); // Put the meal in the container on the page
  }
};
