package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;

import com.investec.boqs.redesign.utils.CommonUtils;

public class PanelCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		// put value to model to use in jsp
		String mobileRenditionName = properties.get("mobilerenditionname", "mobile");
		if (StringUtils.isNotBlank(properties.get("fileReference", ""))) {
			putModel("fileReferenceMobile", CommonUtils.getImageRenditons(properties.get("fileReference", "#"), mobileRenditionName, slingRequest));
		}

		String targetUrl = properties.get("targeturl", "");
		if (StringUtils.isNotBlank(targetUrl)) {
			putModel("targeturl", CommonUtils.getProperURL(targetUrl, slingRequest));
		} else {
			slingRequest.removeAttribute("targeturl");
			putModel("targeturl", "javascript:void(0);");
		}
		putModel("fileReferenceDesktop", properties.get("fileReference", "#"));
		putModel("verticalalignment", properties.get("verticalalignment", "centre"));
		putModel("AltText", properties.get("alttext", ""));
	}
}