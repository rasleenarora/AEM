package com.investec.boqs.redesign.bean;

public class FiltersStatus {
	
	private boolean pageContentType;
	private boolean relatedProfession;
	private boolean relatedProducts;
	private boolean relatedFinance;
	private boolean relatedStates;
	private boolean topics;
	public boolean isPageContentType() {
		return pageContentType;
	}
	public void setPageContentType(boolean pageContentType) {
		this.pageContentType = pageContentType;
	}
	public boolean isRelatedProfession() {
		return relatedProfession;
	}
	public void setRelatedProfession(boolean relatedProfession) {
		this.relatedProfession = relatedProfession;
	}
	public boolean isRelatedProducts() {
		return relatedProducts;
	}
	public void setRelatedProducts(boolean relatedProducts) {
		this.relatedProducts = relatedProducts;
	}
	public boolean isRelatedFinance() {
		return relatedFinance;
	}
	public void setRelatedFinance(boolean relatedFinance) {
		this.relatedFinance = relatedFinance;
	}
	public boolean isRelatedStates() {
		return relatedStates;
	}
	public void setRelatedStates(boolean relatedStates) {
		this.relatedStates = relatedStates;
	}
	public boolean isTopics() {
		return topics;
	}
	public void setTopics(boolean topics) {
		this.topics = topics;
	}
	

}
