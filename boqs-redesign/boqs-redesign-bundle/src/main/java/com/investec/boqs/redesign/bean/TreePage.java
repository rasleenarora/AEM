package com.investec.boqs.redesign.bean;

import java.util.List;

public class TreePage {
	private String icon;
	private String label;
	private String link;
	private String path;
	private List<TreePage> childs;

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public List<TreePage> getChilds() {
		return childs;
	}

	public void setChilds(List<TreePage> childs) {
		this.childs = childs;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

}
