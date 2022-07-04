
$(document).ready(function () {
  let currentOrder = [];
  loadMenu();

  $('.select-btn').on('click', function () {
    if ($('.options').is(':hidden')) {
      $('.options').slideDown('slow');
    } else {
      $('.options').slideUp();
    }
  });

  $('#breakfast').on('click', function () {
    let foodOption = $('#breakfast').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#soup').on('click', function () {
    let foodOption = $('#soup').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#appetizer').on('click', function () {
    let foodOption = $('#appetizer').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#main-entrees').on('click', function () {
    let foodOption = $('#main-entrees').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory("Entrees");
  });

  $('#handhelds').on('click', function () {
    let foodOption = $('#handhelds').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#all-items').on('click', function () {
    let foodOption = $('#all-items').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadMenu();
  });

  $('#cart-button').on('mouseover', () => {
    $('#cart-button').css('cursor', 'pointer')
  })

  $('#cart-button').on('click', () => {
    console.log("BEEP")
    $.get('/checkout', (req, res) => {
      res.render('checkout')
    })
  });

})
