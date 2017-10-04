package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class VisaWidgetPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		putModel("apikey", properties.get("apikey", ""));
		putModel("template", properties.get("template", ""));
		putModel("enabledfilters", properties.get("enabledfilters", ""));
		putModel("cards", properties.get("cards", ""));
		putModel("categories", properties.get("categories", ""));
		putModel("viewmode", properties.get("viewmode", ""));
		putModel("language", properties.get("language", ""));
		putModel("pagesize", properties.get("pagesize", ""));
		putModel("sortoptions", properties.get("sortoptions", ""));
		putModel("title", properties.get("title", ""));
		putModel("description", properties.get("description", ""));
		putModel("headerText", properties.get("headerText", "Visa offers available to BOQ Specialist credit cardholders"));
	}
}