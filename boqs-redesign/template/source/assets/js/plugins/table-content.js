// This plugin is used in "Table of content" components
(function ($, window) {
    'use strict';

    var TocType = {
        COUNTER: 'counter',
        CIRCLE: 'circle'
    };

    var pluginName = 'table-content',
        namespace = 'toc',
        Contents = window.gajus.Contents;

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                options = that.options;

            var opts = {
                articles: $(options.wrapperContent + ' :header:not(.' + options.ignoreClass + ')').get(),
                link: options.linkBehavior
            };

            that.vars = {
                contents: new Contents(opts),
                list: null
            };
            that.vars.tocTypeClass = options.tocType === TocType.CIRCLE
                ? options.circleListClass
                : options.counterListClass;
            that.vars.list = $(that.vars.contents.list()).addClass(that.vars.tocTypeClass);
            $('li', that.vars.list).each(function () {
                var el = $(this);
                if (el.parents('ol').length > options.tocLevel) {
                    el.remove();
                }
            });

            that.element.append(that.vars.list);

            that.vars.contents.eventEmitter().on('change.' + namespace, function () {
                if ($.isFunction(options.onChangeCallback)) {
                    options.onChangeCallback();
                }
            });
            that.vars.contents.eventEmitter().on('scroll.' + namespace, function () {
                if ($.isFunction(that.options.onScrollCallback)) {
                    options.onScrollCallback();
                }
            });
            that.vars.contents.eventEmitter().on('resize.' + namespace, function () {
                if ($.isFunction(options.onChangeCallback)) {
                    options.onResizeCallback();
                }
            });

            that.vars.contents.eventEmitter().trigger('resize.' + namespace);
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
        wrapperContent: '#main',
        ignoreClass: 'dont-show-in-toc',
        counterListClass: 'counter-list',
        circleListClass: 'circle-list',
        tocType: 'counter',
        tocLevel: 3,
        onChangeCallback: null,
        onScrollCallback: null,
        onResizeCallback: null,
        linkBehavior: function (guide, article) {
            var guideLink,
                articleName,
                articleId;

            guide = $(guide);

            guideLink = $('<a>');
            articleName = article.name;
            articleId = articleName || Contents.id(articleName);

            guideLink
                .text(articleName)
                .attr('href', '#' + articleId)
                .appendTo(guide);

            $(guide)
                .on('click.' + namespace, function (e) {
                    $('html, body').animate({
                        scrollTop: $(article.element).offset().top
                    }, 400);
                    e.stopPropagation();
                });
        }
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

