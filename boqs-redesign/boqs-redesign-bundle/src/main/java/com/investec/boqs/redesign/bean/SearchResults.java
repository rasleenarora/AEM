package com.investec.boqs.redesign.bean;

import java.util.List;

public class SearchResults {
	private long currentPage;
	private long resultCount;
	private long numberToDisplay;
	private String resultslabel;
	private int startOfBreadcrumb;
	private boolean paginationRequired;
	private List<SearchResultBean> searchResultBeans;

	public String getResultslabel() {
		return resultslabel;
	}

	public void setResultslabel(String resultslabel) {
		this.resultslabel = resultslabel;
	}

	public int getStartOfBreadcrumb() {
		return startOfBreadcrumb;
	}

	public void setStartOfBreadcrumb(int startOfBreadcrumb) {
		this.startOfBreadcrumb = startOfBreadcrumb;
	}

	public boolean isPaginationRequired() {
		return paginationRequired;
	}

	public void setPaginationRequired(boolean paginationRequired) {
		this.paginationRequired = paginationRequired;
	}

	public long getNumberToDisplay() {
		return numberToDisplay;
	}

	public void setNumberToDisplay(long numberToDisplay) {
		this.numberToDisplay = numberToDisplay;
	}

	public long getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(long currentPage) {
		this.currentPage = currentPage;
	}

	public long getResultCount() {
		return resultCount;
	}

	public void setResultCount(long resultCount) {
		this.resultCount = resultCount;
	}

	public List<SearchResultBean> getSearchResultBeans() {
		return searchResultBeans;
	}

	public void setSearchResultBeans(List<SearchResultBean> searchResultBeans) {
		this.searchResultBeans = searchResultBeans;
	}

}
