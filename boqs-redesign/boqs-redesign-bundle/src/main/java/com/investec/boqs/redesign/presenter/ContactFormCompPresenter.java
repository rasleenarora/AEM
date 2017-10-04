package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

public class ContactFormCompPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {
        //General Tab
    	String formMode = properties.get("formmode", BOQSConstant.EEMBEDDED_MODE);
        putModel("formmode", formMode);
        putModel("formheading", properties.get("formheading", BOQSConstant.FORM_HEADING_LBL));
        putModel("requiredsignlbl", properties.get("requiredsignlbl", BOQSConstant.REQUIRED_SIGN_LBL));
        putModel("submitbtnlbl", properties.get("submitbtnlbl", BOQSConstant.SUBMIT_BUTTON_LBL));
        putModel("errormsg", properties.get("errormsg", ""));
        putModel("yourcontactlbl", properties.get("yourcontactlbl", BOQSConstant.YOUR_CONTACT_LBL));
        
        putModel("ctabuttonlbl", properties.get("ctabuttonlbl", BOQSConstant.CTA_BUTTON_LBL));
        putModel("buttonstyle", properties.get("buttonstyle", "primary"));
		putModel("buttonalignment", properties.get("buttonalignment", "center"));
		putModel("addtopmargin", properties.get("addtopmargin", false));
        putModel("adobeCampaignUrl", properties.get("adobeCampaignUrl", null));
        putModel("enableUnsubscription", properties.get("enableUnsubscription", false));

        //download tab properties
        putModel("enableDownload", properties.get("enableDownload", false));
        putModel("downloadLinkId", properties.get("downloadLinkId", String.class));
        putModel("downloadLinkLabel", properties.get("downloadLinkLabel", "Download"));
        putModel("downloadUrl", properties.get("downloadUrl", String.class));


		String result = slingRequest.getParameter("result");
		Boolean showMessage = false;
        //adding this variable to check whether the storage of values into the JCR and sending the email has been successful or not
        boolean success = false;
		if (StringUtils.isNotBlank(result)) {
			if ("1".equals(result)) {
				// Tab 3
				putModel("popupheading", properties.get("confirmationheading", BOQSConstant.THANKYOU_HEADING));
				putModel("popupmsg", properties.get("confirmationmsg", BOQSConstant.BLANK));
				putModel("popupbtnlbl", properties.get("continuebtnlbl", BOQSConstant.CONTINUE_BTN_LBL));
				showMessage = true;
                success = true;
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
        putModel("success", success);
        
        putModel("isEmbedded", BOQSConstant.EEMBEDDED_MODE.equals(formMode));

        // Generate Ids
//        putModel("contactButtonId", CommonUtils.getRandomId("contact-button"));
//        putModel("submitSuccessId", CommonUtils.getRandomId("submit-success"));
        
        putModel("contactButtonId", "contact-button");
        putModel("submitSuccessId", "submit-success");
    }
    
}