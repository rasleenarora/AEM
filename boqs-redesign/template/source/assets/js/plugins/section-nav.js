/**
*  @name section-nav
*  @description Simple animated scroll to anchor plugin
*  @version 1.0
*/
(function ($) {
    'use strict';

    // Cache selectors
    var $navbarSection;

    var initNavbarSection = function () {
      // Populate menu
      var menuItems = [],
        $sections = $('[data-section-nav]');
      $sections.each(function () {
        var $this = $(this),
          id = $this.attr('id'),
          heading = $this.find(':header').eq(0).text();

        menuItems.push('<li><a href="#' + id + '" class="section-menu-link rollto">' + heading + '</a></li>');
      });

      // Insert container and <ul> markup
      if (menuItems.length) {
        $('<div class="container"><ul class="nav section-menu">' + menuItems.join('') + '</ul></div>').appendTo($navbarSection);
      }
    };

    /*var bindLinkClick = function () {
      // Live
      $(document).on('click', '.section-menu > li a', function (e) {
        $(e.delegateTarget).find('> li').removeClass('active'); //clear all
        $(this).parent('li').addClass('active'); //set active        
      });
    };*/

    var initScrollSpy = function () {
      var $body = $('body'),
        $sticky = $('.sticky');
      
      $body.scrollspy({ 
        target: '.navbar-section',
        offset: ($sticky.length ? $sticky.outerHeight() + 1 : 0)
      });

      // 'Debounced' window resize
      $(window).on('resize', function () {
        var resizeTimer;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          $body.scrollspy('refresh');                    
        }, 250);
      });      
    };

    $(function () {
      $navbarSection = $('.navbar-section');
      if (!$navbarSection.length) { return false; }

      initNavbarSection();
      // bindLinkClick();
      initScrollSpy();
    });
}(jQuery));
