CQ.Ext.form.MultiOptionsField = CQ.Ext.extend(CQ.Ext.form.TriggerField, {

	linkDialog : null,

	"triggerClass" : "x-form-search-trigger",

	"separator" : "#@",

	"readOnly" : false,
	
	constructor : function(config) {

		this.editorKernel = new CQ.form.rte.IFrameKernel(config);
		CQ.Ext.form.MultiOptionsField.superclass.constructor.call(this, config);
	},
	
	initComponent : function() {
		CQ.Ext.form.MultiOptionsField.superclass.initComponent.call(this);
	},

	// private
	onDestroy : function() {
		// CQ.Ext.destroy(this.menu, this.keyNav);
		if (this.linkDialog) {
			this.linkDialog.destroy();
		}
		CQ.Ext.form.MultiOptionsField.superclass.onDestroy.call(this);
	},

	/**
	 * @method onTriggerClick
	 * @hide
	 */
	// private
	// Implements the default empty TriggerField.onTriggerClick
	// function to display the Meta Link Dialog
	onTriggerClick : function() {
		
		fieldName = this.getName();
		
		var option = fieldName + "_option";
		

		var fieldValues = this.getValue();
		var elem = fieldValues.split(this.separator);

		var optionValue = elem[0];
		

		// lazy creation of browse dialog
		if (this.linkDialog == null) {
			function okHandler() {
				prefix = this.linkfield.getName();
				
				var option = prefix + "_option";
				
				optionValue = this.getField(option).getValue();
				
				this.linkfield.setValue(optionValue);
				
				this.hide();
			}

			var linkDialogCfg = {

				"ok" : okHandler,
				"id" : CQ.Util.createId("cq-linkdialog"),
				"title" : "Multi Options",
				"xtype" : "dialog",
				"linkfield" : this,

				"items" : {
					"xtype" : "panel",
					"items" : [
							{
								"xtype" : "textfield",
								"fieldDescription" : "Email",
								"fieldLabel" : "Email",
								"name" : email,
								"value" : emailValue
							}
					]
				}
			};

			linkDialogCfg.buttons = CQ.Dialog.OKCANCEL;
			this.linkDialog = new CQ.Dialog(linkDialogCfg);

		} else {
			// TODO put value
		}

		this.linkDialog.show();
	}

});
CQ.Ext.reg('multioptionsfield', CQ.Ext.form.MultiOptionsField);