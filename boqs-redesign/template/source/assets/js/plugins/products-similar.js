/**
*  @name Products Similar
*  @description Builds the Similar items panel on leaf-level pages, powered by AJAX and Moustache templating (using on-page markup)
*  @version 1.0
*/
(function ($) {
    'use strict';

    // Cache selectors
    var $similar;

    /*var data = {
      products: [
        {
          title: "Platinum with Velocity points",
          descriptionHtml: "<ul><li><span class=\"tick-list\">Earn 1 Velocity Point for every $10 of daily average balance in your account, calculated at the end of each month</span></li><li><span class=\"tick-list\">No establishment or account keeping fees</span></li><li><span class=\"tick-list\">10 free ATM withdrawals per month at all major bank ATMs Australia-wide</span></li></ul>",
          imgSrc: "http://lorempixel.com/1000/333/nature/?1",
          url: "http://google.com"
        },
        {
          title: "Managing money",
          descriptionHtml: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p><p>Accusamus a saepe eaque optio doloremque ipsam dolore sequi, voluptate animi aliquid.</p>",
          imgSrc: "http://lorempixel.com/1000/333/nature/?2",
          url: "http://google.com"
        }
      ]
    };*/

    var notFound = function () {
      $similar.remove(); //remove unnecessary placeholder element
      console.log('No similar items found');
      return false;
    };

    var render = function (block) {
      var $block = (block instanceof jQuery) ? block : $(block),
        nodePath = $block.attr('data-nodepath') || '';

      // Check nodePath value (provided via data attribute)
      if (!nodePath) { 
        console.log('No nodePath provided');
        return notFound();
      }

      $.ajax({ 
        url: '/services/boqs-redesign/getSimilarProducts',
        // url: 'https://api.myjson.com/bins/om0d',
        // url: 'https://api.myjson.com/bins/4p4pl', //empty object
        // url: 'https://api.myjson.com/bins/4ad2p', //empty products key
        type: 'GET',
        data: { nodePath: nodePath },
        success: function (data) {
          if (!data || $.isEmptyObject(data) || data.products.length === 0) {
            return notFound();
          }

          var template = $block.find('.template').html(),
            rendered = Mustache.render(template, data);

          $similar.replaceWith(rendered);
        },
        error: function () { 
          return notFound();
        }
      });               
    };

    // Init the Similar items panel (placeholder)
    var initSimilar = function () {
      $similar = $('.placeholder-similar');
      if (!$similar.length) { return false; }

      render($similar);
    };

    // DOM ready
    $(function () {
      initSimilar();
    });
}(jQuery));
