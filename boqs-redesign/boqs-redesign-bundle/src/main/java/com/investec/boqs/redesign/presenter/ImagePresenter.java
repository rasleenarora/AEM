package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.CommonUtils;

public class ImagePresenter extends AbstractPresenter{

    @Override 
    protected void process() throws RepositoryException {
        putModel("imageSrc", properties.get("fileReference",""));
        
        String mobileRenditionName = properties.get("mobilerenditionname", "");
        putModel("fileReferenceMobile", CommonUtils.getImageRenditons(properties.get("fileReference", ""), mobileRenditionName, slingRequest));
		putModel("fileReferenceDesktop", properties.get("fileReference", ""));

        putModel("imageTitle", properties.get("jcr:title",""));
        putModel("imageAlt", properties.get("alt",""));
        putModel("linkURL", CommonUtils.getProperURL(properties.get("linkURL",""), slingRequest));
        putModel("width", properties.get("width",""));
        putModel("height", properties.get("height",""));
    }
}