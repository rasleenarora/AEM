var boqsConfigurationPath = "/content/public_meta/boqs_master_configuration";
var boqsConfigurationList = CQ.shared.HTTP.eval(boqsConfigurationPath + "/_jcr_content.list.json");
var autoSuggestionListKey='boqs.autosuggestions_list';

function setCategories(field){

    var value = field.getValue();

    var dialog = field.findParentByType("dialog");
    var relatedProductTypes = dialog.getField("./relatedproducttypes");
    var relatedFinanceCategories = dialog.getField("./relatedfinancecategories");
    var topics = dialog.getField("./topics");

    if(value == 'expertise'){
	relatedProductTypes.hide();
    relatedFinanceCategories.hide();
    topics.show();
    }else{
	relatedProductTypes.show();
    relatedFinanceCategories.show();
    topics.hide();
    }

    if(relatedProductTypes.optionItems.length >0){
        for(var i=0;i<relatedProductTypes.optionItems.length;i++){
				relatedProductTypes.optionItems.items[i].setValue(false);

        }
    }

     if(relatedFinanceCategories.optionItems.length >0){
        for(var i=0;i<relatedFinanceCategories.optionItems.length;i++){
				relatedFinanceCategories.optionItems.items[i].setValue(false);

        }
    }   
}


function makeMandatoryField(field){
    var value = field.getValue();
    var dialog = field.findParentByType("dialog");
    var title = dialog.getField("./headinglbl");
    if(value != 'true'){
        title.allowBlank = true;
    }else{
        title.allowBlank = false;
    }
}

function getAutosuggestionLink(){


    var autoSuggestionLinkPath= null;
	for(var i in boqsConfigurationList){
		if(boqsConfigurationList[i].value==autoSuggestionListKey){
			autoSuggestionLinkPath = boqsConfigurationList[i].text;
			break;
		}
	}
    autoSuggestionLinkPath = autoSuggestionLinkPath+'.html';

     window.open(autoSuggestionLinkPath);
}

function getSearchSuggestionsJson(field){
    var searchSuggestionJsonPath= null;
	for(var i in boqsConfigurationList){
		if(boqsConfigurationList[i].value==autoSuggestionListKey){
			searchSuggestionJsonPath = boqsConfigurationList[i].text;
			break;
		}
	}
        field.setValue(searchSuggestionJsonPath);
}
