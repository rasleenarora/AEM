package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

public class CheckboxCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String strRequired = properties.get("isrequire", BOQSConstant.YES_VALUE);
		boolean isRequired = true;
		if (BOQSConstant.NO_VALUE.equals(strRequired)) {
			isRequired = false;
		}
		
		String checkboxlbl = properties.get("checkboxlbl", BOQSConstant.BLANK);
		putModel("checkboxlbl", CommonUtils.removePTag(checkboxlbl));
		putModel("checkboxelement", properties.get("checkboxelement", BOQSConstant.CHECKBOX_NAME));
		putModel("isRequired", isRequired);
		putModel("requiredmsg", properties.get("requiredmsg", BOQSConstant.REQUIRED_MSG));
	}
}