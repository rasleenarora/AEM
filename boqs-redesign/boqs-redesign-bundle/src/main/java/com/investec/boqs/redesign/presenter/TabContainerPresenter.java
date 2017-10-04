package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;

import com.investec.boqs.redesign.utils.CommonUtils;

public class TabContainerPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {
        // get value input from dialog and put value into model to use in jsp
        putModel("numberoftabs", properties.get("numberoftabs", "2"));
        putModel("internalcolumns", properties.get("internalcolumns", "1"));
      
        String firsttablabel = properties.get("firsttablabel", "");
        putModel("firsttablabel", firsttablabel);
        putModel("firsttabiconpath", properties.get("firsttabiconpath", ""));
        putModel("firstalternate", properties.get("firstalternate", firsttablabel));
        
        String secondtablabel = properties.get("secondtablabel", "");
        putModel("secondtablabel", secondtablabel);
        putModel("secondtabiconpath", properties.get("secondtabiconpath", ""));
        putModel("secondalternate", properties.get("secondalternate", secondtablabel));
        
        String thirdtablabel = properties.get("thirdtablabel", "");
        putModel("thirdtablabel", thirdtablabel);
        putModel("thirdtabiconpath", properties.get("thirdtabiconpath", ""));
        putModel("thirdalternate", properties.get("thirdalternate", thirdtablabel));
        
        String fourthtablabel = properties.get("fourthtablabel", "");
        putModel("fourthtablabel", fourthtablabel);
        putModel("fourthtabiconpath", properties.get("fourthtabiconpath", ""));
        putModel("fourthalternate", properties.get("fourthalternate", fourthtablabel));
        
        String tabActive = slingRequest.getParameter("id");
        putModel("tabActive", StringUtils.isBlank(tabActive) ? "1" : tabActive);
        
        // Generate tab IDs
        putModel("tabid1", CommonUtils.getRandomId("tab-id-1"));
        putModel("tabid2", CommonUtils.getRandomId("tab-id-2"));
        putModel("tabid3", CommonUtils.getRandomId("tab-id-3"));
        putModel("tabid4", CommonUtils.getRandomId("tab-id-4"));
    }
}