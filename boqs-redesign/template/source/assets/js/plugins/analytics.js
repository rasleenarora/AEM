// This plugin is used for "Analytics" component.
(function ($, window) {
    'use strict';
    var pluginName = 'analytics';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            this.element.on('click.' + pluginName + ' touchstart.' + pluginName, function () {
                if (!!window.ga) {
                    window.ga('send', {
                        hitType: that.options.hitType,
                        eventCategory: that.options.eventCategory,
                        eventAction: that.options.eventAction,
                        eventLabel: that.options.eventLabel,
                        eventValue: that.options.eventValue
                    });
                }
            });
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
        hitType: 'event',
        eventCategory: 'button',
        eventAction: 'click',
        eventLabel: 'buttons',
        eventValue: 1
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
