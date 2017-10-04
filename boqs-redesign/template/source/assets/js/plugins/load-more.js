/**
*  @name Load more
*  @description This plugin is used for loading more card in "card-container" component
*  @version 1.0
*  @options
*    numberMore: 5,
     itemSelector: '.item',
     triggerSelector: '.load-more-trigger',
     hiddenClass: 'hidden',
     ignoreClass: 'ignore-item',
     loadedMoreCallback: null,
     noMoreResultCallback: null
*  @methods
*    init
*    hideItems
*    loadMore
*    destroy
*/
(function ($, window) {
    'use strict';

    var pluginName = 'load-more';

    var getHiddenItems = function () {
        var options = this.options,
            items = $(options.itemSelector + ':not(.' + options.ignoreClass + ').' + options.hiddenClass, this.element);
        return items;
    };

    var getVisibleItems = function () {
        var options = this.options,
            items = $(options.itemSelector + ':not(.' + options.ignoreClass + ')', this.element);
        return items;
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            that.vars = {
                triggerElement: $(that.options.triggerSelector, that.element)
            };

            that.hideItems();
            that.loadMore();

            that.vars.triggerElement.on('click.' + pluginName, function () {
                var elm = $(this),
                    masonry = elm.closest('[data-mymasonry]');
                that.loadMore();
                if(masonry.length) {
                    masonry.masonry();
                }
            });
        },
        hideItems: function () {
            var options = this.options,
                allItems = $(options.itemSelector, this.element);

            allItems.addClass(options.hiddenClass);
            if ($.isFunction(options.loadedMoreCallback)) {
                options.loadedMoreCallback();
            }
        },
        loadMore: function () {
            var options = this.options,
                items = getHiddenItems.call(this).slice(0, options.numberMore),
                visibleItems = getVisibleItems.call(this);

            if (items.length) {
                items.removeClass(options.hiddenClass).hide().fadeIn();
                if ($.isFunction(options.loadedMoreCallback)) {
                    items = getHiddenItems.call(this);
                    options.loadedMoreCallback(this.element, items.length);
                }
            }

            if (!visibleItems.length && $.isFunction(options.zeroResultCallback)) {
                options.zeroResultCallback.call(this);
            } else if (!items.length && $.isFunction(options.noMoreResultCallback)) {
                options.noMoreResultCallback.call(this);
            }
        },
        destroy: function () {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            } else if (window.console) {
                console.log(options
                    ? options + ' method does not exist in ' + pluginName
                    : pluginName + ' plugin has been initialized');
            }
        });
    };

    $.fn[pluginName].defaults = {
        numberMore: 5,
        itemSelector: '.item',
        triggerSelector: '.load-more-trigger a.load-more',
        hiddenClass: 'hidden',
        ignoreClass: 'ignore-item',
        loadedMoreCallback: null,
        noMoreResultCallback: null
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();

        var cardContainer = $('.filter-container'),
            itemSel = '.filter-item:not(.control-result)',
            masonryGroup = $('[data-mymasonry]'),
            zeroButton = $('.zero-result', cardContainer),
            noMoreButton = $('.no-more-result', cardContainer),
            loadMoreButton = $('.load-more-trigger', cardContainer);

        var cardContainerOptions = {
            ignoreClass: 'no-filter',
            itemSelector: itemSel,
            loadedMoreCallback: function (element, num) {
                var resultLabel = '',
                    desc = $('.desc', loadMoreButton),
                    btnLoadMore = $('a.load-more', loadMoreButton);

                if (!!element) {
                    resultLabel = num === 1
                        ? element.data('result-type')
                        : element.data('result-type-plural');
                    resultLabel = !!resultLabel
                        ? resultLabel
                        : '';
                }

                $('span.num', desc).html(num);
                $('span.result', desc).html(resultLabel);
                $('span:first', btnLoadMore).html(resultLabel);
                btnLoadMore.attr('title', btnLoadMore.text());

                if (masonryGroup.length && !Site.isMobile()) {
                    window.curScrollTop = $(window).scrollTop();
                    masonryGroup.mymasonry('restart');
                }
            },
            noMoreResultCallback: function () {
                var container = this.element;
                container.find(noMoreButton).removeClass('hidden');
                container.find(zeroButton).addClass('hidden');
                container.find(loadMoreButton).addClass('hidden');
                if (masonryGroup.length && !Site.isMobile()) {
                    masonryGroup.mymasonry('restart');
                }
            },
            zeroResultCallback: function () {
                var container = this.element;
                container.find(noMoreButton).addClass('hidden');
                container.find(loadMoreButton).addClass('hidden');
                container.find(zeroButton).removeClass('hidden');
                zeroButton
                    .off('click.' + pluginName)
                    .on('click.' + pluginName, function () {
                        $(window).trigger('resetFilter');
                    });
                if (masonryGroup.length && !Site.isMobile()) {
                    masonryGroup.mymasonry('restart');
                }
            }
        };
        cardContainer[pluginName](cardContainerOptions);

        $('.back-top', noMoreButton).on('click', function () {
            var isMobile = Site.isMobile(),
                header = isMobile
                    ? $('#navbar-header').outerHeight()
                    : $('#main-nav').outerHeight(),
                margin = isMobile
                    ? 80
                    : 30;

            $('html, body').animate({
                scrollTop: cardContainer.offset().top - header - margin
            }, 400);
        });

        var teamContainer = $('[data-team]'),
            template = $('<div class="text-center show-more">' +
                    '<a href="#" class="btn-tertiary">' + window.L10n.text.moreteam + '<span class="wi-icon icon-arrow"></span></a>' +
                    '</div>'),
            items = teamContainer.find('.text-image'),
            limit = 10;

        if (items.length > limit) {
            items.filter(':gt(' + (limit - 1) + ')').hide();
            template.insertAfter(items.last());
            teamContainer.on('click.' + pluginName, '.btn-tertiary', function (e) {
                e.preventDefault();
                items.filter(':hidden')
                    .fadeIn(function () {
                        $(this).removeAttr('style');
                    });
                $(this).parent().remove();
            });
        }

        $(window).on('filterHandlerChanged', function (e, el) {
            if (e.target) {
                var form = $(el),
                    filterBlocks = $('[data-type]', form),
                    titleNumber = $('p.num-cards'),
                    numberFiltered = 0,
                    cardItems = $(itemSel, cardContainer).removeClass(cardContainerOptions.ignoreClass).addClass('hidden');

                filterBlocks.each(function () {
                    var group = $(this),
                        arrValue = [],
                        filterType = group.data('type'),
                        selectedInput = $(':checked, :selected, :text', group);
                    selectedInput.each(function () {
                        arrValue.push($(this).val());
                    });
                    group.data('filter-data', arrValue);

                    cardItems.each(function () {
                        var item = $(this),
                            filterValue = item.data('filter-' + filterType) || '',
                            isMatch = false;

                        if ((filterType === 'related-profession' && arrValue.indexOf('allprofessions') !== -1) ||
                                (filterType === 'finance' && arrValue.indexOf('allcate') !== -1) ||
                                (filterType === 'related-product' && arrValue.indexOf('allproduct') !== -1) ||
                                (filterType === 'type-event' && arrValue.indexOf('all') !== -1) ||
                                (filterType === 'topic' && arrValue.indexOf('alltopics') !== -1) ||
                                (filterType === 'state' && arrValue.indexOf('allstates') !== -1)) {
                            return;
                        }

                        if (filterType !== 'related-profession' && 
                                filterType !== 'finance' && 
                                filterType !== 'related-product' && 
                                filterType !== 'type-event' && 
                                filterType !== 'topic' && 
                                filterType !== 'state') {
                            return;
                        }

                        if (0 === filterValue.length) { return; }

                        filterValue = filterValue.split('|');

                        if (filterValue.length > 0) {
                            filterValue.forEach(function (value) {
                                if (arrValue.indexOf(value) !== -1) {
                                    isMatch = true;
                                }
                            });
                        }

                        if (filterValue.length === 0 || !isMatch) {
                            item.addClass(cardContainerOptions.ignoreClass);
                        }
                    });

                    if (titleNumber.length > 0) {
                        numberFiltered = cardItems.filter(':not(.' + cardContainerOptions.ignoreClass + ')').length;
                        $('span', titleNumber).eq(0).text(numberFiltered);

                        if (numberFiltered <= 1) {
                            $('span', titleNumber).eq(1).text(cardContainer.data('result-type'));
                        } else {
                            $('span', titleNumber).eq(1).text(cardContainer.data('result-type-plural'));
                        }
                        titleNumber.show();
                    }
                });

                setTimeout(function () {
                    if ($('.filter-item:not(.' + cardContainerOptions.ignoreClass + ')', cardContainer).length > 0) {
                        noMoreButton.addClass('hidden');
                        zeroButton.addClass('hidden');
                        loadMoreButton.removeClass('hidden');
                    }
                    cardContainer[pluginName]('loadMore');
                }, 200);
            }
        });

    });

}(jQuery, window));
