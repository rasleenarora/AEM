package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class PhoneNumberCompPresenter extends AbstractPresenter{

	@Override
	protected void process() throws RepositoryException {
		putModel("alignment",properties.get("alignment","left"));
		String phoneNumber = properties.get("phonenumber","1300 131 141");
		putModel("phonenumber", phoneNumber);
		putModel("phonenumberTrim", phoneNumber.replaceAll(" ", ""));
	}
	
}