CQ.Ext.form.AdditionalButtonField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {

	additionalButtonDialog : null,
    "triggerClass" : "x-form-search-trigger",
    "separator" : "#@",
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.AdditionalButtonField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.AdditionalButtonField.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.AdditionalButtonField.superclass.onDestroy.call(this);
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

          var buttonName = fieldName+"_button";
          var targetName = fieldName+"_target";

          var buttonValue;
          var targetValue;

          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);

          if(elem[0] != null){
        	  buttonValue = elem[0];
          }
          if(elem[1] != null){
              targetValue = elem[1];
          }

          // lazy creation of browse dialog
          if (this.additionalButtonDialog == null) {
              function okHandler() {
            	  buttonValue = this.getField(buttonName).getValue();
            	  targetValue = this.getField(targetName).getValue();

                if(buttonValue == "" || targetValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.additionalbuttonfield.setValue(buttonValue + this.additionalbuttonfield.separator
                        							+ targetValue);
                this.hide();
              }

              var additionalButtonDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "additionalbuttonfield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                           {
                                "fieldLabel":"Button Text",
                                "name":buttonName,
                                "value":buttonValue,
                                "allowBlank":false,
                                "xtype":"textfield"
                            }, {
                                "fieldLabel":"Target URL",
                                "xtype": "pathfield",
                                "allowBlank":false,
                                "name":targetName,
                                "value":targetValue
                          }]
                      }
                  };
              additionalButtonDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.additionalButtonDialog = new CQ.Dialog(additionalButtonDialogCfg);
        } else {
            //TODO put value       
        }
        this.additionalButtonDialog.show();
    }
});
CQ.Ext.reg('additionalbuttonfield', CQ.Ext.form.AdditionalButtonField);