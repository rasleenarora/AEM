/**
*  @name autosuggest
*  @description Initialising the typeahead.js plugin
*  @version 1.0
*/
(function ($) {
    'use strict';

    // Cache selector
    var $autosuggestForm,
      $autosuggestInput;

    var initAutoSuggest = function () {
      var maxResults = $autosuggestForm.attr('data-maxautosuggestresults') || 5,
        templateHeaderText = $autosuggestForm.attr('data-quicklinkslabel') || 'Quick links',
        templateNotFoundText = $autosuggestForm.attr('data-notfoundlabel') || 'Press enter to search',
        defaultSuggestions = window.defaultSuggestions || '';

      // Init Bloodhound
      var results = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: function (obj) { return obj.text; },
        sufficient: maxResults,

        // Local will power the default suggestions feature
        local: defaultSuggestions,

        remote: {
          // url: 'https://api.myjson.com/bins/z76l?%QUERY',
          // url: 'https://api.myjson.com/bins/ppd1?%QUERY',
          url: '/services/boqs-redesign/getAutoSuggestions?key=%QUERY&maxautosuggestresults=' + maxResults,
          wildcard: '%QUERY'
        }
      });  

      // Init Typeahead
      $autosuggestInput.typeahead({
        hint: false,
        highlight: true,
        minLength: 0, //needed for default suggestions
      },
      {
        name: 'results',
        display: 'text',
        source: function (query, sync, async) {
          if (query === '') {
            // Get default suggestions
            sync(results.all().slice(0, maxResults)); //take first x results from local datum (via local)
          }
          else {
            // Normal (async) search
            results.search(query, sync, async);
          }
        },
        limit: maxResults, //max suggestions to be displayed
        templates: {
          header: '<h3 class="tt-heading">' + templateHeaderText + '</h3>',
          notFound: [
            '<div class="tt-empty">' + templateNotFoundText + '</div>'
          ]
        },
      });        
    };

    var bindEvents = function () {
      // Add event handlers
      $autosuggestInput
        .on('typeahead:select typeahead:autocomplete', function (event, suggestion) {
          window.location = suggestion.value;
        })
        .on('typeahead:open', function () {
          $(this).parent().addClass('active');
        })
        .on('typeahead:close', function () {
          $(this).parent().removeClass('active');
        });

      // Remove cursor class on hover
      $(document).on('mouseleave mouseenter', '.twitter-typeahead .tt-suggestion', function () {
        $(this).siblings().removeClass('tt-cursor');
      });
    };


    $(function () {
      $autosuggestForm = $('#search-form-global');
      if (!$autosuggestForm.length) { return false; }

      $autosuggestInput = $autosuggestForm.find('[type="text"], [type="search"]').eq(0);
      if (!$autosuggestInput.length) { return false; }

      initAutoSuggest();
      bindEvents();
    });
}(jQuery));
