Frontend Code Review
===========
## Date: 05/06/2015
  - **Branch**: Frontend
  - **Reviewed by**: Thin.Nguyen
  - **Status**: OPEN
  - **Fixed by**:

### File: \source\assets\js\plugins\event-calendar.js
  - Should declare a variable to reuse `$('#header')`
  - We needn't declare new variable. It only uses 1 time.
    + Line 20 `var opt = this.options`
    + Line 43 `params = this.vars.fmDataParams`
    + Line 80 `eCard = elm.find('.event-content')`
    + Line 169 `vars = this.vars`
    + Line 224 `events = vars.cardWrap,`
    + Line 245 `$(this)`
    + Line 392 `featureTitle = this.vars.feature.find('h3.static-title'),`

  - Should declare a variable to reuse `eResults[0]`, `eResults[i]`

  ```
  curMonthID = (eResults[0] !== undefined && eResults[0]) ?
                   (eResults[0].startMonth + '-' + eResults[0].startYear) :
                   null;
  ```

  and

  ```
  for (i = 0; i < len; i += 1) {
    monthID = eResults[i].startMonth + '-' + eResults[i].startYear;
    if (curMonthID !== monthID) {
      // To other month (exactly the next month)
      monthlyIndex = 1;
      curMonthID = monthID;
    } else {
      // Still in current month
      monthlyIndex += 1;
    }
    eResults[i].monthlyIndex = monthlyIndex;
    eResults[i].eIndex = i;
  }
  ```
  - Line 96 `paddingTop = 10,` it should be a const.
  - Line 689 `navMargin = 80`  it should be a const.

  - Line 127 `win = $(window)` , we should declare a global variable in this plugin to reuse.

  - We should declare a variable to reuse `$(this)`

  ```
  elm.find('.feature-event, .event-card-block .item').each(function(){
    var d = Math.abs($(this).offset().top - topLine);
    if (d < focusItem.d && d < viewportH) {
      focusItem = {
        id: ($(this).hasClass('feature-event')) ? 'feature' : $(this).data('id'),
        d: d
      };
    }
  });
  ```

  ```
  navList.find('a').on('click.' + pluginName, function(e){
    e.preventDefault();

    setActiveNavItem.call(that, $(this).attr('href'));
    switchButton.html($(this).attr('title'));

    goToMonthIndex.call(that, $(this));
    return false;
  });
  ```
  - Use L10n variable to get month names

  ```
  var getMonthString = function(month) {
    switch (month) {
      case 1: return 'January';
      case 2: return 'Febuary';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September';
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
      default: return null;
    }
  };
  ```

  - Line 354 `'<a href="#" title="Find out more"`. We should use L10n varible to store `"Find out more"`

  - Don't use underline for variable. Why don't reuse variable at line `numItem = $(this).closest('.item')` ???

  ```
  var renderQuantityDom = function(){
    var elm = this.element;
    elm.find('h3.static-title').each(function(){
      var _this = $(this),
          numItem = $(this).closest('.item');

      if(_this.parents('.feature-event').length > 0) {
        numItem = _this.next('.events').find('.detail').length;
      } else {
        numItem = _this.closest('.item').find('.event-content').length;
      }

      if(_this.find('.num').length > 0) {
        _this.find('.num').html(' (' + numItem + ')');
      } else {
        _this.append('<span class="num"> (' + numItem + ')</span>');
      }
    });
  };
  ```

  - We had declare `month = months[i];`, why don't you reuse it? (Line 413, 436, 427)
  - Line 512: remove `'' +`
  - Line 518: hardcoded `title="Event name lorem ipsum"`
  - Line 563: hardcoded `'This month'`
  - Line 636: hardcoded `'This month'`
  - Line 578 - 586: Don't use underline for variable.

    ```
    elm.find('.event-calendar-wrap').each(function(){
      var _this = $(this),
          evLength = _this.find('li').length;
      if (!evLength) {
        _this.hide();
      } else {
        _this.show();
      }
      _this.find('.static-title .num').html(' (' + evLength + ')');
    });
    ```
### File: \source\assets\js\plugins\gallery.js
  - Hardcoded from line 9 - 26: E.g: `title="photo gallery"`, `alt="gallery"`, `Tilt your phone for a larger version`,...
  - Hardcoded line 57 `num + ' of ' + len`
  - Line 58 `window.location.origin + '/bin/boqs-redesign/download?image='`. We can use

  ```
  Site.downloadPath = window.location.origin + '/bin/boqs-redesign/download?image='
  ```
  - Line 205: use `vars.bkgElement` instead of `$(this)`

### File: \source\assets\js\plugins\masonry.js
  - Declare a variable to reuse `$(window)`

### File: \source\assets\js\plugins\popin.js
  - Declare a variable to reuse `$(this)` at line 108, 109

## Date: 25/05/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.phan
  - **Status**: OPEN
  - **Fixed by**: Philip.Dang

### File: \source\view\event-detail.jade
  Please remove col-xs-12 , If we set sm -md, width will auto get 100% full without setting xs-12
  Please check the design and make new structure.
```
.container
  .col-xs-12.col-sm-8.col-sm-offset-2
    .event-details
      .thumb
        .thumb-content
          .date-time
            +link("Thu 26 February 2015, 3:00pm - 6:00pm").link-1
              span.wi-icon.icon-date-time(aria-hidden="true")
              span.blue-text Thu 26 February 2015, 3:00pm - 6:00pm
          .location
            +link("Sydney, NSW2000").link-1
              span.wi-icon.icon-location(aria-hidden="true")
              span.blue-text Sydney, NSW2000
          .address
            +link("Award Ceremony").link-1
              span.wi-icon.icon-address(aria-hidden="true")
              span.blue-text Award Ceremony
        .thumb-image
          +img("event-details.png","event details")
      .content
        h3.blue-text Open for registration
        p.blue-text Let us know you're coming and we will send you more details about event
        +link("Find out more").btn.btn-primary.btn-register
          span Register
          span.wi-icon.icon-arrow-1

```

## Date: 14/05/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.phan
  - **Status**: Close
  - **Fixed by**: oanh.nguyen

### File: \source\view\contact-form.jade
  Check the design of select box. Please add New style for this


## Date: 12/05/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.phan
  - **Status**: Close
  - **Fixed by**: oanh.nguyen

### File: \source\view\contact-form.jade

  Please add data follow filter component

```
select(data-customselectbox)

```

## Date: 08/05/2015
  - **Branch**: Frontend
  - **Reviewed by**: thin.nguyen
  - **Status**: OPEN
  - **Fixed by**: truong.tt, hoan.huynh

### File: \source\assets\js\site.js
  - variable mobileWidth is unnecessary. function isMobile will be:

  ```
  function isMobile() {
      return window.Modernizr.mq('(max-width: 767px)');
  }
  ```

  - Use single quote instead of double quote

### File: \source\assets\js\plugins\accordion.js
  - We can use function name with `closeContent` instead of `closeContentOpened`.
  - We can use pluginName to use it as a namespace instead of "itemAccordion".

### File: \source\assets\js\plugins\anchor-link.js
  - We are using switch case and it is incorrect about sense. We should use if else condition.
  - We can use pluginName to use it as a namespace instead of `anchorLink`.
  - 2 variables (heightHeader and that) in goTo function is unnecessary.
  - Missing namespace in resize window event.
  - destroy function is missing. it looks like

  ```
  destroy: function() {
      this.element.off('click.anchorLink');
      win.off('resize.anchorLink').off('scroll.anchorLink');
      $.removeData(this.element[0], pluginName);
  }
  ```

### File: \source\assets\js\plugins\custom-select.js
  - We can use pluginName to use it as a namespace instead of `customSelectBox`.
  - Use a variable to store `$(document)`.
  - If we do nothing in `changeValue` event, we should remove it.

  ```
  $('[data-' + pluginName + ']').on('changeValue.customSelectBox', function(e) {
      console.log('change value');
  });
  ```

### File: \source\views\expandable-content-area.jade:
### File: \source\views\result-card.jade:
  - Our rule use double quote instead of single quote `data-expand-content=''`
  - We can use `#collapse.collapse(data-expand-content)` instead of `#collapse.collapse(data-expand-content='')`. `data-expand-handle=""` is a same.

### File: \source\assets\js\plugins\expand-content.js
  - Remove the code which is unnecessary at line 20-25.

  ```
  this.handle
    .off('click.' + pluginName)
    .on('click.' + pluginName, this.toggle);
  ```

  To prevent an event when user click a tag, we can use `href="javascript:void(0)"`

### File: \source\assets\js\plugins\filters.js
  - Remove 2 options `defaultOpt: 'default'` and `sperator: '&'` if we have never use them.

### File: \source\assets\js\plugins\navigation.js
  - Line 16, we can use:

  ```
  this.element.on('click.navigationToggle', $.proxy(this.toggleNav, this));
  ```

  - Line 32, 50: We should use `target` instead of `$(this)` to avoid query jQuery selector.

### File: \source\assets\js\plugins\popin.js
  - Use one tab 4 spaces.
  - Unused variable `el = that.element`.
    Unnecessary variable

    ```
    scroll = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    },
    size = {
      width: win.width(),
      height: win.height()
    },

    var that = this,
        el = that.element,
        popin = that.vars.popin;
    ```

  - Unused function `publicMethod`

### File: \source\assets\js\plugins\popover.js
  - Unused variable `el = that.element` (initPopover, setPosition, show, hide functions).
  - Should declare a variable to reuse `$(window)` variable.

### File: \source\assets\js\plugins\tab.js
  - Should declare a variable to reuse `$(window)` variable.
  - Remove this code

  ```
  $('[data-' + pluginName + ']').on('afterChangedTab', function() {
      console.log('Tab changed');
  });
  ```

### File: \source\assets\js\plugins\welcome-back.js
  - Line 36: should use `el` instead of `$(this)`.

### File: \source\assets\js\plugins\same-height.js
  - Use one tab 4 spaces.

## Date: 28/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Fixed
  - **Fixed by**: Hai.Thoi

### File: source\assets\js\l10n.js
  - Issue 1
    Please remove `>` on code html of CQ5

```
.tick-list.static-list > li
.static-list > li
```

## Date: 28/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: nam.pham
  - **Status**: OPEN
  - **Fixed by**: truong.tt, hoan.huynh

### File: source\assets\js\l10n.js
  - Issue 1

    Rule: one tab is two spaces

### File: source\assets\js\plugins\accordion.js
  - Issue 1

    Alignment not good

  - Issue 2

    Use `ele` instead of `that.element`

    ```
    this.vars = {
      handle: that.element.find(options.classHandle),
      content: that.element.find(options.classContent),
      containItem: that.element.find(options.classContainItem)
    };
    ```

  - Issue 3

    Using variable is unnecessary

    ```
    hrefAnchor = $(this).attr('href');
    that.toggle(hrefAnchor);
    ```

### File: source\assets\js\plugins\anchor-link.js
  - Issue 1

    Function name not good `onScrollV2`

  - Issue 2

    Clean code comments

  - Issue 3

    Do not query `window` again

    `that.vars.winHeight = $(this).height();`

  - Issue 4

    Unnecessary variable `hrefId`, `offsetTop`, `that`, `winTop`, `thisOffset`, `options`

    ```
    var hrefId = $(this).attr('href');
    that.goTo(hrefId);

    offsetTop = $(hrefId).offset().top;

    var that = this,
        options = this.options,
        thisOffset = $(this.element.attr('href')).offset().top,
        winTop = win.scrollTop();

    if (winTop >= thisOffset) {
      this.element.parent().addClass(options.classActive)
          .siblings().removeClass(options.classActive);
    }


    init: function() {
      var that = this,
          options = this.options;
    ```

  - Issue 5

    Do not repeat query `$(this)`

    ```
    contentTop = $(this).offset().top,
    contentH = $(this).height(),
    distanceBottomEdge = contentTop + contentH - winTop,
    itSelf = $(this);
    ```

  - Issue 6

    Keep the value in variable `win.scrollTop()`, `win.height()`, `doc.height()`, `contentItems.first().offset().top`

  - Issue 7

    Do not repeat `activeID = itSelf.attr('id');`

### File: source\assets\js\plugins\carousel.js
  - Issue 1

    Optimize plugin calling

    `this.element.slick(this.options)`

### File: source\assets\js\plugins\datepicker.js
  - Issue 1

    Optimize plugin calling

    `this.element.datetimepicker(this.options)`

### File: source\assets\js\plugins\deselect.js
  - Issue 1

    Rule: one tab is two spaces

### File: source\assets\js\plugins\expand-content.js
  - Issue 1

    Rule: one tab is two spaces

  - Issue 2

    Rule: do not modify plugin template

    `new ExpandContent(this, options));`

### File: source\assets\js\plugins\filters.js
  - Issue 1

    Rule: one tab is two spaces;

  - Issue 2

    Remove all coding comments

### File: source\assets\js\plugins\navigation.js
  - Issue 1

    Unused variable `that`

### File: source\assets\js\plugins\popin.js
  - Issue 1

    Unused variable `el = that.element`

    Unnecessary variable

    ```
    scroll = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    },
    size = {
      width: win.width(),
      height: win.height()
    },

    var that = this,
        el = that.element,
        popin = that.vars.popin;
    ```

  - Issue 2

    Unused function `publicMethod`

### File: source\assets\js\plugins\popover.js
  - Issue 1

    Rule: one tab is two spaces;

  - Issue 2

    Unused variable `el = that.element,`, `content = that.options.content;`

### File: source\assets\js\plugins\search.js
  - Issue 1

    Unnecessary variable

    ```
    var searchValue = searchBox.val();
        return !!(searchValue);
    ```

### File: source\assets\js\plugins\tab.js
  - Issue 1

    Clean all comments, `console.log()`

### File: source\assets\js\plugins\validation.js
  - Issue 1

    Rule: one tab is two spaces

## Date: 27/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Fixed
  - **Fixed by**: Phillip.Dang

### File: boqs\source\assets\css\plugin.less
  Issue 1:

    Please add use mixin less for this


    ```
    width: 20px;
    height: 28px;

    -moz-box-sizing: border-box;
         box-sizing: border-box;

    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
        touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;

      -webkit-transform: translate3d(0, 0, 0);
         -moz-transform: translate3d(0, 0, 0);
          -ms-transform: translate3d(0, 0, 0);
           -o-transform: translate3d(0, 0, 0);

    ```

  Issue 2:
    Please make class control follow new css

  ```
    position:absolute;
    left: 50%;
    bottom: follow the design
  ```



## Date: 27/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Closed
  - **Fixed by**: Oanh.nguyen

### File: boqs/source/views/block/event-registration

  - Issue 1
    Please check the design on Desktop
  - Issue 2
    Please change class `block`  to `popup`

### File: boqs/source/assets/css/event-registration

  - Issue 3
    Please make css re-use for popup component

  ```
  .register-popup {
    background: @blue-1;
  }
  .modal-dialog {
    margin: 20px auto;
  }
  .modal-content {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
  .modal-header {
    border: none;
    margin-bottom: 10px;
    .wrap-error {
      position: absolute;
      width: 85%;
    }
  }
  .modal-title {
    font-family: @font-family-Gotham-Book;
    .font-size(22px);
    line-height: 1.2;
    color: @prussian-blue;
    padding-bottom: 15px;
    margin-top: 40px;
    border-bottom: 2px solid @brown-light;
  }
  .modal-body {
    padding-top: 0;
  }
  ```

    Issue 4: (done)
      Please add css for `.popup`

    ```
      .popup{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1100;
        overflow-y: scroll;
      }
    ```

## Date: 23/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Closed
  - **Fixed by**: Hai.Thoi

### File: boqs/source/views/block/ribbon

  - Issue 1

    Please check the design on mobile.

## Date: 23/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Closed
  - **Fixed by**: Hai.Thoi

### File: boqs/source/assets/css/block.less

  - Issue 1

    Please remove margin left right change to padding left right. Because when we make responsive . whe should use to ` box-sizing `

```
  .ribbon-box:nth-child(2n+1), .ribbon-box:nth-child(2n+2) {
    margin-left: 1%;
    margin-right: 1%;
  }
  .ribbon-box:nth-child(2n+2) {
    margin-left: 1.5%;
  }
```

## Date: 23/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Closed
  - **Fixed by**: Hai.Thoi

### File: boqs/source/views/component/search.jade

  - Issue 1

    Please make corret the design on mobile

## Date: 22/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Closed
  - **Fixed by**: Oanh.Nguyen

### File: boqs/source/views/template-sprite
  - Issue 1

    Please add class for mobile + tablet for icon block

    ```
	     .col-md-4 + col-sm-... + col-xs-...
    ```

### File: boqs/source/views/template-sprite
  - Issue 2

    Please make corret the design.

### File: boqs/source/views/template-sprite
  - Issue 3

    Please remove max-width
  ```
  icon-list span {
    color: #09354b;
    font-size: 1.143em;
    font-family: "Gotham-Book", Arial, Helvetica, sans-serif;
    line-height: 1.2em;
    max-width: 128px;
    display: inline-block;
    vertical-align: middle;
  }
  ```

## Date: 22/04/2015
  - **Branch**: Frontend
  - **Reviewed by**: Duy.Phan
  - **Status**: Closed
  - **Fixed by**: Hai.Thoi

  ### File: boqs/source/views/block/ribbon
  - Issue 1

     We have 2 layout
      - 1 desktop > 768
      - 2 mobile < 768
    Please change this layout follow respond. I don't know how you make it.
  Jade ->
  ```
   source(srcset='images/upload/bgd-ribbon-dt.png', media='(min-width: 992px)')
  ```

  Less ->
  ```
  @media (min-width: @screen-md-min) {
     .ribbon-block {
    overflow: visible;
    padding: 0;
    .title-header {
      margin-bottom: 20px;
      .font-size(19px);
      line-height: 1.105;
    }
  }
  .ribbon-box {
    float: none;
    display: inline-block;
    width: 150px;
    &:nth-child(2n+1),
    &:nth-child(2n+2) {
      margin-left: 7px;
      margin-right: 7px;
    }
  }
  .ribbon-bg {
    left: 10px;
    img {
      width: 100%;
      height: auto;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
```
