jQuery(document).ready(function ($) {

  // put something around resize and desktop only
  var $masonry = $('.card-container');
  if (!$masonry.length) { return false; }

  $masonry.masonry({
    // options
    itemSelector: '.resultcardcomp'
  });

  $masonry.imagesLoaded().progress(function () {
    $masonry.masonry('layout');
    $('.resultcardcomp.basecomp.section').fadeIn();
  });
});
