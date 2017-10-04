CQ.Ext.form.PhotoListField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {

	photoListDialog : null,
    "triggerClass" : "x-form-search-trigger",
    "separator" : "#@",
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.PhotoListField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.PhotoListField.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.PhotoListField.superclass.onDestroy.call(this);
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

          var imageName = fieldName+"_image";
          var captionName = fieldName+"_caption";
          var altName = fieldName+"_alt";

          var imageValue;
          var captionValue;
          var altValue;

          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);

          if(elem[0] != null){
        	  imageValue = elem[0];
          }
          if(elem[1] != null){
        	  captionValue = elem[1];
          }
          if(elem[2] != null){
        	  altValue = elem[2];
          }

          // lazy creation of browse dialog
          if (this.photolistDialog == null) {
              function okHandler() {
            	  imageValue = this.getField(imageName).getValue();
            	  captionValue = this.getField(captionName).getValue();
            	  altValue = this.getField(altName).getValue();

                if(imageValue == "") {
                    CQ.Ext.Msg.alert('Validation Failed', 'Required fields is empty');
                    return false;
                }

                this.photolistfield.setValue(imageValue + this.photolistfield.separator
                        							+ captionValue + this.photolistfield.separator + altValue);
                this.hide();
              }

              var photolistDialogCfg = {
                      "ok" : okHandler,
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "photolistfield" : this,
                      "items": {
                          "xtype": "panel",
                          "items": [
                           {
                                "fieldLabel":"Image Path",
                                "name":imageName,
                                "value":imageValue,
                                "allowBlank":false,
                                "rootPath":"/content/dam",
                                "xtype": "pathfield"
                            }, {
                                "fieldLabel":"Caption",
                                "xtype": "textfield",
                                "name":captionName,
                                "value":captionValue
                          }, {
                              "fieldLabel":"Alt Text",
                              "xtype": "textfield",
                              "fieldDescription" : "This is the alt text of the image",
                              "name":altName,
                              "value":altValue
                        }]
                      }
                  };
              photolistDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.photolistDialog = new CQ.Dialog(photolistDialogCfg);
        } else {
            //TODO put value       
        }
        this.photolistDialog.show();
    }
});
CQ.Ext.reg('photolistfield', CQ.Ext.form.PhotoListField);