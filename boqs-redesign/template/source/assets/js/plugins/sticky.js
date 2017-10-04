/**
*  @name sticky
*  @description Initialisation of the Stickyfill plugin
*  @version 1.0
*/
(function ($) {
    'use strict';

    $(function () {
      var $sticky = $('.sticky');
      if (!$sticky.length) { return false; }

      $sticky.Stickyfill();
    });
}(jQuery));
