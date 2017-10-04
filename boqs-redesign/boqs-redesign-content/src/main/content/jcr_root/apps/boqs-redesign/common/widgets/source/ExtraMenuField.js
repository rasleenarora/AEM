CQ.Ext.form.ExtraMenuField= CQ.Ext.extend(CQ.Ext.form.TriggerField,  {
   
    extraMenuDialog : null,
    
    "triggerClass" : "x-form-search-trigger",
    
    "separator" : "#@",
    
    "readOnly" : false,
    
    updateEditState: function(){
    	this.el.dom.readOnly = true;
    },
    constructor: function(config) {
        this.editorKernel = new CQ.form.rte.IFrameKernel(config);
        CQ.Ext.form.ExtraMenuField.superclass.constructor.call(this, config);
        if (!config.maxLengthLabel) {
            maxLengthLabel = config.maxLengthLabel;
        }
        this.clearInvalid();
    },
    initComponent : function(){
        CQ.Ext.form.ExtraMenuField.superclass.initComponent.call(this);
    },
     
    // private
    onDestroy : function(){
        if (this.linkDialog) {
            this.linkDialog.destroy();
        }
        CQ.Ext.form.ExtraMenuField.superclass.onDestroy.call(this);
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
          var buttonName = fieldName+"_button";
          var targetName = fieldName+"_target";
          
          var iconValue;
          var buttonValue;
          var targetValue;
          
          var fieldValues = this.getValue();
          var elem = fieldValues.split(this.separator);
          
          if(elem[0] != null){
        	  iconValue = elem[0];
          }
          if(elem[1] != null){
        	  buttonValue = elem[1];
          }
          if(elem[2] != null){
        	  targetValue = elem[2];
          }
          
          // lazy creation of browse dialog
          if (this.extraMenuDialog == null) {
              function okHandler() {
            	  iconValue = this.getField(iconName).getValue();
            	  buttonValue = this.getField(buttonName).getValue();
            	  targetValue = this.getField(targetName).getValue();
                  
                this.extramenufield.setValue(iconValue + this.extramenufield.separator
												+ buttonValue + this.extramenufield.separator
                								+ targetValue);
                this.hide();
              }
              
              var extraMenuDialogCfg = {
                      "ok" : okHandler,                    
                      "id": CQ.Util.createId("cq-linkdialog"),
                      "title":this.fieldLabel + " detail",
                      "height": 220,
                      "width" : 450,
                      "xtype" : "dialog",
                      "extramenufield" : this,
                      "items": {
                          "xtype": "panel",                        
                          "items": [
							{
								"xtype": "pathfield",
								"fieldLabel":"Icon: ",
								"name":iconName,
								"value":iconValue,
								"rootPath":"/content/dam"
							},{
								"fieldLabel":"Button label: ",
							    "name":buttonName,
							    "value":buttonValue,
							    "xtype":"textfield"
							}, {
								"fieldLabel":"Link: ",
								"xtype": "customlinkfield",
								"name":targetName,
								"value":targetValue
                          }]
                      }
                  };
              extraMenuDialogCfg.buttons = CQ.Dialog.OKCANCEL;
              this.extraMenuDialog = new CQ.Dialog(extraMenuDialogCfg);
        } else {
            //TODO put value       
        }
                               
        this.extraMenuDialog.show();                             
    }
    
});
CQ.Ext.reg('extramenufield', CQ.Ext.form.ExtraMenuField);