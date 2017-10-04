/*global
window, navigator, document, console, setTimeout, clearTimeout, jQuery, brightcove, dataWelcomeData
*/
var Site = {
    canTouch: window.Modernizr.touch,
    isMobile: function () {
        'use strict';
        return window.Modernizr.mq('(max-width: 767px)');
    },
    isTablet: function () {
        'use strict';
        return window.Modernizr.touch && !this.isMobile();
    },
    setCookie: function (cname, cvalue, exdays) {
        'use strict';
        var d = new Date();
        if (!cname) {
            return;
        }
        exdays = exdays
            ? parseInt(exdays)
            : 1;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
    },
    getCookie: function (cname) {
        'use strict';
        var cooki = '';
        if (!cname) {
            return '';
        }

        var name = cname + '=';
        var ca = document.cookie.split(';');
        ca.forEach(function (c) {
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
                if (c.indexOf(name) === 0) {
                    cooki = c.substring(name.length, c.length);
                }
            }
        });
        return cooki;
    }
};

jQuery(document).ready(function ($) {
    'use strict';

    var loader = $('.loader-overlay');

    Site.showLoading = function () {
        loader.stop().show();
    };

    Site.hideLoading = function () {
        loader.stop().fadeOut();
    };

    if (window.Detectizr.browser.userAgent.indexOf('windows phone') !== -1) {
        jQuery('html').addClass('window-phone');
    }

    if (window.Detectizr.browser.userAgent.indexOf('samsung') !== -1) {
        jQuery('html').addClass('samsung');
    }

    if (window.location.origin === undefined) {
        window.location.origin = window.location.protocol +
                "//" + window.location.hostname +
                (window.location.port
            ? ':' + window.location.port
            : '');
    }

    Site.downloadPath = window.location.origin + '/bin/boqs-redesign/download?image=';
});
