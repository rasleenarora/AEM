package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

public class ContentCarouselCompPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {

    	List<String> panelPathList = new ArrayList<String>();
        String[] listPanelPages = properties.get("panelpages", new String[]{""});
        for (String panelPagePath : listPanelPages) {
        	panelPathList.add(panelPagePath + "/jcr:content/par_content/panelcomp");
        }
        
        // check condition to set automatic transition
        String automatic = properties.get("automatictransition","");
        putModel("automatictransition", String.valueOf("yes".equals(automatic)));

        // put value to model to use in jsp
        putModel("panelPathList", panelPathList);
    }
}