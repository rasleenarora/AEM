  /**
   * @class CQ.form.rte.plugins.HtmlColorPickerPlugin
   * @extends CQ.form.rte.plugins.Plugin
   * <p>This class builds a Colorpicker pop up as a plugin.</p>
   * <p>The plugin ID is "<b>Colorpicker</b>".</p>
   * <p><b>Features</b></p>
   * <ul>
   *   <li><b>colorpicker</b> - pops up Colorpicker dialog</li>
   * </ul>
   */
  CQ.form.rte.plugins.HtmlColorPickerPlugin = CQ.Ext.extend(CQ.form.rte.plugins.Plugin, {

   /**
    * @private
    */
   htmlColorPickerDialog: null,
   /**
    * @private
    */
   colorPickerText: null,
     /**
    * @private
    */
   envEditContext:null,
   
   constructor: function(editorKernel) {
    CQ.form.rte.plugins.HtmlColorPickerPlugin.superclass.constructor.call(this,
      editorKernel);
   },
   callDialog: function(context) {
    
    if (CQ.Ext.isIE) {
     this.savedRange = context.doc.selection.createRange();
    }
    var editorKernel = this.editorKernel;
    
     var configdialog = {
      "editContext": context,
      "title": CQ.I18n.getMessage("Color Picker"),
      "colorPickerText": this.colorPickerText,
      "insertContentIntoRTE": this.insertContentIntoRTE.createDelegate(this),
      "cancelFn": this.execCancel.createDelegate(this),
      "listeners": {
       "show": function() {
        editorKernel.fireUIEvent("dialogshow");
       },
       "hide": function() {
        editorKernel.fireUIEvent("dialoghide");
       }
      }
     };
     this.htmlColorPickerDialog =
                                        new CQ.form.rte.plugins.HtmlColorPickerDialog(configdialog);
     this.htmlColorPickerDialog.setPosition(
                                                   this.editorKernel.calculateWindowPosition("left"));

    this.htmlColorPickerDialog.show();
    window.setTimeout(function() {
     this.htmlColorPickerDialog.toFront();
     this.htmlColorPickerDialog.focus();
    }.createDelegate(this), 10);
   },
   
   getYourData: function(){
    
   // You might want to do something here and populate a value that needs to go inside your dialog.
    this.colorPickerText = "Color Picker RTE Plugin";
    this.callDialog(this.envEditContext);
   },
   
   // This gets called when you click OK button from your dialog
   insertContentIntoRTE: function(context, options, dialog) {
     var selectionDef = this.editorKernel.analyzeSelection();
     var nodelist = selectionDef["nodeList"];
     var node = nodelist["nodes"][0];
     var nodeDom = node["dom"];
     var nodeText = nodeDom["nodeValue"];
     var selectedText=nodeText.substring(node["startPos"], node["startPos"] +
                                                            node["charCnt"]);
     var color;
     for(var opt in options){
     if(opt!=undefined && opt!="" && opt!='remove' && opt!='indexOf'){
                                              //for IE alone indexOf comes as a function
      color = options[opt].value;
     }
    }
    var style="style=color:#"+color;
    var htmlCode = '<span '+style+'>' + selectedText + '</span>';
    
    this.editorKernel.execCmd("inserthtml", htmlCode);
    dialog.hide();
   },
   
   // This gets called when you click Cancel button from your dialog
   execCancel: function() {
    
   },

   getFeatures: function() {
    return [ "colorpicker" ];
   },

   initializeUI: function(tbGenerator) {
    var plg = CQ.form.rte.plugins;
    var ui = CQ.form.rte.ui;
    if (this.isFeatureEnabled("colorpicker")) {
     this.checkTextUI = new ui.TbElement("colorpicker", this,
                                                                                       true,this.getTooltip("colorpicker"));
     tbGenerator.addElement("htmlColorPicker", plg.Plugin.SORT_LISTS,
                                                                               this.checkTextUI,10);
    }
    
   },

   notifyPluginConfig: function(pluginConfig) {
    pluginConfig = pluginConfig || { };
    CQ.Util.applyDefaults(pluginConfig, {
     "tooltips": {
      "colorpicker": {
       "title": CQ.I18n.getMessage("Color Picker"),
       "text":  CQ.I18n.getMessage("Color Picker pop-up")
      }
     }
    });
    this.config = pluginConfig;
   },

   execute: function(id, value, env) {
    switch (id) {
     case "colorpicker":
      this.envEditContext = env.editContext;
      this.getYourData();               
      break;
    }

   },

   updateState: function(selDef) {
    
    // todo implement
   }

  });


  // register plugin
  CQ.form.rte.plugins.PluginRegistry.register("htmlColorPicker",
    CQ.form.rte.plugins.HtmlColorPickerPlugin);