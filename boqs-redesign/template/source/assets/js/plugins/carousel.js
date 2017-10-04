// This is used for "Carousel" component
(function ($, window) {
    'use strict';

    var pluginName = 'carousel';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.element.off('init.' + pluginName).on('init.' + pluginName, function () {
                var control = $(this).next('.control');
                $('.slick-next', control).appendTo(control);
            });

            var isPromo = this.element.data('carousel') === 'promo' ? true : false;

            this.options.appendDots = this.element.next('.control');
            if (!isPromo) {
                this.options.appendArrows = this.options.appendDots;
            } else {
                this.options.fade = false;
            }
            this.element.slick(this.options);
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
        dots: true,
        speed: 1000,
        fade: true,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        cssEase: 'ease'
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
