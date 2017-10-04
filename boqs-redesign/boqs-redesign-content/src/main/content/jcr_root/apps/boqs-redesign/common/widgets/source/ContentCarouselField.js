CQ.Ext.form.ContentCarouselField = CQ.Ext.extend(CQ.Ext.form.TriggerField,  {
   
    contentCarouselDialog : null,
    
    "triggerClass" : "x-form-search-trigger",
    
    "separator" : "#@",
    
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.ContentCarouselField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.ContentCarouselField.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.ContentCarouselField.superclass.onDestroy.call(this);
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
          var linkName = fieldName+"_link";
          
          var imageValue;
          var linkValue;
          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);
          
          if(elem[0] != null){
        	  imageValue = elem[0];
          }
          if(elem[1] != null){
        	  linkValue = elem[1];
          }
          
          // lazy creation of browse dialog
          if (this.contentCarouselDialog == null) {
              function okHandler() {
              	imageValue = this.getField(imageName).getValue();
              	linkValue = this.getField(linkName).getValue();
                  
                this.contentcarouselfield.setValue(imageValue + this.contentcarouselfield.separator
                									+linkValue + this.contentcarouselfield.separator);
              	//this.linkfield.setValue(imageValue+this.linkfield.separator);
                this.hide();
              }
              
              var contentCarouselDialogCfg = {
                      "ok" : okHandler,                    
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "contentcarouselfield" : this,
                      "items": {
                          "xtype": "panel",                        
                          "items": [
                         {
                              "xtype": "pathfield",
                              "fieldLabel":"Image: ",
                              "name":imageName,
                              "value":imageValue,
                              "rootPath":"/content/dam"
                          }, {
                              "fieldLabel":"Link: ",
                              "xtype": "customlinkfield",
                              "name":linkName,
                              "value":linkValue
                          }]
                      }
                  };
              contentCarouselDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.contentCarouselDialog = new CQ.Dialog(contentCarouselDialogCfg);
        } else {
            //TODO put value       
        }
                               
        this.contentCarouselDialog.show();                             
    }
    
});
CQ.Ext.reg('contentcarouselfield', CQ.Ext.form.ContentCarouselField);