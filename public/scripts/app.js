// Customer cart object
let currentOrder = [];

// Customer favourites
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
    renderMenu(favourites);
  });
  // Alter the cursor to make it obvious the logo and cart buttons are clickable
  $('#cart-button').on('mouseover', () => {
    $('#cart-button').css('cursor', 'pointer')
  });

  $('.nav-logo').on('mouseover', () => {
    $('.nav-logo').css('cursor', 'pointer')
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

});

$(document).on('click', '#checkout-button', function() {
    let messageToCustomer = generateSMS(currentOrder);

    if (currentOrder.length > 0) {
      $.ajax({
        url: "http://localhost:8080/orders/",
        method: 'POST',
        data:  { messageToCustomer, currentOrder }
      })
      .then((data) => {
        console.log(data);
        currentOrder = [];
        $('.place-order-msg').text('Your order has been sent to the chef, you will receive a response soon 💙');
        setTimeout(() => {
          $('.place-order').slideUp();
        }, 8000)
        $('#cart-total').text(0);
        $('div.order-item').empty();
        $('.place-order').slideDown();
        setTimeout(() => {
          document.location.href = 'http://localhost:8080/'
        }, 10000);
      })
    } else {
      $('.warning-msg').text('Your cart is empty. Please select a meal.');
      setTimeout(() => {
        $('.error-msg').slideUp();
      }, 5000)
      return $('.error-msg').slideDown();
    }
})


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
  }
  $(e.target).addClass('bounce');
  $(e.target).addClass('clicked');

});
