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
  });

  $('#soup').on('click', function () {
    let foodOption = $('#soup').text();
    $('.btn-text').text(foodOption);
  });

  $('#appetizer').on('click', function () {
    let foodOption = $('#appetizer').text();
    $('.btn-text').text(foodOption);
  });

  $('#main-entrees').on('click', function () {
    let foodOption = $('#main-entrees').text();
    $('.btn-text').text(foodOption);
  });

  $('#handhelds').on('click', function () {
    let foodOption = $('#handhelds').text();
    $('.btn-text').text(foodOption);
  });

  $('#all-items').on('click', function () {
    let foodOption = $('#all-items').text();
    $('.btn-text').text(foodOption);
  });


})
