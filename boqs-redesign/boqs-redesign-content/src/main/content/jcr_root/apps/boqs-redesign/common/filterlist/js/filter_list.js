function loadCategories(key) {

    var boqsConfigurationPath = "/content/public_meta/boqs_master_configuration";
    var boqsConfigurationList = CQ.shared.HTTP.eval(boqsConfigurationPath + "/_jcr_content.list.json");
    var categoriesListPath= null;
	for(var i in boqsConfigurationList){
		if(boqsConfigurationList[i].value==key){
			categoriesListPath = boqsConfigurationList[i].text;
			break;
		}
	}
    if(categoriesListPath!=null ){
     var categoriesList =CQ.shared.HTTP.eval(categoriesListPath + "/_jcr_content.list.json");
        return categoriesList;}
    else{
	return null;
    }
}

function setTopicListValuesField(field){
   var dialog = field;
   var topicListLabelsField = dialog.getField("./topicListLabels");
   var topicList = dialog.getField("./topiclist");
   var topicListValues=topicList.getValue();
   var topicListKey='boqs.topic_list';
   var categoriesList= loadCategories(topicListKey); 
   var values=''; 
    if(typeof topicListValues != 'undefined' && topicListValues){
        for(var i=0;i<topicListValues.length;i++){
            for(var j in categoriesList){
                if(topicListValues[i] == categoriesList[j].value){
                    if(i==0){
                   values=values+categoriesList[j].text+'--'+categoriesList[j].value;
                    }else{
                   values=values+'|'+categoriesList[j].text+'--'+categoriesList[j].value;
                    }
                }
    	}
      }
		topicListLabelsField.setValue(values);
    }
}



function setRelatedProfessionListValuesField(field){
   var dialog = field;
   var relatedProfessionListLabelsField = dialog.getField("./relatedProfessionListLabels");
   var relatedProfessionList = dialog.getField("./relatedprofessionlist");
   var relatedProfessionListValues=relatedProfessionList.getValue();
   var relatedProfessionListKey='boqs.relatedprofessions_list';
   var categoriesList= loadCategories(relatedProfessionListKey); 
   var values=''; 
    if(typeof relatedProfessionListValues != 'undefined' && relatedProfessionListValues){
        for(var i=0;i<relatedProfessionListValues.length;i++){
            for(var j in categoriesList){
                if(relatedProfessionListValues[i] == categoriesList[j].value){
                    if(i==0){
                   values=values+categoriesList[j].text+'--'+categoriesList[j].value;
                    }else{
                   values=values+'|'+categoriesList[j].text+'--'+categoriesList[j].value;
                    }
                }
    	}
      }
		relatedProfessionListLabelsField.setValue(values);
    }
}