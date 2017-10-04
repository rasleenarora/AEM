package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class ContainerPresenter extends AbstractPresenter{

	@Override
	protected void process() throws RepositoryException {
		// get value input from dialog and put value into model to use in jsp
		putModel("backgroundstyle", properties.get("backgroundstyle", "none"));
		putModel("dividecomponentarea", properties.get("dividecomponentarea", "pc100"));
		putModel("visiblecontainer", properties.get("visiblecontainer", "fullwidth"));
	}
}
