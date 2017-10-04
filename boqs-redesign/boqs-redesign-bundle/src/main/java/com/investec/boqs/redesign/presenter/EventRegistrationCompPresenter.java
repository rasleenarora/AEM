package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class EventRegistrationCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		// Tab 1
		putModel("registerheading", properties.get("registerheading", BOQSConstant.REGISTER_HEADING));
		putModel("requiredsigntext", properties.get("requiredsigntext", BOQSConstant.REQUIRED_SIGN_TEXT));
		putModel("instruction", properties.get("instruction", BOQSConstant.BLANK));
		putModel("submitbuttontext", properties.get("submitbuttontext", BOQSConstant.SUBMIT_BUTTON_TEXT));
		putModel("cancelbuttontext", properties.get("cancelbuttontext", BOQSConstant.CANCEL_BUTTON_TEXT));
		putModel("errormsg", properties.get("errormsg", BOQSConstant.BLANK));

		// Tab 2
		String contentpath = properties.get("contentpath", currentPage.getPath());
		String[] mailToList = properties.get("mailto", String[].class);
		String[] ccList = properties.get("cc", String[].class);
		String[] bccList = properties.get("bbc", String[].class);

		putModel("contentpath", contentpath);
		putModel("mailToList", mailToList);
		putModel("ccList", ccList);
		putModel("bccList", bccList);
		putModel("subject", properties.get("subject", BOQSConstant.BLANK));

		String eventName = slingRequest.getParameter("eventName");
		String result = slingRequest.getParameter("result");
		Boolean showMessage = false;
		if (StringUtils.isNotBlank(result)) {

			if ("1".equals(result)) {
				// Tab 3
				putModel("popupheading", properties.get("confirmationheading", BOQSConstant.CONFIRMATION_HEADING) + " " + eventName);
				putModel("popupmsg", properties.get("confirmationmsg", BOQSConstant.BLANK));
				putModel("popupbtnlbl", properties.get("continuebtnlbl", BOQSConstant.CONTINUE_BTN_LBL));
				showMessage = true;
			}

			if ("-1".equals(result)) {
				// Tab 4
				putModel("popupheading", properties.get("exceptionheading", BOQSConstant.BLANK));
				putModel("popupmsg", properties.get("exceptionmsg", BOQSConstant.BLANK));
				putModel("popupbtnlbl", properties.get("exceptionbtnlbl", BOQSConstant.CONTINUE_BTN_LBL));
				showMessage = true;
			}
		}
		putModel("showMessage", showMessage);

	}
}