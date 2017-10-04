package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class PhoneAndEmailCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String strRequired = properties.get("isrequire", BOQSConstant.YES_VALUE);
		boolean isRequired = true;
		if (BOQSConstant.NO_VALUE.equals(strRequired)) {
			isRequired = false;
		}
		String phoneName = properties.get("phoneandemailelement", BOQSConstant.PHONE_NAME);
		String emailName = properties.get("emailelement", BOQSConstant.EMAIL_NAME);
		putModel("phoneandemailmainlbl", properties.get("phoneandemailmainlbl", BOQSConstant.PHONE_LBL));
		putModel("phoneandemailaltlbl", properties.get("phoneandemailaltlbl", BOQSConstant.EMAIL_LBL));
		putModel("addmorelbl", properties.get("addmorelbl", BOQSConstant.ADD_MORE_LBL));
		putModel("phoneplaceholder", properties.get("phoneplaceholder", BOQSConstant.PHONE_PLACEHOLDER));
		putModel("emailplaceholder", properties.get("emailplaceholder", BOQSConstant.EMAIL_PLACEHOLDER));
		putModel("isRequired", isRequired);
		putModel("phoneName", phoneName);
		putModel("emailName", emailName);
		
		putModel("requiredmessage", properties.get("requiredmessage", BOQSConstant.REQUIRED_MSG));
		putModel("phonenumbervaliditymessage", properties.get("phonenumbervaliditymessage", "The phone number entered does not appear to be valid"));
		putModel("emailvaliditymessage", properties.get("emailvaliditymessage", "Please enter a valid Email address"));
	}

}