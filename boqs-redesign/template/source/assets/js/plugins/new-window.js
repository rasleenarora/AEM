// This plugin is used for "New Window" component.
(function ($, window) {
    'use strict';
    var pluginName = 'newWindow',
        windowOpts = 'width={{windowWidth}}, height={{windowHeight}}, top={{windowTop}}, left={{windowLeft}}, ' +
                'titlebar={{titleBar}}, status={{windowStatus}}, location={{windowLocation}}, ' +
                'menubar={{menuBar}}, scrollbars={{scrollBar}}, resizable=yes';

    var setWindowOffset = function () {
        return {
            left: window.screenX || window.screenLeft,
            top: window.screenY || window.screenTop,
            width: window.outerWidth,
            height: window.outerHeight
        };
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;

            this.element.on('click.' + pluginName, function () {
                var link = $(this),
                    mainWindow = setWindowOffset();

                if (!Site.isMobile()) {
                    var opts = windowOpts
                        .replace('{{windowWidth}}', that.options.windowWidth)
                        .replace('{{windowHeight}}', that.options.windowHeight)
                        .replace('{{titleBar}}', that.options.titleBar)
                        .replace('{{windowStatus}}', that.options.windowStatus)
                        .replace('{{windowLocation}}', that.options.windowLocation)
                        .replace('{{menuBar}}', that.options.menuBar)
                        .replace('{{scrollBar}}', that.options.scrollBar);

                    if (!that.options.isCenter) {
                        opts = opts
                            .replace('{{windowLeft}}', that.options.windowLeft)
                            .replace('{{windowTop}}', that.options.windowHeight);
                    } else {
                        var top = mainWindow.top + (mainWindow.height - that.options.windowHeight) / 2,
                            left = mainWindow.left + (mainWindow.width - that.options.windowWidth) / 2;

                        opts = opts
                            .replace('{{windowLeft}}', left)
                            .replace('{{windowTop}}', top);
                    }

                    window.open(link.attr('href'), '', opts);
                } else {
                    window.open(link.attr('href'), '_blank');
                }
                return false;
            });

            $(window).on('resize.' + pluginName, function () {
                setWindowOffset.call(that);
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
        windowWidth: 1015,
        windowHeight: 670,
        windowTop: 200,
        windowLeft: 0,
        isCenter: 1,
        titleBar: 0,
        windowStatus: 0,
        windowLocation: 0,
        menuBar: 0,
        scrollBar: 1
    };

    $(function () {
        var opts = {};
        $('[data-' + pluginName + ']')[pluginName](opts);
    });

}(jQuery, window));
