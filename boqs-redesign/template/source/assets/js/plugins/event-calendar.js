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
