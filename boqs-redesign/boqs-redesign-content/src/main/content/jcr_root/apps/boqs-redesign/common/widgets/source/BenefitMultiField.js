/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @class CQ.form.MultiField
 * @extends CQ.form.CompositeField
 * The MultiField is an editable list of form fields for editing
 * multi-value properties.
 * @constructor
 * Creates a new MultiField.
 * @param {Object} config The config object
 */
CQ.form.BenefitMultiField = CQ.Ext.extend(CQ.form.CompositeField, {

    /**
     * @cfg {String} addItemLabel
     * The label to display for the addItem control.  Defaults to "Add Item".
     * @since 5.5
     */

    /**
     * @cfg {Boolean} orderable
     * If the list of fields should be orderable and Up/Down buttons
     * are rendered (defaults to true).
     */

    /**
     * @cfg {CQ.Ext.form.Field/CQ.form.CompositeField} fieldConfig
     * The configuration options for the fields. Defaults to
     * <pre><code>
{
     "xtype": "textfield"
}      </code></pre>
     */
    fieldConfig: null,

    /**
     * @cfg {String} typeHint
     * The type of the single fields, such as "String" or "Boolean". If set to "String",
     * for example, the @TypeHint will automatically be set to "String[]" to ensure that
     * a multi-value property is created. Not set by default.
     * @since 5.4
     */

    // private
    path: "",

    // private
    bodyPadding: 4,

    // the width of the field
    // private
    fieldWidth: 0,

    constructor: function(config) {
        var list = this;

        if (typeof config.orderable === "undefined") {
            config.orderable = true;
        }

        if (!config.fieldConfig) {
            config.fieldConfig = {};
        }
        if (!config.fieldConfig.limit) {            
             config.fieldConfig.limit = "5";        
        }           
        if (!config.fieldConfig.xtype) {
            config.fieldConfig.xtype = "textfield";
        }
        config.fieldConfig.name = config.name;
        config.fieldConfig.ownerCt = this;
//        config.fieldConfig.style = "width:95%;";
        config.fieldConfig.orderable = config.orderable;
        config.fieldConfig.dragDropMode = config.dragDropMode;
        if (!config.addItemLabel) {
            config.addItemLabel = CQ.I18n.getMessage("Add Item");
        }

        var items = new Array();

        if(config.readOnly) {
            //if component is defined as readOnly, apply this to all items
            config.fieldConfig.readOnly = true;
        } else {
            items.push({
                xtype: "toolbar",
                cls: "cq-multifield-toolbar",
                items: [
                    "->",
                    {
                        xtype: "textbutton",
                        text: config.addItemLabel,
                        style: "padding-right:6px",
                        handler:function() {
                        	if(config.fieldConfig.limit == 0 || list.items.getCount() <= config.fieldConfig.limit) {     
                        		 list.addItem();
                        	}
                        }
                    },
                    {
                        xtype: "button",
                        iconCls: "cq-multifield-add",
                        template: new CQ.Ext.Template('<span><button class="x-btn" type="{0}"></button></span>'),
                        handler: function() {
                        	 if(config.fieldConfig.limit == 0 || list.items.getCount() <= config.fieldConfig.limit) {
                        		 list.addItem();
                        	 }
                        }
                    }
                ]
            });
        }

        this.hiddenDeleteField = new CQ.Ext.form.Hidden({
            "name":config.name + CQ.Sling.DELETE_SUFFIX
        });
        items.push(this.hiddenDeleteField);

        if (config.typeHint) {
            this.typeHintField = new CQ.Ext.form.Hidden({
                name: config.name + CQ.Sling.TYPEHINT_SUFFIX,
                value: config.typeHint + "[]"
            });
            items.push(this.typeHintField);
        }

        config = CQ.Util.applyDefaults(config, {
            "defaults":{
                "xtype":"multifielditem",
                "fieldConfig":config.fieldConfig
            },
            "items":[
                {
                    "xtype":"panel",
                    "border":false,
                    "bodyStyle":"padding:" + this.bodyPadding + "px",
                    "items":items
                }
            ]
        });
        CQ.form.BenefitMultiField.superclass.constructor.call(this,config);
        if (this.defaults.fieldConfig.regex) {
            // somehow regex get broken in this.defaults, so fix it
            this.defaults.fieldConfig.regex = config.fieldConfig.regex;
        }
        this.addEvents(
            /**
             * @event change
             * Fires when the value is changed.
             * @param {CQ.form.MultiField} this
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            "change",
            /**
             * @event removeditem
             * Fires when an item is removed.
             * @param {CQ.form.MultiField} this
             */
            "removeditem"
        );
    },

    initComponent: function() {
        CQ.form.BenefitMultiField.superclass.initComponent.call(this);

        this.on("resize", function() {
            // resize fields
            var item = this.items.get(0);
            this.calculateFieldWidth(item);
            if (this.fieldWidth > 0) {
                for (var i = 0; i < this.items.length; i++) {
                    try {
                        this.items.get(i).field.setWidth(this.fieldWidth);
                    }
                    catch (e) {
                        CQ.Log.debug("CQ.form.MultiField#initComponent: " + e.message);
                    }
                }
            }
        });

        this.on("disable", function() {
            this.hiddenDeleteField.disable();
            if (this.typeHintField) this.typeHintField.disable();
            this.items.each(function(item/*, index, length*/) {
                if (item instanceof CQ.form.MultiField.Item) {
                    item.field.disable();
                }
            }, this);
        });

        this.on("enable", function() {
            this.hiddenDeleteField.enable();
            if (this.typeHintField) this.typeHintField.enable();
            this.items.each(function(item/*, index, length*/) {
                if (item instanceof CQ.form.MultiField.Item) {
                    item.field.enable();
                }
            }, this);
        });
    },

    // private
    afterRender : function(){
        CQ.form.MultiField.superclass.afterRender.call(this);
        this.doLayout();
    },

    calculateFieldWidth: function(item) {
        try {
            this.fieldWidth = this.getSize().width - 2*this.bodyPadding; // total row width
            for (var i = 0; i < item.items.length; i++) {
                var button = item.items.get(i);
                // subtract each button
                if (button.items && button.items.length > 0 && button.items.get(0) === item.field) {
                    // item field; not a button
                    continue;
                }
                var w = item.items.get(i).getSize().width;
                if (w == 0) {
                    // button has no size, e.g. because MV is hidden >> reset fieldWidth to avoid setWidth
                    this.fieldWidth = 0;
                    return;
                }

                this.fieldWidth -= item.items.get(i).getSize().width;
            }
        }
        catch (e) {
            // initial resize fails if the MF is on the visible first tab
            // >> reset to 0 to avoid setWidth
            this.fieldWidth = 0;
        }
    },

    /**
     * Adds a new field with the specified value to the list.
     * @param {String} value The value of the field
     */
    addItem: function(value) {
        var item = this.insert(this.items.getCount() - 1, {});
        var form = this.findParentByType("form");
        if (form)
            form.getForm().add(item.field);
        this.doLayout();

        if (item.field.processPath) item.field.processPath(this.path);
        if (value) {
            item.setValue(value);
        }

        if (this.fieldWidth < 0) {
            // fieldWidth is < 0 when e.g. the MultiField is on a hidden tab page;
            // do not set width but wait for resize event triggered when the tab page is shown
            return;
        }
        if (!this.fieldWidth) {
            this.calculateFieldWidth(item);
        }
        try {
            item.field.setWidth(this.fieldWidth);
        }
        catch (e) {
            CQ.Log.debug("CQ.form.MultiField#addItem: " + e.message);
        }
    },

    processPath: function(path) {
        this.path = path;
    },

    // overriding CQ.form.CompositeField#getValue
    getValue: function() {
        var value = new Array();
        this.items.each(function(item, index/*, length*/) {
            if (item instanceof CQ.form.MultiField.Item) {
                value[index] = item.getValue();
                index++;
            }
        }, this);
        return value;
    },

    // overriding CQ.form.CompositeField#setValue
    setValue: function(value) {
        this.fireEvent("change", this, value, this.getValue());
        var oldItems = this.items;
        oldItems.each(function(item/*, index, length*/) {
            if (item instanceof CQ.form.MultiField.Item) {
                this.remove(item, true);
                this.findParentByType("form").getForm().remove(item);
            }
        }, this);
        this.doLayout();
        if ((value != null) && (value != "")) {
            if (value instanceof Array || CQ.Ext.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    this.addItem(value[i]);
                }
            } else {
                this.addItem(value);
            }
        }
    }

});

CQ.Ext.reg("benefitmultifield", CQ.form.BenefitMultiField);

