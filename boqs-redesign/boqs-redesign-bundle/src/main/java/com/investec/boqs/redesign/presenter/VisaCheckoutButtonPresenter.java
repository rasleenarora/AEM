package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class VisaCheckoutButtonPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		putModel("buttontext", properties.get("buttontext", ""));
		putModel("buttonalignment", properties.get("buttonalignment", "center"));
		putModel("javascriptcode", properties.get("javascriptcode", ""));
		putModel("buttonanalyticslabel", properties.get("buttonanalyticslabel", ""));
	}
}