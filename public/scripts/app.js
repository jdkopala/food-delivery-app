// Customer cart object
let currentOrder = [];

// User favourites array
let favourites = [];

$(document).ready(function () {
  loadMenu();
  // Interaction and animation for menu options dropdown
  $('.select-btn').on('click', function () {
    if ($('.options').is(':hidden')) {
      $('.options').slideDown('slow');
    } else {
      $('.options').slideUp();
    }
  });

  // Each of these pulls the appropriate category of food from the database and displays it on our page
  $('#breakfast').on('click', function () {
    let foodOption = $('#breakfast').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    loadCategory(foodOption);
  });

  $('#soup').on('click', function () {
    let foodOption = $('#soup').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    loadCategory(foodOption);
  });

  $('#appetizer').on('click', function () {
    let foodOption = $('#appetizer').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    loadCategory(foodOption);
  });

  $('#main-entrees').on('click', function () {
    let foodOption = $('#main-entrees').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    loadCategory("Entrees");
  });

  $('#handhelds').on('click', function () {
    let foodOption = $('#handhelds').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    loadCategory(foodOption);
  });

  $('#all-items').on('click', function () {
    let foodOption = $('#all-items').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    loadMenu();
  });
  // This one pulls favourites marked by the user and displays them on the main page
  $('#favourites').on('click', function () {
    let foodOption = $('#favourites').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    $('.main-page').empty();
    loadUserFavourites();
  });
  // Alter the cursor to make it obvious the logo and cart buttons are clickable
  $('#cart-button').on('mouseover', () => {
    $('#cart-button').css('cursor', 'pointer')
  });

  $('.nav-logo').on('mouseover', () => {
    $('.nav-logo').css('cursor', 'pointer')
  });

  $('.admin-login').on('mouseover', () => {
    $('.admin-login').css('cursor', 'pointer')
  });

  $('.customer-login').on('mouseover', () => {
    $('.customer-login').css('cursor', 'pointer')
  });
  // When a user clicks on the logo, it returns to the main menu
  $('.nav-logo').on('click', () => {
    loadMenu();
  });
  // Clicking on the cart button brings up the generated checkout pagea
  $('#cart-button').on('click', () => {
    generateCart(currentOrder);
    $('.place-order').hide();
  });

  $('.admin-login').on('click', () => {
    loadOrders();
  })

  $('.customer-login').on('click', () => {
    loadCustomerOrders();
  })
});

// Always waiting for a click on the checkout button. Displays a message and sends notification to restaurant
$(document).on('click', '#checkout-button', function() {
  let messageToCustomer = 'A new order has been received. Please check the dashboard for more details.'
    if (currentOrder.length > 0) {
      $.ajax({
        url: "http://localhost:8080/orders/",
        method: 'POST',
        data:  { currentOrder }
      })
      .then((data) => {
        console.log(data);
        currentOrder = [];
        $('.place-order-msg').text('Your order has been sent to the chef, you will receive a response soon 💙');
        setTimeout(() => {
          $('.place-order').slideUp();
        }, 6000)
        $('#cart-total').text(0);
        $('div.order-item').empty();
        $('.place-order').slideDown();
      })
      $.ajax({
        url: 'http://localhost:8080/sms/',
        method: 'POST',
        data: { messageToCustomer }
      })
    } else {
      $('.warning-msg').text('Your cart is empty. Please select a meal.');
      setTimeout(() => {
        $('.error-msg').slideUp();
      }, 5000)
      return $('.error-msg').slideDown();
    }
});

// Admin side buttons below to confirm, decline and complete orders received by the restaurant
$(document).on('click', '.confirm-order', async function(e) {
  let orderId = $(e.target).parent().parent().parent().children('.order-item').children('.order-detail').children('.order-id-detail').children('#order-id').text();
  let messageToCustomer = generateSMS(await loadOrderDetails(orderId));

  $.ajax({
    url: "http://localhost:8080/sms/",
    method: 'POST',
    data:  { messageToCustomer }
  })
  .then((data) => {
    console.log('##', data);
    $(e.target).parent().parent().parent().children('.order-item').children('.order-detail').children('#order-status').text('Confirmed');
    $(e.target).siblings('.refuse-order').hide();
    $(e.target).hide();
    $(e.target).siblings('.complete-order').show();
    // AJAX request to PUT new data into the database (Confirmed order)
    $.ajax({
      url: `http://localhost:8080/orders/${orderId}/confirm`,
      method: 'PUT',
      data: { orderId }
    })
    .then((data) => {
      console.log(data);
    })
  })
  .catch((err) => {
    console.log("err:", err);
  })
});


$(document).on('click', '.refuse-order', function(e) {
  let orderId = $(e.target).parent().parent().parent().children('.order-item').children('.order-detail').children('.order-id-detail').children('#order-id').text();
  let messageToCustomer = 'Unfortunately, we cannot accept your order at this time. Apologies, try again later';

  $.ajax({
    url: "http://localhost:8080/sms/",
    method: 'POST',
    data:  { messageToCustomer }
  })
  .then((data) => {
    console.log(data);
    $(e.target).parent().parent().parent().children('.order-item').children('.order-detail').children('#order-status').text('Declined');
    $(e.target).siblings('.complete-order').hide();
    $(e.target).siblings('.confirm-order').hide();
    $(e.target).hide();
    // AJAX request to PUT new data into the database (Declined order)
    $.ajax({
      url: `http://localhost:8080/orders/${orderId}/decline`,
      method: 'PUT',
      data: { orderId }
    })
    .then((data) => {
      console.log(data);
    })
  })
});

$(document).on('click', '.complete-order', function(e) {
  let orderId = $(e.target).parent().parent().parent().children('.order-item').children('.order-detail').children('.order-id-detail').children('#order-id').text();
  let messageToCustomer = `Thank you for picking up order#${orderId}! See you next time!`

  $.ajax({
    url: "http://localhost:8080/sms/",
    method: 'POST',
    data:  { messageToCustomer }
  })
  .then((data) => {
    console.log(data);
    $.ajax({
      url: `http://localhost:8080/orders/${orderId}/complete`,
      method: 'PUT',
      data:  { orderId }
    })
    .then((data) => {
      console.log(data);
      $(e.target).parent().parent().parent().children('.order-item').children('.order-detail').children('#order-status').text('Completed');
      $(e.target).hide();
      $(e.target).siblings('.confirm-order').hide();
      $(e.target).siblings('.complete-order').hide();
    })
  })
});

// This button will add food to the cart, so the customer can send an order
$(document).on('click', '.add-food',(e) => {
  let addMeal = $(e.target).parent().parent().parent().data().orderObject;
  currentOrder.push(addMeal);
  let currentTotal = Number($('#cart-total').text());
  $('#cart-total').text(currentTotal + 1);
  $(e.target).addClass('bounce');
  $(e.target).addClass('clicks');
  setTimeout(() => {
    $(e.target).removeClass('bounce');
  }, 3000);
});

// Clicking on the heart buttons will add favourites to the favourites array, and to the database
$(document).on('click', '.heart-food',(e) => {
  let addMeal = $(e.target).parent().parent().parent().data().orderObject;
  const checkForFavourite = (addMeal) => {
    for (let f of favourites) {
      if (addMeal.id === f.id) {
        alert('Already saved to your favourites!');
        return true;
      }
    }
  }
  if (!checkForFavourite(addMeal)) {
    favourites.push(addMeal);
    $.ajax({
      url: 'http://localhost:8080/food_items/favourites',
      method: 'POST',
      data: { addMeal }
    });
  }
});

// On the dashboard for client and admin side, this slides out the div containing the details for each order.
// On the admin side this includes buttons to manage the orders
$(document).on('click', '.order-detail-button', function(e) {
  e.preventDefault();
  let orderDetails = $(e.target).parent().parent().siblings('.cx-order-detail');
  if ($(orderDetails).is(':hidden')) {
    $(orderDetails).slideDown('slow');
  } else {
    $(orderDetails).slideUp();
  }
})
