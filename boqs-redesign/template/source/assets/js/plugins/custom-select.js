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
