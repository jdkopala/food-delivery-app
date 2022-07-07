
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

// Creates an HTML listing for each item that is taken in by most of the functions above.
const renderMenu = (data) => {
  for (let d of data) {
    let meal = createMenuElement(d);
    $(".main-page").prepend(meal); // Put the meal in the container on the page
  }
};

// Loads the entire menu from the food_items table
const loadMenu = () => {
  $.get("/food_items")
  .then((data) => {
    $('.main-page').empty();
      renderMenu(data.food_items);
    });
};
// Grabs the users favourites from the food items table
const loadUserFavourites = () => {
  $.get("/food_items/favourites")
  .then((data) => {
    console.log(data)
    renderMenu(data);
    });
};
// This function returns an ARRAY of objects that are in the users favourites.
// Not completely implemented.
const fetchUserFavouritesData = () => {
  $.get("/food_items/favourites")
  .then((data) => {
    console.log(data)
    return data;
    });
};
// This grabs categories of the menu, using the menu_category column in the food_items table
const loadCategory = (category) => {
  $.get(`/food_items/${category}`)
    .then((data) => {
      $('.main-page').empty();
      renderMenu(data);
    });
};
