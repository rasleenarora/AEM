package com.investec.boqs.redesign.bean;

import java.util.List;

public class PromoCarousel {
	private String promoimage;
	private String promoimageMobile;
	private String alternatetext;
	private String promotext;
	private String ctatextoverride;
	private String targeturl;
	private String targeturl2;
	
	
	public String getTargeturl2() {
		return targeturl2;
	}

	public void setTargeturl2(String targeturl2) {
		this.targeturl2 = targeturl2;
	}

	public String getCtatextoverride2() {
		return ctatextoverride2;
	}

	public void setCtatextoverride2(String ctatextoverride2) {
		this.ctatextoverride2 = ctatextoverride2;
	}

	private String ctatextoverride2;
	private List<String> openinnewtab;

	public String getPromoimageMobile() {
		return promoimageMobile;
	}
	
	public void setPromoimageMobile(String promoimageMobile) {
		this.promoimageMobile = promoimageMobile;
	}
	
	public String getPromoimage() {
		return promoimage;
	}

	public void setPromoimage(String promoimage) {
		this.promoimage = promoimage;
	}

	public String getAlternatetext() {
		return alternatetext;
	}

	public void setAlternatetext(String alternatetext) {
		this.alternatetext = alternatetext;
	}

	public String getPromotext() {
		return promotext;
	}

	public void setPromotext(String promotext) {
		this.promotext = promotext;
	}

	public String getCtatextoverride() {
		return ctatextoverride;
	}

	public void setCtatextoverride(String ctatextoverride) {
		this.ctatextoverride = ctatextoverride;
	}

	public String getTargeturl() {
		return targeturl;
	}

	public void setTargeturl(String targeturl) {
		this.targeturl = targeturl;
	}

	public Boolean getOpeninnewtab() {
		return openinnewtab != null && !openinnewtab.isEmpty()
				&& Boolean.parseBoolean(openinnewtab.get(0));
	}

	public void setOpeninnewtab(List<String> openinnewtab) {
		this.openinnewtab = openinnewtab;
	}
}