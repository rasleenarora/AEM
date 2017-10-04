CQ.Ext.form.CustomXtypeWithIconField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {

    customXtypeWithIconDialog : null,
    "triggerClass" : "x-form-search-trigger",
    "separator" : "#@",
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.CustomXtypeWithIconField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.CustomXtypeWithIconField.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.CustomXtypeWithIconField.superclass.onDestroy.call(this);
    },

    /**
     * @method onTriggerClick
     * @hide
     */
    // private
    // Implements the default empty TriggerField.onTriggerClick function to display the DatePicker
    onTriggerClick : function(){
       
          var parentDialog = this.findParentByType("dialog");
          fieldName = this.getName();

          var iconName = fieldName+"_icon";
          var menuItemName = fieldName+"_menuItem";
          var targetName = fieldName+"_target";

          var iconValue;
          var menuItemValue;
          var targetValue;

          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);

          if(elem[0] != null){
              iconValue = elem[0];
          }
          if(elem[1] != null){
              menuItemValue = elem[1];
          }
          if(elem[2] != null){
              targetValue = elem[2];
          }

          // lazy creation of browse dialog
          if (this.customXtypeWithIconDialog == null) {
              function okHandler() {
                iconValue = this.getField(iconName).getValue();
                menuItemValue = this.getField(menuItemName).getValue();
                targetValue = this.getField(targetName).getValue();

                if(iconValue == "" || menuItemValue == "" || targetValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.customxtypewithiconfield.setValue(iconValue + this.customxtypewithiconfield.separator
                        + menuItemValue + this.customxtypewithiconfield.separator
                            + targetValue);
                this.hide();
              }

              var customXtypeWithIconDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "customxtypewithiconfield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                            {
                                "xtype":"pathfield",
                                "fieldLabel":"Icon: ",
                                "name":iconName,
                                "value":iconValue,
                                "allowBlank":false,
                                "rootPath":"/content/dam"
                            },{
                                "fieldLabel":"Menu Item Label: ",
                                "name":menuItemName,
                                "value":menuItemValue,
                                "allowBlank":false,
                                "xtype":"textfield"
                            }, {
                                "fieldLabel":"Menu Item’s Target URL: ",
                                "xtype": "pathfield",
                                "allowBlank":false,
                                "name":targetName,
                                "value":targetValue
                          }]
                      }
                  };
              customXtypeWithIconDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.customXtypeWithIconDialog = new CQ.Dialog(customXtypeWithIconDialogCfg);
        } else {
            //TODO put value       
        }
        this.customXtypeWithIconDialog.show();
    }
});
CQ.Ext.reg('customxtypewithiconfield', CQ.Ext.form.CustomXtypeWithIconField);