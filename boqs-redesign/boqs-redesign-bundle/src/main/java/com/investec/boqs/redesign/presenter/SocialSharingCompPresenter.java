package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;

public class SocialSharingCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String url = properties.get("url", currentPage.getPath());
		String title = properties.get("title", currentPage.getTitle());
		
		String description = properties.get("description", currentPage.getDescription());
		if (description == null)
			description = "";
		
		putModel("url", url);
		putModel("title", title);
		putModel("description", description);
		putModel("image", properties.get("fileReference", ""));
	
	}
}