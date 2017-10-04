/**
 *  @name popin
 *  @description show specific content in layer top screen
                 This plugin used in components:
                 - Event registration
                 - Contact form
 *  @version 1.0
 *  @options
 *  @events
 *  @methods
 *    init
 *    show: show popin
 *    hide: hide popin
 *    destroy
 */
(function ($, window) {
    'use strict';

    var pluginName = 'popin';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            that.vars = {
                contentElement: $(that.options.contentSelector, that.element)
            };

            that.element.hide();
            if (this.options.showonload) {
                this.show();
            }

            that.vars.contentElement.on('webkitTransitionEnd.' + pluginName +
                    ' otransitionend.' + pluginName + ' oTransitionEnd.' + pluginName +
                    ' msTransitionEnd.' + pluginName + ' transitionend.' + pluginName, function () {
                if (!that.element.hasClass(that.options.classShowAnimate)) {
                    that.element.hide();
                    if ($.isFunction(that.options.onHidden)) {
                        that.options.onHidden();
                    }
                } else {
                    if ($.isFunction(that.options.onShown)) {
                        that.options.onShown();
                    }
                }
            });

            $(that.options.closeButtonSelector, that.element).on('click.' + pluginName, function () {
                that.hide();
            });
        },
        show: function () {
            var that = this;
            that.element.show();
            setTimeout(function () {
                that.element.addClass(that.options.classShowAnimate);
            }, 200);
        },
        hide: function () {
            var that = this,
                elm = that.element;
            elm.removeClass(that.options.classShowAnimate);
            if (elm.hasClass('remove-when-hide')) {
                elm.remove();
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
        contentSelector: '.modal-dialog',
        closeButtonSelector: '.close, .btn-cancel',
        classShowAnimate: 'show-animate',
        showonload: false,
        onShown: null,
        onHidden: null
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();

        var successPopup = $('#submit-success');
        $('button', successPopup).on('click.' + pluginName, function () {
            var url = window.location.href.split('?')[0];
            window.location.replace(url);
        });

        $('#contact-button').on('click.' + pluginName, function () {
            $('.contact-popup')[pluginName]('show');
        });

        $('[data-show-event-registration]').on('click.' + pluginName, function () {
            var registerBtn = $(this),
                title = registerBtn.data('title') || '',
                eventPage = registerBtn.data('event-page') || '',
                startDate = registerBtn.data('start-date') || '',
                endDate = registerBtn.data('end-date') || '',
                time = registerBtn.data('time') || '',
                popup = $('.register-popup'),
                pTime = popup.find('.desc p.time'),
                iconTime = popup.find('.icon-time');

            popup[pluginName]('show');

            popup
                .find('.modal-header .wrap-error').addClass('hidden').end()
                .find('[data-validation] .error').removeClass('error').end()
                .find('[data-validation] .wrap-error').remove().end()
                .find('.modal-title .event-name').html(' ' + title).end()
                .find('input[name="eventName"]').val(title).end()
                .find('input[name="eventPage"]').val(eventPage).end()
                .find('input[name="eventStartDate"]').val(startDate).end()
                .find('input[name="eventEndDate"]').val(endDate).end()
                .find('.desc p.time').html(time);
            if (!time) {
                pTime.add(iconTime).hide();
            } else {
                pTime.add(iconTime).show();
            }
        });
    });

}(jQuery, window));
