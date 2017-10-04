package com.investec.boqs.redesign.bean;

import java.util.List;

public class SearchResultBean {
	private String description;
	private String title;
	private String url;
	private String iconPath;
	private List<CustomXtype> breadcrumbItems;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIconPath() {
		return iconPath;
	}

	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}

	public List<CustomXtype> getBreadcrumbItems() {
		return breadcrumbItems;
	}

	public void setBreadcrumbItems(List<CustomXtype> breadcrumbItems) {
		this.breadcrumbItems = breadcrumbItems;
	}

}
