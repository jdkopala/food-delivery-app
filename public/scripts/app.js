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
    loadCategory(foodOption);
  });

  $('#soup').on('click', function () {
    let foodOption = $('#soup').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#appetizer').on('click', function () {
    let foodOption = $('#appetizer').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#main-entrees').on('click', function () {
    let foodOption = $('#main-entrees').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory("Entrees");
  });

  $('#handhelds').on('click', function () {
    let foodOption = $('#handhelds').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadCategory(foodOption);
  });

  $('#all-items').on('click', function () {
    let foodOption = $('#all-items').children().text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
    loadMenu();
  });

  $('#cart-button').on('mouseover', () => {
    $('#cart-button').css('cursor', 'pointer')
  });

  $('#cart-button').on('click', () => {
    generateCart(currentOrder);
  })

});
