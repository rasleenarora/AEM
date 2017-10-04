// Description: This is used for "Flitering control" component
(function ($, window) {
    'use strict';

    var pluginName = 'calendar',
        monthsShort = window.L10n.text.monthsShort;

    var getDate = function (date) {
        var month = date.getMonth(),
            year = date.getFullYear(),
            day = new Date();
        if (month === day.getMonth() && year === day.getFullYear()) {
            return window.L10n.text.today;
        }
        return monthsShort[date.getMonth()] + ' ' + date.getFullYear();
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            this.vars = {
                calendar: $('[data-init-calendar]', this.element),
                todayBtn: $('[data-today]', this.element),
                target: $(this.element.data(pluginName))
            };

            this.vars.calendar.datepicker(this.options).on('changeMonth', function (e) {
                that.vars.target.val(getDate(e.date));
                // trigger to catch filter in filter form;
                that.vars.target.trigger('change');
            });

            this.vars.todayBtn
                .off('click.' + pluginName)
                .on('click.' + pluginName, function () {
                    that.vars.target.val(window.L10n.text.today).trigger('change');
                    that.vars.calendar.datepicker('update');
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
        minViewMode: 1,
        format: 'M-yyyy',
        startDate: 'today'
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
