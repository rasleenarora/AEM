/**
*  @name welcome
*  Description: This plugin is used in "Global header" component
*/
(function ($, window) {
    'use strict';

    $(function () {
        var body = $('body'),
            welcomeBack = $('[data-welcome-back]'),
            title = $('[data-title]', welcomeBack),
            // icon = $('[data-icon]', welcomeBack),
            url = $('[data-url]', welcomeBack),
            close = $('.close-btn', welcomeBack),
            cookieName = 'welcome',
            beReplaceChars = [/\{/g,/\}/g],
            replaceChars = ['#','$'],
            beReverseReplaceChars = [/\#/g,/\$/g],
            reverseReplaceChars = ['{','}'],
            cookie = '',
            time = new Date().getTime(),
            limit = 1000 * 60 * 60 * 2,
            duration = 500,
            welcomeData = window.dataWelcomeData;


        var cookieToString = function (cookie) {
            var cooki = cookie;
            beReplaceChars.forEach(function(item, ind) {
                cooki = cooki.replace(beReplaceChars[ind], replaceChars[ind]);
            });
            return cooki;
        }

        var stringToCookie = function (string) {
            var cooki = string;
            beReplaceChars.forEach(function(item, ind) {
                cooki = cooki.replace(beReverseReplaceChars[ind], reverseReplaceChars[ind]);
            });
            return cooki;
        }

        cookie = stringToCookie(window.Site.getCookie(cookieName));

        if (welcomeData) {
            welcomeData.time = new Date().getTime();
            window.Site.setCookie(cookieName, cookieToString(JSON.stringify(welcomeData)), 7);
        }
        if (body.hasClass('home')) {
            if (cookie) {
                cookie = JSON.parse(cookie);
                if (time - cookie.time > limit) {
                    title
                        .attr({
                            href: cookie.url,
                            title: cookie.title
                        })
                        .text(cookie.title);
                    /*if (cookie.icon) {
                        icon.attr('src', cookie.icon).show();
                    } else {
                        icon.hide();
                    }*/
                    url.attr('href', cookie.url);
                    welcomeBack.slideDown(duration);

                    close.off('click.hide').on('click.hide', function (e) {
                        e.preventDefault();
                        welcomeBack.slideUp(duration);
                        cookie.time = new Date().getTime();
                        window.Site.setCookie(cookieName, cookieToString(JSON.stringify(cookie)), 7);
                    });
                }
            }
        }
    });
}(jQuery, window));
