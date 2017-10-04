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
            htmlBody = $('html, body'),
            html = $('html'),
            body = $('body'),
            headerEl = $('#header'),
            globalSearchInput = $('#search-global'),
            stickyClass = 'sticky',
            stickyClassMobile = 'sticky-xs',
            containerEl = $('#container'),
            navbarTop = $('#navbar-top'),
            dataHideNav = $('[data-hide-nav]'),
            mainEl = $('#main'),
            topBody = 0,
            isFocus = false,
            // inputTag = $('input'),
            navToggle = $('.navbar-toggle'),
            menuLink = $('.main-menu-link'),
            searchToggle = $('#header .btn-search'),
            cover = $('.cover'),
            doc = $(document),
            welcome = $('[data-welcome-back]'),
            /*expandNavMobile = function () {
                // containerEl.addClass(stickyClassMobile);
                // mainEl.children().hide();
                // dataHideNav.hide();
            },*/
            /*showOtherNavEl = function () {
                mainEl.children().show();
                dataHideNav.show();
                win.trigger('resize.sameheight');
            },*/
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
            scrollTop = function (){
                htmlBody.animate({ scrollTop: 0 }, 500);
            },
            toggleLockScroll = function () {
                html.toggleClass('noscroll');
            },
            lockScroll = function () {
                html.addClass('noscroll');
            },
            unlockScroll = function () {
                html.removeClass('noscroll');
            };
            /*fixTopHeader = function () {
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
                        navbarTopHeight = navbarTop.outerHeight(true) + welcomeHeight;

                    if (win.scrollTop() >= navbarTopHeight) {
                        headerEl.css('top', -navbarTopHeight);
                        mainEl.css('marginTop', headerEl.outerHeight(true));
                        containerEl.addClass(stickyClass);
                        if (Site.canTouch) {
                            inputFocus(win.scrollTop() - navbarTopHeight);
                        }
                    } else {
                        headerEl.css('top', '');
                        mainEl.css('marginTop', '');
                        containerEl.removeClass(stickyClass);
                    }

                }
            };*/

        /*inputTag.off('blur focus').on('focus', function () {
            isFocus = true;
        }).on('blur', function () {
            isFocus = false;
        });*/

        /*$('[data-' + pluginName + ']')[pluginName]()
            .on('expandNav', function () {
                // topBody = $('body').scrollTop();
                // expandNavMobile();
            })
            .on('collapseNav', function () {
                // containerEl
                //     .removeAttr('style')
                //     .removeClass(stickyClassMobile);
                // showOtherNavEl();
                // htmlBody.scrollTop(topBody);
            });*/

        /*win
            .on('scroll.' + pluginName, function () {
                fixTopHeader();
            })
            .on('resize.' + pluginName, function () {
                fixTopHeader();
                if (!Site.isMobile()) {
                    $('[data-' + pluginName + ']')[pluginName]('collapse', true);
                }
            });*/
        /*win
            .on('resize.' + pluginName, function () {
                isGridFloatBreakpoint = Modernizr.mq('(min-width: 992px') ? true : false;
            })
            .trigger('resize.' + pluginName);*/

        /*menuLi
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
            });*/

        menuLink
            .off('click.return')
            .on('click.return', function (e) {
                e.preventDefault();
                var aEl = $(this),
                    parent = aEl.closest('li');
                if (!parent.hasClass('open')) {
                    menuLink.closest('li').removeClass('open'); //clear all
                    parent.addClass('open');
                } else {
                    parent.removeClass('open');
                }
            });

        /*doc
            .off('touchstart.return')
            .on('touchstart.return', function (e) {
                if (!$(e.target).closest(menuLink).length) {
                    menuLink.removeClass('active');
                }
                if (!$(e.target).is('input')) {
                    if (isFocus) {
                        inputTag.blur();
                    }
                }
            });*/

        navToggle
            .off('click.navtoggle')
            .on('click.navtoggle', function (e) {
                e.preventDefault();
                body.toggleClass('navopen');
                scrollTop();
                toggleLockScroll();
            });

        searchToggle
            .off('click.searchtoggle')
            .on('click.searchtoggle', function (e) {
                e.preventDefault();
                body.toggleClass('searchopen');
                scrollTop();
                toggleLockScroll();

                if (body.is('.searchopen')) {
                    setTimeout(function () {
                        globalSearchInput.trigger('focus');
                    }, 200);                    
                } else {
                    globalSearchInput.val(''); //clear input
                }
                
            });

        cover
            .off('click.cover')
            .on('click.cover', function (e) {
                body.removeClass('navopen searchopen');
                unlockScroll();
            });

        doc
            .off('click.menuClose')
            .on('click.menuClose', function (e) {
                if ($(e.target).closest('.main-menu').length === 0) {
                    $('.main-menu > li').removeClass('open'); //close meganav
                }
            });

        $('[data-footer-mobile]').html($('[data-mobile-bottom]').clone());
        $('[data-header-mobile]').html($('[data-mobile-top]').clone());
    });

}(jQuery, window, Site));
