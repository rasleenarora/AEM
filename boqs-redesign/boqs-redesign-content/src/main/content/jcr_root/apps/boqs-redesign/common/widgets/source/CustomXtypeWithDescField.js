CQ.Ext.form.CustomXtypeWithDescField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {

    customXtypeWithDescDialog : null,

    "triggerClass" : "x-form-search-trigger",
    "separator" : "#@",
    "readOnly" : false,
    
    updateEditState: function(){
        this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.CustomXtypeWithDescField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.CustomXtypeWithDescField.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        if (this.customXtypeWithDescDialog) {
            this.customXtypeWithDescDialog.destroy();
        }
        CQ.Ext.form.CustomXtypeWithDescField.superclass.onDestroy.call(this);
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

          var linkName = fieldName+"_link";
          var descriptionName = fieldName+"_description";
          var targetName = fieldName+"_target";
          var iconName = fieldName+"_icon";

          var linkValue;
          var descriptionValue;
          var targetValue;
          var iconValue;

          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);

          if(elem[0] != null){
              linkValue = elem[0];
          }
          if(elem[1] != null){
              descriptionValue = elem[1];
          }
          if(elem[2] != null){
              targetValue = elem[2];
          }
          if(elem[3] != null){
              iconValue = elem[3];
          }

          // lazy creation of browse dialog
          if (this.customXtypeWithDescDialog == null) {
              function okHandler() {
                  linkValue = this.getField(linkName).getValue();
                  descriptionValue = this.getField(descriptionName).getValue();
                  targetValue = this.getField(targetName).getValue();
                  iconValue = this.getField(iconName).getValue();
                  
                if(linkValue == "" || targetValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.customxtypewithdescfield.setValue(linkValue + this.customxtypewithdescfield.separator
                                                + descriptionValue + this.customxtypewithdescfield.separator
                                                + targetValue + this.customxtypewithdescfield.separator
                                                + iconValue);
                this.hide();
              }

              var customXtypeWithDescDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "customxtypewithdescfield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                             {
                                "xtype" : "textfield",
                                "fieldLabel" : "Link Text",
                                "name" : linkName,
                                "value" : linkValue,
                                "allowBlank" : false
                             },{
                                "fieldLabel" : "Target URL",
                                "xtype" : "pathfield",
                                "allowBlank" : false,
                                "name" : targetName,
                                "value" : targetValue
                             },{
                                "xtype" : "pathfield",
                                "fieldLabel" : "Icon Path",
                                "name" : iconName,
                                "value" : iconValue,
                                "rootPath" : "/content/dam"
                             }, {
                                "fieldLabel" : "Type Descriptor",
                                "name" : descriptionName,
                                "value" : descriptionValue,
                                "xtype" : "textfield"
                             } ]
                      }
                  };
              customXtypeWithDescDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.customXtypeWithDescDialog = new CQ.Dialog(customXtypeWithDescDialogCfg);
        } else {
            //TODO put value       
        }

        this.customXtypeWithDescDialog.show();
    }
});
CQ.Ext.reg('customxtypewithdescfield', CQ.Ext.form.CustomXtypeWithDescField);