package com.investec.boqs.redesign.bean;

public class FilterListBean {

	private String pageContentType;
	private String[] relatedProfession;
	private String[] relatedProducts;
	private String[] relatedFinance;
	private String[] relatedStates;
	private String[] topics;
	
	public String[] getRelatedProfession() {
		return relatedProfession;
	}
	public void setRelatedProfession(String[] relatedProfession) {
		this.relatedProfession = relatedProfession;
	}
	public String[] getRelatedProducts() {
		return relatedProducts;
	}
	public void setRelatedProducts(String[] relatedProducts) {
		this.relatedProducts = relatedProducts;
	}
	public String[] getRelatedFinance() {
		return relatedFinance;
	}
	public void setRelatedFinance(String[] relatedFinance) {
		this.relatedFinance = relatedFinance;
	}
	public String[] getRelatedStates() {
		return relatedStates;
	}
	public void setRelatedStates(String[] relatedStates) {
		this.relatedStates = relatedStates;
	}
	public String getPageContentType() {
		return pageContentType;
	}
	public void setPageContentType(String pageContentType) {
		this.pageContentType = pageContentType;
	}
	public String[] getTopics() {
		return topics;
	}
	public void setTopics(String[] topics) {
		this.topics = topics;
	}
	
	
}
