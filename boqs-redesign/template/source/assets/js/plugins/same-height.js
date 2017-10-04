/**
 *  @name same-height
 *  @description This plugin is used for "Ribbon" component
 *  @version 1.0
 *  @options
 *    block
 *  @methods
 *    init
 *    destroy
 */
(function ($, window) {
    'use strict';

    var pluginName = 'sameheight',
        win = $(window);

    var setHeight = function () {
        var maxHeight = 0;
        this.vars.blocks.css('height', '').each(function () {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        this.vars.blocks.css('height', maxHeight);
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
                blocks: $(that.options.block, that.element)
            };
            win.on('resize.' + pluginName, $.proxy(setHeight, that)).trigger('resize.' + pluginName);
        },
        destroy: function () {
            win.off('resize.' + pluginName);
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
        block: '[data-item]'
    };

    $(function () {
        // Wait for images
        win.on('load', function () {
            $('[data-' + pluginName + ']')[pluginName]();            
        });
    });

}(jQuery, window));
