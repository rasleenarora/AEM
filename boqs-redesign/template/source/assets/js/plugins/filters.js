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
