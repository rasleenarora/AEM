package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class TestimonialsCompPresenter extends AbstractPresenter {

    @Override
    protected void process() throws RepositoryException {
        //get value from dialog and put model into jsp
        putModel("personimage", properties.get("fileReference",""));
        putModel("alternatetext", properties.get("alternatetext",""));
        putModel("imageframe", properties.get("imageframe","Circle"));
        putModel("quotetext", properties.get("quotetext",""));
        putModel("personname", properties.get("personname",""));
        putModel("personrole", properties.get("personrole",""));
    }
}
