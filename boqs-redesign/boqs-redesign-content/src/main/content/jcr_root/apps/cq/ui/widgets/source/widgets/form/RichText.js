/*************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2012 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

/**
 * @class CQ.form.RichText
 * @extends CQ.Ext.form.Field
 * <p>The RichText provides a form field for editing styled text information (rich text).
 * </p>
 * <p>The RichText component currently provides the following features:</p>
 * <ul>
 *   <li>Basic text formatting (bold, italic, underlined, sub- and superscript) - see
 *     {@link CUI.rte.plugins.FormatPlugin "format" plugin}</li>
 *   <li>Paragraph/block alignment (left, right, center) - see
 *     {@link CUI.rte.plugins.JustifyPlugin "justify" plugin}</li>
 *   <li>Hyperlinks and anchors - see {@link CUI.rte.plugins.LinkPlugin "links" plugin}
 *     </li>
 *   <li>List implementation (including support for nested lists) - see
 *     {@link CUI.rte.plugins.ListPlugin "lists" plugin}</li>
 *   <li>Indent/outdent of blocks/paragraphs - see
 *     {@link CUI.rte.plugins.ListPlugin "lists" plugin}</li>
 *   <li>Applying formats (p, h1, h2, h3, ...) to a paragraph - see
 *     {@link CUI.rte.plugins.ParagraphFormatPlugin "paraformat" plugin}</li>
 *   <li>Applying styles to text fragments (using CSS classes) - see
 *     {@link CUI.rte.plugins.StylesPlugin "styles" plugin}</li>
 *   <li>Table support (basic support as of 5.2, full support as of 5.3)- see
 *     {@link CUI.rte.plugins.TablePlugin "table" plugin}</li>
 *   <li>Advanced support for pasting text (plain text and cleaned HTML/Word) - see
 *     {@link CUI.rte.plugins.EditToolsPlugin "edit" plugin}</li>
 *   <li>HTML source editing - see
 *     {@link CUI.rte.plugins.MiscToolsPlugin "misctools" plugin}</li>
 *   <li>Find &amp; Replace - see
 *     {@link CUI.rte.plugins.FindReplacePlugin "findreplace" plugin}</li>
 *   <li>Support for "special characters" (as a table of Unicode characters) - see
 *     {@link CUI.rte.plugins.MiscToolsPlugin "misctools" plugin}</li>
 *   <li>Abstraction layer for normalizing HTML code (for better crossbrowser compatibility)
 *     </li>
 * </ul>
 * @constructor
 * Creates a new RichText.
 * @param {Object} config The config object
 */
CQ.form.RichText = CQ.Ext.extend(CQ.Ext.form.Field, {

    // HTMLEditor stuff --------------------------------------------------------------------

    // private properties
    validationEvent : false,
    deferHeight: true,
    initialized : false,
    activated : false,
    sourceEditMode : false,
    onFocus : CQ.Ext.emptyFn,
    iframePad:3,
    hideMode:'offsets',
    defaultAutoCreate : {
        tag: "textarea",
        style:"width:500px;height:300px;",
        autocomplete: "off"
    },

    // The basic stuff ---------------------------------------------------------------------

    /**
     * @cfg {String} name
     * The name of the form field that is used for submitting the text; defaults to
     * "text".
     */

    /**
     * @cfg {Number} height
     * The (initial) height of the entire RichText component, including the toolbar(s)
     * (defaults to {@link CQ.themes.RichText#DEFAULT_HEIGHT}). Note that the actual height
     * may vary over time if {@link #adjustEditorToToolbarHeight} is set to false and a
     * changing component width will require more or less estate for the toolbar(s).
     */

    /**
     * @cfg {String[]|String} externalStyleSheets
     * Array that contains paths to stylesheet files that will be included for
     * RichText editing (defaults to null). Stylesheets that are referenced here may for
     * example contain basic style definitions to adjust the appearance of the text being
     * edited to custom requirements. They may also be used to provide a WYSIWYG experience
     * for applying CSS classes to text fragments through the "styles" plugin. All paths
     * should be provided without the webapp's context prefix.
     */
    externalStyleSheets: null,

    /**
     * @cfg {String} requiredCssPath
     * Path prefix for accessing required external stylesheets (defaults to
     * {@link CQ.themes.RichText#DEFAULT_REQCSS_PATH}). The path should not include the
     * webapp's context path. You shouldn't change this unless you're fully aware of what
     * you are doing!
     */
    requiredCssPath: null,

    /**
     * @cfg {Boolean} allowBlank
     * False to validate that the value length &gt; 0 (defaults to true)
     */
    allowBlank: true,

    /**
     * @cfg {Boolean} removeSingleParagraphContainer
     * True if the paragraph element of texts that consist only of a single paragraph
     * should be removed on {@link #getValue}/{@link #syncValue} (defaults to false).
     * For example, if a text is &lt;p&gt;Single paragraph text&lt;/p&gt;, the surrounding
     * "p" tag would get removed if this option was set to true. This option is mainly for
     * backward compatibility with CQ 5.1, where container tags had not yet been available.
     * Hence texts that were created by a CQ 5.1 instance will be surrounded by a single "p"
     * element before they are edited in a CQ 5.2 instance. By setting this option to true,
     * this automatically added "p" tag will get removed before the text is saved, at least
     * if no other paragraphs or containers were added.
     */

    /**
     * @cfg {String} singleParagraphContainerReplacement
     * Specifies the name of the tag that has to be used if a paragraph container cannot
     * be simply removed because it carries additional info (for example, alignment and/or
     * CSS classes; defaults to "div"). Note that this setting only takes effect if
     * {@link #removeSingleParagraphContainer} is set to true.
     */

    /**
     * @cfg {Boolean} adjustEditorToToolbarHeight
     * True if the editing area's height should be adjusted to the actual (line-wrapped)
     * height of the toolbar(s) (defaults to true). If set to true, the editing area will
     * grow smaller if more estate is required for the toolbar, hence keeping the total
     * height of the component constant over time.
     * @since 5.3
     */
    adjustEditorToToolbarHeight: false,

    /**
     * @cfg {Object[]} linkInternalize
     * <p>Defines a list of attributes for which link internalizing has to be applied.</p>
     * <p>Link internalizing is necessary as the browser usually stores entire URLs in the
     * DOM, not relative links. Hence internal links must be rewritten to be "internal"
     * before submitting the text.</p>
     * <p>For example, the "href" attribute of a link might be created as something like
     * "http://localhost:4502/cq5/content/geometrixx/en.html", which has
     * to be stored as "/content/geometrixx/en.html".</p>
     * <p>Each element of the Array must have the following properties:</p>
     * <ul>
     *   <li><code>tag</code> : String<br>
     *     The name of the tag for which the internalizing should be done</li>
     *   <li><code>attribute</code> : String<br>
     *     The name of the attribute that contains the link to be internalized</li>
     * </ul>
     * <p>Defaults to:</p>
<pre>
[
     {
        "tag": "a",
        "attribute": "href"
    }, {
        "tag": "img",
        "attribute": "src"
    }
]
</pre>
     */

    /**
     * @cfg {Object} rtePlugins
     * <p>This is the root of all plugin-specific configuration.</p>
     * <p>You must provide a config element for each plugin you are about to configure.
     * Use the plugin's ID (see class documentation) as the property name for the
     * corresponding config element. Each config element has config options that are
     * used by all plugins, and plugin-specific options. Commonly used options are:</p>
     * <ul>
     *   <li><code>features</code> : String[]/String<br>
     *   A String[] that contains all features of a plugin that should be
     *   enabled; alternatively a String "*" may be provided to enable all features of the
     *   corresponding plugin</li>
     *   <li><code>tooltips</code> : Object<br>
     *   An object that defines the tooltips for the plugin's icons. Property name specifies
     *   the name of the icon (usually the ID of the feature that is represented by the
     *   icon; the value has a tooltip description object as required by Ext.</li>
     * </ul>
     * <p>Plugin-specific options are documented at the respective plugin. Note that this
     * object is null after constructing the RichText object has finished, as the
     * configuration is transferred to the respective plugin.</p>
     */

    /**
     * @cfg {CUI.rte.HtmlRules} htmlRules
     * This object defines how to create/process HTML. Defaults to null (uses default
     * HTML rules).
     * @since 5.3
     */

    /**
     * Array that defines the stylesheets (required by the RTE to operate) that have to be
     * copied to the RTE's iframe. - Note that this is currently not really used in a
     * meaningful way. Probably we can use it for later enhancements.
     * @private
     * @type String[]
     */
    requiredStyleSheets: null,

    /**
     * Array that defines the external stylesheets (required by the RTE to operate) that
     * have to be linked to the RTE's iframe.
     * @private
     * @type String[]
     */
    requiredLinkedCss: null,

    /**
     * Use the wrapper element for "actions" (hide/show/etc.) instead of Ext's default "el"
     * (which always addresses the textarea).
     * @private
     * @type String
     */
    actionMode: "wrap",

    /**
     * Temporary storage for drop targets while dropping is temporarily disabled
     * @private
     * @type Array
     */
    savedDropTargets: null,

    /**
     * Content path of the currently edited text
     * @type String
     * @publicProp
     * @since 5.3
     */
    dataPath: null,

    /**
     * The {@link CUI.rte.EditorKernel} to be used by this RichText instance
     * @type CUI.rte.IFrameKernel
     * @private
     */
    editorKernel: null,

    /**
     * Flag that determines if dropping things on the RichText component is currently
     * allowed
     * @type Boolean
     * @private
     */
    isDroppingAllowed: false,

    /**
     * Flag that determines if the component should request the focus on initialize. This is
     * set if {@link #focus} is called before the component is rendered/initialized
     * @type Boolean
     * @private
     */
    focusOnInitialize: false,

    constructor: function(config) {
        var com = CUI.rte.Common;
        var defaults = {
            "name": "text",
            "ddAccept": "image/;application/pdf",
            "height": CUI.rte.Theme.DEFAULT_HEIGHT,
            "requiredCssPath": CUI.rte.Theme.DEFAULT_REQCSS_PATH,
            "adjustEditorToToolbarHeight": true
        };
        this.requiredStyleSheets = null;
        this.requiredLinkedCss = {
            "iframeDefault": "RichText.iframe.css"
        };
        CQ.Util.applyDefaults(config, defaults);
        this.editorKernel = new CUI.rte.IFrameKernel(config);
        CQ.form.RichText.superclass.constructor.call(this, config);
        com.removeJcrData(this.externalStyleSheets);
        com.removeJcrData(this.requiredLinkedCss);
        this.isDroppingAllowed = true;
        this.focusOnInitialize = false;
        // height does not work and gets overridden by Ext, so copying to editorHeight.
        // See afterRender method for further information
        if (this.height) {
            this.editorHeight = this.height;
        }
    },


    // Data link ---------------------------------------------------------------------------

    // overriding CQ.Ext.form.Field#processRecord
    processRecord: function(record, path) {
        this.editorKernel.setContentPath(path);
        if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
            var v = record.get(this.getName());
            if (v == undefined && this.defaultValue != null) {
                if (this.isApplyDefault(record, path)) {
                   this.setValue(this.defaultValue);
                }
            }
            else {
                this.setValue(v ? v : "");
            }
            this.fireEvent('loadcontent', this, record, path);
        }
    },


    // Validation --------------------------------------------------------------------------

    // overriding CQ.Ext.form.Field#validateValue
    validateValue: function(value){
        if (value.length < 1 || value === CQ.Ext.form.TextField.prototype.emptyText) { // if it's blank
            if (this.allowBlank) {
                this.clearInvalid();
                return true;
            } else {
                this.markInvalid(CQ.Ext.form.TextField.prototype.blankText);
                return false;
            }
        }
        if (typeof this.validator == "function") {
          var msg = this.validator(value);
          if (msg !== true) {
              this.markInvalid(msg);
              return false;
          }
        }
        if (this.regex && !this.regex.test(value)) {
          this.markInvalid(CQ.Ext.form.TextField.prototype.regexText);
          return false;
        }
        return true;
    },

    // overriding CQ.Ext.form.Field#markInvalid
    markInvalid: function(msg){
        if (!this.rendered || this.preventMark) { // not rendered
            return;
        }
        msg = msg || this.invalidText;
        var el = this.iframeWrap.mask();
        el.addClass(this.invalidClass);
        el.dom.qtip = msg;
        el.dom.qclass = 'x-form-invalid-tip';
        el.on("click", function() {
            this.clearInvalid();
            this.focus();
        }, this);
        if (CQ.Ext.QuickTips) { // fix for floating editors interacting with DND
            CQ.Ext.QuickTips.enable();
        }
        this.fireEvent('invalid', this, msg);
    },

    // overriding CQ.Ext.form.Field#clearInvalid
    clearInvalid: function() {
        if (!this.rendered || this.preventMark) { // not rendered
            return;
        }
        if (this.iframeWrap) {
            this.iframeWrap.unmask();
        }
        this.fireEvent('valid', this);
    },


    // Component stuff ---------------------------------------------------------------------

    // private
    initComponent : function(){
        this.addEvents(
            /**
             * @event initialize
             * Fires when the editor is fully initialized (including the iframe)
             * @param {CQ.form.RichText} this
             */
            'initialize',
            /**
             * @event activate
             * Fires when the editor is first receives the focus. Any insertion must wait
             * until after this event.
             * @param {CQ.form.RichText} this
             */
            'activate',
             /**
             * @event beforesync
             * Fires before the textarea is updated with content from the editor iframe. Return false
             * to cancel the sync.
             * @param {CQ.form.RichText} this
             * @param {String} html
             */
            'beforesync',
             /**
             * @event beforepush
             * Fires before the iframe editor is updated with content from the textarea. Return false
             * to cancel the push.
             * @param {CQ.form.RichText} this
             * @param {String} html
             */
            'beforepush',
             /**
             * @event sync
             * Fires when the textarea is updated with content from the editor iframe.
             * @param {CQ.form.RichText} this
             * @param {String} html
             */
            'sync',
             /**
             * @event push
             * Fires when the iframe editor is updated with content from the textarea.
             * @param {CQ.form.RichText} this
             * @param {String} html
             */
            'push',
             /**
             * @event editmodechange
             * Fires when the editor switches edit modes
             * @param {CQ.form.RichText} this
             * @param {Boolean} sourceEdit True if source edit, false if standard editing.
             */
            'editmodechange'
        )
    },


    // Rendering/Resizing ------------------------------------------------------------------

    // overriding CQ.Ext.form.Field#afterRender
    afterRender: function() {
        CQ.form.RichText.superclass.afterRender.call(this);
        if (this.editorHeight) {
            this.setHeight(this.editorHeight);
        }
        this.initializeDragAndDrop();
    },

    // overriding CQ.Ext.form.Field#onRender
    onRender: function(ct, position) {

        CQ.form.RichText.superclass.onRender.call(this, ct, position);
        this.el.dom.style.border = '0 none';
        this.el.dom.setAttribute('tabIndex', -1);
        this.el.addClass('x-hidden');
        if(CQ.Ext.isIE){ // fix IE 1px bogus margin
            this.el.applyStyles('margin-top:-1px;margin-bottom:-1px;')
        }
        this.wrap = this.el.wrap({
            cls:'x-html-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });

        this.createToolbar();

        var iframe = document.createElement('iframe');
        iframe.name = CQ.Ext.id();
        iframe.frameBorder = '0';

        iframe.src=(CQ.Ext.SSL_SECURE_URL || "javascript:;");

        this.wrap.dom.appendChild(iframe);

        this.iframe = iframe;

        var iframeEl = CQ.Ext.get(iframe);
        this.iframeWrap = iframeEl.wrap();

        var deferDisplayNone = !iframeEl.isVisible(true);
        if (CQ.Ext.isIE) {
            this.doc = iframe.contentWindow.document;
            this.win = iframe.contentWindow;
        } else {
            this.doc = (iframe.contentDocument || window.frames[iframe.name].document);
            this.win = window.frames[iframe.name];
        }
        this.doc.open();
        this.doc.write(this.getDocMarkup());
        this.doc.close();
        this.setDesignMode(true);

        var runFn = function() {
            if (iframeEl.isVisible(true)) {
                if (this.doc.body || (this.doc.readyState == 'complete')) {
                    CQ.Ext.TaskMgr.stop(task);
                    this.initEditor.defer(10, this);
                }
            }
        };
        var task = { // must defer to wait for browser to be ready
            run: runFn,
            interval: (deferDisplayNone ? 100 : 10),
            scope: this
        };
        if (!deferDisplayNone) {
            task.duration = 10000;
        }
        CQ.Ext.TaskMgr.start(task);

        if (!this.width) {
            this.setSize(this.el.getSize());
        }

        // set display mode for iframe
        iframeEl.setVisibilityMode(CQ.Ext.Element.DISPLAY);

        // if parent is a dialog, when it hides, it should hide the iframe and then show it
        // again on show.
        var parentDialog = this.findParentByType("dialog");
        if (parentDialog) {
            parentDialog.on("show", function(e) {
                // editHandlesFn.defer(500);
                var iframeEl = CQ.Ext.get(this.iframe);
                if (iframeEl) {
                    iframeEl.show();
                }
                if (this.sourceEditMode) {
                    this.el.removeClass('x-hidden');
                    this.el.dom.removeAttribute('tabIndex');
                }
             }, this);

            parentDialog.on("hide", function(e) {
                var iframeEl = CQ.Ext.get(this.iframe);
                if (iframeEl) {
                    iframeEl.hide();
                }
                if (this.sourceEditMode) {
                    this.el.addClass('x-hidden');
                    this.el.dom.setAttribute('tabIndex', -1);
                }
            }, this);

            parentDialog.on("beforesubmit", function(e) {
                if (this.initialized) {
                    this.syncValue();
                }
            }, this);
        }
    },

    // overriding CQ.Ext.form.HtmlEditor#onResize
    onResize: function(w, h) {
        CQ.form.RichText.superclass.onResize.apply(this, arguments);
        if (this.el && this.iframe) {
            var originalHeight = this.wrap.getHeight();
            var tbIndex;
            // todo find a better way to implement this
            if (typeof(w) == 'number') {
                var aw = w - this.wrap.getFrameWidth("lr");
                this.el.setWidth(this.adjustWidth("textarea", aw));
                if (!isNaN(aw) && (aw > 0)) {
                    this.iframe.style.width = aw + 'px';
                }
            } else if ((typeof(w) == "string") && CUI.rte.Common.strEndsWith(w, "%")) {
                // "%" is not officially supported according to API doc, but as blog uses
                // it, we'll have to support it anyway
                this.iframe.style.width = "100%";
                w = this.wrap.getWidth();
            }
            var preHeight = this.editorKernel.getToolbarHeight();
            this.editorKernel.adjustToolbarToWidth(w);
            var tbHeight = this.editorKernel.getToolbarHeight();
            if ((typeof h == 'number')
                    || ((preHeight != tbHeight) && this.adjustEditorToToolbarHeight)) {
                if (!h) {
                    h = originalHeight - this.wrap.getFrameWidth("tb");
                }
                var ah = h - this.wrap.getFrameWidth("tb") - tbHeight;
                this.el.setHeight(this.adjustWidth("textarea", ah));
                if (!isNaN(ah) && (ah > 0)) {
                    this.iframe.style.height = ah + "px";
                }
            }
        }
    },


    // Helpers -----------------------------------------------------------------------------

    /**
     * Creates a suitable edit context for this instance.
     */
    createEditContext: function() {
        if (this.initialized) {
            return new CUI.rte.EditContext(this.iframe, this.getWin(), this.getDoc(),
                    this.getEditorBody());
        }
        return new CUI.rte.EditContext();
    },

    /**
     * <p>Copies the stylesheets required by the editor's document from the base document.
     * </p>
     * <p>All stylesheets defined in the {@link #cssStyle} property are copied as defined
     * by their respective entries.</p>
     * @private
     */
    addStyleSheets: function() {
        var com = CUI.rte.Common;
        var headEl = this.doc.getElementsByTagName("head")[0];
        if (this.externalStyleSheets) {
            for (var key in this.externalStyleSheets) {
                if (this.externalStyleSheets.hasOwnProperty(key)) {
                    var styleSheet = this.externalStyleSheets[key];
                    var cssNode = this.doc.createElement('link');
                    cssNode.type = 'text/css';
                    cssNode.rel = 'stylesheet';
                    cssNode.href = CQ.HTTP.externalize(styleSheet);
                    cssNode.media = 'screen';
                    headEl.appendChild(cssNode);
                }
            }
        }
        // add stylesheets to document
        var cssToAdd = [];
        if (this.requiredStyleSheets) {
            var requiredCnt = this.requiredStyleSheets.length;
            for (var requiredIndex = 0; requiredIndex < requiredCnt; requiredIndex++) {
                cssToAdd.push(this.requiredStyleSheets[requiredIndex]);
            }
        }
        for (var pluginId in this.editorKernel.registeredPlugins) {
            var plugin = this.editorKernel.registeredPlugins[pluginId];
            var styleDefs = plugin.reportStyles();
            if (styleDefs != null) {
                var typeCnt = styleDefs.length;
                for (var t = 0; t < typeCnt; t++) {
                    var typeDefs = styleDefs[t];
                    var styles = typeDefs.styles;
                    var styleCnt = styles.length;
                    for (var s = 0; s < styleCnt; s++) {
                        var cssName = styles[s].cssName;
                        if (!com.arrayContains(cssName)) {
                            cssToAdd.push(cssName);
                        }
                    }
                }
            }
        }
        var cssCnt = cssToAdd.length;
        var styleSheets = document.styleSheets;
        var styleSheetCnt = styleSheets.length;
        var styleToAdd, sheetIndex, styleToCheck, rules, ruleCnt, ruleToCopy,
            ruleIndex, ruleToProcess, ruleText, cssIndex;
        if (com.ua.isOldIE) {
            var editorSheet = this.doc.createStyleSheet();
            for (cssIndex = 0; cssIndex < cssCnt; cssIndex++) {
                styleToAdd = cssToAdd[cssIndex];
                for (sheetIndex = 0; sheetIndex < styleSheetCnt; sheetIndex++) {
                    styleToCheck = styleSheets[sheetIndex];
                    rules = styleToCheck.rules;
                    ruleCnt = rules.length;
                    ruleToCopy = null;
                    for (ruleIndex = 0; ruleIndex < ruleCnt; ruleIndex++) {
                        ruleToProcess = rules[ruleIndex];
                        ruleText = ruleToProcess.selectorText;
                        if (ruleText == "." + styleToAdd) {
                            editorSheet.addRule(
                                    "." + ruleText, ruleToProcess.style.cssText);
                            break;
                        }
                    }
                }
            }
        } else {
            var styleDef = this.doc.createElement("style");
            styleDef.type = 'text/css';
            var cssText = "";
            for (cssIndex = 0; cssIndex < cssCnt; cssIndex++) {
                styleToAdd = cssToAdd[cssIndex];
                for (sheetIndex = 0; sheetIndex < styleSheetCnt; sheetIndex++) {
                    try {
                        styleToCheck = styleSheets[sheetIndex];
                        rules = styleToCheck.cssRules;
                        ruleCnt = rules.length;
                        ruleToCopy = null;
                        for (ruleIndex = 0; ruleIndex < ruleCnt; ruleIndex++) {
                            ruleToProcess = rules[ruleIndex];
                            if (ruleToProcess.type) {
                                if (ruleToProcess.type == CSSRule.STYLE_RULE) {
                                    ruleText = ruleToProcess.selectorText;
                                    if (ruleText == ("." + styleToAdd)) {
                                        ruleToCopy = ruleToProcess;
                                        break;
                                    }
                                }
                            }
                        }
                        if (ruleToCopy) {
                            cssText += ruleToCopy.cssText;
                            break;
                        }
                    } catch (ex) {
                        // exception may occur if the given stylesheet is an external (browser security issue) or if it is not available
                    }
                }
            }
            styleDef.appendChild(this.doc.createTextNode(cssText));
            headEl.appendChild(styleDef);
        }
    },

    // overriding CQ.Ext.form.HtmlEditor#getDocMarkup
    getDocMarkup: function() {
        var iframeHtml = "<html><head>";
        if (this.requiredLinkedCss) {
            for (var linkId in this.requiredLinkedCss) {
                if (this.requiredLinkedCss.hasOwnProperty(linkId)) {
                    var linkedCss = this.requiredCssPath + "/"
                            + this.requiredLinkedCss[linkId];
                    iframeHtml += "<link rel=\"stylesheet\" type=\"text/css\" href=\""
                        + CQ.shared.HTTP.getXhrHookedURL(CQ.HTTP.externalize(linkedCss)) + "\">";
                }
            }
        }
        iframeHtml += "</head>"
                + "<body id=\"CQrte\" spellcheck=\"false\">"
                + this.editorKernel.getEmptyLinePlaceholderMarkup()
                + "</body></html>";
        return iframeHtml;
    },


    // Ext2-compatibility stuff ------------------------------------------------------------
    // todo review

    // private
    getEditorBody : function(){
        return this.doc.body || this.doc.documentElement;
    },

    // private
    getDoc : function(){
        return CQ.Ext.isIE ? this.getWin().document : (this.iframe.contentDocument
                || this.getWin().document);
    },

    // private
    getWin : function(){
        return CQ.Ext.isIE ? this.iframe.contentWindow : window.frames[this.iframe.name];
    },

    // private (for BoxComponent)
    adjustSize : CQ.Ext.BoxComponent.prototype.adjustSize,

    // private (for BoxComponent)
    getResizeEl : function(){
        return this.wrap;
    },

    // private (for BoxComponent)
    getPositionEl : function(){
        return this.wrap;
    },

    // private
    initEvents : function(){
        this.originalValue = this.getValue();
    },

    // private
    deferFocus : function(){
        this.focus.defer(10, this);
    },

    // private
    adjustWidth : function(tag, w){
        tag = tag.toLowerCase();
        if(typeof w == 'number' && !CQ.Ext.isSafari){
            if(CQ.Ext.isIE && (tag == 'input' || tag == 'textarea')){
                if(tag == 'textarea' && CQ.Ext.isStrict){
                    return w-2;
                }
            }else if(CQ.Ext.isOpera && CQ.Ext.isStrict){
                if(tag == 'textarea'){
                    return w-2;
                }
            }
        }
        return w;
    },


    // Basic component/form field stuff ----------------------------------------------------

    // overriding CQ.Ext.form.HtmlEditor#initEditor, adding some additional event handlers.
    // It also copies all required stylesheets from the main document to the editor document
    initEditor: function() {

        // this is the slightly modified, original init code from HtmlEditor
        var dbody = this.getEditorBody();
        var ss = this.el.getStyles("font-size", "font-family", "background-image",
            "background-repeat");
        ss["background-attachment"] = 'fixed'; // w3c
        dbody.bgProperties = "fixed"; // ie

        CQ.Ext.DomHelper.applyStyles(dbody, ss);

        if (this.doc){
            try {
                CQ.Ext.EventManager.removeAll(this.doc);
            } catch (e) {
                // ignored
            }
        }

        this.doc = this.getDoc();

        this.addStyleSheets();

        this.editorKernel.initializeEditContext(this.iframe, this.win, this.doc,
                this.getEditorBody());
        this.editorKernel.initializeEventHandling();
        this.editorKernel.addUIListener("updatestate", this.updateToolbar, this);
        this.editorKernel.addUIListener("preventdrop", this.preventDrop, this);
        this.editorKernel.addUIListener("reactivatedrop", this.reactivateDrop, this);
        this.editorKernel.addUIListener("enablesourceedit", function() {
            this.toggleSourceEdit(true);
        }.createDelegate(this), this);
        this.editorKernel.addUIListener("disablesourceedit", function() {
            this.toggleSourceEdit(false);
        }.createDelegate(this), this);
        this.initialized = true;
        this.fireEvent('initialize', this);
        this.doc.editorInitialized = true;
        this.pushValue();
        if (this.focusOnInitialize) {
            this.deferFocus();
            this.focusOnInitialize = false;
        }
    },

    onFirstFocus: function() {
        this.activated = true;
        this.fireEvent('activate', this);
    },

    // overriding CQ.Ext.Component#focus
    focus: function(selectText, delay) {
        if (delay) {
            this.focus.defer(CQ.Ext.isNumber(delay) ? delay : 10, this,
                    [ selectText, false ]);
            return null;
        }
        if (this.rendered) {
            if (!this.sourceEditMode) {
                if (this.initialized) {
                    this.editorKernel.focus();
                } else {
                    this.focusOnInitialize = true;
                }
            } else {
                this.el.focus();
            }
        } else {
            this.focusOnInitialize = true;
        }
        // return this;
    },

    // overriding CQ.Ext.Component#blur
    blur: function() {
        if (this.rendered) {
            if (!this.sourceEditMode) {
                if (this.initialized) {
                    this.editorKernel.blurFocus();
                } else {
                    this.focusOnInitialize = false;
                }
            } else {
                this.el.blur();
            }
        } else {
            this.focusOnInitialize = false;
        }
    },

    // overriding CQ.Ext.form.HtmlEditor#onDestroy
    onDestroy: function() {
        if (this.monitorTask) {
            CQ.Ext.TaskMgr.stop(this.monitorTask);
        }
        if (this.rendered) {
            this.editorKernel.destroyToolbar();
            this.iframeWrap.innerHTML = '';
            this.iframeWrap.remove();
            this.wrap.dom.innerHTML = '';
            this.wrap.remove();
        }
    },

    // overriding CQ.Ext.form.HtmlEditor#syncValue
    syncValue: function() {
        if (this.initialized) {
            var html = this.editorKernel.getProcessedHtml();
            if (this.fireEvent("beforesync", this, html) !== false) {
                  if(this.el.dom){this.el.dom.value = html;}
                this.fireEvent("sync", this, html);
            }
        }
    },

    // overriding CQ.Ext.form.Field#getRawValue, returning always a cleaned-up version of
    // HTML which is necessary to work correctly with validation
    getRawValue: function() {
        if (this.sourceEditMode) {
            // if we're in source edit mode, we'll push the edited html to the editor's
            // iframe for later postprocessing
            this.pushValue();
        }
        this.syncValue();
        return CQ.form.RichText.superclass.getRawValue.call(this);
    },

    /**
     * <p>Gets the current value of the component.</p>
     * <p>Post-Processing is applied to the HTML before it is returned.</p>
     * @return {String} The cleaned HTML value of the component
     */
    getValue: function() {
        return this.getRawValue();
    },

    /**
     * Even if this method is exposed as "protected" API by the underlying
     * {@link CQ.Ext.form.HtmlEditor}: Don't ever use this method directly! It may have
     * severe sideeffects in certain contexts.
     * @hide
     */
    pushValue: function(){
        if (this.initialized) {
            var v = this.el.dom.value;
            if (this.fireEvent('beforepush', this, v) !== false){
                if (!CQ.Ext.isGecko) {
                    this.editorKernel.setUnprocessedHtml(v);
                } else {
                    this.getEditorBody().innerHTML = "";
                    // this is another nasty workaround: the backspace/delete key will
                    // not work initially if we would not switch designMode off before
                    // actually setting the value (the proper way was
                    // this.doc.execCommand("inserthtml", false, v), which leads to
                    // unexpected sideeffects regarding scrolling offsets)
                    var oldDesignMode = this.doc.designMode;
                    this.doc.designMode = "off";
                    this.editorKernel.setUnprocessedHtml(v);
                    this.doc.designMode = oldDesignMode;
                    if (this.doc.designMode == "on") {
                        this.editorKernel.initializeGeckoSpecific.defer(10,
                                this.editorKernel);
                    }
                }
                this.fireEvent('push', this, v);
            }
        }
    },

    /**
     * <p>Sets the current value of the component.</p>
     * <p>Pre-Processing is applied to the specified HTML code before it is pushed to the
     * editor. This is necessary to ensure that each browser can edit the specified
     * HTML value.</p>
     * <p>Note that the undo buffer is reset whenever this method is getting called.</p>
     * @param {String} value The HTML value to be set
     */
    setValue: function(value) {
        this.value = value;
        // this code is a slightly different version of the code from HtmlEditor/Field
        // that ensures that validation is executed at the right time
        if (this.rendered) {
            this.el.dom.value = (value === null || value === undefined ? '' : value);
        }
        this.pushValue();
        if (this.rendered) {
            this.validate();
        }
        (function() {
            if (this.initialized) {
                this.editorKernel.initializeCaret(true);
            }
            this.editorKernel.execCmd("initializeundo");
        }).defer(1, this);
    },

    /**
     * Enables or disables design mode (makes the text editable or disables editing).
     * @param {Boolean} enable True to enable design mode
     * @private
     */
    setDesignMode: function(enable) {
        if (CQ.Ext.isIE) {
            this.doc.body.contentEditable = enable;
        } else {
            this.doc.designMode = (enable ? "on" : "off");
        }
    },

    // overrides CQ.Ext.Component#enable
    enable: function() {
        this.setDesignMode(true);
        this.enableDropping();
        this.el.dom.disabled = false;
        CQ.form.RichText.superclass.enable.call(this);
        this.editorKernel.enable();
    },

    // overrides CQ.Ext.Component#disable
    disable: function() {
        this.editorKernel.disable();
        this.disableDropping();
        this.el.dom.disabled = true;
        this.setDesignMode(false);
        CQ.form.RichText.superclass.disable.call(this);
    },


    // UI stuff ----------------------------------------------------------------------------

    createToolbar: function() {
        this.editorKernel.createToolbar({
                "renderToDom": this.wrap.dom.firstChild
            });
        this.editorKernel.disableToolbar();
    },

    updateToolbar: function() {
        if (!this.activated) {
            this.onFirstFocus();
            return;
        }
        this.editorKernel.updateToolbar();
    },

    // overriding CQ.Ext.form.HtmlEditor#toggleSourceEdit
    toggleSourceEdit: function(sourceEditMode){
        if (sourceEditMode === undefined){
            sourceEditMode = !this.sourceEditMode;
        }
        this.sourceEditMode = sourceEditMode === true;
        var btn = this.editorKernel.getToolbarItem('sourceedit');
        if (btn.pressed !== this.sourceEditMode){
            btn.toggle(this.sourceEditMode);
            return;
        }
        if (this.sourceEditMode) {
            this.editorKernel.disableFocusHandling();
            this.editorKernel.notifyBlur();
            this.editorKernel.disableToolbar([ "sourceedit" ]);
            this.disableDropping();
            this.syncValue();
            this.iframe.className = 'x-hidden';
            this.el.removeClass('x-hidden');
            this.el.dom.removeAttribute('tabIndex');
            this.el.focus();
            this.editorKernel.firePluginEvent("sourceedit", {
                "enabled": true
            }, false);
        } else {
            this.editorKernel.enableFocusHandling();
            if (this.initialized && !this.disabled){
                this.editorKernel.enableToolbar();
            }
            if (!this.disabled) {
                this.enableDropping();
            }
            this.iframe.className = '';
            this.el.addClass('x-hidden');
            this.el.dom.setAttribute('tabIndex', -1);
            // pushValue() must be called after showing the iframe/hiding the textarea,
            // otherwise IE8 will choke once more ...
            this.pushValue();
            this.deferFocus();
            this.editorKernel.firePluginEvent("sourceedit", {
                "enabled": false
            }, false);
        }
        var lastSize = this.lastSize;
        if (lastSize){
            delete this.lastSize;
            this.setSize(lastSize);
        }
        this.fireEvent('editmodechange', this, this.sourceEditMode);
    },


    // Drag & drop support -----------------------------------------------------------------

    /**
     * Enables dropping for the editor kernel.
     */
    enableDropping: function() {
        this.isDroppingAllowed = true;
    },

    /**
     * Enables dropping for the editor kernel.
     */
    disableDropping: function() {
        this.isDroppingAllowed = false;
    },

    /**
     * <p>Get the top level component for the RichText.</p>
     * <p>This is usually the {@link CQ.Dialog} it is used from. If used from outside a
     * dialog, the corresponding form panel is returned.</p>
     * @return {CQ.Dialog/CQ.Ext.form.FormPanel} the top level component for the SmartFile;
     *         null if the SmartFile is neither used in a dialog, nor in a form panel
     * @private
     */
    getToplevel: function() {
        var dialog = this.findParentByType("dialog");
        if (!dialog) {
            dialog = this.findParentByType(CQ.Ext.form.FormPanel);
        }
        return dialog;
    },

    /**
     * Initializes Drag &amp; Drop for this component.
     * @private
     */
    initializeDragAndDrop: function() {

        if (!this.ddGroups) {
            this.ddGroups = [
                CQ.wcm.EditBase.DD_GROUP_PAGE,
                CQ.wcm.EditBase.DD_GROUP_ASSET
            ];
        }
        if (typeof(this.ddGroups) == "string") {
            this.ddGroups = [ this.ddGroups ];
        }
        var parentScope = this;
        var target = new CQ.wcm.EditBase.DropTarget(this.wrap, {
            notifyDrop: function(dragObject, evt, data) {
                if (dragObject && dragObject.clearAnimations) {
                    dragObject.clearAnimations(this);
                }
                if (dragObject.isDropAllowed(this)) {
                    var isTaken = parentScope.handleDrop(data);
                    if (isTaken) {
                        evt.stopEvent();
                    }
                    return isTaken;
                }
            }
        });

        var dialog = this.getToplevel();
        if (dialog) {
            dialog.on("activate", function(dialog) {
                if (dialog && dialog.el && this.highlight) {
                    var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);
                    if (!isNaN(dialogZIndex)) {
                        this.highlight.zIndex = dialogZIndex + 1;
                    }
                }
            }, target);

            dialog.on("deactivate", function(dialog) {
                if (dialog && dialog.el && this.highlight) {
                    var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);
                    if (!isNaN(dialogZIndex)) {
                        this.highlight.zIndex = dialogZIndex + 1;
                    }
                }
            }, target);
        }
        for (var i = 0; i < this.ddGroups.length; i++) {
            target.addToGroup(this.ddGroups[i]);
        }
        target.removeFromGroup(CQ.wcm.EditBase.DD_GROUP_DEFAULT);

        var accept = this.ddAccept;
        if (accept) {
            if (!CUI.rte.Utils.isArray(accept)) {
                var reg = new RegExp("[ ;]+", "g");
                accept = accept.split(reg);
            }
            target.ddAccept = accept;
        }

        this.dropTargets = [ target ];
    },

    /**
     * <p>Prevents dropping on the RichText component.</p>
     * <p>Dropping may be re-enabled using {@link #reactivateDrop}. This method can be
     * used to temporarily disable dropping, for example during working on a plugin
     * dialog that has its own drop targets.</p>
     */
    preventDrop: function() {
        this.savedDropTargets = this.dropTargets;
        this.dropTargets = null;
    },

    /**
     * <p>Re-activates dropping on the RichText component after it was temporarily disabled
     * using {@link #preventDrop}.</p>
     * <p>This method can be used to temporarily disable dropping, for example during
     * working on a plugin dialog that has its own drop targets.</p>
     */
    reactivateDrop: function() {
        this.dropTargets = this.savedDropTargets;
    },

    /**
     * Handler that reacts on objects that were dropped on the component.
     * @param {Object} dragData Description of the object that has been dropped on the
     *        component
     * @since 5.3
     */
    handleDrop: function(dragData) {
        var sel = CUI.rte.Selection;
        var com = CUI.rte.Common;
        if (dragData.records && dragData.single) {
            var record = dragData.records[0];
            var path = CQ.HTTP.encodePath(record.get("path"));
            var mimeType = record.get("mimeType");
            var isPage = (mimeType == "");
            var pSel = this.editorKernel.createQualifiedSelection(
                    this.editorKernel.getEditContext());
            if (pSel && sel.isSelection(pSel)) {
                // insert as a link -> path has to be encoded before inserting the link;
                // see also bug #30206
                path = path.replace(/&/g, "%26");
                // todo respect link HTML rules
                // todo respect trim selection whitespace
                if (isPage) {
                    path = path + CQ.HTTP.EXTENSION_HTML;
                }
                this.editorKernel.relayCmd("modifylink", {
                    "url": path
                });
            } else {
                if (com.strStartsWith(mimeType, "image/")) {
                    // insert as image
                    var cmdValue = {
                        path: path
                    };
                    this.editorKernel.relayCmd("insertimg", cmdValue);
                }
            }
            return true;
        }
        return false;
    },

    isDropAllowedForObject: function(dragData) {
        var sel = CUI.rte.Selection;
        var com = CUI.rte.Common;
        if (dragData.records && dragData.single && this.isDroppingAllowed) {
            var record = dragData.records[0];
            var mimeType = record.get("mimeType");
            var pSel = this.editorKernel.createQualifiedSelection(
                    this.editorKernel.getEditContext());
            if (pSel && sel.isSelection(pSel)) {
                return true;
            }
            if (!pSel || !sel.isSelection(pSel)) {
                this.editorKernel.restoreSelectionToLastKnownBookmark();
                if (com.strStartsWith(mimeType, "image/")) {
                    return true;
                }
            }
        }
        return false;
    }


    // Deprecated config options -----------------------------------------------------------

    /**
     * @cfg {Boolean} enableSourceEdit
     * Enable the switch to source edit button (defaults to false)
     * @deprecated Use {@link #rtePlugins} instead
     */

    /**
     * @cfg {Boolean} enableFont
     * @hide
     * <p>Enable font selection (defaults to false).</p>
     * <p>Note that you shouldn't enable this option, as it uses deprecated "font" tags
     * to apply the font to the selected text. Note also that font tags will be removed
     * before a text is submitted anyway. Please use CSS classes as provided by the "styles"
     * plugin instead.</p>
     */

    /**
     * @cfg {Boolean} enableFontSize
     * @hide
     * <p>Enable the increase/decrease font size buttons (defaults to false).</p>
     * <p>Note that you shouldn't enable this option, as it uses deprecated "font" tags
     * to apply the font size to the selected text. Note also that font tags will be removed
     * before a text is submitted anyway. Please use CSS classes as provided by the "styles"
     * plugin instead.</p>
     */

    /**
     * @cfg {Boolean} enableColors
     * @hide
     * <p>Enable the fore/highlight color buttons (defaults to false).</p>
     * <p>Note that you shouldn't enable this option, as it uses deprecated "font" tags
     * to apply the color to the selected text. Note also that font tags will be removed
     * before a text is submitted anyway. Please use CSS classes as provided by the "styles"
     * plugin instead.</p>
     */

    /**
     * @cfg {Array} fontFamilies
     * @hide
     * This is a config option of the underlying HtmlEditor component that generally should
     * not be used for RichText, as font is not supported at all. See
     * {@link CQ.Ext.form.HtmlEditor#fontFamilies}.
     */

    /**
     * @cfg {String} defaultFont
     * @hide
     * This is a config option of the underlying HtmlEditor component that generally should
     * not be used for RichText, as font is not supported at all. See
     * {@link CQ.Ext.form.HtmlEditor#defaultFont}.
     */

    /**
     * @cfg {String} createLinkText
     * @hide
     * This is a config option of the underlying HtmlEditor component that is not used by
     * RichText anymore, as RichText provides improved support for creating and
     * managing links. See {@link CQ.Ext.form.HtmlEditor#createLinkText} and
     * {@link #linkbrowseConfig}.
     */

    /**
     * @cfg {String} defaultLinkValue
     * @hide
     * This is a config option of the underlying HtmlEditor component that is not used by
     * RichText anymore, as RichText provides improved support for creating and
     * managing links. See {@link CQ.Ext.form.HtmlEditor#defaultLinkValue} and
     * {@link #linkbrowseConfig}.
     */

    /**
     * @cfg {Boolean} enableEditTools
     * True if the editor toolbar (cut/copy/paste) is enabled (defaults to false)
     * @deprecated Use {@link #rtePlugins} instead
     */

    /**
     * @cfg {Boolean} enableStyle
     * True if the style selector component is enabled (defaults to false)
     * @deprecated Use {@link #rtePlugins} instead
     */

    /**
     * @cfg {Boolean} enableParagraphFormat
     * True if the format selector component is enabled (defaults to false)
     * @deprecated Use {@link #rtePlugins} instead
     */

    /**
     * @cfg {Boolean} enableSpecialChars
     * True if the special characters feature is enabled (defaults to false). Use
     * {@link #specialCharsConfig} to configure the dialog used by this feature.
     * @deprecated Use {@link #rtePlugins} instead
     */

    /**
     * @cfg {Boolean} disabled
     * @hide
     */

    /**
     * @cfg {Boolean} disabled
     * @hide
     */

    /**
     * @cfg {Boolean} readOnly
     * @hide
     */

    /**
     * @cfg {Object} specialCharsConfig
     * <p>Configuration of the special characters component. Valid config properties are:
     * </p>
     * <ul>
     *   <li><code>chars</code> : Object<br>
     *     Table of characters to be added to the special character dialog. Choose the
     *     property name for each element at your discretion. Each element defines a single
     *     character or a range of characters:
     *     <ul>
     *       <li>Use an "entity" property (String) to specify the HTML entity of a single
     *         character (for example: "&amp;copy;").</li>
     *       <li>Use "rangeStart" (Number)/"rangeEnd" (Number) properties to specify a range
     *         of unicode characters. Both rangeStart and rangeEnd must specify the numeric
     *         representation of a unicode character. Note that the character specified as
     *         rangeEnd is also included in the specified range.</li>
     *     </ul>
     *   </li>
     *   <li><code>tableCls</code> : String<br>
     *     The CSS class to be used for formatting the table that displays the special
     *     characters.</li>
     *   <li><code>cellCls</code> : String<br>
     *     The CSS class to be used for formatting cells of the character table.</li>
     *   <li><code>overCls</code> : String<br>
     *     The CSS class to be used for formatting cells of the character table if
     *     rolledover.</li>
     *   <li><code>magnifyCls</code> : String<br>
     *     CSS class to be used for the magnified view of the currently rolledover
     *     character.</li>
     * </ul>
     * <p>Defaults to:</p>
<pre>
{
    "tableCls": "cq-rte-scd-table",
    "cellCls": "cq-rte-scd-cell",
    "overCls": "cq-rte-scd-cell-over",
    "magnifyCls": "cq-rte-scd-magnify",
    "chars": {
        "copyright": {
            "entity": "&copy;"
        },
        "registered": {
            "entity": "&reg;"
        },
        "trademark": {
            "entity": "&trade;"
        }
    }
}
</pre>
     * @deprecated Use the corresponding plugin configuration instead
     */

    /**
     * @cfg {Boolean} enableSubSuperScript
     * True if sub/superscript is enabled (defaults to false).
     * @deprecated Use {@link #rtePlugins} instead.
     */

    /**
     * @cfg {Object} linkButtons
     * Configuration (optional) of the link buttons (defaults to null). Valid sub-properties
     * are: createlink, unlink, anchor (each of type Boolean, enabling or disabling the
     * corresponding button). Note that {@link #enableLinks} must be set to true
     * for this configuration to take effect.
     * @deprecated Use {@link #rtePlugins} instead.
     */

    /**
     * @cfg {Object} formatButtons
     * Configuration (optional) of the format buttons (defaults to null). Valid
     * sub-properties are: bold, italic, underline (each of type Boolean, enabling or
     * disabling the corresponding button). Note that {@link #enableFormat} must be set to
     * true for this configuration to take effect.
     * @deprecated Use {@link #rtePlugins} instead.
     */

    /**
     * @cfg {Object} alignmentButtons
     * Configuration (optional) of the alignment buttons (defaults to null). Valid
     * sub-properties are: left, center, right (each of type Boolean, enabling or
     * disabling the corresponding button). Note that {@link #enableAlignments} must be set
     * to true for this configuration to take effect.
     * @deprecated Use {@link #rtePlugins} instead.
     */

    /**
     * @cfg {Object} listButtons
     * Configuration (optional) of the alignment buttons (defaults to null). Valid
     * sub-properties are: ordered, unordered, indent, outdent (each of type Boolean,
     * enabling or disabling the corresponding button). Note that {@link #enableLists} must
     * be set to true for this configuration to take effect.
     * @deprecated Use {@link #rtePlugins} instead.
     */

    /**
     * @cfg {Object} editToolButtons
     * Configuration (optional) of the edit tools (cut, copy, paste)  buttons (defaults to
     * null). Valid sub-properties are: cut, copy, paste-default, paste-plaintext,
     * paste-wordhtml (each of type Boolean, enabling or disabling the corresponding
     * button). Note that {@link #enableEditTools} must be set to true for this
     * configuration to take effect.
     * @deprecated Use {@link #rtePlugins} instead.
     */

    /**
     * @cfg {Object/Object[]} cssStyles
     * <p>Defines CSS classes that are available to the user for formatting text fragments
     * (defaults to null). There are two ways of specifying the CSS classes:</p>
     * <ol>
     *   <li>Providing cssStyles as an Object: Use the CSS class name as property name.
     *   Specify the text that should appear in the style selector as property value
     *   (String).</li>
     *   <li>Providing cssStyle as an Object[]: Each element has to provide "className" (the
     *   CSS class name) and "text" (the text that appears in the style selector)
     *   properties.</li>
     * </ol>
     * <p>Formatting is done by adding "span" elements with corresponding "class"
     * attributes appropriately.</p>
     * <p>Note that the {@link CUI.rte.plugins.StylesPlugin "styles" plugin} must be
     * activated (or the deprecated {@link #enableStyle} property must be set to true) for
     * this configuration to take effect.</p>
     * @deprecated Use the corresponding plugin configuration instead
     */

    /**
     * @cfg {Object} linkbrowseConfig
     * <p>Configuration of the linkbrowse dialog. You may use the following properties:</p>
     * <ul>
     *   <li><code>protocols</code> : String[]<br>
     *     A list of available prototcols; use the entire protocol prefix (e.g. "http://",
     *     "ftp://")</li>
     *   <li><code>defaultProtocol</code> : String<br>
     *     The default protocol value; must be one of the values specified by "protocols"
     *     </li>
     *   <li><code>targetConfig</code> : Object<br>
     *     Defines how to handle the "target" attribute of the link being edited.
     *     Properties:
     *     <ul>
     *       <li><code>mode</code> : String<br>
     *         Specifies the target mode; valid values are: "auto" - means that an automatic
     *         target is chosen (specified by the "targetExternal" property for external
     *         links and "targetInternal" for internal links). "manual" - means that the
     *         user can specify a target through an input field, "none" if no target
     *         attribute may be provided.</li>
     *       <li><code>targetInternal</code> : String<br>
     *         The target for internal links (only if mode == "auto")</li>
     *       <li><code>targetExternal</code> : String<br>
     *         The target for external links (only if mode == "auto")</li>
     *     </ul>
     *   </li>
     *   <li>cssInternal (String) - CSS class to be used for internal links</li>
     *   <li>cssExternal (String) - CSS class to be used for external links</li>
     *   <li>linkAttributes (Object[]) - Array with definitions of additional link
     *     attributes that are available for editing through the link dialog. The objects of
     *     the array should have the following properties:
     *     <ul>
     *       <li><code>attribute</code> : String<br>
     *         The attribute to edit</li>
     *       <li><code>xtype</code> : String<br>
     *         The xtype of the component used for editing (currently, you should only use
     *         "textfield")</li>
     *       <li><code>fieldLabel</code> : String<br>
     *         The label to be used for the component</li>
     *     </ul>
     *   </li>
     * </ul>
     * <p>Note that the link feature must be enabled through the
     * {@link CUI.rte.LinkPlugin "links" plugin} for this configuration to take effect.
     * Defaults to:</p>
<pre>
{
    "protocols": [
        "http://",
        "ftp://",
        "mailto:"
    ],
    "targetConfig": {
        "mode": "manual"
    },
    "cssExternal": null,
    "cssInternal": null
}
</pre>
     * @deprecated Use the corresponding plugin configuration instead.
     */

    /**
     * @cfg {Object} anchordialogConfig
     * Configuration of the anchor dialog (defaults to null). You may specify the same
     * config options as for {@link CQ.Dialog}. Note that the default value
     * of null implies using a default dialog. Also note that the anchor feature must have
     * been enabled through the {@link CUI.rte.plugins.LinkPlugin "links" plugin} for
     * this configuration to take effect.
     * @deprecated Use the corresponding plugin configuration instead
     */

    /**
     * @cfg {String} defaultPasteMode
     * <p>Default mode when pasting is executed using the Ctrl + V key or the main paste
     * button (defaults to "wordhtml").</p>
     * <p>Valid values are:</p>
     * <ul>
     *   <li>"browser" - use browser's paste implementation (should usually not be used, as
     *     this may introduce unwanted markup or markup that could cause the RichText
     *     component to crash);</li>
     *   <li>"plaintext" - for plain text inserts;</li>
     *   <li>"wordhtml" - for Word-compatible HTML pasting (this should suffice for most
     *     use cases, as it will keep most of the formatting, but removes unsuitable
     *     tags and attributes.</li>
     * </ul>
     * @deprecated Use the corresponding plugin setting instead
     */

    /**
     * @cfg {Boolean} stripHtmlTags
     * <p>True if HTML tags should be stripped off before inserting it on paste (defaults to
     * true).</p>
     * <p>The use-case for this option is a bit hard to explain: The system clipboard works
     * MIME type-based. If you select text from a web page directly, the clipboard will
     * usually contain a text/plain and a text/html variant of the selected text. The plain
     * text variant will contain no HTML tags at all, the text/html variant will contain
     * HTML as we would expect it. On the other hand, if you copy HTML code from any
     * source view, you will get at least get a text/plain variant, containing all tags.
     * In some cases (for example if you are using Firefox' "View source"), you will get
     * an additional text/html variant, that will contain the HTML-tags in an entitiy
     * encoded way (&amp;lt;b&amp;gt;bold text&amp;lt;/b&amp;gt;). On paste, the browser
     * will paste the text/html variant if available, the text/plain variant otherwise.
     * Given the second use-case, the HTML tags will appear in the pasted content, as
     * they get either entity encoded by the browser (text/plain) or are already
     * entity-encoded (text/html) on paste. This is where this option kicks in: By setting
     * it to true, the HTML tags from such a source code paste get removed before the
     * pasted content is inserted in the text being edited.</p>
     * <p>Note that this optiion will only work if {@link #defaultPasteMode} is set to
     * "plaintext".</p>
     * @deprecated Use the corresponding plugin configuration instead
     */

    /**
     * @cfg {Boolean} trimLinkSelection
     * True if leading and trailing whitespace should removed from the selection (not from
     * the actual text/content!) before creating a new link (defaults to true). Note that
     * the link feature must be enabled through the "links" plugin for this configuration to
     * take effect.
     * @deprecated Use corresponding plugin configuration instead
     */

    /**
     * @cfg {Number} tabSize
     * Number of &amp;nbsp;-s to be inserted if the tab key is hit (defaults to 4). Note
     * that the tab key works as a navigation aid when used inside a table, so this option
     * will only take effect outside a table.
     * @deprecated Use corresponding plugin configuration instead
     */

    /**
     * @cfg {Number} indentSize
     * The size of an indent level in pixels (defaults to 40). Note that this setting
     * only takes effect if the "indent"/"outdent" features of the "lists" plugin are
     * enabled and if the indent is applied outside a list.
     * @deprecated Use the corresponding plugin config instead
     */

    /**
     * @cfg {Object/Object[]} formats
     * <p>Defines the block formats (p, h1, h2, h3, ...) that are applicable to paragraphs.
     * </p>
     * <p>You can choose a deliberate (but unique) property name for each format, if you
     * chosoe to provide an Object rather than a Object[]. Each element (of the Array) or
     * property value (if choosing the Object representation) must have the following
     * properties:</p>
     * <ul>
     *   <li><code>tag</code> : String<br>
     *     The name of the tag that represents the block format (for example: "p", "h1",
     *     "h2", ...)</li>
     *   <li><code>description</code> : String<br>
     *     The text that represents the paragraph format in the format selector</li>
     * </uL>
     * <p>Note that this configuration only takes effect if the
     * {@link CUI.rte.plugins.ParagraphFormatPlugin "paraformat" plugin} is enabled.
     * Also note that you can't set additional DOM attributes using the "paraformat"
     * plugin.</p>
     * <p>Defaults to:</p>
<pre>
{
    "paragraph": {
        "tag": "p",
        "description": CQ.I18n.getMessage("Paragraph")
    },
    "heading1": {
        "tag": "h1",
        "description": CQ.I18n.getMessage("Heading 1")
    },
    "heading2": {
        "tag": "h2",
        "description": CQ.I18n.getMessage("Heading 2")
    },
    "heading3": {
        "tag": "h3",
        "description": CQ.I18n.getMessage("Heading 3")
    }
}
</pre>
     * @deprecated Use the corresponding plugin configuration instead
     */

    /**
     * @cfg {Object} tagReplace
     * <p>A table with definitions of tags that must be replaced by another tag to ensure
     * correct editing. Each property name defines the tag name to replace, the
     * corresponding value defines the tag name of the replacement.</p>
     * <p>This is necessary because each browser creates markup "at will". For
     * example, hitting the "bold" button may result in surrounding the selected text
     * with a "strong" tag or a "b" tag, depending on the browser you are using. Worse,
     * browser A may create markup that is not editable by browser B. Hence this table
     * provides means to ensure that markup is reduced to a subset that is suitable for
     * all supported browsers.</p>
     * <p>Note that this option currently cannot handle attributes.</p>
     * <p>Defaults to { "strong": "b", "em": "i" } (CQ 5.2) resp. null (CQ 5.3).</p>
     * @deprecated Use {@link #htmlRules}.docType instead
     */

});

// register RichText component as xtype
CQ.Ext.reg("richtext", CQ.form.RichText);