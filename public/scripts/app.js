// Client facing scripts here
$(document).ready(function () {

  $('.select-btn').on('click', function () {
    if ($('.options').is(':hidden')) {
      $('.options').slideDown('slow');
    } else {
      $('.options').slideUp();
    }
  });

  



})
