package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class TableOfContentPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		putModel("maxlevels", properties.get("maxlevels", "2"));
		putModel("liststyle", properties.get("liststyle", "counter"));
	}
}