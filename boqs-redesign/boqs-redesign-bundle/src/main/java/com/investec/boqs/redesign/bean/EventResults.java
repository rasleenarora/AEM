package com.investec.boqs.redesign.bean;

import java.util.List;

public class EventResults {
	private int numberOfResultPerPage;
	private String featureEventsLabel;
	private String moreDetailText;
	private String registerLabel;
	private Boolean paginateResult;
	private Boolean resultBasedInUrlParameter;
	private Boolean condensedView;
	private String loadMoreUrlInCondensedView;
	private String loadMoreLabelInCondensedView;
	private int numberOfResultToShowInCondensedView;
	
	
	public int getNumberOfResultPerPage() {
		return numberOfResultPerPage;
	}

	public void setNumberOfResultPerPage(int numberOfResultPerPage) {
		this.numberOfResultPerPage = numberOfResultPerPage;
	}

	public String getFeatureEventsLabel() {
		return featureEventsLabel;
	}

	public void setFeatureEventsLabel(String featureEventsLabel) {
		this.featureEventsLabel = featureEventsLabel;
	}

	public String getMoreDetailText() {
		return moreDetailText;
	}

	public void setMoreDetailText(String moreDetailText) {
		this.moreDetailText = moreDetailText;
	}

	public String getRegisterLabel() {
		return registerLabel;
	}

	public void setRegisterLabel(String registerLabel) {
		this.registerLabel = registerLabel;
	}

	public Boolean getPaginateResult() {
		return paginateResult;
	}

	public void setPaginateResult(Boolean paginateResult) {
		this.paginateResult = paginateResult;
	}

	public Boolean getResultBasedInUrlParameter() {
		return resultBasedInUrlParameter;
	}

	public void setResultBasedInUrlParameter(Boolean resultBasedInUrlParameter) {
		this.resultBasedInUrlParameter = resultBasedInUrlParameter;
	}

	public Boolean getCondensedView() {
		return condensedView;
	}

	public void setCondensedView(Boolean condensedView) {
		this.condensedView = condensedView;
	}

	public String getLoadMoreUrlInCondensedView() {
		return loadMoreUrlInCondensedView;
	}

	public void setLoadMoreUrlInCondensedView(String loadMoreUrlInCondensedView) {
		this.loadMoreUrlInCondensedView = loadMoreUrlInCondensedView;
	}

	public String getLoadMoreLabelInCondensedView() {
		return loadMoreLabelInCondensedView;
	}

	public void setLoadMoreLabelInCondensedView(String loadMoreLabelInCondensedView) {
		this.loadMoreLabelInCondensedView = loadMoreLabelInCondensedView;
	}

	public int getNumberOfResultToShowInCondensedView() {
		return numberOfResultToShowInCondensedView;
	}

	public void setNumberOfResultToShowInCondensedView(int numberOfResultToShowInCondensedView) {
		this.numberOfResultToShowInCondensedView = numberOfResultToShowInCondensedView;
	}

	private List<EventResultBean> eventResults;

	public List<EventResultBean> getEventResults() {
		return eventResults;
	}

	public void setEventResults(List<EventResultBean> eventResults) {
		this.eventResults = eventResults;
	}
}
