package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.FormUtil;

public class TextareaCompPresenter extends AbstractPresenter{

	@Override
	protected void process() throws RepositoryException {
		String strRequired = properties.get("isrequire",BOQSConstant.NO_VALUE);
		boolean isRequired = false;
		if (BOQSConstant.YES_VALUE.equals(strRequired)){
			isRequired = true;
		}
		String textareaName = properties.get("textareaelement", BOQSConstant.ADDITIONAL_DETAIL_NAME);
		putModel("textarealbl",properties.get("textarealbl", BOQSConstant.ADDITIONAL_DETAIL_LBL));
		putModel("requiredmessage", properties.get("requiredmessage", "It is required."));
		putModel("textareaName", textareaName);
		putModel("isRequired", isRequired);
	}
	
}