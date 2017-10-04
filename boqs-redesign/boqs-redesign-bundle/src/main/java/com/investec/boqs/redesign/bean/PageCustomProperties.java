package com.investec.boqs.redesign.bean;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.foundation.Image;

public class PageCustomProperties {
	private Page page;
	private String subtext;
	private Image image;
	private boolean breadcrumb;
	private String keywords;
	private String title;
	private String lastPublishedBy;
	private Calendar lastPublished;
	private boolean active;
	private boolean disableChildList;
	private boolean stack;
	
	private String pathSite; // /content/boqs/en => /en

	public PageCustomProperties() {
	}

	public Page getPage() {
		return page;
	}

	public List<Page> getChildren() {
		List<Page> children = new ArrayList<Page>();
		if (this.page != null) {
			while (this.page.listChildren().hasNext()) {
				Page child = this.page.listChildren().next();
				children.add(child);
			}
		}
		return children;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public String getSubtext() {
		return subtext;
	}

	public void setSubtext(String subtext) {
		this.subtext = subtext;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public boolean isBreadcrumb() {
		return breadcrumb;
	}

	public void setBreadcrumb(boolean breadcrumb) {
		this.breadcrumb = breadcrumb;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLastPublishedBy() {
		return lastPublishedBy;
	}

	public void setLastPublishedBy(String lastPublishedBy) {
		this.lastPublishedBy = lastPublishedBy;
	}

	public Calendar getLastPublished() {
		return lastPublished;
	}

	public void setLastPublished(Calendar lastPublished) {
		this.lastPublished = lastPublished;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isDisableChildList() {
		return disableChildList;
	}

	public void setDisableChildList(boolean disableChildList) {
		this.disableChildList = disableChildList;
	}

	public boolean isStack() {
		return stack;
	}

	public void setStack(boolean stack) {
		this.stack = stack;
	}

	public String getPathSite() {
		return pathSite;
	}

	public void setPathSite(String pathSite) {
		this.pathSite = pathSite;
	}

}
