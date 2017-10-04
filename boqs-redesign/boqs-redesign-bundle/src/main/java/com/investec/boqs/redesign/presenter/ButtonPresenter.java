package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.CommonUtils;

public class ButtonPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		putModel("buttontext", properties.get("buttontext", ""));
		putModel("buttontargeturl", CommonUtils.getProperURL(properties.get("buttontargeturl", ""), slingRequest));
		putModel("buttonstyle", properties.get("buttonstyle", "primary"));
		putModel("buttonalignment", properties.get("buttonalignment", "center"));
		putModel("addtopmargin", properties.get("addtopmargin", false));
		putModel("buttonanalyticslabel", properties.get("buttonanalyticslabel", ""));
	}
}