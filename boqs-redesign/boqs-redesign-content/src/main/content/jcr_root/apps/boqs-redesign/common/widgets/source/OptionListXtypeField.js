CQ.Ext.form.OptionListXtypeField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {
   
    optionListXtypeDialog : null,
    
    "triggerClass" : "x-form-search-trigger",
    
    "separator" : "#@",
    
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.OptionListXtypeField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.OptionListXtypeField.superclass.initComponent.call(this);
    },

    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.OptionListXtypeField.superclass.onDestroy.call(this);
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
          
          var itemName = fieldName+"_item";
          var elementName = fieldName+"_element";
          
          var itemValue;
          var elementValue;
          
          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);
          
          if(elem[0] != null){
        	  itemValue = elem[0];
          }
          if(elem[1] != null){
        	  elementValue = elem[1];
          }

          // lazy creation of browse dialog
          if (this.optionListXtypeDialog == null) {
              function okHandler() {
            	  itemValue = this.getField(itemName).getValue();
            	  elementValue = this.getField(elementName).getValue();
                  
                if(itemValue == "" || elementValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.optionlistxtypefield.setValue(itemValue + 
                     this.optionlistxtypefield.separator + elementValue);
                this.hide();
              }
              
              var optionListXtypeDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "optionlistxtypefield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                            {
                                "fieldLabel":"Label of Item",
                                "name":itemName,
                                "value":itemValue,
                                "allowBlank":false,
                                "xtype":"textfield"
                            }, {
                                "fieldLabel":"Value of Item",
                                "xtype": "textfield",
                                "allowBlank":false,
                                "name":elementName,
                                "value":elementValue
                          }]
                      }
                  };
              optionListXtypeDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.optionListXtypeDialog = new CQ.Dialog(optionListXtypeDialogCfg);
        } else {
            //TODO put value
        }
        this.optionListXtypeDialog.show();
    }
    
});
CQ.Ext.reg('optionlistxtypefield', CQ.Ext.form.OptionListXtypeField);