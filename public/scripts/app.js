// Customer cart object
let currentOrder = [];

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
