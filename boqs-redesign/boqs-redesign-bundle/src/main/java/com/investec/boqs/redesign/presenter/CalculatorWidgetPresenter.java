package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class CalculatorWidgetPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		putModel("calculatorScriptURL", properties.get("calculatorScriptURL", ""));
	}
}