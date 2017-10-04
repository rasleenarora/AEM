package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class TextfieldCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String strRequired = properties.get("isrequire", BOQSConstant.YES_VALUE);
		boolean isRequired = true;
		if (BOQSConstant.NO_VALUE.equals(strRequired)) {
			isRequired = false;
		}
		String textName = properties.get("textfieldname", "");
		putModel("textfieldlbl", properties.get("textfieldlbl", BOQSConstant.TEXTFIELD_LBL));
		putModel("textfieldplaceholder", properties.get("textfieldplaceholder", BOQSConstant.TEXTFIELD_PLACEHOLDER));
		putModel("textfieldname", textName);
		putModel("isRequired", isRequired);
		putModel("requiredmsg", properties.get("requiredmsg", BOQSConstant.REQUIRED_MSG));
		putModel("phonenumbervaliditymessage", properties.get("phonenumbervaliditymessage", "The phone number entered does not appear to be valid"));
        putModel("emailValidityMessage", properties.get("emailValidityMessage", "The email entered does not appear to be valid"));
		putModel("fieldtype", properties.get("fieldtype", BOQSConstant.TEXTFIELD_TYPE));

	}

}