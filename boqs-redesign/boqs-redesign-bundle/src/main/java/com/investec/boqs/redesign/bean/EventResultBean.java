package com.investec.boqs.redesign.bean;

import java.util.Date;

public class EventResultBean implements Comparable<EventResultBean> {
	private String icon;
	private String name;
	private String time;
	private String location;
	private String desc;
	private String image;
	private String moreDetailLink;
	private String status;
	private String buttonLabel;
	private String buttonPath;
	private Date startDate;
	private Date endDate;
	private Boolean isFeature;
	private Integer startMonth;
	private Integer startYear;
	
	
	public Date getEndDate() {
		return endDate;
	}
	
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	public Integer getStartMonth() {
		return startMonth;
	}
	
	public void setStartMonth(Integer startMonth) {
		this.startMonth = startMonth;
	}
	
	public void setStartYear(Integer startYear) {
		this.startYear = startYear;
	}
	
	public Integer getStartYear() {
		return startYear;
	}
	
	public Boolean getIsFeature() {
		return isFeature;
	}
	
	public void setIsFeature(Boolean isFeature) {
		this.isFeature = isFeature;
	}
	
	public Date getStartDate() {
		return startDate;
	}
	
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getMoreDetailLink() {
		return moreDetailLink;
	}

	public void setMoreDetailLink(String moreDetailLink) {
		this.moreDetailLink = moreDetailLink;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getButtonLabel() {
		return buttonLabel;
	}

	public void setButtonLabel(String buttonLabel) {
		this.buttonLabel = buttonLabel;
	}
	
	public String getButtonPath() {
		return buttonPath;
	}

	public void setButtonPath(String buttonPath) {
		this.buttonPath = buttonPath;
	}

	public int compareTo(EventResultBean o) {
		if(null == this.startDate) {
			return -1;
		}
		
		if(null == o.getStartDate()) {
			return 1;
		}
		
		if(this.getStartDate().getTime() == o.getStartDate().getTime()) {
			return 0;
		}
		
		return this.getStartDate().getTime() > o.getStartDate().getTime() ? 1 : -1;
	}

	

}
