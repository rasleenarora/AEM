// This plugin is used for "Expandable Content Area" component
(function ($, window) {
    'use strict';

    var pluginName = 'expandContent';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.handle = $('[data-expand-handle][href="#' + this.element.attr('id') + '"],' + '[data-expand-handle][data-target="#' + this.element.attr('id') + '"]');
            this.title = this.handle.find('[data-expand-title]');
            this['default'] = this.element.hasClass(this.options.expandedClass)
                ? 'show'
                : 'hide';
            this.isTransitioning = false;
            this.close = $(this.options.close, this.element);
            this.handle
                .off('click.' + pluginName)
                .on('click.' + pluginName, $.proxy(function (e) {
                    if (!$(e.target).attr('data-target')) {
                        e.preventDefault();
                    }
                    this.toggle();
                }, this));

            this.close
                .off('click.' + pluginName)
                .on('click.' + pluginName, $.proxy(function (e) {
                    e.preventDefault();
                    this.toggle();
                }, this));
        },
        toggle: function () {
            this[this.element.hasClass(this.options.expandedClass)
                ? 'hide'
                : 'show']();
            var masonry = this.handle.data('mymasonry') ? this.handle : this.handle.closest('[data-mymasonry]');
            if(masonry.length) {
                masonry.masonry('resize');
            }
        },
        show: function () {
            if (this.isTransitioning || this.element.hasClass(this.options.expandedClass)) {
                return;
            }

            this.isTransitioning = true;

            var options = this.options,
                element = this.element,
                complete;

            if (options.hidehandler) {
                this.handle.hide();
            }

            this.handle.addClass(options.activeHandle);

            this.title.slideUp(options.transitionTitle);

            complete = function () {
                element.addClass(options.expandedClass).removeAttr('style');
                this.isTransitioning = false;
                if (element.hasClass('filtering-controls')) {
                    $(window).trigger('recalNavOffset.eventCalendar');
                }
            };

            element.slideDown(options.transitionContent, $.proxy(complete, this));
        },
        hide: function () {
            if (this.isTransitioning || !this.element.hasClass(this.options.expandedClass)) {
                return;
            }

            this.isTransitioning = true;

            var options = this.options,
                element = this.element,
                complete;



            this.handle.removeClass(options.activeHandle);

            this.title.slideDown(options.transitionTitle);

            complete = function () {
                element.removeClass(options.expandedClass).removeAttr('style');
                this.isTransitioning = false;
                if (options.hidehandler) {
                    this.handle.fadeIn(options.transitionTitle, function () {
                        $(this).removeAttr('style');
                    });
                }
                if (element.hasClass('filtering-controls')) {
                    $(window).trigger('recalNavOffset.eventCalendar');
                }
            };

            element.slideUp(options.transitionContent, $.proxy(complete, this));
        },
        destroy: function () {
            this[this['default']]();
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
        expandedClass: 'in',
        activeHandle: 'active',
        close: '',
        hidehandler: false,
        transitionContent: 400,
        transitionTitle: 200
    };

    $(function () {
        $('[data-expand-content]')[pluginName]();
        $('.result-card-cmp').first().find('[data-expand-content]')[pluginName]('show');
        var masonryElement = $('[data-mymasonry]'),
            createMasonry = function () {
                masonryElement.mymasonry('restart');
            };

        var opts = {
            onBeforeAction: function (isDelay) {
                if (!Site.isMobile()) {
                    clearTimeout(timer);
                    if (!isDelay) {
                        createMasonry();
                    } else {
                        timer = setTimeout(function () {
                            createMasonry();
                        }, 300);
                    }
                }
            }
        };
        if(masonryElement.length) {
            var count = 0,
                updateMasonry = function() {
                    masonryElement.masonry();
                    count++;
                    if(count < 10) {
                        setTimeout(updateMasonry, 1500);
                    }
                };
            updateMasonry();
            $(window).on('load.updateMasonry', function() {
                masonryElement.masonry();
            });
        }
    });
}(jQuery, window));
