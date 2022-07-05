// Customer cart object
let currentOrder = [];

// Customer favourites
let favourites = [];

$(document).ready(function () {
  loadMenu();

  $('.select-btn').on('click', function () {
    if ($('.options').is(':hidden')) {
      $('.options').slideDown('slow');
    } else {
      $('.options').slideUp();
    }
  });

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

  $('#favourites').on('click', function () {
    let foodOption = $('#favourites').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    $('.checkout-container').hide();
    $('.main-page').empty();
    renderMenu(favourites);
  });

  $('#cart-button').on('mouseover', () => {
    $('#cart-button').css('cursor', 'pointer')
  });

  $('.nav-logo').on('mouseover', () => {
    $('.nav-logo').css('cursor', 'pointer')
  });

  $('.nav-logo').on('click', () => {
    loadMenu();
  });

  $('#cart-button').on('click', () => {
    generateCart(currentOrder);
  })

});

$(document).on('click', '#checkout-button', function() {
    let messageToCustomer = generateSMS(currentOrder);

    if (currentOrder.length > 0) {
      $.ajax({
        url: "http://localhost:8080/sms/",
        method: 'POST',
        data:  { messageToCustomer }
      })
      .then((data) => {
        console.log(data)
        document.location.href = 'http://localhost:8080/'
      })
    } else {
      alert('You cart is empty');
    }
})


$(document).on('click', '.add-food',(e) => {
  let addMeal = $(e.target).parent().parent().parent().data().orderObject;
  currentOrder.push(addMeal);
  let currentTotal = Number($('#cart-total').text());
  $('#cart-total').text(currentTotal + 1);
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
});
