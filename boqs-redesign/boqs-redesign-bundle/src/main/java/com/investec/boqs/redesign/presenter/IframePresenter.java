package com.investec.boqs.redesign.presenter;

import com.investec.boqs.redesign.utils.CommonUtils;

import javax.jcr.RepositoryException;

/**
 * Created by rayadav1 on 10/02/2016.
 */
public class IframePresenter extends AbstractPresenter {
    @Override
    protected void process() throws RepositoryException {

        //putting the values of the dialog into slingRequest context
        putModel("iframeSrc", CommonUtils.getProperURL(properties.get("iframeSrc", ""), slingRequest));
        putModel("height", properties.get("height", Integer.class));
        putModel("alignment", properties.get("alignment", "left"));
        putModel("width", properties.get("width", Integer.class));

    }
}
