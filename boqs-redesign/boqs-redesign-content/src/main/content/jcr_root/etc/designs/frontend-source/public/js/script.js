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

// Description: Used for "Filtering Control" component
(function ($, window, Site) {
    'use strict';

    var pluginName = 'accordion';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                element = that.element,
                options = that.options;
            that.handle = element.find(options.classHandle);
            that.content = element.find(options.classContent);
            that.containItem = element.find(options.classContainItem);
            that.initItemOpen();
            that.handle
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    e.preventDefault();
                    that.toggle($(this));
                }).each(function () {
                    // Check for handle description visibility
                    var active = $(this)
                        .closest(options.classContainItem)
                        .hasClass(options.classActiveItem);
                    if (!$(this).is(':visible')) {
                        $(this).find(options.classDescription)[active
                            ? 'hide'
                            : 'show']();

                    }
                });
        },
        initItemOpen: function () {
            var that = this,
                options = that.options,
                arrIdx = options.arrItemOpenDefault;
            if (options.isMultiOpen) {
                if (!arrIdx) {
                    return;
                }

                arrIdx.forEach(function (id) {
                    that.containItem.eq(id - 1)
                        .addClass(options.classActiveItem);
                });
            } else {
                if (!options.itemOpenDefault) {
                    return;
                }
                that.containItem.eq(options.itemOpenDefault - 1).addClass(options.classActiveItem);
            }
        },
        show: function (content) {
            var that = this,
                options = that.options;
            if (options.isMultiOpen) {
                content.slideDown(options.duration, function () {
                    $(this)
                        .closest(options.classContainItem)
                        .addClass(options.classActiveItem);

                });
            } else {

                that.content.not(content)
                    .slideUp(options.duration, function () {
                        $(this)
                            .closest(options.classContainItem)
                            .removeClass(options.classActiveItem).end()
                            .removeAttr('style')
                            .siblings(options.classHandle).find(options.classDescription).fadeIn('fast');
                    });
                content.hide()
                    .closest(options.classContainItem)
                    .addClass(options.classActiveItem).end()
                    .slideDown(options.duration, function () {
                        content.removeAttr('style');
                        $(this).siblings(options.classHandle).find(options.classDescription).fadeOut('fast');
                        that.element.trigger('afterShow', content);
                    });
            }
        },
        hide: function (content) {
            var that = this,
                options = that.options;
            that.element.trigger('beforeHide', content);
            content.slideUp(options.duration, function () {
                $(this)
                    .closest(options.classContainItem)
                    .removeClass(options.classActiveItem).end()
                    .removeAttr('style')
                    .siblings(options.classHandle).find(options.classDescription).fadeIn('fast');
            });
        },
        toggle: function (handle) {
            if (!Site.isMobile()) {
                return;
            }
            var that = this,
                options = that.options,
                parent = handle.closest(options.classContainItem),
                content = parent.find(options.classContent);
            that[parent.hasClass(options.classActiveItem)
                ? 'hide'
                : 'show'](content);
        },
        destroy: function () {
            this.handle.off('click.' + pluginName);
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
        isMultiOpen: false,
        arrItemOpenDefault: [1, 2],
        itemOpenDefault: 1,
        duration: 400,
        classHandle: '.handle',
        classContent: '.content',
        classContainItem: '.item',
        classActiveItem: 'active',
        classDescription: '.decs'
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
        var filterControl = $('#filtering-controls');
        filterControl.on('afterShow', function (e, content) {
            content = $(content);
            if ($(e.target).is(filterControl) && content.hasClass('states-group')) {
                content.addClass('states');
            }
        }).on('beforeHide', function (e, content) {
            content = $(content);
            if ($(e.target).is(filterControl) && content.hasClass('states-group')) {
                content.removeClass('states');
            }
        });
    });

}(jQuery, window, Site));

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

/**
 *  @name customSelectBox
 *  @description This plugin is used for creating a custom-select box and used in components:
                 -  Contact Form
                 -  Event Registration
                 -  Filtering Control
 *  @version 1.0
 *  @options
 *    effect
 *  @events
 *    keyUp, keyDown, click, focusout, hover
 *  @methods
 *    init
 *    createSelect, nextIndexEle, prevIndexEle, showList, hideList, setValue
 *    determineCharKeyDown, determineNavigationKey
 *    destroy
 */
(function ($, window) {
    'use strict';

    var pluginName = 'customSelectBox',
        doc = $(document);
    var KEYCODE = {
            UP: 38,
            DOWN: 40,
            CHARFIRST: 65,
            CHARLAST: 90,
            NUMFIRST: 48,
            NUMLAST: 57,
            ESC: 27,
            ENTER: 13,
            TAB: 9
        },
        effectSelect = {
            SLIDE: 'slide',
            FADE: 'fade'
        },
        nameNode = {
            OPTION: 'OPTION',
            SELECT: 'SELECT',
            OPTGRP: 'OPTGROUP'
        };

    var createSelect = function () {
        var row = [],
            tempDataChar = [],
            options = this.options,
            ele = this.select,
            classForStyle = ele.attr('class'),
            selectCustom = '<div class="' + options.classWrapSelect + '" ></div>',
            labelSelect = '<div class="' + options.labelEle + '">' +
                    '<span class="visible-value"></span>' +
                    '<a href="javascript:void(0);" class="' + options.btnSelect + '"></a>' +
                    '</div>',
            listItem = '<ul class="' + options.listEle + '"></ul>';

        this.vars.newSelect = $(selectCustom);
        this.vars.labelSelect = $(labelSelect);
        this.vars.listItem = $(listItem);

        if (classForStyle) {
            this.vars.newSelect.addClass(classForStyle);
        }

        ele.find('*').each(function () {
            var childEle = $(this),
                currentNodeName = childEle.prop('nodeName');

            if (currentNodeName === nameNode.OPTION) {
                if (childEle.parent().prop('nodeName') === nameNode.SELECT) {
                    row.push('<li class="' + options.classOptSelect +
                            '" data-val="' + childEle.val() + '">' + childEle.text() + '</li>');
                }
                if (childEle.parent().prop('nodeName') === nameNode.OPTGRP) {
                    row.push('<li class="' + options.classOptGroup +
                            '" data-val="' + childEle.val() + '">' + childEle.text() + '</li>');
                }
                tempDataChar.push(childEle.text().toUpperCase().charCodeAt(0));
            }
            if (currentNodeName === nameNode.OPTGRP) {
                row.push('<li class="' + options.classOptGrpSelect + '">' +
                        childEle.attr('label') + '</li>');
            }
        });

        this.vars.newSelect
            .append(this.vars.labelSelect)
            .append(this.vars.listItem.append(row.join('')));

        this.vars.labelSelect.children('span.visible-value')
            .text(ele.find('option:selected').text())
            .data('val', ele.val());
        this.vars.listItem
            .find('[data-val="' + ele.val() + '"]')
            .addClass(options.classSelectedItem);
        ele.after(this.vars.newSelect).hide();
        this.vars.newSelect.append(ele);

        this.vars.liItems = this.vars.listItem.find('li').not('.' + options.classOptGrpSelect);
        this.vars.previousIndex = this.vars.liItems.filter('.' + options.classSelectedItem).index();
        this.vars.dataChar = tempDataChar;
    };

    var nextIndexEle = function (curIndex, len) {
        if (curIndex + 1 > len - 1) {
            return 0;
        } else {
            return curIndex + 1;
        }
    };

    var prevIndexEle = function (curIndex, len) {
        if (curIndex - 1 < 0) {
            return len - 1;
        } else {
            return curIndex - 1;
        }
    };

    var setValue = function (value, text) {
        this.vars.labelSelect.children('span.visible-value').text(text).data('val', value);
        this.select.val(value);
        // trigger to catch filter in filter form;
        this.select.trigger('change');
    };

    var setDropdownSelected = function () {
        var newSelect = this.vars.newSelect,
            classSelectedValue = this.options.classSelectedValue;

        if (!this.vars.labelSelect.children('span.visible-value').data('val')) {
            newSelect.removeClass(classSelectedValue);
        } else {
            newSelect.addClass(classSelectedValue);
        }
    };

    var setItemSelected = function (idx) {
        var options = this.options,
            liItems = this.vars.liItems;

        liItems.eq(idx).addClass(options.classSelectedItem)
            .siblings().removeClass(options.classSelectedItem);
    };

    var setScroll = function () {
        var listItem = this.vars.listItem;
        // scroll list Item when key up or down
        listItem.scrollTop(0);
        listItem
            .scrollTop(this.vars.liItems.filter('.' + this.options.classSelectedItem).offset().top - listItem.height());
    };

    var offAllEvent = function () {
        this.vars.labelSelect
            .off('click.' + pluginName);
        this.vars.listItem
            .off('mouseleave.' + pluginName)
            .find('li').not('.' + this.options.classOptGrpSelect)
            .off('click.' + pluginName)
            .off('mouseenter.' + pluginName);
        doc
            .off('keydown.' + pluginName)
            .off('click.' + pluginName);
    };

    var setDisableState = function () {
        if (this.select.prop('disabled')) {
            this.newSelect.addClass(this.options.classDisableSelect);
            offAllEvent.call(this);
        }
    };

    var showList = function () {
        var listItem = this.vars.listItem;
        switch (this.options.effect) {
        case effectSelect.FADE:
            listItem.fadeIn();
            break;
        case effectSelect.SLIDE:
            listItem.slideDown();
            break;
        default:
            listItem.show();
        }
        this.vars.isShow = true;
        this.vars.newSelect.addClass(this.options.classSelectedValue);
        this.vars.prevVal = this.vars.labelSelect.children('span.visible-value').data('val');
    };

    var hideList = function () {
        var listItem = this.vars.listItem;
        switch (this.options.effect) {
        case effectSelect.FADE:
            listItem.fadeOut();
            break;
        case effectSelect.SLIDE:
            listItem.slideUp();
            break;
        default:
            listItem.hide();
        }
        this.vars.isShow = false;
        setDropdownSelected.call(this);
        if (this.vars.prevVal !== this.vars.labelSelect.children('span.visible-value').data('val')) {
            this.select.trigger('changeValue.customSelectBox');
        }
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.select = this.element.children('select');
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                options = this.options;
            // initialize
            this.vars = {
                previousIndex: -1,          // prev index value
                lastIndexOfDuplicate: -1,   // last index in duplicateKeyCodeIndex
                duplicateKeyCodeIndex: [],  // contain index of duplicate key code
                isShow: false,
                dataChar: [],
                prevVal: ''
            };

            createSelect.call(this);
            setDropdownSelected.call(this);

            this.vars.labelSelect.on('click.' + pluginName, function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (that.vars.isShow) {
                    hideList.call(that);
                } else {
                    showList.call(that);
                }
            });

            this.vars.listItem
                .on('mouseleave.' + pluginName, function () {
                    setItemSelected.call(that, that.vars.previousIndex);
                })
                .find('li').not('.' + options.classOptGrpSelect)
                .on('click.' + pluginName, function () {
                    var itSelf = $(this);
                    that.vars.previousIndex = itSelf.index() - itSelf.prevAll().filter('.' + options.classOptGrpSelect).length;

                    itSelf.addClass(options.classSelectedItem);
                    setValue.call(that, itSelf.attr('data-val'), itSelf.text());
                    hideList.call(that);
                })
                .on('mouseenter.' + pluginName, function () {
                    $(this)
                        .addClass(options.classSelectedItem)
                        .siblings().removeClass(options.classSelectedItem);
                });

            doc
                .on('keydown.' + pluginName, function (e) {
                    if (that.vars.isShow) {
                        e.preventDefault();

                        switch (true) {
                        case e.keyCode >= KEYCODE.NUMFIRST && e.keyCode <= KEYCODE.NUMLAST:
                        case e.keyCode >= KEYCODE.CHARFIRST && e.keyCode <= KEYCODE.CHARLAST:
                            if (that.vars.dataChar.indexOf(e.keyCode) !== -1) {
                                that.determineCharKeyDown(e.keyCode);
                            }
                            break;
                        case e.keyCode === KEYCODE.UP:
                        case e.keyCode === KEYCODE.DOWN:
                            that.determineNavigationKey(e.keyCode);
                            break;
                        case e.keyCode === KEYCODE.ESC:
                        case e.keyCode === KEYCODE.TAB:
                        case e.keyCode === KEYCODE.ENTER:
                            that.vars.labelSelect.triggerHandler('click.' + pluginName);
                            break;
                        }
                    }
                })
                .on('click.' + pluginName, function () {
                    if (that.vars.isShow) {
                        hideList.call(that);
                    }
                });

            setDisableState.call(this);
        },
        determineCharKeyDown: function (keyCode) {
            var that = this,
                lastIndexOfDuplicate = that.vars.lastIndexOfDuplicate,
                duplicateKeyCodeIndex = that.vars.duplicateKeyCodeIndex,
                liItems = that.vars.liItems;

            if (that.vars.previousKeyCode === keyCode) {
                lastIndexOfDuplicate = nextIndexEle(lastIndexOfDuplicate, duplicateKeyCodeIndex.length);
                that.vars.previousIndex = duplicateKeyCodeIndex[lastIndexOfDuplicate];
            } else {

                if (duplicateKeyCodeIndex) {
                    duplicateKeyCodeIndex = [];
                }

                that.vars.dataChar.forEach(function (key, i) {
                    if (key === keyCode) {
                        duplicateKeyCodeIndex.push(i);
                    }
                });

                lastIndexOfDuplicate = 0;
                that.vars.previousIndex = duplicateKeyCodeIndex[lastIndexOfDuplicate];
            }

            setItemSelected.call(that, that.vars.previousIndex);
            setScroll.call(that);
            setValue.call(that, liItems.eq(that.vars.previousIndex).attr('data-val'),
                    liItems.eq(that.vars.previousIndex).text());

            that.vars.previousKeyCode = keyCode;
            that.vars.lastIndexOfDuplicate = lastIndexOfDuplicate;
            that.vars.duplicateKeyCodeIndex = duplicateKeyCodeIndex;
        },
        determineNavigationKey: function (keyCode) {
            var that = this,
                idx = that.vars.previousIndex,
                liItems = that.vars.liItems;

            switch (keyCode) {
            case KEYCODE.UP:
                idx = prevIndexEle(idx, liItems.length);
                break;
            case KEYCODE.DOWN:
                idx = nextIndexEle(idx, liItems.length);
                break;
            }

            setItemSelected.call(that, idx);
            setScroll.call(that);
            setValue.call(that, liItems.eq(idx).attr('data-val'), liItems.eq(idx).text());

            that.vars.previousKeyCode = keyCode;
            that.vars.previousIndex = idx;
        },
        destroy: function () {
            // deinitialize
            $.removeData(this.element[0], pluginName);
            this.vars.newSelect
                .before(this.select.removeAttr('style'))
                .remove();
            offAllEvent.call(this);
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
        effect: 'show',
        btnSelect: 'btn-select',
        labelEle: 'select-box',
        listEle: 'list-unstyled',
        classOptSelect: 'option-of-select',
        classOptGroup: 'option-of-optgroup',
        classOptGrpSelect: 'optgroup-of-select',
        classSelectedItem: 'selected-item',
        classWrapSelect: 'custom-select-box',
        classSelectedValue: 'selected',
        classDisableSelect: 'disabled-select',
        diffWidth: 0
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

/**
 *  @name event calendar
 *  @description Displaying event-cards with register form and filters (date, month, type, ....).
                 This plugin is used for "Event calendar" component
 *  @version 1.0
 *  @options
 *    navClass
 *    featureClass
 *    cardsWrapClass
 *    registerPopup
 *  @methods
 *    init
 *    destroy
 */
(function ($, window) {
    'use strict';

    var pluginName = 'event-calendar',
        win = $(window),
        headerError = $('.popup .wrap-error:first'),
        validateOptions = {
            successClass: '',
            labelClass: 'col-sm-6 wrap-error',
            errorTemplate: '<i class="wi-icon icon-close-2"></i><p class="text-error">{0}</p>',
            errorAppendTo: '.row:last',
            onBeforeInit: function (form) {
                var requiredMsg = form.find('[data-popin]').data('required-message');
                if (requiredMsg) {
                    form.find('[data-required]').each(function () {
                        var field = $(this);
                        if (!field.data('required-message')) {
                            field.data('required-message', requiredMsg);
                        }
                    });
                }
            },
            onChange: function () {
                toggleWrapError(!this.element.find('.wrap-error:visible').length);
            },
            onAfterSubmit: function (isValid) {
                toggleWrapError(isValid);
                return isValid;
            }
        };

    var toggleWrapError = function (isValid) {
        if (isValid) {
            headerError.addClass('hidden');
        } else {
            headerError.removeClass('hidden');
        }
    };

    var loadFormAjax = function (btn) {
        var that = this,
            ajaxFormPath = btn.data('ajax-form');
        if (ajaxFormPath !== undefined && ajaxFormPath !== null && ajaxFormPath !== '') {
            $.ajax({
                url: ajaxFormPath + '.html',
                type: 'get',
                dataType: 'text',
                error: function() {
                    console.log('Call ajax fail! Maybe link is not correct!');
                },
                success: function (eventForm) {
                    var form = $(eventForm).find('form'),
                        popup = form.find('.popup#event-ajax-form');
                    $('body').append(form);
                    popup.addClass('remove-when-hide').popin();
                    form.validation(validateOptions);
                    console.log(popup);

                    var item = that.vars.fmData.eventResults[btn.data('eindex')],
                        title = btn.data('title'),
                        eventPage = btn.data('event-page'),
                        startDate = btn.data('start-date'),
                        endDate = btn.data('end-date'),
                        iconTime = popup.find('.icon-time'),
                        pTime = popup.find('.desc p.time');

                    popup
                        .find('.modal-header .wrap-error').addClass('hidden').end()
                        .find('[data-validation] .error').removeClass('error').end()
                        .find('[data-validation] .wrap-error').remove().end();

                    popup
                        .find('.modal-title .event-name').html(' ' + title).end()
                        .find('input[name="eventName"]').val(title).end()
                        .find('input[name="eventStartDate"]').val(startDate).end()
                        .find('input[name="eventEndDate"]').val(endDate).end()
                        .find('input[name="eventPage"]').val(eventPage);

                    pTime.html(item.time);
                    if (!item.time) {
                        iconTime.add(pTime).hide();
                    } else {
                        iconTime.add(pTime).show();
                    }
                    popup.popin('show');
                }
            });
        } else {
            console.log('ajax form is not defined');
        }
    };

    var showRegisterPopup = function (btn) {
        loadFormAjax.call(this, btn);
    };

    var hideRegisterPoup = function () {
        $(this.options.registerPopup).popin('hide');
    };

    // Converting json received from server to formated data which can be rendered to DOM
    var parseEvents = function (data) {
        var fmData = data,
            eResults = fmData.eventResults,
            monthlyIndex = 0,
            curMonthID = null,
            monthID = null,
            eItem = null;

        fmData = $.extend({}, fmData, this.vars.fmDataParams);

        fmData.total = eResults.length;
        fmData.remain = eResults.length;
        if (fmData.total) {
            eItem = eResults[0];
            curMonthID = (eItem !== undefined && eItem !== null)
                ? (eItem.startMonth + '-' + eItem.startYear)
                : null;
        }

        eResults.forEach(function (eItem, i) {
            monthID = eItem.startMonth + '-' + eItem.startYear;
            if (curMonthID !== monthID) {
                // To other month (exactly the next month)
                monthlyIndex = 1;
                curMonthID = monthID;
            } else {
                // Still in current month
                monthlyIndex += 1;
            }
            eItem.monthlyIndex = monthlyIndex;
            eItem.eIndex = i;

        });

        return fmData;
    };

    // Setting events for event-cards
    var setCardEvents = function () {
        var that = this;
        this.element.find('.event-content').each(function () {
            $(this).find('.btn-group .btn-register').on('click.' + pluginName, function (e) {
                e.preventDefault();
                showRegisterPopup.call(that, $(this));
            });
        });
    };

    /**
     **  Event calendar Navigation (anchor and scrolling)
     **/

    // Scroll to an month anchor by monthID or index
    var goToMonthIndex = function (navItem, index) {
        var PADDINGTOP = 10,
            elm = this.element,
            header = this.vars.headerElm,
            targetAnchor = null,
            top = null;

        if (navItem !== undefined && navItem !== null) {
            if (navItem.attr('href') === 'feature') {
                targetAnchor = elm.find('.feature-event');
            } else {
                targetAnchor = elm.find('.item.month-' + navItem.attr('href'));
            }
        } else if (index !== undefined) {
            targetAnchor = (index > 0)
                ? elm.find('.item:nth-child(' + index + ')')
                : elm.find('.feature-event');
        }

        top = targetAnchor.offset().top -
                header.height() -
                parseInt(header.css('top')) -
                PADDINGTOP;

        $('body, html').animate({
            scrollTop: top
        });

    };

    var navScrollEvent = function () {
        var that = this,
            elm = this.element,
            header = this.vars.headerElm;
        win.on('scroll.' + pluginName + '-fornav', function () {
            var topLine = win.scrollTop() + header.height(),
                viewportH = win.outerHeight() - header.height(),
                focusItem = {
                    id: null,
                    d: viewportH
                };

            elm.find('.feature-event, .event-card-block .item').each(function () {
                var item = $(this),
                    d = Math.abs(item.offset().top - topLine);
                if (d < focusItem.d && d < viewportH) {
                    focusItem = {
                        id: (item.hasClass('feature-event'))
                            ? 'feature'
                            : item.data('id'),
                        d: d
                    };
                }
            });

            if (focusItem.id !== null && focusItem.id.length > 0) {
                setActiveNavItem.call(that, focusItem.id);
            }
        });

    };

    var setActiveNavItem = function (activeId) {
        var nav = this.vars.navControl,
            navList = nav.find('.list-control li'),
            text = '';
        navList.removeClass('active');
        text = navList
            .find('a[href="' + activeId + '"]')
            .closest('li').addClass('active')
            .find('.text-1').html();
        nav.find('.main-control button').html(text);

    };
    // Setting events for events navigation
    var setNavEvents = function () {
        var that = this,
            nav = this.vars.navControl,
            listControl = nav.find('.list-control'),
            navList = listControl.find('li'),
            mainControl = nav.find('.main-control'),
            switchButton = mainControl.find('button'),
            nextBtn = nav.find('button.next'),
            prevBtn = nav.find('button.prev');

        navList.find('a').on('click.' + pluginName, function (e) {
            var a = $(this);
            e.preventDefault();

            setActiveNavItem.call(that, a.attr('href'));
            switchButton.html(a.attr('title'));

            goToMonthIndex.call(that, a);
            return false;
        });

        // Toggle month selector on mobile
        function toggleListControl() {
            mainControl.find('.list-control').slideToggle();
        }
        switchButton
            .off('click.' + pluginName)
            .on('click.' + pluginName, function () {
                toggleListControl();
            });
        nextBtn
            .off('click.' + pluginName)
            .on('click.' + pluginName, function () {
                var activeItem = listControl.find('li.active'),
                    nextItem = activeItem.next('li');
                if (nextItem.length > 0) {
                    nextItem.find('a').click();
                }
            });
        prevBtn
            .off('click.' + pluginName)
            .on('click.' + pluginName, function () {
                var activeItem = listControl.find('li.active'),
                    prevItem = activeItem.prev('li');
                if (prevItem.length > 0) {
                    prevItem.find('a').click();
                }

            });
        navScrollEvent.call(this);
    };

    // Rendering the navigation control
    var renderNavControl = function () {
        var vars = this.vars,
            nav = vars.navControl,
            feature = vars.feature,
            eventItems = vars.cardWrap.find('.item'),
            navListHTML = '',
            curActive = nav.find('.main-control li.active a').attr('href');

        function getNavItem(id, label) {
            return '<li>' +
                    '<a href="' + id + '">' +
                    '<span class="text-1">' +
                    label +
                    '</span>' +
                    '</a>' +
                    '</li>';
        }

        // Checking feature
        if (!feature.hasClass('hide')) {
            navListHTML += getNavItem('feature', vars.fmData.featureEventsLabel);
        }

        eventItems.each(function () {
            navListHTML += getNavItem($(this).data('id'), $(this).data('label'));
        });

        if (navListHTML !== '') {
            nav.show().attr('style', '').removeClass('fixed-nav').find('.list-control').html(navListHTML);
        } else {
            nav.hide();
        }

        recalNavOffset(nav);
        nav.data('origin-offset-top', nav.offset().top);

        if (curActive !== null) {
            nav.find('a[href="' + curActive + '"]').closest('li').addClass('active');
        } else {
            nav.find('a[href="feature"]').closest('li').addClass('active');
        }
        setNavEvents.call(this);
    };

    var recalNavOffset = function (nav) {
        nav.removeClass('fixed-nav').data('origin-offset-top', nav.offset().top);
    };

    var getMonthString = function (month) {
        return window.L10n.text.monthsFull[month - 1];
    };

    var getFeatureItemHTML = function (itemData) {
        var fmData = this.vars.fmData,
            itemHTML = '',
            classHide = '';

        if (!itemData.time) {
            classHide = 'hidden';
        }

        itemHTML = '<div class="detail">' +
                '<div class="event-content">' +
                '<div class="event-box">' +
                '<div class="icon-box">' +
                ((itemData.icon.length)
            ? ('<img src="' + itemData.icon + '" class="img-responsive"/>')
            : '') +
                '</div><a href="' + itemData.moreDetailLink + '" class="text-box title">' + itemData.name + '</a>' +
                '</div>' +
                '<div class="date-time "' + classHide + '>' +
                '<p class="desc-1">' +
                '<span aria-hidden="true" class="wi-icon icon-date-time"></span>' +
                '<span class="blue-text">' + itemData.time + '</span></p>' +
                '</div>' +
                '<div class="location">' +
                '<p class="desc-1">' +
                '<span aria-hidden="true" class="wi-icon icon-location"></span>' +
                '<span class="blue-text">' + itemData.location + '</span></p>' +
                '</div>' +
                '<div class="desc hidden-xs">' +
                '<p>' + itemData.desc + '</p>' +
                '</div>' +
                '<div class="btn-group">' +
                '<div class="item">' +
                '<a href="' + itemData.moreDetailLink + '" class="btn btn-default">' +
                '<span>' + fmData.moreDetailText + '</span>' +
                '<span aria-hidden="true" class="wi-icon icon-arrow"></span>' +
                '</a>' +
                '</div>' +
                ((itemData.status !== 'notavailable')
            ? ('<div class="item">' +
                    '<a href="#" data-end-date="' + itemData.endDate + '" data-start-date="' + itemData.startDate + '" data-ajax-form="' + itemData.buttonPath + '" data-event-page="' + itemData.moreDetailLink + '" data-title="' + itemData.name + '" data-eindex="' + itemData.eIndex + '" class="btn btn-primary btn-register">' +
                    '<span>' + itemData.buttonLabel + '</span>' +
                    '<span aria-hidden="true" class="wi-icon icon-arrow"></span>' +
                    '</a>' +
                    '</div>')
            : '') +
                '</div>' +
                '</div>' +
                '<div class="thumb-image hidden-xs">' +
                ((itemData.image.length)
            ? ('<img src="' + itemData.image + '" class="img-responsive"/>')
            : '') +
                '</div>' +
                '</div>';

        return itemHTML;
    };

    var getItemHTML = function (itemData) {
        var fmData = this.vars.fmData,
            itemHTML = '',
            classHide = '';

        if (!itemData.time) {
            classHide = 'hidden';
        }

        itemHTML = '<div class="col-sm-6 col-md-4">' +
                '<div class="event-content">' +
                '<div class="event-box">' +
                '<div class="icon-box">' +
                ((itemData.icon.length)
            ? ('<img src="' + itemData.icon + '" class="img-responsive"/>')
            : '') +
                '</div>' +
                '<a href="' + itemData.moreDetailLink + '" class="text-box title">' +
                itemData.name +
                '</a>' +
                '</div>' +
                '<div class="date-time "' + classHide + '>' +
                '<p class="desc-1">' +
                '<span aria-hidden="true" class="wi-icon icon-date-time"></span>' +
                '<span class="blue-text">' +
                itemData.time +
                '</span>' +
                '</p>' +
                '</div>' +
                '<div class="location">' +
                '<p class="desc-1">' +
                '<span aria-hidden="true" class="wi-icon icon-location"></span>' +
                '<span class="blue-text">' + itemData.location + '</span></p>' +
                '</div>' +
                '<div class="btn-group">' +
                '<a href="' + itemData.moreDetailLink + '" class="btn btn-default">' +
                '<span>' + fmData.moreDetailText + '</span>' +
                '<span aria-hidden="true" class="wi-icon icon-arrow"></span>' +
                '</a>' +
                ((itemData.status !== 'notavailable')
            ? ('<a href="#" data-end-date="' + itemData.endDate + '" data-start-date="' + itemData.startDate + '" data-ajax-form="' + itemData.buttonPath + '" data-event-page="' + itemData.moreDetailLink + '" data-title="' + itemData.name + '" data-eindex="' + itemData.eIndex + '" class="btn btn-primary btn-register hidden-xs">' +
                    '<span>' + itemData.buttonLabel + '</span>' +
                    '<span aria-hidden="true" class="wi-icon icon-arrow"></span></a>')
            : '') +
                '</div>' +
                ((itemData.isFeature)
            ? ('<div class="pin-item">' +
                    '<span class="wi-icon icon-pin"></span>' +
                    '</div>')
            : '') +
                '</div>' +
                '</div>';
        return itemHTML;
    };

    var renderQuantityDom = function () {
        var elm = this.element;
        elm.find('h3.static-title').each(function () {
            var wrap = $(this),
                numItem = wrap.closest('.item');

            if (wrap.parents('.feature-event').length > 0) {
                numItem = wrap.next('.events').find('.detail').length;
            } else {
                numItem = wrap.closest('.item').find('.event-content').length;
            }

            if (wrap.find('.num').length > 0) {
                wrap.find('.num').html(' (' + numItem + ')');
            } else {
                wrap.append('<span class="num"> (' + numItem + ')</span>');
            }
        });
    };

    var renderCalendarDom = function (fmList, start) {
        var cardsHTML = '',
            featureHTML = '',
            fmData = this.vars.fmData,
            featureElm = this.vars.feature.find('.events'),
            cardWrap = this.vars.cardWrap.find('.events'),
            monthEvents = null,
            lastShowedMonth = null,
            curColumn = null,
            startIndex = null,
            rowInProcess = null,
            isMonthInProcess = null,
            showedEvents = null,
            that = this;


        //setting feature title
        this.vars.feature.find('h3.static-title').html(fmData.featureEventsLabel);
        var curMonth = null,
            months = Object.keys(fmList);
        months.forEach(function (month) {
            monthEvents = fmList[month].events;
            curColumn = 1;
            startIndex = 0;
            rowInProcess = null;
            isMonthInProcess = fmData.lastestMonth !== undefined && fmData.lastestMonth === month;
            if (isMonthInProcess) {
                lastShowedMonth = cardWrap.find('.item.month-' + month);
                showedEvents = null;
                rowInProcess = lastShowedMonth.find('.row:last');
                showedEvents = rowInProcess.find('.col-sm-6').length;
                curColumn = showedEvents + 1;
            } else {
                cardsHTML += '<div class="item month-' + month + '" data-id="' + month + '" data-label="' + fmList[month].label + '">' +
                        '<h3 class="static-title">' + fmList[month].label + '</h3>' +
                        '<div class="row">';
            }

            monthEvents.forEach(function (eItem, j) {
                if (j >= startIndex) {
                    // render item
                    cardsHTML += getItemHTML.call(that, eItem);

                    if (curColumn % 2 === 0) {
                        cardsHTML += '<div class="visible-sm-block clearfix"></div>';
                    }
                    if (curColumn % 3 === 0) {
                        cardsHTML += '<div class="visible-lg-block visible-md-block clearfix"></div>';
                    }
                    curColumn += 1;

                    if (eItem.isFeature) {
                        featureHTML += getFeatureItemHTML.call(that, eItem);
                    }
                }
            });

            if (!isMonthInProcess) {
                cardsHTML += '</div></div>'; // Closing .row and .item
            } else {
                rowInProcess.append(cardsHTML);
                cardsHTML = '';
            }
            curMonth = month;
        });

        if (start !== undefined && start === 0) {
            cardWrap.html(cardsHTML);
            featureElm.html(featureHTML);
        } else {
            cardWrap.append(cardsHTML);
            featureElm.append(featureHTML);
        }

        checkVisualElement.call(this);

        fmData.lastestMonth = curMonth;

        renderQuantityDom.call(this);
    };

    var checkVisualElement = function () {
        var feature = this.vars.feature,
            featureEvents = feature.find('.events').html();
        if (featureEvents === undefined || featureEvents === '') {
            feature.addClass('hide');
        } else {
            feature.removeClass('hide');
        }
    };

    var checkLoadMoreResult = function () {
        var vars = this.vars,
            elm = this.element,
            loadMoreCardWrap = vars.cardWrap.find('.event-result'),
            fmData = vars.fmData;
        // hide all result card
        loadMoreCardWrap.find('.control-result').addClass('hide');

        if (fmData.total === 0) {
            loadMoreCardWrap
                .find('.zero-result').removeClass('hide');
        } else {
            if (fmData.remain > 0) {
                // There are more results
                var eventText = ((fmData.remain > 1)
                    ? elm.data('result-type-plural')
                    : elm.data('result-type')) + ' ';
                loadMoreCardWrap
                    .find('.load-more')
                    .removeClass('hide')
                    .find('.desc .num').html(' ' + fmData.remain + ' ').end()
                    .find('.desc .result').html(eventText).end()
                    .find('.load-more .result').html(eventText);
            } else {
                // There is no more result
                loadMoreCardWrap
                    .find('.no-more-result').removeClass('hide');
            }
        }
    };

    var getCondensedItemHTML = function (item) {
        return '<li>' +
                '<div class="icon-box">' +
                ((item.icon.length)
            ? ('<img src="' + item.icon + '" class="img-responsive"/>')
            : '') +
                '</div>' +
                '<div class="text-box">' +
                '<a href="' + item.moreDetailLink + '" class="title name-event">' +
                item.name +
                '</a>' +
                '<p class="date">' +
                '<span>' + item.time + '</span>' +
                '</p>' +
                '</div>' +
                '</li>';
    };

    var renderCondensedEventCalendarDom = function () {
        var fmData = this.vars.fmData,
            elm = this.element,
            eResults = fmData.eventResults,
            eLength = eResults.length,
            ePerPage = fmData.numberOfResultToShowInCondensedView,
            maxEshow = ((eLength >= ePerPage)
                ? ePerPage
                : eLength),
            d = new Date(),
            curMonth = (d.getUTCMonth() + 1) + '-' + d.getUTCFullYear(),
            curMonthID = '',
            featureHTML = '',
            monthlyEventHTML = '',
            month = null;

        eResults.forEach(function (item, i) {
            if (i < maxEshow) {
                if (item.isFeature) {
                    featureHTML += getCondensedItemHTML.call(this, item);
                } else {
                    month = item.startMonth + '-' + item.startYear;
                    if (month !== curMonthID) {

                        if (curMonthID.length) {
                            // not the first month
                            monthlyEventHTML += '</ul></div>';
                        }

                        curMonthID = month;
                        monthlyEventHTML += '<div class="event-calendar-wrap">' +
                                '<h3 class="static-title">' +
                                '<span>' +
                                ((curMonth !== month)
                            ? (getMonthString.call(this, item.startMonth) + ' ' + item.startYear)
                            : window.L10n.text.curMonth) +
                                '</span>' +
                                '<span class="num"></span>' +
                                '</h3>' +
                                '<ul class="list-unstyled static-list">';
                    }
                    monthlyEventHTML += getCondensedItemHTML.call(this, item);
                }
            } else {
                return;
            }
        });
        if (monthlyEventHTML.length) {
            monthlyEventHTML += '</ul></div>';
        }

        function countingEvent(elm) {
            elm.find('.event-calendar-wrap').each(function () {
                var wrap = $(this),
                    evLength = wrap.find('li').length;
                if (!evLength) {
                    wrap.hide();
                } else {
                    wrap.show();
                }
                wrap.find('.static-title .num').html(' (' + evLength + ')');
            });
        }
        elm
            .find('.feature .static-title .feature-label').html(fmData.featureEventsLabel).end()
            .find('.feature ul').html(featureHTML).end()
            .find('.month').html(monthlyEventHTML).end()
            .find('.link-more').attr('href', fmData.loadMoreUrlInCondensedView)
            .find('.load-more-label').html(fmData.loadMoreLabelInCondensedView);
        countingEvent(elm);
    };

    // Render condensed view of event calendar
    var renderCondensedEventCalendar = function (data) {
        this.vars.fmData = parseEvents.call(this, data);

        renderCondensedEventCalendarDom.call(this);
    };

    // Render normal view of event calendar
    var renderEventCalendar = function (data) {
        var fmData = null,
            limit = null,
            renderMonth = null,
            renderMonthlyEvent = {},
            d = new Date(),
            curMonth = (d.getUTCMonth() + 1) + '-' + d.getUTCFullYear(),
            eList = null,
            start = 0,
            total = 0,
            monthID = null;

        if (data !== undefined) {
            fmData = parseEvents.call(this, data);
            this.vars.fmData = fmData;
        } else {
            fmData = this.vars.fmData;
            start = fmData.showToEvent;
        }
        total = fmData.total;

        limit = start + fmData.numberOfResultPerPage + 1;
        eList = fmData.eventResults;
        var len = total;
        eList.forEach(function (item, i) {
            if (i === (limit - 1)) {
                fmData.start = limit;
                fmData.remain = total - limit;
                fmData.showToEvent = limit;
                return;
            }
            if (i > (limit - 1)) {
                return;
            }
            if (i >= start && i < len) {
                monthID = item.startMonth + '-' + item.startYear;
                if (monthID !== renderMonth) {
                    renderMonth = monthID;
                    renderMonthlyEvent[monthID] = {
                        label: (curMonth === renderMonth)
                            ? window.L10n.text.curMonth
                            : getMonthString(item.startMonth) + ' ' + item.startYear,
                        events: []
                    };
                }
                renderMonthlyEvent[monthID].events.push(item);

                if (i === (total - 1)) {
                    fmData.showToEvent = total;
                    fmData.remain = 0;
                }
            } else {
                return;
            }
        });

        renderCalendarDom.call(this, renderMonthlyEvent, start);
        checkLoadMoreResult.call(this, start);

        // Setting events for event-cards
        setCardEvents.call(this);

        // setting control navigation
        renderNavControl.call(this);
    };

    var setCommonEvent = function () {
        var that = this,
            loadMoreResults = this.vars.cardWrap.find('.event-result');

        loadMoreResults
            .find('.control-result.load-more').on('click.' + pluginName, function () {
                renderEventCalendar.call(that);
                return false;
            }).end()
            .find('.control-result.no-more-result').on('click.' + pluginName, function () {
                goToMonthIndex.call(that, null, 0);
            }).end()
            .find('.control-result.zero-result a').on('click.' + pluginName, function () {
                $(window).trigger('resetFilter');
            });
    };

    var setGlobalEvents = function () {
        var NAVMARGIN = 80,
            that = this,
            opt = this.options,
            vars = this.vars,
            nav = vars.navControl,
            elm = this.element,
            registerPopup = $(opt.registerPopup),
            headerH = vars.headerElm.outerHeight(),
            rand = Math.random() * 100;
        // Getting data when filtering event
        win.on('filterEventCalendar.id' + rand, function (e, data) {
            e.preventDefault();
            if (data.condensedView !== undefined && data.condensedView) {
                renderCondensedEventCalendar.call(that, data);
            } else {
                renderEventCalendar.call(that, data);
            }
            if (!data.resultBasedInUrlParameter) {
                win.off('filterEventCalendar.id' + rand);
            }
        });

        // closing register popup
        registerPopup
            .find('button.close')
            .off('click.' + pluginName)
            .on('click.' + pluginName, function () {
                hideRegisterPoup.call(that);
            });

        function reposNav() {
            var topPin = elm.offset().top,
                topLine = win.scrollTop() + headerH;
            if (nav.css('display') !== 'none') {
                if (!nav.find('.main-control button').is(':visible')) {
                    var marTop = 0;
                    if (topPin < topLine) {
                        marTop = topLine - topPin;
                        if ((marTop + nav.find('ul').outerHeight()) < elm.outerHeight()) {
                            nav.stop().animate({
                                'margin-top': marTop
                            });
                            return;
                        }
                    }
                } else {
                    var bottomLine = win.scrollTop() + win.outerHeight();
                    if ((topPin + NAVMARGIN) < bottomLine && nav.data('origin-offset-top') > bottomLine) {
                        nav.addClass('fixed-nav');
                        return;
                    }
                }
                nav
                    .attr('style', '')
                    .removeClass('fixed-nav');
            }
        }
        // Pinning navigation control when scroll
        win
            .off('scroll.navControl-' + pluginName)
            .on('scroll.navControl-' + pluginName, function () {
                reposNav();
            })
            .off('touchmove.navControl-' + pluginName)
            .on('touchmove.navControl-' + pluginName, function () {
                reposNav();
            });
        win.on('recalNavOffset.eventCalendar', function () {
            recalNavOffset(nav);
        });
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var opt = this.options,
                elm = this.element;
            this.vars = {
                navControl: elm.find('.' + opt.navClass),
                feature: elm.find('.' + opt.featureClass),
                cardWrap: elm.find('.' + opt.cardsWrapClass),
                headerElm: $('#header'),
                fmData: null,
                fmDataParams: {
                    showToEvent: 0,
                    total: 0,
                    remain: 0,
                    lastestMonth: null
                }
            };

            // loadEvents.call(this);
            setGlobalEvents.call(this);
            setCommonEvent.call(this);

            // Check init ajax call
            if (elm.data('init-ajax') !== undefined) {
                var initPath = elm.data('init-ajax');
                if (initPath.length) {
                    $.ajax({
                        url: initPath,
                        type: 'GET',
                        success: function (data) {
                            $(window).trigger('filterEventCalendar', data);
                        }
                    });
                }
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
        navClass: 'control-nav',
        featureClass: 'feature-event',
        cardsWrapClass: 'event-card-block',
        registerPopup: '.popup.register-popup'
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

// This plugin is used for "Expandable Content Area" component
(function ($, window) {
    'use strict';

    var pluginName = 'expandContent';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.handle = $('[data-expand-handle][href="#' + this.element.attr('id') + '"],' + '[data-expand-handle][data-target="#' + this.element.attr('id') + '"]');
            this.title = this.handle.find('[data-expand-title]');
            this.default = this.element.hasClass(this.options.expandedClass)
                ? 'show'
                : 'hide';
            this.isTransitioning = false;
            this.close = $(this.options.close, this.element);
            this.handle
                .off('click.' + pluginName)
                .on('click.' + pluginName, $.proxy(function (e) {
                    if (!$(e.target).attr('data-target')) {
                        e.preventDefault();
                    }
                    this.toggle();
                }, this));

            this.close
                .off('click.' + pluginName)
                .on('click.' + pluginName, $.proxy(function (e) {
                    e.preventDefault();
                    this.toggle();
                }, this));
        },
        toggle: function () {
            this[this.element.hasClass(this.options.expandedClass)
                ? 'hide'
                : 'show']();
            var masonry = this.handle.data('mymasonry') ? this.handle : this.handle.closest('[data-mymasonry]');
            if(masonry.length) {
                masonry.masonry('resize');
            }
        },
        show: function () {
            if (this.isTransitioning || this.element.hasClass(this.options.expandedClass)) {
                return;
            }

            this.isTransitioning = true;

            var options = this.options,
                element = this.element,
                complete;

            if (options.hidehandler) {
                this.handle.hide();
            }

            this.handle.addClass(options.activeHandle);

            this.title.slideUp(options.transitionTitle);

            complete = function () {
                element.addClass(options.expandedClass).removeAttr('style');
                this.isTransitioning = false;
                if (element.hasClass('filtering-controls')) {
                    $(window).trigger('recalNavOffset.eventCalendar');
                }
            };

            element.slideDown(options.transitionContent, $.proxy(complete, this));
        },
        hide: function () {
            if (this.isTransitioning || !this.element.hasClass(this.options.expandedClass)) {
                return;
            }

            this.isTransitioning = true;

            var options = this.options,
                element = this.element,
                complete;



            this.handle.removeClass(options.activeHandle);

            this.title.slideDown(options.transitionTitle);

            complete = function () {
                element.removeClass(options.expandedClass).removeAttr('style');
                this.isTransitioning = false;
                if (options.hidehandler) {
                    this.handle.fadeIn(options.transitionTitle, function () {
                        $(this).removeAttr('style');
                    });
                }
                if (element.hasClass('filtering-controls')) {
                    $(window).trigger('recalNavOffset.eventCalendar');
                }
            };

            element.slideUp(options.transitionContent, $.proxy(complete, this));
        },
        destroy: function () {
            this[this.default]();
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
        expandedClass: 'in',
        activeHandle: 'active',
        close: '',
        hidehandler: false,
        transitionContent: 400,
        transitionTitle: 200
    };

    $(function () {
        $('[data-expand-content]')[pluginName]();
        $('.result-card-cmp').first().find('[data-expand-content]')[pluginName]('show');
        var masonryElement = $('[data-mymasonry]'),
            createMasonry = function () {
                masonryElement.mymasonry('restart');
            };

        var opts = {
            onBeforeAction: function (isDelay) {
                if (!Site.isMobile()) {
                    clearTimeout(timer);
                    if (!isDelay) {
                        createMasonry();
                    } else {
                        timer = setTimeout(function () {
                            createMasonry();
                        }, 300);
                    }
                }
            }
        };
        if(masonryElement.length) {
            var count = 0,
                updateMasonry = function() {
                    masonryElement.masonry();
                    count++;
                    if(count < 10) {
                        setTimeout(updateMasonry, 1500);
                    }
                };
            updateMasonry();
            $(window).on('load.updateMasonry', function() {
                masonryElement.masonry();
            });
        }
    });
}(jQuery, window));

// This plugin is used for "Filtering Control" component.
(function ($, window) {
    'use strict';

    $(function () {

        var filterForm = $('[data-filters]'),
            searchContainer = $('#search-result-ajax'),
            pagination = searchContainer.children('nav'),
            title = searchContainer.children('h3'),
            list = searchContainer.children('ul'),
            eventContainer = $('.event-calendar[data-event-calendar]'),
            handlers = filterForm.find(':checkbox, :radio, :text, select'),
            submitBtn = filterForm.find('[type="submit"]'),
            types = filterForm.find('[data-type]'),
            // searchPage = $('#search-page'),
            term = $('#search-term'),
            delayTriggerFilter = 200,
            numberFilters = $('.num-filters'),
            ajaxReq = null;
        function checkFilterData() {
            var url = '',
                numOfGroup = 0;
            types.each(function () {
                var current = $(this),
                    items = current.find(':checkbox:checked, :radio:checked, :text, select'),
                    type = current.data('type');
                if (items.length) {
                    var values = [],
                        hasValue = false;

                    items.each(function () {
                        var field = $(this),
                            val = field.val(),
                            opt = $(this).find('option:selected');
                        if (opt.length) {
                            if (opt.data('default') === undefined) {
                                hasValue = true;
                            }
                        } else if (val && val !== '' && val !== 'Today' && field.data('default') === undefined) {
                            hasValue = true;
                        }
                        values.push(val);
                    });

                    if (hasValue) {
                        numOfGroup += 1;
                        url += '&' + type + '=' + values.join('|');
                    }
                }
            });
            numberFilters.text(numOfGroup);

            return {
                url: url
            };
        }

        function buildParams(pageNumber, reinit) {
            var filterData = checkFilterData(),
                searchTerm = term.val(),
                url = filterData.url;

            pageNumber = pageNumber || 1;
            url = ((searchTerm && searchTerm !== '')
                ? ('search-term=' + searchTerm)
                : '') + url;


            if (pageNumber && pageNumber > 1) {
                url += '&page-number=' + pageNumber;
            }

            // Add URL for loading event calendar first data
            if (eventContainer.length > 0) {
                var ecUrl = eventContainer.data('event-calendar-path');
                if (ecUrl !== undefined && ecUrl !== '') {
                    url += '&event-calendar-path=' + ecUrl;
                }
            }

            if (url && url !== '' && url.substr(0, 1) === '&') {
                url = url.substr(1);
            }

            loadAjax(url, reinit);
        }

        function paging(items, itemsOnPage, currentPage) {
            if (itemsOnPage > items || items === 0) {
                pagination.empty();
            } else {
                pagination.pagination({
                    items: items,
                    itemsOnPage: itemsOnPage,
                    currentPage: currentPage,
                    prevText: window.L10n.text.prev,
                    nextText: window.L10n.text.next,
                    ellipseText: '...',
                    edges: 1,
                    listStyle: 'pagination',
                    preventClick: true,
                    onPageClick: function (pageNumber) {
                        buildParams(pageNumber, false);
                    }
                });
            }
        }

        function changeURL(params) {
            var url = window.location.pathname + ((params !== '')
                ? ('?' + params)
                : '');
            window.history.pushState('filtering', null, url);
        }

        function loadAjax(url, reinit) {
            if (ajaxReq !== null) {
                ajaxReq.abort();
            }
            ajaxReq = $.ajax({
                url: filterForm.attr('action') + '?' + url,
                type: filterForm.attr('method'),
                success: function (data) {
                    changeURL(url);
                    if (searchContainer.length > 0) {
                        renderSearchResult(data, reinit);
                    } else if (eventContainer.length > 0) {
                        renderEventCalendar(data);
                    }
                }
            });
        }

        function renderEventCalendar(data) {
            $(window).trigger('filterEventCalendar', data);
        }

        function renderSearchResult(data, reinit) {
            list.empty();
            title.text(data.resultslabel);

            if (typeof data === 'string') {
                data = $.parseJSON(data);
            }

            if (data && data.searchResultBeans) {
                var len = data.searchResultBeans.length;
                if (len && data.resultCount) {
                    var template = [];
                    var breadCrumbLength;
                    data.searchResultBeans.forEach(function (item) {
                        breadCrumbLength = item.breadcrumbItems.length;
                        template.push('<li><div class="result-container-block">');
                        if (item.iconPath) {
                            template.push('<div class="icon-box"><img src="' + item.iconPath + '" alt="" class="img-responsive" /></div>');
                        }
                        template.push('<div class="text-box">');
                        if (breadCrumbLength) {
                            template.push('<ol class="breadcrumb">');
                            item.breadcrumbItems.forEach(function (breadCrumb) {
                                if (breadCrumb) {
                                    template.push('<li><a href="' + breadCrumb.link + '"><span>' + breadCrumb.heading + '</span><span class="wi-icon icon-arrow"></span></a></li>');
                                }
                            });
                            template.push('</ol>');
                        }

                        template.push('<a href="' + item.url + '" class="text">' + item.title + '</a>');

                        if (item.description) {
                            template.push('<p class="hidden-xs desc">' + item.description + '</p>');
                        }

                        template.push('</div>');
                        template.push('</div></li>');
                    });
                    list.html(template.join(''));
                    if (reinit) {
                        paging(data.resultCount, data.numberToDisplay, data.currentPage);
                    }
                } else {
                    pagination.empty();
                }
            } else {
                pagination.empty();
            }
        }

        function setText(el) {
            el = $(el);
            if (el.is(':radio')) {
                var desc = el.closest('fieldset').find('.decs');
                if (desc.length) {
                    desc.text(el.next().text());
                }
            }
        }

        function resetFilter(e) {
            e.preventDefault();
            filterForm[0].reset();

            // Reseting params
            handlers.trigger('change.filters');
            handlers.filter(':checkbox[data-default], :radio[data-default]').prop('checked', true).trigger('change');
            handlers.filter('select').each(function () {
                $(this).val($(this).find('option[data-default]').val());
            });
            handlers.filter(':text').each(function () {
                var txt = $(this);
                if (txt.parent().hasClass('date-picker')) {
                    txt.val('Today');
                }
            });

            handlers.filter(':radio:checked').each(function () {
                setText(this);
            });

            handlers.filter('select').each(function () {
                var select = $(this);
                select.parent().find('.visible-value').text(select.children('option:eq(0)').text());
            });
            $('[data-init-calendar]').datepicker('clearDates');

            buildParams(1, true);
        }

        submitBtn.on('click.filter', function () {
            buildParams(1, true);
            $(window).trigger('filterHandlerChanged', filterForm);
        });

        handlers.on('change.filters', function () {
            setText(this);
            if ($('.filtering-submit').is(':hidden')) {
                buildParams(1, true);
                $(window).trigger('filterHandlerChanged', filterForm);
            }

        });



        checkFilterData();

        setTimeout(function () {
            $(window).trigger('filterHandlerChanged', filterForm);
        }, delayTriggerFilter);

        paging(searchContainer.data('result-count'), searchContainer.data('number-to-display'), searchContainer.data('current-page'));

        $('.btn-reset-filters').on('click', resetFilter);
        $(window).on('resetFilter', resetFilter);

        $('[data-check-all]').on('change.filters-checkall', function () {
            var el = $(this);
            if (el.prop('checked')) {
                var siblings = el.parent().siblings();
                el.attr('disabled', 'disabled');
                siblings
                    .find(':checkbox')
                    .prop('checked', false)
                    .trigger('change.filters');
            }
        }).each(function () {
            var el = $(this);
            if (el.prop('checked')) {
                el.attr('disabled', 'disabled');
            }
        }).parent().siblings().find(':checkbox').on('change.filters-checkall', function () {
            var el = $(this),
                checks = el.parent().siblings();
            if (el.prop('checked')) {
                checks.find('[data-check-all]').removeAttr('disabled').prop('checked', false).trigger('change.filters');
            } else {
                if (!checks.find(':checked').length) {
                    checks.find('[data-check-all]').attr('disabled', 'true').prop('checked', true).trigger('change.filters');
                }
            }
        });

        if (eventContainer.length > 0 && filterForm.length > 0) {
            buildParams(1, true);
        }
    });

}(jQuery, window));

// This plugin is used for "Photo gallery" component.
(function ($, window) {
    'use strict';

    var pluginName = 'gallery';

    var win = $(window),
        L10n = window.L10n,
        body = $('body'),
        doc = $('html'),
        bkgOverlay = '<div class="background-overlay"></div>',
        sliderItemTemplate = '<div><div class="image">' +
                '<a href="#"><img src="" alt=""></a>' +
                '<div class="message-to-landscape">' + L10n.photoGallery.msgToLandscape + '</div></div>' +
                '<div class="social-gallery">' +
                '<div class="clearfix">' +
                '<div class="pull-left"></div>' +
                '<div class="pull-right">' +
                '<div class="social-sharing">' +
                '<div data-share-button="" ' +
                'data-description="description"' +
                'data-title="title"' +
                'data-url="url"' +
                'data-image="image"' +
                ' class="share-button sharer-0" style="display: block;"><label class="entypo-export"><span>Share</span></label><div class="social load top center networks-5"><ul><li class="entypo-pinterest" data-network="pinterest"></li><li class="entypo-twitter" data-network="twitter"></li><li class="entypo-facebook" data-network="facebook"></li><li class="entypo-gplus" data-network="google_plus"></li><li class="entypo-paper-plane" data-network="email"></li></ul></div></div>' +
                '</div><a href="#" class="download-button" target="_blank"><span aria-hidden="true" class="icon-download"></span><span class="text hidden-xs">' + L10n.photoGallery.downloadTitle + '</span></a>' +
                '</div>' +
                '</div>' +
                '<p class="content"></p>' +
                '</div></div>',

        thumbItemTemplate = '<div><div class="image">' +
                '<a href="#"><img src="" alt="' + L10n.photoGallery.alt + '"></a>' +
                '</div></div>';

    var resizeDelay = 200,
        inactiveTimer = null;

    var loadGallery = function () {
        var that = this;

        Site.showLoading();
        getDataSuccessHandler.call(that, $(that.element).data('gallery-source'));
    };

    var getDataSuccessHandler = function (data) {
        var num, item, thumb, len,
                that = this,
                vars = that.vars,
                strImageItem = '',
                strThumbItem = '',
                caption = '',
                share = null;

        if (typeof data === 'string') {
            try {
                data = $.parseJSON(data);
            } catch (err) {
                console.log(err);
                data = [];
            }
        }

        len = data.length;
        if (!len) {
            Site.hideLoading();
        }

        data.forEach(function (dataItem, i) {
            num = i + 1;
            item = $(sliderItemTemplate);
            thumb = $(thumbItemTemplate);
            caption = (dataItem.caption !== undefined)
                ? dataItem.caption
                : '';

            $('.image img', item)
                .prop('src', dataItem.src)
                .prop('alt', dataItem.alt);

            $('.social-gallery .content', item).text(caption);
            $('.social-gallery .pull-left', item).text(num + ' ' + L10n.photoGallery.of + ' ' + len);
            $('.download-button', item).attr('href', Site.downloadPath + dataItem.src);

            share = $('[data-share-button]', item);
            share.attr('data-ind', (Math.random() * 999) + '-' + i);
            share.attr('data-title', L10n.photoGallery.prefixShareTitle + that.element.data('name'));
            share.attr('data-description', L10n.photoGallery.prefixShareDesc + caption);
            share.attr('data-url', window.location.href);
            share.attr('data-image', window.location.origin + '/' + dataItem.src);
            strImageItem += item.prop('outerHTML');

            $('.image img', thumb).prop('src', dataItem.thumbSrc);
            strThumbItem += thumb.prop('outerHTML');

            cloneImage.call(that, dataItem.src);
            cloneImage.call(that, dataItem.thumbSrc);

        });
        vars.imageSlider.append(strImageItem);
        vars.thumbSlider.append(strThumbItem);

        setTimeout(function () {
            vars.isWaiting = false;
            if (vars.numImagesLoaded === vars.arrCloneImages.length) {
                Site.hideLoading();
                showPopup.call(that, true);
            }
        }, that.options.timeoutLoading);
    };

    var cloneImage = function (src) {
        var that = this,
            imgTemp = new window.Image();

        var imgComplete = function () {
            var vars = that.vars;
            vars.numImagesLoaded += 1;
            if (!vars.isWaiting && vars.numImagesLoaded === vars.arrCloneImages.length) {
                Site.hideLoading();
                showPopup.call(that, true);
            }
        };

        imgTemp.onload = imgComplete;
        imgTemp.onerror = imgComplete;
        imgTemp.src = src;

        that.vars.arrCloneImages.push(imgTemp);
    };

    var initSliders = function () {
        var t = (new Date()).getTime(),
            vars = this.vars;

        vars.sliderID = t;
        vars.imageSlider.addClass('sl-' + t);
        vars.thumbSlider.addClass('sl-' + t);

        initImageSlider.call(this);
        initThumbSlider.call(this);


        vars.isInited = true;

        if ($.isFunction(this.options.renderSuccessCallback)) {
            this.options.renderSuccessCallback();
        }
    };

    var initImageSlider = function () {
        var that = this,
            vars = that.vars,
            options = that.options;

        vars.imageSlider.slick({
            infinite: options.infinite,
            slidesToShow: options.slidesToShowSlide,
            slidesToScroll: options.slidesToScrollSlide,
            arrows: options.arrowsSlide,
            fade: options.fadeSlide,
            asNavFor: options.sliderThumbSelector + '.sl-' + vars.sliderID
        });

        vars.imageSlider.on('afterChange', function (event, slick, currentSlide) {
            var thumbItems = vars.thumbSlider.find('.slick-slide').not('.slick-cloned');
            if ($(event.target).is(vars.imageSlider) && slick) {
                thumbItems.removeClass(options.classThumbActive);
                thumbItems.eq(currentSlide).addClass(options.classThumbActive);
            }
        });

        $('.slick-prev', vars.imageSlider)
            .add($('.slick-next', vars.imageSlider))
            .removeAttr('style');
    };
    var initThumbSlider = function () {
        var that = this,
            vars = that.vars,
            centerMode = false;

        vars.thumbSlider.slick({
            slidesToShow: that.options.slidesToShowNav,
            slidesToScroll: that.options.slidesToScrollNav,
            centerMode: centerMode,
            infinite: that.options.infinite,
            centerPadding: that.options.centerPaddingNav,
            focusOnSelect: that.options.focusOnSelectNav,
            asNavFor: that.options.sliderImageSelector + '.sl-' + vars.sliderID
        });
    };

    var resizeSlideshow = function () {
        var height = window.innerHeight || win.height(),
            vars = this.vars;

        height -= $(this.options.headerSelector, vars.popupElement).outerHeight();

        if (!Site.isMobile()) {
            height -= this.vars.thumbSlider.outerHeight();
        }
        this.vars.imageSlider.css('height', height);
    };

    var showPopup = function (isInit) {
        var that = this,
            vars = that.vars,
            opt = this.options,
            popup = null,
            caption = null,
            sliderNav = null,
            touchEvent = '',
            sliders = vars.imageSlider.add(vars.thumbSlider);

        if (doc.hasClass('iphone')) {
            win.scrollTop(0);
        }

        var renderSlider = function () {
            if (!isInit) {
                vars.imageSlider.slick('unslick');
                initImageSlider.call(that);
                vars.thumbSlider.slick('unslick');
                initThumbSlider.call(that);
            }
            vars.imageSlider.slick('slickGoTo', vars.imageIndex);

            setTimeout(function () {
                sliders.animate({
                    opacity: 1
                }, function () {
                    popup = $('.popup-gallery');
                    caption = popup.find('.social-gallery');
                    sliderNav = popup.find(opt.sliderThumbSelector);

                    function setInactiveTimer() {
                        caption.addClass('hide').hide();
                        sliderNav.stop().fadeTo('fast', 0.5);
                        resetInactiveTimer();
                    }

                    // set inactive timeout
                    function resetInactiveTimer() {
                        clearTimeout(inactiveTimer);
                        inactiveTimer = null;
                        inactiveTimer = setTimeout(function () {
                            setInactiveTimer();
                        }, opt.inactiveTimeout);
                    }
                    popup.find('.message-to-landscape').attr('style', '');
                    popup.on('click.hide-tilt-message', function () {
                        popup.find('.message-to-landscape').fadeOut(2000);
                    });

                    if (document.documentElement.hasOwnProperty('ontouchstart')) {
                        touchEvent = 'touchstart.inactive-gallery';
                    } else {
                        touchEvent = 'click.inactive-gallery';
                    }
                    popup.find(opt.sliderImageSelector).find('.slick-slide').off(touchEvent).on(touchEvent, function () {
                        caption.removeClass('hide').show();
                        sliderNav.stop().fadeTo('fast', 1);
                        resetInactiveTimer();
                    });
                    popup.find(opt.sliderThumbSelector).off(touchEvent).on(touchEvent, function () {
                        sliderNav.stop().fadeTo('fast', 1);
                        resetInactiveTimer();
                    });
                    if (!$('html').hasClass('ios')) {
                        $(window).off('mousemove.inactive-gallery').on('mousemove.inactive-gallery', function () {
                            caption.removeClass('hide').show();
                            sliderNav.stop().fadeTo('fast', 1);
                            resetInactiveTimer();
                        });
                    }
                    setInactiveTimer();
                });
                sliders.resize();
            }, 100);
        };

        if (isInit) {
            initSliders.call(this);
        }
        sliders.css('opacity', 0);

        vars.bkgElement.hide().appendTo(body).fadeIn();
        if (!Site.isMobile()) {
            vars.popupElement.fadeIn(function () {
                renderSlider();
            });
        } else {
            vars.popupElement.css('top', '100%').show().animate({
                top: 0
            }, function () {
                renderSlider();
            });
            vars.popupElement.css({
                position: 'absolute'
            });
        }
        if ($.isFunction(opt.beforeShow)) {
            opt.beforeShow.call(this);
        }


    };

    var hidePopup = function () {
        var vars = this.vars;

        vars.bkgElement.fadeOut(function () {
            vars.bkgElement.remove();
        });
        if (!Site.isMobile()) {
            vars.popupElement.fadeOut();
        } else {
            vars.popupElement.animate({
                top: '100%'
            }, function () {
                vars.popupElement.hide().css('top', 0);
            });
        }
        if ($.isFunction(this.options.afterHide)) {
            this.options.afterHide.call(this);
        }
        // clear inactive timeout
        clearTimeout(inactiveTimer);
        inactiveTimer = null;
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                options = that.options;

            that.vars = {
                isInited: false,
                isWaiting: true,

                arrCloneImages: [],
                numImagesLoaded: 0,
                imageIndex: 0,

                bkgElement: $(bkgOverlay),
                popupElement: $(options.galleryPopupSelector, that.element),
                imageSlider: $(this.options.sliderImageSelector, that.element),
                thumbSlider: $(this.options.sliderThumbSelector, that.element),
                sliderID: null
            };

            that.vars.popupElement.appendTo('body').hide();

            $(options.thumbItemSelector, that.element)
                .on('click.' + pluginName, function () {
                    if (!options.gallerySource.length) {
                        return;
                    }
                    var idx = $(this).index();
                    that.vars.imageIndex = idx;

                    if (!that.vars.isInited) {
                        loadGallery.call(that);
                    } else {
                        showPopup.call(that);
                    }
                    return false;
                })
                .find('a').on('click.' + pluginName, function (e) {
                    e.preventDefault();
                });

            $(options.closePopupSelector).on('click.' + pluginName, function () {
                hidePopup.call(that);
                return false;
            });

            win.on('resize.' + pluginName, function () {
                if (that.vars.popupElement.is(':visible') && doc.hasClass('iphone')) {
                    win.scrollTop(0);
                }
                // clearTimeout(timer);
                setTimeout(function () {
                    resizeSlideshow.call(that);
                }, resizeDelay);
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
        slidesToShowSlide: 1,
        slidesToScrollSlide: 1,
        arrowsSlide: true,
        fadeSlide: true,
        infinite: false,

        inactiveTimeout: 4000,
        slidesToShowNav: 8,
        slidesToScrollNav: 1,
        centerModeNav: true,
        centerPaddingNav: 0,
        focusOnSelectNav: true,

        gallerySource: '',
        timeoutLoading: 1000,
        headerSelector: '.close-gallery',
        thumbWrapperSelector: '.gallery-thumb',
        thumbItemSelector: '.thumb-image',
        sliderImageSelector: '.slider-for',
        sliderThumbSelector: '.slider-nav',
        galleryPopupSelector: '.popup-gallery',
        closePopupSelector: '.close-gallery',
        classThumbActive: 'photo-active',

        renderSuccessCallback: null
    };

    $(function () {
        var container = $('#container'),
            childOfApp = container.length > 0
                ? container.children()
                : $('#main').children(),
            hiddenClass = 'hidden',
            alreadyHiddenClass = 'already-hidden';

        var options = {
            renderSuccessCallback: function () {
                $('[data-share-button]').shareButton();
            },
            beforeShow: function () {
                childOfApp.each(function () {
                    var el = $(this);
                    if (el.hasClass(hiddenClass)) {
                        el.addClass(alreadyHiddenClass);
                    } else {
                        el.addClass(hiddenClass);
                    }
                });
            },
            afterHide: function () {
                childOfApp.filter(':not(.' + alreadyHiddenClass + ')').removeClass(hiddenClass);
                childOfApp.removeClass(alreadyHiddenClass);
            }
        };

        $('[data-' + pluginName + ']')[pluginName](options);
    });

}(jQuery, window));

/**
*  @name Load more
*  @description This plugin is used for loading more card in "card-container" component
*  @version 1.0
*  @options
*    numberMore: 5,
     itemSelector: '.item',
     triggerSelector: '.load-more-trigger',
     hiddenClass: 'hidden',
     ignoreClass: 'ignore-item',
     loadedMoreCallback: null,
     noMoreResultCallback: null
*  @methods
*    init
*    hideItems
*    loadMore
*    destroy
*/
(function ($, window) {
    'use strict';

    var pluginName = 'load-more';

    var getHiddenItems = function () {
        var options = this.options,
            items = $(options.itemSelector + ':not(.' + options.ignoreClass + ').' + options.hiddenClass, this.element);
        return items;
    };

    var getVisibleItems = function () {
        var options = this.options,
            items = $(options.itemSelector + ':not(.' + options.ignoreClass + ')', this.element);
        return items;
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
                triggerElement: $(that.options.triggerSelector, that.element)
            };

            that.hideItems();
            that.loadMore();

            that.vars.triggerElement.on('click.' + pluginName, function () {
                var elm = $(this),
                    masonry = elm.closest('[data-mymasonry]');
                that.loadMore();
                if(masonry.length) {
                    masonry.masonry();
                }
            });
        },
        hideItems: function () {
            var options = this.options,
                allItems = $(options.itemSelector, this.element);

            allItems.addClass(options.hiddenClass);
            if ($.isFunction(options.loadedMoreCallback)) {
                options.loadedMoreCallback();
            }
        },
        loadMore: function () {
            var options = this.options,
                items = getHiddenItems.call(this).slice(0, options.numberMore),
                visibleItems = getVisibleItems.call(this);

            if (items.length) {
                items.removeClass(options.hiddenClass).hide().fadeIn();
                if ($.isFunction(options.loadedMoreCallback)) {
                    items = getHiddenItems.call(this);
                    options.loadedMoreCallback(this.element, items.length);
                }
            }

            if (!visibleItems.length && $.isFunction(options.zeroResultCallback)) {
                options.zeroResultCallback.call(this);
            } else if (!items.length && $.isFunction(options.noMoreResultCallback)) {
                options.noMoreResultCallback.call(this);
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
        numberMore: 5,
        itemSelector: '.item',
        triggerSelector: '.load-more-trigger',
        hiddenClass: 'hidden',
        ignoreClass: 'ignore-item',
        loadedMoreCallback: null,
        noMoreResultCallback: null
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();

        var cardContainer = $('.card-container'),
            itemSel = '.card-item:not(.control-result)',
            masonryGroup = $('.card-container[data-mymasonry]'),
            zeroButton = $('.zero-result', cardContainer),
            noMoreButton = $('.no-more-result', cardContainer),
            loadMoreButton = $('.load-more-trigger', cardContainer);

        var cardContainerOptions = {
            ignoreClass: 'no-filter',
            itemSelector: itemSel,
            loadedMoreCallback: function (element, num) {
                var resultLabel = '',
                    desc = $('.desc', loadMoreButton),
                    btnLoadMore = $('a.load-more', loadMoreButton);

                if (!!element) {
                    resultLabel = num === 1
                        ? element.data('result-type')
                        : element.data('result-type-plural');
                    resultLabel = !!resultLabel
                        ? resultLabel
                        : '';
                }

                $('span.num', desc).html(num);
                $('span.result', desc).html(resultLabel);
                $('span:first', btnLoadMore).html(resultLabel);
                btnLoadMore.attr('title', btnLoadMore.text());

                if (masonryGroup.length && !Site.isMobile()) {
                    window.curScrollTop = $(window).scrollTop();
                    masonryGroup.mymasonry('restart');
                }
            },
            noMoreResultCallback: function () {
                var container = this.element;
                container.find(noMoreButton).removeClass('hidden');
                container.find(zeroButton).addClass('hidden');
                container.find(loadMoreButton).addClass('hidden');
                if (masonryGroup.length && !Site.isMobile()) {
                    masonryGroup.mymasonry('restart');
                }
            },
            zeroResultCallback: function () {
                var container = this.element;
                container.find(noMoreButton).addClass('hidden');
                container.find(loadMoreButton).addClass('hidden');
                container.find(zeroButton).removeClass('hidden');
                zeroButton
                    .off('click.' + pluginName)
                    .on('click.' + pluginName, function () {
                        $(window).trigger('resetFilter');
                    });
                if (masonryGroup.length && !Site.isMobile()) {
                    masonryGroup.mymasonry('restart');
                }
            }
        };
        cardContainer[pluginName](cardContainerOptions);

        $('.back-top', noMoreButton).on('click', function () {
            var isMobile = Site.isMobile(),
                header = isMobile
                    ? $('#navbar-header').outerHeight()
                    : $('#main-nav').outerHeight(),
                margin = isMobile
                    ? 80
                    : 30;

            $('html, body').animate({
                scrollTop: cardContainer.offset().top - header - margin
            }, 400);
        });

        var teamContainer = $('[data-team]'),
            template = $('<div class="text-center show-more">' +
                    '<a href="#" class="btn-tertiary">' + window.L10n.text.moreteam + '<span class="wi-icon icon-arrow"></span></a>' +
                    '</div>'),
            items = teamContainer.find('.text-image'),
            limit = 10;

        if (items.length > limit) {
            items.filter(':gt(' + (limit - 1) + ')').hide();
            template.insertAfter(items.last());
            teamContainer.on('click.' + pluginName, '.btn-tertiary', function (e) {
                e.preventDefault();
                items.filter(':hidden')
                    .fadeIn(function () {
                        $(this).removeAttr('style');
                    });
                $(this).parent().remove();
            });
        }

        $(window).on('filterHandlerChanged', function (e, el) {
            if (e.target) {
                var form = $(el),
                    filterBlocks = $('[data-type]', form),
                    titleNumber = $('p.num-cards'),
                    numberFiltered = 0,
                    cardItems = $(itemSel, cardContainer).removeClass(cardContainerOptions.ignoreClass).addClass('hidden');

                filterBlocks.each(function () {
                    var group = $(this),
                        arrValue = [],
                        filterType = group.data('type'),
                        selectedInput = $(':checked, :selected, :text', group);
                    selectedInput.each(function () {
                        arrValue.push($(this).val());
                    });
                    group.data('filter-data', arrValue);

                    cardItems.each(function () {
                        var item = $(this),
                            filterValue = item.data('filter-' + filterType) || '',
                            isMatch = false;

                        if ((filterType === 'related-profession' && arrValue.indexOf('allprofessions') !== -1) ||
                                (filterType === 'finance' && arrValue.indexOf('allcate') !== -1) ||
                                (filterType === 'related-product' && arrValue.indexOf('allproduct') !== -1) ||
                                (filterType === 'state' && arrValue.indexOf('allstates') !== -1)) {
                            return;
                        }

                        if (filterType !== 'related-profession' && filterType !== 'finance' &&
                                filterType !== 'related-product' && filterType !== 'state') {
                            return;
                        }

                        if (0 === filterValue.length) { return; }

                        filterValue = filterValue.split('|');

                        if (filterValue.length > 0) {
                            filterValue.forEach(function (value) {
                                if (arrValue.indexOf(value) !== -1) {
                                    isMatch = true;
                                }
                            });
                        }

                        if (filterValue.length === 0 || !isMatch) {
                            item.addClass(cardContainerOptions.ignoreClass);
                        }
                    });

                    if (titleNumber.length > 0) {
                        numberFiltered = cardItems.filter(':not(.' + cardContainerOptions.ignoreClass + ')').length;
                        $('span', titleNumber).eq(0).text(numberFiltered);

                        if (numberFiltered <= 1) {
                            $('span', titleNumber).eq(1).text(cardContainer.data('result-type'));
                        } else {
                            $('span', titleNumber).eq(1).text(cardContainer.data('result-type-plural'));
                        }
                        titleNumber.show();
                    }
                });

                setTimeout(function () {
                    if ($('.card-item:not(.' + cardContainerOptions.ignoreClass + ')', cardContainer).length > 0) {
                        noMoreButton.addClass('hidden');
                        zeroButton.addClass('hidden');
                        loadMoreButton.removeClass('hidden');
                    }
                    cardContainer[pluginName]('loadMore');
                }, 200);
            }
        });

    });

}(jQuery, window));

/**
*  @name masonry
*  @description put blocks to columns and arrange them in "card container" component
*  @version 1.0
*  @options
*    gutter
*    columnWidth
*    itemSelector
*    percentPosition
*  @methods
*    init
*    restart
*    destroy
*/
(function ($, window) {
    'use strict';

    var win = $(window),
        pluginName = 'mymasonry',
        timer = null,
        delay = 400;

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                opt = this.options,
                elm = this.element,
                mas = that.element.masonry(that.options);

            mas.on('layoutComplete', function () {
                var loadmoreBtn = $('.card-item.load-more-trigger:visible, .card-item.no-more-result:visible'),
                    loadmoreL = 0,
                    loadmoreT = 0,
                    containerL = elm.offset().left,
                    containerT = elm.offset().top,
                    containerW = elm.outerWidth(),
                    containerH = elm.outerHeight(),
                    leftPadding = 15,
                    topPadding = 20,
                    bottomPadding = 40,
                    maybeHeight = 0,
                    lastestItem = {
                        top: 0,
                        left: 0,
                        item: null,
                        height: 0
                    };
                var assignLastestItem = function (top, left, item) {
                    if (item !== undefined && item !== null) {
                        lastestItem = {
                            top: top,
                            left: left,
                            item: item,
                            height: item.height()
                        };
                    }
                };

                if (loadmoreBtn.length) {
                    elm.find(opt.itemSelector + ':visible').each(function () {
                        var item = $(this),
                            top = item.offset().top,
                            left = item.offset().left;
                        if (left >= lastestItem.left) {
                            if (left > lastestItem.left) {
                                assignLastestItem(top, left, item);
                            } else {
                                if (top > lastestItem.top) {
                                    assignLastestItem(top, left, item);
                                }
                            }
                        }
                    });
                    if (lastestItem.item !== null) {
                        loadmoreL = lastestItem.left - containerL;
                        if (loadmoreL + leftPadding < (containerW * 2 / 3)) {
                            loadmoreL = loadmoreL + lastestItem.item.width() + leftPadding;
                            loadmoreT = 0;
                        } else {
                            loadmoreT = lastestItem.top - containerT + lastestItem.height + topPadding;
                        }
                        loadmoreBtn.css({
                            left: loadmoreL,
                            top: loadmoreT
                        });
                        maybeHeight = loadmoreT + loadmoreBtn.height() + bottomPadding;
                        setTimeout(function () {
                            containerH = elm.outerHeight();
                            if (maybeHeight > containerH) {
                                elm.height(maybeHeight + topPadding);
                            }
                        }, 300);

                    }
                }
            });

            var images = elm.find('img');
            if (images.length) {
                images.each(function () {
                    var img = this;
                    img.onload = function () {
                        that.restart();
                    };
                    img.onerror = function () {
                        that.restart();
                    };
                });
            }

            win.on('resize', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    if (!Site.isMobile()) {
                        that.restart();
                    }
                }, delay);
            });
        },
        restart: function () {
            var that = this,
                height = that.element.height();

                that.element
                    .masonry('destroy')
                    .css('height', height)
                    .masonry(that.options);
        },
        destroy: function () {
            this.element.masonry('destroy');
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
        gutter: ".gutter-sizer",
        columnWidth: '.grid-sizer',
        itemSelector: '.block-item',
        percentPosition: true,
        onInitComplete: ''
    };

    $(function () {
        var curScreen = window.Site.isMobile()
            ? 'mobile'
            : 'desktop';

        $('[data-' + pluginName + ']').not('[data-desktop-only]')[pluginName]();
        if (curScreen === 'desktop') {
            $('[data-' + pluginName + '][data-desktop-only]')[pluginName]();
        }

        win.on('resize.' + pluginName, function () {
            var newScreen = window.Site.isMobile()
                ? 'mobile'
                : 'desktop';
            if (curScreen === newScreen) {
                return;
            }

            if (curScreen === 'desktop') {
                $('[data-' + pluginName + '][data-desktop-only]')[pluginName]('destroy');
                curScreen = 'mobile';
            } else if (curScreen === 'mobile') {
                $('[data-' + pluginName + '][data-desktop-only]')[pluginName]();
                curScreen = 'desktop';
            }
        });
    });

}(jQuery, window));

// This plugin is used in "Global header" component
(function ($, window, Site) {
    'use strict';

    var pluginName = 'navigation';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.target = $(this.element.data(pluginName));
            this.isTransitioning = false;
            this.element.on('click.navigationToggle', $.proxy(function (e) {
                e.preventDefault();
                this.toggleNav();
            }, this));
        },
        expand: function () {
            var that = this,
                options = this.options,
                target = this.target,
                thatElement = that.element;
            if (target.hasClass(options.classExpanded) || that.isTransitioning) {
                return;
            }
            that.isTransitioning = true;
            thatElement.addClass(options.classActive);
            target.fadeIn(options.duration, function () {
                $(this)
                    .addClass(options.classExpanded)
                    .removeAttr('style');
                that.isTransitioning = false;
            });
            thatElement.trigger('expandNav');
        },
        collapse: function (isClose) {
            var that = this,
                options = this.options,
                target = this.target,
                thatElement = that.element;
            if (!target.hasClass(options.classExpanded) || that.isTransitioning) {
                return;
            }
            thatElement.removeClass(options.classActive);
            if (isClose) {
                target
                    .hide()
                    .removeClass(options.classExpanded)
                    .removeAttr('style');
            } else {
                that.isTransitioning = true;
                target.fadeOut(options.duration, function () {
                    $(this)
                        .removeClass(options.classExpanded)
                        .removeAttr('style');
                    that.isTransitioning = false;
                });
            }
            thatElement.trigger('collapseNav');
        },
        toggleNav: function () {
            if (!this.target.hasClass(this.options.classExpanded)) {
                this.expand();
            } else {
                this.collapse();
            }
        },
        destroy: function () {
            this.element.off('click.navigationToggle');
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
        duration: 500,
        classExpanded: 'in',
        classActive: 'active'
    };

    $(function () {

        var win = $(window),
            headerEl = $('#header'),
            stickyClass = 'sticky',
            stickyClassMobile = 'sticky-xs',
            containerEl = $('#container'),
            htmlBody = $('html,body'),
            navbarHeader = $('#navbar-header'),
            dataHideNav = $('[data-hide-nav]'),
            mainEl = $('#main'),
            topBody = 0,
            isFocus = false,
            inputTag = $('input'),
            menuLi = $('#main-nav .main-menu > li:not(".logo-sticky")'),
            doc = $(document),
            welcome = $('[data-welcome-back]'),
            expandNavMobile = function () {
                containerEl.addClass(stickyClassMobile);
                mainEl.children().hide();
                dataHideNav.hide();
            },
            showOtherNavEl = function () {
                mainEl.children().show();
                dataHideNav.show();
                win.trigger('resize.sameheight');
            },
            inputFocus = function (top) {
                if (isFocus) {
                    headerEl.css({
                        position: 'absolute',
                        top: top
                    });
                } else {
                    headerEl.css('position', '');
                }
            },
            fixTopHeader = function () {
                if (Site.isMobile()) {
                    headerEl.add(mainEl).removeAttr('style');
                    containerEl.removeClass(stickyClass);
                    inputFocus(win.scrollTop());
                } else {
                    containerEl
                        .removeAttr('style')
                        .removeClass(stickyClassMobile);
                    showOtherNavEl();
                    var welcomeHeight = welcome.is(':hidden')
                            ? 0
                            : welcome.outerHeight(true),
                        navbarHeaderHeight = navbarHeader.outerHeight(true) + welcomeHeight;

                    if (win.scrollTop() >= navbarHeaderHeight) {
                        headerEl.css('top', -navbarHeaderHeight);
                        mainEl.css('marginTop', headerEl.outerHeight(true));
                        containerEl.addClass(stickyClass);
                        if (Site.canTouch) {
                            inputFocus(win.scrollTop() - navbarHeaderHeight);
                        }
                    } else {
                        headerEl.css('top', '');
                        mainEl.css('marginTop', '');
                        containerEl.removeClass(stickyClass);
                    }

                }
            };

        inputTag.off('blur focus').on('focus', function () {
            isFocus = true;
        }).on('blur', function () {
            isFocus = false;
        });

        $('[data-' + pluginName + ']')[pluginName]()
            .on('expandNav', function () {
                topBody = $('body').scrollTop();
                expandNavMobile();
            })
            .on('collapseNav', function () {
                containerEl
                    .removeAttr('style')
                    .removeClass(stickyClassMobile);
                showOtherNavEl();
                htmlBody.scrollTop(topBody);
            });

        win
            .on('scroll.' + pluginName, function () {
                fixTopHeader();
            })
            .on('resize.' + pluginName, function () {
                fixTopHeader();
                if (!Site.isMobile()) {
                    $('[data-' + pluginName + ']')[pluginName]('collapse', true);
                }
            });

        menuLi
            .off('click.return')
            .on('click.return', function (e) {
                if (Site.isTablet()) {
                    var liEl = $(this);
                    e.preventDefault();
                    if (!liEl.hasClass('active')) {
                        menuLi.removeClass('active');
                        liEl.addClass('active');
                    } else {
                        liEl.removeClass('active');
                    }
                }
            });

        doc
            .off('touchstart.return')
            .on('touchstart.return', function (e) {
                if (!$(e.target).closest(menuLi).length) {
                    menuLi.removeClass('active');
                }
                if (!$(e.target).is('input')) {
                    if (isFocus) {
                        inputTag.blur();
                    }
                }
            });

        $('[data-footer-mobile]').html($('[data-mobile-bottom]').clone());
        $('[data-header-mobile]').html($('[data-mobile-top]').clone());
    });

}(jQuery, window, Site));

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

/**
 *  @name popover
 *  @description: display the specific content follow target element.
                  This plugin is used in "Filtering control" component.
 *  @version 1.0
 */
(function ($, window) {
    'use strict';

    var pluginName = 'popover';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    var getPosition = function (param) {
        var opt = param.options,
            popover = param.vars.popover,
            popoverW = 0,
            popoverH = 0,
            element = param.element,
            trigger = param.vars.trigger,
            elW = element.outerWidth(),
            elH = element.outerHeight(),
            placement = opt.placement,
            position = {
                top: 0,
                left: 0
            },
            offset = element.offset(),
            status = 'none',
            offsetLeft = opt.offsetleft,
            offsetTop = opt.offsettop;

        if (element.data('showed')) {
            status = 'block';
        }

        if (element.is(':hidden') && !trigger.is(':hidden')) {
            offset = trigger.offset();
            placement = opt.placementtrigger;
            elW = trigger.outerWidth();
            elH = trigger.outerHeight();
            offsetLeft = opt.triggeroffsetleft;
            offsetTop = opt.triggeroffsettop;
        }

        popover.css({
            opacity: 0,
            display: 'block'
        });

        popoverW = popover.outerWidth();
        popoverH = popover.outerHeight();

        popover.css({
            opacity: 1,
            display: status
        });

        switch (placement) {
        case 'top':
            position.top = offset.top - popoverH - offsetTop;
            position.left = offset.left - offsetLeft;
            break;
        case 'left':
            position.top = offset.top - offsetTop;
            position.left = offset.left - popoverW - offsetLeft;
            break;
        case 'right':
            position.top = offset.top - offsetTop;
            position.left = offset.left + elW + offsetLeft;
            break;
        case 'bottom':
            position.top = offset.top + elH + offsetTop;
            position.left = offset.left - offsetLeft;
            break;
        }
        return position;
    };

    var setPosition = function (param) {
        if (param) {
            var position = getPosition(param);
            param.vars.popover.css({
                top: position.top,
                left: position.left
            });
        }
    };

    var activePopover = [],
        acitveEl = [];



    Plugin.prototype = {
        init: function () {
            var that = this,
                opt = this.options;

            this.vars = {
                popover: $(opt.template).hide().appendTo(opt.container),
                trigger: $(opt.trigger)
            };

            this.element
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isShow = $(this).data('showed');
                    if (isShow) {
                        that.hide();
                    } else {
                        that.show();
                    }
                });

            this.vars.trigger
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isShow = that.element.data('showed');
                    if (isShow) {
                        that.hide();
                    } else {
                        that.show();
                    }
                });

            this.vars.popover
                .off('click.' + pluginName, opt.close)
                .on('click.' + pluginName, opt.close, function (e) {
                    e.preventDefault();
                    that.hide();
                });

            $(window).on('resize.' + pluginName, function () {
                setPosition($('[data-' + pluginName + '].active').data(pluginName));
            });

            $(document)
                .off('click.' + pluginName)
                .on('click.' + pluginName, function (e) {
                    var target = $(e.target);
                    if (!target.closest('[data-popover-template]').length) {
                        that.hide();
                    }
                });

            if (opt.autoshow) {
                this.show();
            }
        },
        show: function () {
            var opt = this.options;

            setPosition(this);

            this.hide();

            if ($.isFunction(opt.onBeforeShow)) {
                opt.onBeforeShow();
            }

            this.vars.popover.fadeIn(opt.duration, function () {
                var pop = $(this);
                if ($.isFunction(opt.onAfterShow)) {
                    opt.onAfterShow();
                }
                $(this).find('.btn-reset-filters').off('click.popover').on('click.popover', function () {
                    pop.fadeOut(opt.duration);
                });
            });

            this.element.data('showed', true).addClass('active');

            activePopover = this.vars.popover;
            acitveEl = this.element;

        },
        hide: function () {
            if (!acitveEl.length) {
                return;
            }
            var data = acitveEl.data(pluginName),
                opt = data.options;

            if (activePopover.length) {

                if ($.isFunction(opt.onBeforeHide)) {
                    opt.onBeforeHide();
                }
                activePopover.fadeOut(this.options.duration, function () {
                    if ($.isFunction(opt.onAfterHide)) {
                        opt.onAfterHide();
                    }
                    if (opt.removewhenclose) {
                        $(this).remove();
                    }
                });

                acitveEl.data('showed', false).removeClass('active');

                activePopover = [];
                acitveEl = [];
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
        placement: 'right',
        placementtrigger: 'right',
        container: 'body',
        close: '.close',
        removewhenclose: false,
        trigger: '',
        offsettop: 0,
        offsetleft: 0,
        triggeroffsetleft: 0,
        triggeroffsettop: 0,
        template: '<div class="popover" data-popover-template></div>',
        duration: 200,
        autoshow: false,
        onBeforeShow: null,
        onAfterShow: null,
        onBeforeHide: null,
        onAfterHide: null

    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

/**
 *  @name popin
 *  @description show specific content in layer top screen and is used in "Ribbon" component
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

    var pluginName = 'ribbon';

    var changePicBlock = function (picBlock, ind) {
        var rmCls = picBlock.attr('class').replace(/\b\svisible-block-\d\b/g, '');
        picBlock
            .attr('class', rmCls)
            .addClass(this.options.visiblePrefix + ind);
    };

    var setPicMargin = function (picBlock) {
        if (!Site.isMobile()) {
            picBlock.find('picture').each(function () {
                var pic = $(this),
                    img = pic.find('img'),
                    cloneImg = $('<img src="' + img.attr('src') + '" style="visibility: hidden"/>');

                $('body').append(cloneImg);
                (function (pic, cloneImg) {
                    cloneImg.on('load', function () {
                        img = $(this);
                        pic
                            .css({
                                'margin-left': -(img.outerWidth() / 2)
                            }).show();
                        if (img.outerWidth() > $(window).width()) {
                            pic.addClass('large');
                        }
                        cloneImg.remove();
                    });
                }(pic, cloneImg));


            });
        } else {
            picBlock.find('picture').each(function () {
                $(this).attr('style', '');
            });
        }
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                opt = this.options,
                elm = this.element,
                ribbons = elm.find(opt.ribbonClass),
                picBlock = elm.find(opt.pictureClass);

            ribbons.each(function () {
                var self = $(this),
                    ind = ribbons.index(self) + 1;
                $(this).find('a')
                    .on('mouseenter.' + pluginName + ', focusin.' + pluginName)
                    .on('mouseenter.' + pluginName + ', focusin.' + pluginName, function () {
                        changePicBlock.call(that, picBlock, ind);
                    })
                    .off('mouseleave.' + pluginName)
                    .on('mouseleave.' + pluginName, function () {
                        changePicBlock.call(that, picBlock, 0);
                    });
            });

            setPicMargin(picBlock);
            $(window).on('resize.ribbon', function () {
                setPicMargin(picBlock);
            });
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
        ribbonClass: '.ribbon-box',
        pictureClass: '.picture-block',
        visiblePrefix: 'visible-block-'
    };

    $(function () {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

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
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

/**
 *  @name search
 *  @description prevent perform search functionality if no search value.
                 This plugin is used in "Global header" component
 *  @version 1.0
 *  @methods
 *    init
 *    destroy
 */
(function ($) {
    'use strict';

    $(function () {
        var inputEl = $('[data-input-focus]'),
            inputContentSelector = '[data-input-content]',
            focusClass = 'focused';

        inputEl
            .off('focus')
            .on('focus', function () {
                $(this).closest(inputContentSelector).addClass(focusClass);
            })
            .off('blur')
            .on('blur', function () {
                $(this).closest(inputContentSelector).removeClass(focusClass);
            });
    });

}(jQuery));

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

// This plugin is used in "Tabbed Container" component
(function ($, window, Site) {
    'use strict';

    var pluginName = 'tabs';

    var timer = null,
        actTab = function (hrefAnchor, isDelay) {
            var options = this.options,
                activeTab = this.vars.listTabContent.find(hrefAnchor),
                masonry = activeTab.data('mymasonry') ? activeTab : activeTab.find('[data-mymasonry]');

            // this.vars.listTabContent.find(hrefAnchor)
            activeTab
                .css({
                    display: 'block',
                    opacity: 0
                });
            if(masonry.length) {
                masonry.masonry('resize');
            }


            if ($.isFunction(options.onBeforeAction)) {
                options.onBeforeAction(isDelay);
            }

            this.vars.listTabContent.find(hrefAnchor)
                .animate({
                    opacity: 1
                }, options.duration, function () {
                    $(this).addClass(options.classActive).removeAttr('style');
                })
                .siblings().stop().removeClass(options.classActive).hide().removeAttr('style');
        };

    var toggleTabs = function () {
        var vars = this.vars,
            options = this.options;

        if (vars.listTabLinks.parent().hasClass(options.moreTwoTabs)) {
            vars.listTabLinks.parent().toggleClass(options.classExpend);
        }
    };

    var checkTabZone = function () {
        var topScroll = this.vars.win.scrollTop();
        if (topScroll >= (this.vars.topEle - this.vars.headerHeight) &&
                topScroll <= (this.vars.topEle + this.element.outerHeight() - this.vars.heightTabLink)) {
            return true;
        } else {
            return false;
        }
    };

    var fixedListTabLink = function () {
        var options = this.options,
            vars = this.vars;

        var removeFixed = function () {
            vars.listTabContent.removeAttr('style');
            vars.listTabLinks.closest(options.wrapTabLinks).removeAttr('style').css('position', 'relative');
        };

        if (!Site.isMobile()) {
            removeFixed();
            return;
        }

        this.vars.headerHeight = $('header').outerHeight();

        if (checkTabZone.call(this)) {
            vars.listTabContent.css('padding-top', vars.heightTabLink);
            vars.listTabLinks.closest(options.wrapTabLinks).css({
                position: 'fixed',
                top: vars.headerHeight,
                width: vars.widthEle,
                'z-index': 1
            });
        } else {
            removeFixed();
        }
    };

    var setHashLocation = function (href) {
        var id = href.replace(/^.*#/, ''),
            elem = document.getElementById(id);
        elem.id = id + '-tmp';
        window.location.hash = href;
        elem.id = id;
    };

    var setDefaultTab = function () {
        var that = this,
            options = this.options,
            hashLocation = window.location.hash,
            defaultTabLink,
            defaultAnchor;

        defaultTabLink = this.vars.listTabLinks.find('li').eq(options.defaultTab);
        defaultAnchor = defaultTabLink.children('a').attr('href');

        if (hashLocation && options.isHash &&
                this.element.find(hashLocation).length) {

            defaultAnchor = hashLocation;
            defaultTabLink = this.vars.listTabLinks.find('li').has('a[href="' + defaultAnchor + '"]');
        }

        defaultTabLink.addClass(options.classActive).siblings().removeClass(options.classActive);
        that.vars.toggleTab.text(this.vars.listTabLinks.find('a[href="' + defaultAnchor + '"]').text());
        actTab.call(that, defaultAnchor, true);
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                delay = 100,
                options = this.options,
                defaultAnchor,
                defaultTabLink;


            this.vars = {
                listTabLinks: that.element.find(options.tabLinks),
                listTabContent: that.element.find(options.tabContents),
                toggleTab: that.element.find(options.tabToggle),
                win: $(window),
                heightEle: that.element.height(),
                widthEle: that.element.width(),
                topEle: that.element.offset().top,
                headerHeight: 0,
                curScreen: Site.isMobile()
                    ? 'mobile'
                    : 'desktop'
            };
            that.vars.heightTabLink = that.vars.listTabLinks.outerHeight();
            that.vars.bottomEle = that.vars.topEle + that.vars.heightEle;

            if (this.element.data('tabs-author') === undefined) {
                setDefaultTab.call(this);
                this.changeTab();
            } else {
                defaultTabLink = this.vars.listTabLinks.find('li.active');
                defaultAnchor = defaultTabLink.children('a').attr('href');
                this.vars.toggleTab.text(this.vars.listTabLinks.find('a[href="' + defaultAnchor + '"]').text());
            }

            this.vars.win
                .on('scroll.' + pluginName, function () {
                    fixedListTabLink.call(that);
                })
                .on('resize.' + pluginName, function () {
                    that.vars.heightEle = that.element.height();
                    that.vars.widthEle = that.element.width();
                    that.vars.topEle = that.element.offset().top;
                    that.vars.heightTabLink = that.vars.listTabLinks.height();
                    that.vars.bottomEle = that.vars.topEle + that.vars.heightEle;

                    that.vars.listTabLinks.closest(options.wrapTabLinks).css({
                        width: that.vars.widthEle
                    });
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fixedListTabLink.call(that);
                    }, delay);
                });

            this.vars.toggleTab.on('click.' + pluginName, function (e) {
                e.preventDefault();
                toggleTabs.call(that);
            });
        },
        changeTab: function () {
            var that = this,
                opt = this.options;

            this.vars.listTabLinks.on('click.' + pluginName, 'li a', function (e) {
                var self = $(this),
                    hrefAnchor = self.attr('href'),
                    options = that.options;
                $(this).closest(opt.wrapTabLinks).toggleClass('expanded');

                e.preventDefault();

                if (self.parent().hasClass('active')) {
                    return;
                }

                that.element.find(opt.tabToggle).html(self.find('.tab-title').html());

                self.parent('li').addClass(options.classActive)
                    .siblings().removeClass(options.classActive);

                if (Site.isMobile() && checkTabZone.call(that)) {
                    $('html, body').animate({
                        scrollTop: that.vars.topEle - 2 * that.vars.headerHeight
                    }, 300);
                }

                actTab.call(that, hrefAnchor);

                if (that.vars.toggleTab === undefined) {
                    that.vars.toggleTab.text(self.text());
                    toggleTabs.call(that);
                }

                if (options.isHash) {
                    setHashLocation(hrefAnchor);
                }
            });
        },
        destroy: function () {
            // deinitialize
            this.vars.listTabLinks.off('click.' + pluginName, 'li a');
            this.vars.win
                .off('scroll.' + pluginName)
                .off('resize.' + pluginName);
            this.vars.toggleTab.off('click.' + pluginName);
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
        duration: 400,
        defaultTab: 0,                  // start at 0
        isHash: true,
        wrapTabLinks: '.tabs',
        tabLinks: '.list-tabs',
        tabContents: '.tabs-content',
        tabToggle: '.tab-active',       // toggle element
        moreTwoTabs: 'more-two-tabs',
        classActive: 'active',          // class active toggle element
        classExpend: 'expanded',
        classFixListTab: 'fixed-list-tab',
        onAfterAction: null,
        onBeforeAction: null
    };

    $(function () {
        var masonryElement = $('[data-mymasonry]'),
            createMasonry = function () {
                masonryElement.mymasonry('restart');
            };

        var opts = {
            onBeforeAction: function (isDelay) {
                if (!Site.isMobile()) {
                    clearTimeout(timer);
                    if (!isDelay) {
                        createMasonry();
                    } else {
                        timer = setTimeout(function () {
                            createMasonry();
                        }, 300);
                    }
                }
            }
        };

        $('[data-' + pluginName + ']')[pluginName](opts);
        if(masonryElement.length) {
            var count = 0,
                updateMasonry = function() {
                    masonryElement.masonry();
                    count++;
                    if(count < 10) {
                        setTimeout(updateMasonry, 1500);
                    }
                };
            updateMasonry();
            $(window).on('load.updateMasonry', function() {
                masonryElement.masonry();
            });
        }
    });

}(jQuery, window, Site));

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


/**
 *  @name validation
 *  @description This plugin is used to validate forms and is used in components:
                 - Event Registration
                 - Contact form
 *  @version 1.0
 *  @options
 *    closestEl
 *    successClass
 *    errorClass
 *    labelClass
 *    errorTemplate
 *    errorAppendTo
 *    container
 *    isValidOnChange
 *    onChange
 *    onBeforeSubmit
 *    onAfterSubmit
 *    onError
 *  @events
 *    errorRendering
 *  @methods
 *    init
 *    attach
 *    detach
 *    destroy
 */
(function ($, window) {
    'use strict';

    var pluginName = 'validation',
        type = window.L10n.validator,
        regEmail = new RegExp('^[A-Za-z0-9\\+]+([_A-Za-z0-9-]*[_A-Za-z0-9]+)*(\\.[_A-Za-z0-9-]*[_A-Za-z0-9]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        regUrl = new RegExp('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$'),
        regNumber = new RegExp('^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$'),
        regDigits = new RegExp('^[0-9]{1,}$'),
        regPhoneNumber = new RegExp('^[\+]?[0-9]{1,}$');

    var checkData = function (el) {
            el = $(el);
            var data = el.data(),
                props = [];

            delete data.errors;
            var keys = Object.keys(data);
            keys.forEach(function (key) {
                if (data.hasOwnProperty(key) && key.indexOf('Message') === -1 && key.indexOf('-message') === -1) {
                    props.push(key);
                }
            });

            var idxRequired = $.inArray(type.required.name, props);
            if (idxRequired > 0) {
                props.splice(idxRequired, 1);
                props.unshift(type.required.name);
            }

            var idxEqualTo = $.inArray(type.equalto.name, props);
            if (idxEqualTo > 0) {
                props.splice(idxEqualTo, 1);
                props.push(type.equalto.name);
            }

            props.forEach(function (prop) {
                validate(el, prop, props);
            });
        },
        checkRange = function (num, arr) {
            var result = false;
            if (typeof arr === 'string') {
                arr = arr.replace(/[\[\]]/g, '').split(/[\s,]+/);
            }
            var min = parseInt(arr[0], 10),
                max = parseInt(arr[1], 10);
            result = !isNaN(num) && !isNaN(min) && !isNaN(max) && num >= min && num <= max;
            return [result, min, max];
        },
        validate = function (el, prop, props) {
            var val = el.val(),
                valid = false,
                msg = el.data(prop + 'Message') || type[prop].msg,
                errors = el.data('errors') || [];

            // reset errors
            el.data('errors', []);

            var groupEl;
            var idEqualEl;
            var equalEl;
            var range;
            var rangeLength;
            var re;

            switch (prop) {
            case type.required.name:
                if (!el.is(':password')) {
                    val = $.trim(val);
                }

                if (el.is(':radio') || el.is(':checkbox')) {
                    groupEl = $('[name="' + el.attr('name') + '"]');
                    if (groupEl.filter(':checked').length) {
                        valid = true;
                        groupEl.not(el).removeData('errors');
                    }
                } else {
                    if (val.length) {
                        valid = true;
                    } else {
                        valid = false;
                    }
                }
                break;

            case type.phonenumber.name:
                if (el.data(type.required.name) !== undefined) {
                    valid = val.length && regPhoneNumber.test(val);
                } else if (val.length) {
                    valid = regPhoneNumber.test(val);
                } else {
                    valid = true;
                }
                break;

            case type.email.name:
                if (el.data(type.required.name) !== undefined) {
                    valid = val.length && regEmail.test(val);
                } else if (val.length) {
                    valid = regEmail.test(val);
                } else {
                    valid = true;
                }
                break;

            case type.url.name:
                if (el.data(type.required.name) !== undefined) {
                    valid = val.length && regUrl.test(val);
                } else if (val.length) {
                    valid = regUrl.test(val);
                } else {
                    valid = true;
                }
                break;

            case type.number.name:
                if (el.data(type.required.name) !== undefined) {
                    valid = val.length && regNumber.test(val);
                } else if (val.length) {
                    valid = regNumber.test(val);
                } else {
                    valid = true;
                }
                break;

            case type.digits.name:
                if (el.data(type.required.name) !== undefined) {
                    valid = val.length && regDigits.test(val);
                } else if (val.length) {
                    valid = regDigits.test(val);
                } else {
                    valid = true;
                }
                break;

            case type.equalto.name:
                idEqualEl = el.data(type.equalto.name);
                equalEl = $('#' + idEqualEl);
                valid = val === equalEl.val();
                if ($.inArray(type.required.name, props) !== -1) {
                    valid = valid && val.length;
                }
                msg = msg.format(idEqualEl);
                break;

            case type.max.name:
                val = parseFloat(val);
                valid = val < parseFloat(el.data(type.max.name));
                break;

            case type.min.name:
                val = parseFloat(val);
                valid = val > parseFloat(el.data(type.min.name));
                break;

            case type.maxlength.name:
                valid = val.length < parseInt(el.data(type.maxlength.name), 10);
                break;

            case type.minlength.name:
                valid = val.length > parseInt(el.data(type.minlength.name), 10);
                break;

            case type.range.name:
                range = checkRange(parseInt(val, 10), el.data(type.range.name));
                valid = range[0];
                msg = msg.format(range[1], range[2]);
                break;

            case type.rangelength.name:
                rangeLength = checkRange(val.length, el.data(type.rangelength.name));
                valid = rangeLength[0];
                msg = msg.format(rangeLength[1], rangeLength[2]);
                break;

            case type.pattern.name:
                re = new RegExp(el.data(type.pattern.name), 'gi');
                if (el.data(type.required.name) !== undefined) {
                    valid = val.length && re.test(val);
                } else if (val.length) {
                    valid = re.test(val);
                } else {
                    valid = true;
                }
                break;
            }

            if (valid) {
                var idx = $.inArray(msg, errors);
                if (idx !== -1) {
                    errors.splice(idx, 1);
                    el.data('errors', errors);
                }
            } else {
                if ($.inArray(msg, errors) === -1) {
                    errors.push(msg);
                    el.data('errors', errors);
                }
            }
        },
        processMessages = function (that) {
            var results = [];
            that.vars.fields.each(function () {
                var el = $(this),
                    errors = el.data('errors');
                if (errors) {
                    results.push({element: el, errors: errors});
                }
                el.trigger('errorRendering', errors);
            });

            if ($.isFunction(that.options.onError)) {
                that.options.onError.call(null, results);
            } else {
                if (that.vars.container.length) {
                    showContainerError(that, results);
                } else {
                    showInlineError(that, results);
                }
            }
        },
        showContainerError = function (that, results) {
            var listError = [];
            var el;
            var closestEl;
            results.forEach(function (result) {
                el = result.element;
                closestEl = el.closest(that.options.closestEl);

                if (!closestEl.length) {
                    closestEl = el;
                }

                if (result.errors.length) {
                    closestEl.addClass(that.options.errorClass);
                    listError.push('<p>' + result.errors[0] + '</p>');
                } else {
                    closestEl.removeClass(that.options.errorClass).addClass(that.options.successClass);
                }
            });

            that.vars.container.empty().html(listError.join(''));
        },
        showInlineError = function (that, results) {
            var el;
            var closestEl;
            var errorEl;
            results.forEach(function (result) {
                el = result.element;
                closestEl = el.closest(that.options.closestEl);
                errorEl = closestEl.find(that.vars.labelClass);

                if (!closestEl.length) {
                    closestEl = el;
                    errorEl = closestEl.nextAll(that.vars.labelClass);
                }

                if (result.errors.length) {
                    closestEl.addClass(that.options.errorClass);
                    if (errorEl.length) {
                        errorEl.html(that.options.errorTemplate.format(result.errors[0])).show();
                    } else {
                        errorEl = $('<div class="' + that.options.labelClass + '">' + that.options.errorTemplate.format(result.errors[0]) + '</div>');
                        if (closestEl.is(el) || !that.options.errorAppendTo) {
                            closestEl.after(errorEl);
                        } else {
                            if (!closestEl.find(that.options.errorAppendTo).length) {
                                errorEl.appendTo(closestEl);
                            } else {
                                errorEl.appendTo(closestEl.find(that.options.errorAppendTo));
                            }
                        }
                    }
                } else {
                    closestEl.removeClass(that.options.errorClass).addClass(that.options.successClass);
                    errorEl.empty().hide();
                }
            });
        },
        bindEvent = function (that, els) {
            els.on('change.' + pluginName + ' blur.' + pluginName, function () {
                checkData(this);
                processMessages(that);

                if ($.isFunction(that.options.onChange)) {
                    that.options.onChange.call(that);
                }
            });
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            that.vars = {
                fields: $(),
                container: $(that.options.container)
            };

            that.element.attr('novalidate', true);

            if ($.isFunction(that.options.onBeforeInit)) {
                that.options.onBeforeInit.call(that, that.element);
            }

            var keys = Object.keys(type);
            var els;
            keys.forEach(function (key) {
                if (type.hasOwnProperty(key)) {
                    els = $('[data-' + key + ']', that.element);
                    if (els.length) {
                        that.vars.fields = that.vars.fields.add(els);
                    }
                }
            });

            that.vars.labelClass = '.' + that.options.labelClass.split(/[\s,]+/).join('.');
            if (that.options.isValidOnChange) {
                bindEvent(that, that.vars.fields);
            }

            that.element.on('submit.' + pluginName, function () {
                // var url = $(this).attr('action'),
                //     eventName = $(this).find('.event-name').html();
                // $(this).attr('action',url + '?eventName=' + encodeURI(eventName));

                if ($.isFunction(that.options.onBeforeSubmit)) {
                    that.options.onBeforeSubmit();
                }

                that.vars.fields.each(function () {
                    checkData(this);
                });

                processMessages(that);

                var isValid;
                if ($('.' + that.options.errorClass, that.element).length) {
                    isValid = false;
                } else {
                    isValid = true;
                }

                if ($.isFunction(that.options.onAfterSubmit)) {
                    return that.options.onAfterSubmit.call(that, isValid);
                }

                return isValid;
            });
        },
        attach: function (props) {
            var that = this;
            var keys = Object.keys(props);
            var el;
            var currentProp;
            var keysRule;
            var keysMesg;
            keys.forEach(function (key) {
                if (props.hasOwnProperty(key)) {
                    el = $('[name="' + key + '"]', that.element);
                    currentProp = props[key];

                    keysRule = Object.keys(currentProp.rules);
                    keysRule.forEach(function (ruleName) {
                        if (currentProp.rules.hasOwnProperty(ruleName)) {
                            el.data(ruleName, currentProp.rules[ruleName]);
                        }
                    });

                    keysMesg = Object.keys(currentProp.messages);
                    keysMesg.forEach(function (msgName) {
                        if (currentProp.messages.hasOwnProperty(msgName)) {
                            el.data(msgName + '-message', currentProp.messages[msgName]);
                        }
                    });

                    if (el.length) {
                        bindEvent(that, el);
                        that.vars.fields = that.vars.fields.add(el);
                    }
                }
            });
        },
        detach: function (props) {
            var keys = Object.keys(props);
            var el;
            var rules;
            var that = this;
            keys.forEach(function (key) {
                if (props.hasOwnProperty(key)) {
                    el = $('[name="' + key + '"]', that.element);
                    rules = props[key].split(/[\s,]+/);
                    rules.forEach(function (attrName) {
                        el.removeData(attrName);
                        el.removeAttr('data-' + attrName);
                        el.removeData(attrName + 'Message');
                        el.removeAttr('data-' + attrName + '-message');
                        el.off('change.' + pluginName + ' blur.' + pluginName);
                    });
                }
            });
        },
        destroy: function () {
            this.vars.fields.off('change.' + pluginName + ' blur.' + pluginName);
            this.vars.fields.each(function () {
                $(this).removeData('errors');
            });
            this.element.off('submit.' + pluginName);
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
        closestEl: '.form-group',
        successClass: 'success',
        errorClass: 'error',
        labelClass: 'wrap-error',
        errorTemplate: '{0}',
        errorAppendTo: null,
        container: null,
        isValidOnChange: true,
        onBeforeInit: null,
        onChange: null,
        onBeforeSubmit: null,
        onAfterSubmit: null,
        onError: null
    };

    $(function () {
        var headerError = $('.popup .wrap-error:first'),
            registerForm = $('.register-popup').closest('form'),
            contactPopup = $('.contact-popup'),
            contactForm = contactPopup.closest('form'),
            selInfo = $('[data-select-info]', contactForm),
            blockInfo = $('[data-more-info]', contactForm),
            contactPhoneContainer = $('[data-phone-container]', contactForm),
            placeholderPhone = contactPhoneContainer.data('placeholder-phone'),
            placeholderEmail = contactPhoneContainer.data('placeholder-email'),
            msgPhone = contactPhoneContainer.data('valid-phone'),
            msgEmail = contactPhoneContainer.data('valid-email'),
            titlePhone = contactPhoneContainer.data('title-phone'),
            titleEmail = contactPhoneContainer.data('title-email'),
            inputPhone = $('[data-phone-hidden]', contactForm);

        selInfo
            .off('change.moreInfo')
            .on('change.moreInfo', function () {
                if ($(this).find(':selected').data('option-info')) {
                    if (blockInfo.is(':hidden')) {
                        blockInfo.removeClass('hide').hide().slideDown();
                    }
                } else {
                    blockInfo.find(':checkbox:checked').prop('checked', false).trigger('change');
                    blockInfo.slideUp();
                }
            });

        contactPhoneContainer
            .off('change.type', 'select')
            .on('change.type', 'select', function () {
                var inputGroup = $(this).closest('.form-group'),
                    input = inputGroup.find('.wrap input'),
                    label = inputGroup.find('label'),
                    number = label.find('span'),
                    name = input.attr('name'),
                    objDetach = {},
                    objAttach = {},
                    str;

                objAttach[name] = {};

                if (this.selectedIndex) {
                    str = titleEmail;
                    input.attr('placeholder', placeholderEmail);
                    objDetach[name] = 'required digits';
                    objAttach[name].rules = {
                        email: true
                    };
                    objAttach[name].messages = {
                        email: msgEmail
                    };
                } else {
                    str = titlePhone;
                    input.attr('placeholder', placeholderPhone);
                    objDetach[input.attr('name')] = 'required email';
                    objAttach[name].rules = {
                        phonenumber: true
                    };
                    objAttach[name].messages = {
                        phonenumber: msgPhone
                    };
                }
                if (input.data('required') !== undefined) {
                    objAttach[name].rules.required = true;
                    objAttach[name].messages.required = contactPhoneContainer.find('input:first').data('required-message');
                }

                if (number.length) {
                    str += ' <span>' + number.text() + '</span> :';
                } else {
                    str += ' :';
                }

                // label.html(str);
                input.val('');

                if (inputGroup.hasClass('error')) {
                    inputGroup.removeClass('error');
                    inputGroup.find('.wrap-error').remove();
                }
                contactForm.validation('detach', objDetach);
                contactForm.validation('attach', objAttach);
            });
        contactPhoneContainer.trigger('change.type');

        $('[data-add-contact]', contactForm)
            .off('click.addPhone')
            .on('click.addPhone', function (e) {
                e.preventDefault();
                var numberOfGroup = contactPhoneContainer.find('[data-added-phone]').length + 1,
                    isRequired = $(this).data('validate-required'),
                    iconRequired = isRequired
                        ? '<i aria-hidden="true" class="wi-icon icon-required"></i>'
                        : '',
                    tpl = $('<div class="form-group phone-component" data-added-phone>' +
                            '<div class="row">' +
                            '<div class="col-sm-6">' +
                            '<label for="phone-"' + numberOfGroup + '>' + titleEmail + ' <span>' + numberOfGroup + '</span>:</label>' + iconRequired +
                            '</div>' +
                            '</div>' +
                            '<div class="row">' +
                            '<div class="col-sm-6">' +
                            '<div class="input-group">' +
                            '<div class="dropdown">' +
                            '<div data-customselectbox="data-customselectbox" class="custom-select">' +
                            '<select class="custom-box">' +
                            '<option value="phone">Phone</option>' +
                            '<option value="email">Email</option>' +
                            '</select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="wrap">' +
                            '<input id="phone-' + numberOfGroup + '" name="phone-' + numberOfGroup + '" type="input" value="" placeholder="Enter phone number" autocomplete="off" class="form-control"/>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'),
                    obj = {},
                    name = 'phone-' + numberOfGroup;
                obj[name] = {
                    rules: {
                        digits: true
                    },
                    messages: {
                        digits: msgPhone
                    }
                };

                if (isRequired) {
                    obj[name].rules.required = true;
                    obj[name].messages.required = contactPhoneContainer.find('input:first').data('required-message');
                }
                tpl.insertBefore($(this).parent());
                $('[data-customselectbox]', tpl).customSelectBox();
                contactForm.validation('attach', obj);
            });

        var toggleWrapError = function (isValid) {
            if (isValid) {
                headerError.addClass('hidden');
            } else {
                headerError.removeClass('hidden');
            }
        };

        var options = {
            successClass: '',
            labelClass: 'col-sm-6 wrap-error',
            errorTemplate: '<i class="wi-icon icon-close-2"></i><p class="text-error">{0}</p>',
            errorAppendTo: '.row:last',
            onBeforeInit: function (form) {
                var requiredMsg = form.find('[data-popin]').data('required-message');
                if (requiredMsg) {
                    form.find('[data-required]').each(function () {
                        var field = $(this);
                        if (!field.data('required-message')) {
                            field.data('required-message', requiredMsg);
                        }
                    });
                }
            },
            onBeforeSubmit: function() {
                var textArea = $('textarea', contactForm);
                textArea.each(function() {
                    var el = $(this),
                    value = el.val();
                    if (0 !== value.length) {
                        el.val('"' + value.replace(/"/g, '\'') + '"');
                    }
                });
            },
            onChange: function () {
                toggleWrapError(!this.element.find('.wrap-error:visible').length);
            },
            onAfterSubmit: function (isValid) {
                toggleWrapError(isValid);
                if (isValid) {
                    registerForm.find(':submit').prop( "disabled", true);
                }
                return isValid;
            }
        };

        $('[data-' + pluginName + ']')[pluginName](options);

        registerForm[pluginName](options);

        var contactOpt = $.extend(options, {
            onBeforeInit: function (form) {
                var requiredMsg = contactPopup.data('required-message');
                if (requiredMsg) {
                    form.find('[data-required]').data('required-message', requiredMsg);
                }
            },
            onAfterSubmit: function (isValid) {
                toggleWrapError(isValid);
                if (isValid) {
                    var str = '';
                    $('[data-added-phone] input').each(function (index) {
                        var arrow = ' / ';
                        if (index === 0) {
                            arrow = '';
                        }
                        str += arrow + $(this).val();
                    });
                    inputPhone.val(str);
                    contactForm.find(':submit').prop( "disabled", true);
                } else {
                    return false;
                }
            }
        });

        contactForm[pluginName](contactOpt);

        var resetContact = function () {
            var errorField = contactForm.find('.form-group.error'),
                selectContainer = $('[data-customselectbox]', contactForm);

            selectContainer.each(function () {
                var select = $(this).find('select'),
                    showVal = $(this).find('.visible-value'),
                    firstOption = select.find('option:first');
                showVal.text(firstOption.text());
            });

            $('[data-added-phone]').remove();
            $('[data-more-info]').addClass('hide');

            contactForm[0].reset();

            $('[data-phone-container] select').trigger('change');

            errorField.removeClass('error');
            errorField.find('.wrap-error').remove();

            contactForm.validation('destroy');
            $('[data-phone-container] input').attr({
                'data-required': true,
                'data-digits': true,
                'data-digits-message': msgPhone
            });
            contactForm.validation(contactOpt);
        };

        $('.contact-popup').find('.icon-close-1, .btn-cancel')
            .off('click.reset')
            .on('click.reset', resetContact);


        var chkPrivacy = $('#checkbox2'),
            group = chkPrivacy.parent();
        chkPrivacy.on('errorRendering', function (e, errors) {
            var wrapError = group.next('.wrap-error');
            if ($(e.target).is(chkPrivacy) && errors && errors.length) {
                if (!wrapError.length) {
                    group.after('<div class="wrap-error"><i class="wi-icon icon-close-2"></i><p class="text-error">' + errors[0] + '</p></div>');
                }
            } else {
                group.next().remove();
            }
        });

        registerForm.off('click.resetform', '.btn-cancel').on('click.resetform', '.btn-cancel', function () {
            registerForm.find('.form-group.error').removeClass('error').find('.wrap-error').remove();
        });

        $('.no-paste').find('input').on('paste', function (e) {
            e.preventDefault();
            alert(type.nopaste.msg);
        });
    });

}(jQuery, window));

/**
*  @name video player
*  @description Using mediaElement to playing video and is used in "Video player" component
*  @version 1.0
*/
(function ($) {
    'use strict';
    $(document).ready(function () {
        $('video, audio').each(function () {
            var media = $(this);
            media.mediaelementplayer({
                success: function (me) {
                    if (media.data('autoplay') !== undefined) {
                        me.play();
                    }
                }
            });
        });
    });
}(jQuery));

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
            icon = $('[data-icon]', welcomeBack),
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
                    if (cookie.icon) {
                        icon.attr('src', cookie.icon).show();
                    } else {
                        icon.hide();
                    }
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
