package com.investec.boqs.redesign.bean;

public class SearchFilter {
    private String attributeName;
    private String [] filters;
    
    public SearchFilter(String attributeName, String[] filters) {
		this.attributeName = attributeName;
		this.filters = filters;
	}

	public String getAttributeName() {
		return attributeName;
	}
    
    public void setAttributeName(String attributeName) {
		this.attributeName = attributeName;
	}
    
    public String[] getFilters() {
		return filters;
	}
    
    public void setFilters(String[] filters) {
		this.filters = filters;
	}
}
