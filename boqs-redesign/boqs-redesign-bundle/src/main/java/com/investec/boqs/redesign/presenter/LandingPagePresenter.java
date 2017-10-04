package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

public class LandingPagePresenter extends AbstractPresenter {

    @Override
    protected void process() throws RepositoryException {
        // put value to model to use in jsp
        putModel("fileReference", currentPage.getProperties().get("./fileReference", BOQSConstant.BLANK));
        putModel("landingpageicon", currentPage.getProperties().get("./landingpageicon", BOQSConstant.BLANK));
        putModel("landingpageiconurl", CommonUtils.getProperURL(currentPage.getProperties().get("./landingpageiconurl", BOQSConstant.BLANK), slingRequest));
        putModel("iconalt", currentPage.getProperties().get("./iconalt", BOQSConstant.BLANK));
        putModel("promoimagealt", currentPage.getProperties().get("./promoimagealt", BOQSConstant.BLANK));
        putModel("headingtext", currentPage.getProperties().get("./headingtext", BOQSConstant.BLANK));
        putModel("headingbackground", currentPage.getProperties().get("./headingbackground", BOQSConstant.BLANK));
    }
}