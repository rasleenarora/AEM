package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class EmailCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String strRequired = properties.get("isrequire", BOQSConstant.YES_VALUE);
		boolean isRequired = true;
		if (BOQSConstant.NO_VALUE.equals(strRequired)) {
			isRequired = false;
		}
		putModel("emailaddresslbl", properties.get("emailaddresslbl", BOQSConstant.EMAIL_ADDRESS_LBL));
		putModel("emailaddressplaceholder", properties.get("emailplaceholder", BOQSConstant.EMAIL_ADDRESS_PLACEHOLDER));
		putModel("emailaddresselement", properties.get("emailaddresselement", ""));
		
		putModel("confirmemailaddresslbl", properties.get("confirmemailaddresslbl", BOQSConstant.CONFIRM_EMAIL_ADDRESS_LBL));
		putModel("confirmemailaddressplaceholder", properties.get("confirmemailplaceholder", BOQSConstant.CONFIRM_EMAIL_ADDRESS_PLACEHOLDER));
		putModel("confirmemailaddresselement", properties.get("confirmemailaddress", ""));
		
		putModel("isRequired", isRequired);
		putModel("requiredmsg", properties.get("requiredmsg", BOQSConstant.REQUIRED_MSG));
		putModel("requireconfirmmsg", properties.get("requireconfirmmsg", BOQSConstant.REQUIRED_MSG));
		putModel("messageofnonequality", properties.get("messageofnonequality", BOQSConstant.MESSAGE_OF_NON_EQUALITY));
	}
}