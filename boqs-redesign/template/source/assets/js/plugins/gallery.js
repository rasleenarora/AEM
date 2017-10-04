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
