/**
*  @name rollto
*  @description Simple animated scroll to anchor plugin
*  @version 1.0
*/
(function ($) {
    'use strict';

    $(function () {
      // var $rollto = $('.rollto');
      // if (!$rollto.length) { return false; }

      var $htmlBody = $('html, body'),
        $sticky = $('.sticky');

      // Bind click event (live)
      $(document)
        .off('click.rollto')
        .on('click.rollto', '.rollto', function (e) {
          e.preventDefault(); //stop the default anchor jump

          var $this = $(this),
            target = $this.attr('href'),
            $target = $(target);

          if (!$target.length) { return false; }

          var offset = $sticky.length ? $sticky.outerHeight() : 0;
          $htmlBody.stop().animate({ scrollTop: $target.offset().top - offset }, 500);        
      });
    });
}(jQuery));
