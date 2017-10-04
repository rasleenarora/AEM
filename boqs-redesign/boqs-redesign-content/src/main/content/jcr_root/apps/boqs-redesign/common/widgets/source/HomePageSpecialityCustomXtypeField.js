CQ.Ext.form.HomePageSpecialityCustomXtypeField = CQ.Ext.extend(CQ.Ext.form.TriggerField,  {
   
    homepageCustomXtypeDialog : null,
    
    "triggerClass" : "x-form-search-trigger",
    
    "separator" : "#@",
    
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.HomePageSpecialityCustomXtypeField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.HomePageSpecialityCustomXtypeField.superclass.initComponent.call(this);
    },

    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.HomePageSpecialityCustomXtypeField.superclass.onDestroy.call(this);
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
          if (this.homepageCustomXtypeDialog == null) {
              function okHandler() {
                  headingValue = this.getField(headingName).getValue();
                  linkValue = this.getField(linkName).getValue();
                  
                if(headingValue == "" || linkValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.homepagespecialitycustomxtypefield.setValue(headingValue + 
                     this.homepagespecialitycustomxtypefield.separator + linkValue);
                this.hide();
              }
              
              var homepageCustomXtypeDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "homepagespecialitycustomxtypefield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                            {
                                "fieldLabel":"Button Label: ",
                                "name":headingName,
                                "value":headingValue,
                                "allowBlank":false,
                                "xtype":"textfield"
                            }, {
                                "fieldLabel":"Button Target URL: ",
                                "xtype": "pathfield",
                                "allowBlank":false,
                                "name":linkName,
                                "value":linkValue
                          }]
                      }
                  };
              homepageCustomXtypeDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.homepageCustomXtypeDialog = new CQ.Dialog(homepageCustomXtypeDialogCfg);
        } else {
            //TODO put value
        }
        this.homepageCustomXtypeDialog.show();
    }
    
});
CQ.Ext.reg('homepagespecialitycustomxtypefield', CQ.Ext.form.HomePageSpecialityCustomXtypeField);