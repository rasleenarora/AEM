package com.investec.boqs.redesign.bean;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class PhotoList {
    private String src;
    private String thumbSrc;
	private String caption;
	private String alt;
	
	public PhotoList() {
	}
	
	public PhotoList(String src, String caption, String alt) {
		this.caption = caption;
		this.alt = alt;
		setSrc(src);
	}

	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
		setThumbSrc(src + BOQSConstant.PHOTOGALLERY_THUMB_PATH);
	}
	public String getThumbSrc() {
		return thumbSrc;
	}
	public void setThumbSrc(String thumbSrc) {
		this.thumbSrc = thumbSrc;
	}
	public String getCaption() {
		return caption;
	}
	public void setCaption(String caption) {
		this.caption = caption;
	}
	public String getAlt() {
		return alt;
	}
	public void setAlt(String alt) {
		this.alt = alt;
	}
}
