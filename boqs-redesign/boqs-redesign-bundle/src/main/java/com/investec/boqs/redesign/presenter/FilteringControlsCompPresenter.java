package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.StringEscapeUtils;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class FilteringControlsCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String[] specificFinanceList = new String[3];
		String[] specificRelatedProductList = new String[4];
		String[] specificResultList = new String[6];
		String[] specificTypeEventList = new String[7];
		String[] specificStateList = new String[8];
		specificFinanceList = properties.get("specificfinancelist", new String[0]);
		specificRelatedProductList = properties.get("specificrelatedproductlist", new String[0]);
		specificResultList = properties.get("specificresultlist", new String[0]);
		specificTypeEventList = properties.get("specifictypeeventlist", new String[0]);
		specificStateList = properties.get("specificstatelist", new String[0]);
		
		List<HashMap<String, String>> topicLists = new ArrayList<HashMap<String, String>>();
		if (StringUtils.isNotBlank(properties.get("topicListLabels", String.class))) {
			HashMap<String, String> topicMap;
			String[] topicsValues = properties.get("topicListLabels", String.class)
					.split(Pattern.quote(BOQSConstant.PIPELINE_SEPARATOR));
			for (String value : topicsValues) {
				if (StringUtils.isNotEmpty(value) && value.split(Pattern.quote("--")).length > 1) {
					topicMap = new HashMap<String, String>();
					topicMap.put("label", value.split(Pattern.quote("--"))[0]);
					topicMap.put("value", value.split(Pattern.quote("--"))[1]);
					topicLists.add(topicMap);
				}
			}
		}

		List<HashMap<String, String>> relatedProfessionList = new ArrayList<HashMap<String, String>>();
        if (StringUtils.isNotBlank(properties.get("relatedProfessionListLabels", String.class))) {
            HashMap<String, String> relatedProfessionMap;
            String[] relatedProfessionValues = properties.get("relatedProfessionListLabels", String.class)
                    .split(Pattern.quote(BOQSConstant.PIPELINE_SEPARATOR));
            for (String value : relatedProfessionValues) {
                if (StringUtils.isNotEmpty(value) && value.split(Pattern.quote("--")).length > 1) {
                    relatedProfessionMap = new HashMap<String, String>();
                    relatedProfessionMap.put("label", value.split(Pattern.quote("--"))[0]);
                    relatedProfessionMap.put("value", value.split(Pattern.quote("--"))[1]);
                    relatedProfessionList.add(relatedProfessionMap);
                }
            }
        }

		String relatedProfession = slingRequest.getParameter(BOQSConstant.RELATED_PROFESSION_PARAMETER);
		relatedProfession = StringUtils.isBlank(relatedProfession) ? "" : StringEscapeUtils.escapeHtml4(relatedProfession);

		String type = slingRequest.getParameter(BOQSConstant.TYPE_PARAMETER);
		type = StringUtils.isBlank(type) ? "" : type;
		boolean showCheckedType = true;
		if (!"".equals(type)) {
			if (type.indexOf(BOQSConstant.ALL_RESULT_TYPE_OPTION) >= 0) {
				type = BOQSConstant.ALL_RESULT_TYPE_OPTION;
			} else {
				showCheckedType = false;
			}
		}

		String searchTerm = slingRequest.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER);
		searchTerm = StringUtils.isBlank(searchTerm) ? "" : StringEscapeUtils.escapeHtml4(searchTerm);

		String finance = slingRequest.getParameter(BOQSConstant.FINANCE_PARAMETER);
		finance = StringUtils.isBlank(finance) ? "" : StringEscapeUtils.escapeHtml4(finance);

		String relatedProduct = slingRequest.getParameter(BOQSConstant.RELATED_PRODUCT_PARAMETER);
		relatedProduct = StringUtils.isBlank(relatedProduct) ? "" : relatedProduct;
		boolean showCheckedProduct = true;
		if (!"".equals(relatedProduct)) {
			if (relatedProduct.indexOf(BOQSConstant.ALL_RELATED_PRODUCT_OPTION) >= 0) {
				relatedProduct = BOQSConstant.ALL_RELATED_PRODUCT_OPTION;
			} else {
				showCheckedProduct = false;
			}
		}

		String typeEvent = slingRequest.getParameter(BOQSConstant.TYPE_EVENT_PARAMETER);
		typeEvent = StringUtils.isBlank(typeEvent) ? "" : typeEvent;
		boolean showCheckedTypeEvent = true;
		if (!"".equals(typeEvent)) {
			if (typeEvent.indexOf(BOQSConstant.ALL_EVENT_OPTION) >= 0) {
				typeEvent = BOQSConstant.ALL_EVENT_OPTION;
			} else {
				showCheckedTypeEvent = false;
			}
		}
		
		String topic = slingRequest.getParameter(BOQSConstant.TOPIC);
		topic = StringUtils.isBlank(topic) ? "" : topic;
		boolean showCheckedTypeTopic = true;
		if (!"".equals(topic)) {
			if (topic.indexOf(BOQSConstant.ALL_TOPICS_OPTION) >= 0) {
				topic = BOQSConstant.ALL_TOPICS_OPTION;
			} else {
				showCheckedTypeTopic = false;
			}
		}
	        
		String state = slingRequest.getParameter(BOQSConstant.STATE_PARAMETER);
		state = StringUtils.isBlank(state) ? "" : state;

		String daterange = slingRequest.getParameter(BOQSConstant.DATE_RANGE_PARAMETER);
		daterange = StringUtils.isBlank(daterange) ? "" : StringEscapeUtils.escapeHtml4(daterange);

		String startDateParam = "Today";
		String endDateParam = "Today";

		if (StringUtils.isNotBlank(daterange) && daterange.contains("|")) {
			startDateParam = daterange.split("\\|")[0];
			endDateParam = daterange.split("\\|")[1];
		}

		String contentfiltered = properties.get("contentfiltered", "resultcards");
		boolean showrspecificFinanceList = false;
		boolean showspecificRelatedProductList = false;
		boolean showspecificResultList = false;
		boolean showspecificTypeEventList = false;
		boolean showspecificStateList = false;
		boolean showdateRange = false;
		boolean showTopicList = false;

		if ("resultcards".equals(contentfiltered)) {
			showrspecificFinanceList = true;
			showspecificRelatedProductList = true;
		} else if ("resultcardswithstates".equals(contentfiltered)) {
			showrspecificFinanceList = true;
			showspecificRelatedProductList = true;
			showspecificStateList = true;
		} else if ("sitepages".equals(contentfiltered)) {
			showrspecificFinanceList = true;
			showspecificRelatedProductList = true;
			showspecificResultList = true;
		} else if ("eventcalendar".equals(contentfiltered)) {
			showspecificTypeEventList = true;
			showdateRange = true;
			showspecificStateList = true;
		}else if ("expertise".equals(contentfiltered)) {
			showTopicList = true;
			showspecificStateList = true;
		}

		putModel("relatedProfessionList", relatedProfessionList);
		putModel("specificFinanceList", specificFinanceList);
		putModel("specificRelatedProductList", specificRelatedProductList);
		putModel("specificResultList", specificResultList);
		putModel("specificTypeEventList", specificTypeEventList);
		putModel("specificStateList", specificStateList);
		putModel("topicLists", topicLists);
		putModel("contentfiltered", contentfiltered);
		putModel("refineresults", properties.get("refineresults", "Refine Results"));
		putModel("relatedprofession", properties.get("relatedprofession", "Related Profession"));
		putModel("financelbl", properties.get("financelbl", "Finance"));
		putModel("relatedproductlbl", properties.get("relatedproductlbl", "Related Products"));
		putModel("daterangelbl", properties.get("daterangelbl", "Date range"));
		putModel("resulttypelbl", properties.get("resulttypelbl", "Result Type"));
		putModel("typeeventlbl", properties.get("typeeventlbl", "Type of Event"));
		putModel("statelbl", properties.get("statelbl", "State"));
		putModel("topiclbl", properties.get("topiclbl", "Topics"));
		
		putModel("popupheading", properties.get("popupheading", "We have applied filters:"));
		putModel("okbuttonlabel", properties.get("okbuttonlabel", "OK"));
		putModel("clearallfilters", properties.get("clearallfilters", "Clear all filters"));
		
		putModel("relatedPro", relatedProfession);
		putModel("type", type);
		putModel("searchTerm", searchTerm);
		putModel("finance", finance);
		putModel("relatedProduct", relatedProduct);
		putModel("typeEvent", typeEvent);
		putModel("topic", topic);
		putModel("endDateParam", endDateParam);
		putModel("startDateParam", startDateParam);
		putModel("state", state);

		putModel("showrspecificFinanceList", showrspecificFinanceList);
		putModel("showspecificRelatedProductList", showspecificRelatedProductList);
		putModel("showspecificResultList", showspecificResultList);
		putModel("showspecificTypeEventList", showspecificTypeEventList);
		putModel("showspecificStateList", showspecificStateList);
		putModel("showdateRange", showdateRange);
		putModel("showCheckedType", showCheckedType);
		putModel("showCheckedProduct", showCheckedProduct);
		putModel("showCheckedTypeEvent", showCheckedTypeEvent);
		putModel("showCheckedTypeTopic", showCheckedTypeTopic);
		putModel("showTopicList", showTopicList);

		putModel("allprofessions", BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION);
		putModel("allcate", BOQSConstant.ALL_FINANCE_CATEGORY_OPTION);
		putModel("alltype", BOQSConstant.ALL_RESULT_TYPE_OPTION);
		putModel("allproduct", BOQSConstant.ALL_RELATED_PRODUCT_OPTION);
		putModel("allevent", BOQSConstant.ALL_EVENT_OPTION);
		putModel("allstates", BOQSConstant.ALL_STATES_OPTION);
		putModel("alltopics", BOQSConstant.ALL_TOPICS_OPTION);

		boolean showRelatedProfession = StringUtils.isNotBlank(relatedProfession) && !BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION.equals(relatedProfession);
		boolean showFinance = StringUtils.isNotBlank(finance) && !BOQSConstant.ALL_FINANCE_CATEGORY_OPTION.equals(finance);
		boolean shoDateRange = !"Today".equals(endDateParam) || !"Today".equals(startDateParam);
		boolean showResultType = StringUtils.isNotBlank(type) && !BOQSConstant.ALL_RESULT_TYPE_OPTION.equals(type);
		boolean showRelatedProduct = StringUtils.isNotBlank(relatedProduct) && !BOQSConstant.ALL_RELATED_PRODUCT_OPTION.equals(relatedProduct);
		boolean showTypeEvent = StringUtils.isNotBlank(typeEvent) && !BOQSConstant.ALL_EVENT_OPTION.equals(typeEvent);
		boolean showState = StringUtils.isNotBlank(state) && !BOQSConstant.ALL_STATES_OPTION.equals(state);
		boolean showTopic = StringUtils.isNotBlank(topic) && !BOQSConstant.ALL_TOPICS_OPTION.equals(topic);

		boolean showPopover = showRelatedProfession || showFinance || showResultType 
				|| showRelatedProduct || showTypeEvent || showState || shoDateRange;

		putModel("showPopover", showPopover);
		putModel("showRelatedProfession", showRelatedProfession);
		putModel("showFinance", showFinance);
		putModel("shoDateRange", shoDateRange);
		putModel("showResultType", showResultType);
		createListFilters("typeFilters", type);
		putModel("showRelatedProduct", showRelatedProduct);
		createListFilters("relatedProductFilters", relatedProduct);
		putModel("showTypeEvent", showTypeEvent);
		createListFilters("typeEventFilters", typeEvent);
		putModel("showState", showState);
		putModel("showTopic", showTopic);
		createListFilters("topicFilters", topic);
	}

	private void createListFilters(String name, String filters){
		if(StringUtils.isNotBlank(filters) && filters.contains("|")){
			filters = StringEscapeUtils.escapeHtml4(filters);
			putModel(name, filters.split("\\|"));
		} else {
			putModel(name, filters);
		}
	}
}
















