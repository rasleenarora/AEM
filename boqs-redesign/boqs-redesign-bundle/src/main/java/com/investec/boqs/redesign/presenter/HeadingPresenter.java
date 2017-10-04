package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class HeadingPresenter extends AbstractPresenter{

    @Override 
    protected void process() throws RepositoryException {
        putModel("heading", properties.get("heading",""));
        putModel("headingtype", properties.get("headingtype","h2"));
        String style = properties.get("style","none");
        putModel("style", "none".equals(style) ? "" : style);
        putModel("dontshowintoc", properties.get("dontshowintoc", false) ? " dont-show-in-toc" : "");
    }
}