// Client facing scripts here
$(document).ready(function () {

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
  });

  $('#soup').on('click', function () {
    let foodOption = $('#soup').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
  });

  $('#appetizer').on('click', function () {
    let foodOption = $('#appetizer').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
  });

  $('#main-entrees').on('click', function () {
    let foodOption = $('#main-entrees').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
  });

  $('#handhelds').on('click', function () {
    let foodOption = $('#handhelds').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
  });

  $('#all-items').on('click', function () {
    let foodOption = $('#all-items').text();
    $('.btn-text').text(foodOption);
    $('.options').slideUp();
  });


})
