CQ.Ext.form.FooterCustomXtypeField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {
   
    footerCustomXtypeDialog : null,
    
    "triggerClass" : "x-form-search-trigger",
    
    "separator" : "#@",
    
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.FooterCustomXtypeField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.FooterCustomXtypeField.superclass.initComponent.call(this);
    },

    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.FooterCustomXtypeField.superclass.onDestroy.call(this);
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
          
          var headingName = fieldName+"_heading";
          var linkName = fieldName+"_link";
          
          var headingValue;
          var linkValue;
          
          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);
          
          if(elem[0] != null){
              headingValue = elem[0];
          }
          if(elem[1] != null){
              linkValue = elem[1];
          }

          // lazy creation of browse dialog
          if (this.footerCustomXtypeDialog == null) {
              function okHandler() {
                  headingValue = this.getField(headingName).getValue();
                  linkValue = this.getField(linkName).getValue();
                  
                if(headingValue == "" || linkValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.footercustomxtypefield.setValue(headingValue + 
                     this.footercustomxtypefield.separator + linkValue);
                this.hide();
              }
              
              var footerCustomXtypeDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "footercustomxtypefield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                            {
                                "fieldLabel":"Heading: ",
                                "name":headingName,
                                "value":headingValue,
                                "allowBlank":false,
                                "xtype":"textfield"
                            }, {
                                "fieldLabel":"Target URL: ",
                                "xtype": "pathfield",
                                "allowBlank":false,
                                "name":linkName,
                                "value":linkValue
                          }]
                      }
                  };
              footerCustomXtypeDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.footerCustomXtypeDialog = new CQ.Dialog(footerCustomXtypeDialogCfg);
        } else {
            //TODO put value
        }
        this.footerCustomXtypeDialog.show();
    }
    
});
CQ.Ext.reg('footercustomxtypefield', CQ.Ext.form.FooterCustomXtypeField);