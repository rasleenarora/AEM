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
