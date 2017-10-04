/**
*  @name masonry
*  @description put blocks to columns and arrange them in "card container" component
*  @version 1.0
*  @options
*    gutter
*    columnWidth
*    itemSelector
*    percentPosition
*  @methods
*    init
*    restart
*    destroy
*/
(function ($, window) {
    'use strict';

    var win = $(window),
        pluginName = 'mymasonry',
        timer = null,
        delay = 400;

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                opt = this.options,
                elm = this.element,
                mas = that.element.masonry(that.options);

            mas.on('layoutComplete', function () {
                var loadmoreBtn = $('.card-item.load-more-trigger:visible, .card-item.no-more-result:visible'),
                    loadmoreL = 0,
                    loadmoreT = 0,
                    containerL = elm.offset().left,
                    containerT = elm.offset().top,
                    containerW = elm.outerWidth(),
                    containerH = elm.outerHeight(),
                    leftPadding = 15,
                    topPadding = 20,
                    bottomPadding = 40,
                    maybeHeight = 0,
                    lastestItem = {
                        top: 0,
                        left: 0,
                        item: null,
                        height: 0
                    };
                var assignLastestItem = function (top, left, item) {
                    if (item !== undefined && item !== null) {
                        lastestItem = {
                            top: top,
                            left: left,
                            item: item,
                            height: item.height()
                        };
                    }
                };

                if (loadmoreBtn.length) {
                    elm.find(opt.itemSelector + ':visible').each(function () {
                        var item = $(this),
                            top = item.offset().top,
                            left = item.offset().left;
                        if (left >= lastestItem.left) {
                            if (left > lastestItem.left) {
                                assignLastestItem(top, left, item);
                            } else {
                                if (top > lastestItem.top) {
                                    assignLastestItem(top, left, item);
                                }
                            }
                        }
                    });
                    if (lastestItem.item !== null) {
                        loadmoreL = lastestItem.left - containerL;
                        if (loadmoreL + leftPadding < (containerW * 2 / 3)) {
                            loadmoreL = loadmoreL + lastestItem.item.width() + leftPadding;
                            loadmoreT = 0;
                        } else {
                            loadmoreT = lastestItem.top - containerT + lastestItem.height + topPadding;
                        }
                        loadmoreBtn.css({
                            left: loadmoreL,
                            top: loadmoreT
                        });
                        maybeHeight = loadmoreT + loadmoreBtn.height() + bottomPadding;
                        setTimeout(function () {
                            containerH = elm.outerHeight();
                            if (maybeHeight > containerH) {
                                elm.height(maybeHeight + topPadding);
                            }
                        }, 300);

                    }
                }
            });

            var images = elm.find('img');
            if (images.length) {
                images.each(function () {
                    var img = this;
                    img.onload = function () {
                        that.restart();
                    };
                    img.onerror = function () {
                        that.restart();
                    };
                });
            }

            win.on('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    if (!Site.isMobile()) {
                        that.restart();
                    }
                }, delay);
            });
        },
        restart: function () {
            var that = this,
                height = that.element.height();

                that.element
                    .masonry('destroy')
                    .css('height', height)
                    .masonry(that.options);
        },
        destroy: function () {
            this.element.masonry('destroy');
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
        gutter: ".gutter-sizer",
        columnWidth: '.grid-sizer',
        itemSelector: '.block-item',
        percentPosition: true,
        onInitComplete: ''
    };

    $(function () {
        var curScreen = window.Site.isMobile()
            ? 'mobile'
            : 'desktop';

        $('[data-' + pluginName + ']').not('[data-desktop-only]')[pluginName]();
        if (curScreen === 'desktop') {
            $('[data-' + pluginName + '][data-desktop-only]')[pluginName]();
        }

        win.on('resize.' + pluginName, function () {
            var newScreen = window.Site.isMobile()
                ? 'mobile'
                : 'desktop';
            if (curScreen === newScreen) {
                return;
            }

            if (curScreen === 'desktop') {
                $('[data-' + pluginName + '][data-desktop-only]')[pluginName]('destroy');
                curScreen = 'mobile';
            } else if (curScreen === 'mobile') {
                $('[data-' + pluginName + '][data-desktop-only]')[pluginName]();
                curScreen = 'desktop';
            }
        });
    });

}(jQuery, window));
