// This plugin is used in components:
// - Social sharing
// - Photo gallery
(function ($, window) {
    'use strict';

    var pluginName = 'shareButton',
        shareButtonSelector = '[data-share-button]';

    function Plugin(element) {
        this.element = $(element);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var data = this.element.data(),
                id = this.element.data('ind');
            var options = {
                title: window.L10n.shareButton.title,
                networks: {
                    google_plus: {
                        enabled: true,
                        url: data.url
                    },
                    twitter: {
                        enabled: true,
                        url: data.url,
                        description: data.description
                    },
                    facebook: {
                        enabled: true,
                        load_sdk: false,
                        url: data.url,
                        title: data.title,
                        description: data.description,
                        image: data.image
                    },
                    pinterest: {
                        enabled: true,
                        url: data.url,
                        image: data.image,
                        description: data.description
                    },
                    email: {
                        enabled: true,
                        title: data.title,
                        description: data.description
                    }
                }
            };
            if (id !== undefined) {
                this.shareButton = new window.Share('[data-ind="' + id + '"]', options);
            } else {
                this.shareButton = new window.Share(shareButtonSelector, options);
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
    };

    $(function () {
        $(shareButtonSelector)[pluginName]();
    });

}(jQuery, window));
