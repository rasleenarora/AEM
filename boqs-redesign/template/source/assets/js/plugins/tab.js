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

    /*var fixedListTabLink = function () {
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
    };*/

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
                /*.on('scroll.' + pluginName, function () {
                    fixedListTabLink.call(that);
                })*/
                .on('resize.' + pluginName, function () {
                    that.vars.heightEle = that.element.height();
                    that.vars.widthEle = that.element.width();
                    that.vars.topEle = that.element.offset().top;
                    that.vars.heightTabLink = that.vars.listTabLinks.height();
                    that.vars.bottomEle = that.vars.topEle + that.vars.heightEle;

                    that.vars.listTabLinks.closest(options.wrapTabLinks).css({
                        width: that.vars.widthEle
                    });
                    /*clearTimeout(timer);
                    timer = setTimeout(function () {
                        fixedListTabLink.call(that);
                    }, delay);*/
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
