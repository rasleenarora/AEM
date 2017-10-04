/**
 *  @name popover
 *  @description: display the specific content follow target element.
                  This plugin is used in "Filtering control" component.
 *  @version 1.0
 */
(function ($, window) {
    'use strict';

    var pluginName = 'popover';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    var getPosition = function (param) {
        var opt = param.options,
            popover = param.vars.popover,
            popoverW = 0,
            popoverH = 0,
            element = param.element,
            trigger = param.vars.trigger,
            elW = element.outerWidth(),
            elH = element.outerHeight(),
            placement = opt.placement,
            position = {
                top: 0,
                left: 0
            },
            offset = element.offset(),
            status = 'none',
            offsetLeft = opt.offsetleft,
            offsetTop = opt.offsettop;

        if (element.data('showed')) {
            status = 'block';
        }

        if (element.is(':hidden') && !trigger.is(':hidden')) {
            offset = trigger.offset();
            placement = opt.placementtrigger;
            elW = trigger.outerWidth();
            elH = trigger.outerHeight();
            offsetLeft = opt.triggeroffsetleft;
            offsetTop = opt.triggeroffsettop;
        }

        popover.css({
            opacity: 0,
            display: 'block'
        });

        popoverW = popover.outerWidth();
        popoverH = popover.outerHeight();

        popover.css({
            opacity: 1,
            display: status
        });

        switch (placement) {
        case 'top':
            position.top = offset.top - popoverH - offsetTop;
            position.left = offset.left - offsetLeft;
            break;
        case 'left':
            position.top = offset.top - offsetTop;
            position.left = offset.left - popoverW - offsetLeft;
            break;
        case 'right':
            position.top = offset.top - offsetTop;
            position.left = offset.left + elW + offsetLeft;
            break;
        case 'bottom':
            position.top = offset.top + elH + offsetTop;
            position.left = offset.left - offsetLeft;
            break;
        }
        return position;
    };

    var setPosition = function (param) {
        if (param) {
            var position = getPosition(param);
            param.vars.popover.css({
                top: position.top,
                left: position.left
            });
        }
    };

    var activePopover = [],
        acitveEl = [];



    Plugin.prototype = {
        init: function () {
            var that = this,
                opt = this.options;

            this.vars = {
                popover: $(opt.template).hide().appendTo(opt.container),
                trigger: $(opt.trigger)
            };

            this.element
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isShow = $(this).data('showed');
                    if (isShow) {
                        that.hide();
                    } else {
                        that.show();
                    }
                });

            this.vars.trigger
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isShow = that.element.data('showed');
                    if (isShow) {
                        that.hide();
                    } else {
                        that.show();
                    }
                });

            this.vars.popover
                .off('click.' + pluginName, opt.close)
                .on('click.' + pluginName, opt.close, function (e) {
                    e.preventDefault();
                    that.hide();
                });

            $(window).on('resize.' + pluginName, function () {
                setPosition($('[data-' + pluginName + '].active').data(pluginName));
            });

            $(document)
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    var target = $(e.target);
                    if (!target.closest('[data-popover-template]').length) {
                        that.hide();
                    }
                });

            if (opt.autoshow) {
                this.show();
            }
        },
        show: function () {
            var opt = this.options;

            setPosition(this);

            this.hide();

            if ($.isFunction(opt.onBeforeShow)) {
                opt.onBeforeShow();
            }

            this.vars.popover.fadeIn(opt.duration, function () {
                var pop = $(this);
                if ($.isFunction(opt.onAfterShow)) {
                    opt.onAfterShow();
                }
                $(this).find('.btn-reset-filters').off('click.popover').on('click.popover', function () {
                    pop.fadeOut(opt.duration);
                });
            });

            this.element.data('showed', true).addClass('active');

            activePopover = this.vars.popover;
            acitveEl = this.element;

        },
        hide: function () {
            if (!acitveEl.length) {
                return;
            }
            var data = acitveEl.data(pluginName),
                opt = data.options;

            if (activePopover.length) {

                if ($.isFunction(opt.onBeforeHide)) {
                    opt.onBeforeHide();
                }
                activePopover.fadeOut(this.options.duration, function () {
                    if ($.isFunction(opt.onAfterHide)) {
                        opt.onAfterHide();
                    }
                    if (opt.removewhenclose) {
                        $(this).remove();
                    }
                });

                acitveEl.data('showed', false).removeClass('active');

                activePopover = [];
                acitveEl = [];
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
        placement: 'right',
        placementtrigger: 'right',
        container: 'body',
        close: '.close',
        removewhenclose: false,
        trigger: '',
        offsettop: 0,
        offsetleft: 0,
        triggeroffsetleft: 0,
        triggeroffsettop: 0,
        template: '<div class="popover" data-popover-template></div>',
        duration: 200,
        autoshow: false,
        onBeforeShow: null,
        onAfterShow: null,
        onBeforeHide: null,
        onAfterHide: null

    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
