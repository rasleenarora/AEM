// Description: Used for "Filtering Control" component
(function ($, window, Site) {
    'use strict';

    var pluginName = 'accordion';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                element = that.element,
                options = that.options;
            that.handle = element.find(options.classHandle);
            that.content = element.find(options.classContent);
            that.containItem = element.find(options.classContainItem);
            that.initItemOpen();
            that.handle
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    e.preventDefault();
                    that.toggle($(this));
                }).each(function () {
                    // Check for handle description visibility
                    var active = $(this)
                        .closest(options.classContainItem)
                        .hasClass(options.classActiveItem);
                    if (!$(this).is(':visible')) {
                        $(this).find(options.classDescription)[active
                            ? 'hide'
                            : 'show']();

                    }
                });
        },
        initItemOpen: function () {
            var that = this,
                options = that.options,
                arrIdx = options.arrItemOpenDefault;
            if (options.isMultiOpen) {
                if (!arrIdx) {
                    return;
                }

                arrIdx.forEach(function (id) {
                    that.containItem.eq(id - 1)
                        .addClass(options.classActiveItem);
                });
            } else {
                if (!options.itemOpenDefault) {
                    return;
                }
                that.containItem.eq(options.itemOpenDefault - 1).addClass(options.classActiveItem);
            }
        },
        show: function (content) {
            var that = this,
                options = that.options;
            if (options.isMultiOpen) {
                content.slideDown(options.duration, function () {
                    $(this)
                        .closest(options.classContainItem)
                        .addClass(options.classActiveItem);

                });
            } else {

                that.content.not(content)
                    .slideUp(options.duration, function () {
                        $(this)
                            .closest(options.classContainItem)
                            .removeClass(options.classActiveItem).end()
                            .removeAttr('style')
                            .siblings(options.classHandle).find(options.classDescription).fadeIn('fast');
                    });
                content.hide()
                    .closest(options.classContainItem)
                    .addClass(options.classActiveItem).end()
                    .slideDown(options.duration, function () {
                        content.removeAttr('style');
                        $(this).siblings(options.classHandle).find(options.classDescription).fadeOut('fast');
                        that.element.trigger('afterShow', content);
                    });
            }
        },
        hide: function (content) {
            var that = this,
                options = that.options;
            that.element.trigger('beforeHide', content);
            content.slideUp(options.duration, function () {
                $(this)
                    .closest(options.classContainItem)
                    .removeClass(options.classActiveItem).end()
                    .removeAttr('style')
                    .siblings(options.classHandle).find(options.classDescription).fadeIn('fast');
            });
        },
        toggle: function (handle) {
            if (!Site.isMobile()) {
                return;
            }
            var that = this,
                options = that.options,
                parent = handle.closest(options.classContainItem),
                content = parent.find(options.classContent);
            that[parent.hasClass(options.classActiveItem)
                ? 'hide'
                : 'show'](content);
        },
        destroy: function () {
            this.handle.off('click.' + pluginName);
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
        isMultiOpen: false,
        arrItemOpenDefault: [1, 2],
        itemOpenDefault: 1,
        duration: 400,
        classHandle: '.handle',
        classContent: '.content',
        classContainItem: '.item',
        classActiveItem: 'active',
        classDescription: '.decs'
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
        var filterControl = $('#filtering-controls');
        filterControl.on('afterShow', function (e, content) {
            content = $(content);
            if ($(e.target).is(filterControl) && content.hasClass('states-group')) {
                content.addClass('states');
            }
        }).on('beforeHide', function (e, content) {
            content = $(content);
            if ($(e.target).is(filterControl) && content.hasClass('states-group')) {
                content.removeClass('states');
            }
        });
    });

}(jQuery, window, Site));
