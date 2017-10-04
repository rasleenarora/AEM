
    /**
   * @class CQ.form.rte.plugins.HtmlColorPickerDialog
   * @extends CQ.Ext.Window
   * @private
   * This class implements the Hello World dialog.
   */
  CQ.form.rte.plugins.HtmlColorPickerDialog = CQ.Ext.extend(CQ.Ext.Window, {
   editContext: null,
   insertContentIntoRTE: null,
   constructor: function(config) {
    var dialogRef = this;
    var dialogItems = [ ];
    var buttonItems = [ ];
    var defaults = {
     "title": "Html Color Picker"
    };
    CQ.Util.applyDefaults(config, defaults);
    CQ.Ext.apply(this, config);
    dialogItems.push({
     "itemId": "colorPickerField",
     "name": "colorPickerField",
     "xtype": "colorfield",           
     "fieldLabel": "Select corlor:",
     "colors":['000000', '993300', '333300', '003300', '003366', '000080', '333399',
            '333333','800000', 'FF6600', '808000', '008000', '008080', '0000FF',
           '666699', '808080','FF0000', 'FF9900', '99CC00', '339966', '33CCCC',
           '3366FF', '800080', '969696','FF00FF', 'FFCC00', 'FFFF00', '00FF00',
           '00FFFF', '00CCFF', '993366', 'C0C0C0','FF99CC', 'FFCC99',
            'FFFF99', 'CCFFCC', 'CCFFFF', '99CCFF', 'CC99FF', 'FFFFFF' ]
      });
    // Buttons
    buttonItems.push({
     "itemId": "ok",
     "name": "ok",
     "text": "OK",
     "handler": function() {
      this.applyDialog(this.insertContentIntoRTE, null);
     },
     "scope": this
    });
    buttonItems.push({
     "text": "Cancel",
     "handler": function() {
      if (this.cancelFn) {
       this.cancelFn();
      }
      this.hide();
     },
     "scope": this
    });
    CQ.form.rte.plugins.HtmlColorPickerDialog.superclass.constructor.call(this, {
     "renderTo": CQ.Util.ROOT_ID,
     "title": this.title,
     "stateful": false,
     "minWidth": 400,
     "minHeight": 170,
     "width": 400,
     "height": 310,
     "plain": true,
     "layout": "fit",
     "items": [ {
       "xtype": "panel",
       "layout": "fit",
       "stateful": false,
       "items": [ {
         "border": false,
         "xtype": "form",
         "itemId": "ColorPickerForm",
         "name": "ColorPickerForm",
         "stateful": false,
         "autoHeight": true,
         "items": dialogItems,
         "bodyStyle": "overflow: auto;",
         "afterRender": function() {
          CQ.Ext.Panel.prototype.afterRender.call(this);
          dialogRef.findItems = this.items;
          this.body.addClass("cq-rte-helloworlddialog");
         }
        }
       ]
      }
     ],
     "buttons": buttonItems,
     "modal": true
    });
   },
   applyDialog: function(fn, options) {
    options = options || [];
    if (fn) {
     var colorPickerTextValue = this.findItems.get("colorPickerField").getValue();
     options.push({value: colorPickerTextValue, name: 'colorPickerTextValue'});
     fn(this.editContext, options, this);
    }
   },
   cancelFn: function(){
   
    //Implement here
   }
  });