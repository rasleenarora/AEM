package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.day.cq.wcm.api.Page;

public class PageHeaderCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String title = getTitle(currentPage);
		putModel("title", title);
	}
	public static String getTitle(Page page) {
		String title = null;
		if (page == null){
			return title;
		} else{
			title = page.getProperties().get("pageheading", String.class);
			if (title == null) {
				title = page.getPageTitle();
					if (title == null) {
						title = page.getTitle();
					}
				}
			}
		return title;
	}
}
