package com.investec.boqs.redesign.presenter;

import java.util.Date;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.WCMUtil;

public class EventDetailsCompPresenter extends AbstractPresenter {

    @Override
    protected void process() throws RepositoryException {
        // put value to model to use in jsp
        Date startDate = currentPage.getProperties().get("./startdatetime", Date.class);
        Date endDate = currentPage.getProperties().get("./enddatetime", Date.class);
        String startEndDate = CommonUtils.formatDateTime(startDate,endDate);
        putModel("startdatetime", startEndDate);
        putModel("startDate", startDate);
        putModel("endDate", endDate);

        putModel("location", currentPage.getProperties().get("./location", BOQSConstant.BLANK));
        putModel("fulladdress", currentPage.getProperties().get("./fulladdress", BOQSConstant.BLANK));
        putModel("eventtype", currentPage.getProperties().get("./eventtype", BOQSConstant.BLANK));
        putModel("fileReference", currentPage.getProperties().get("./eventFileReference", BOQSConstant.BLANK));
        putModel("shortdescription", currentPage.getProperties().get("./shortdescription", BOQSConstant.BLANK));
        
        String registrationStatus = currentPage.getProperties().get("./registrationstatus", BOQSConstant.REGISTRATION_STATUS_OPEN);
        putModel("registrationstatus", registrationStatus);
        
        boolean isDisplayRegistration = true;
        
        if(BOQSConstant.REGISTRATION_STATUS_OPEN.equals(registrationStatus)){
        	putModel("registrationstatusheading", currentPage.getProperties().get("./registrationstatusheadingopen", BOQSConstant.BLANK));
            putModel("registrationstatustext", currentPage.getProperties().get("./registrationstatustextopen", BOQSConstant.BLANK));
            putModel("registerbutton", currentPage.getProperties().get("./registerbuttonopen", BOQSConstant.BLANK));
            	
        } else if(BOQSConstant.REGISTRATION_STATUS_WAITING_LIST.equals(registrationStatus)) {
	        putModel("registrationstatusheading", currentPage.getProperties().get("./registrationstatusheadingwaitinglist", BOQSConstant.BLANK));
	        putModel("registrationstatustext", currentPage.getProperties().get("./registrationstatustextwaitinglist",BOQSConstant.BLANK));
	        putModel("registerbutton", currentPage.getProperties().get("./registrationbuttonwaitinglist", BOQSConstant.BLANK));
        } else {
        	isDisplayRegistration = false;
        }
        
        putModel("isDisplayRegistration", isDisplayRegistration);
        
        putModel("featuredevent", currentPage.getProperties().get("./featuredevent", false));
        putModel("additionalinfoforregisteredusers", currentPage.getProperties().get("./additionalinfoforregisteredusers", BOQSConstant.BLANK));
        
        putModel("eventRegistrationConfigPath", currentPage.getProperties().get("./registrationpagepath", BOQSConstant.EVENT_REGISTRATION_CONFIG_PAGE) + BOQSConstant.EVENT_REGISTRATION_CONFIG_PATH);
        putModel("eventRegistrationConfigPage", currentPage.getProperties().get("./registrationpagepath", BOQSConstant.EVENT_REGISTRATION_CONFIG_PAGE) + ".html");
        putModel("eventTitle", WCMUtil.getPageTitle(currentPage));
        putModel("eventPage", currentPage.getPath());
        putModel("eventimagealt", currentPage.getProperties().get("./eventimagealt", BOQSConstant.BLANK));
    }
}