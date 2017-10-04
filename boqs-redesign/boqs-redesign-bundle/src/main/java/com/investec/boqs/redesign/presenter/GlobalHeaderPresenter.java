package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.investec.boqs.redesign.bean.CustomXtype;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.CustomXtypeUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class GlobalHeaderPresenter extends AbstractPresenter {

    @Override
    protected void process() throws RepositoryException {
    	
    	if(null == currentNode){
			return;
		}
    	
        InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));
        
		final String loginlabel = iProperties.getInherited("loginlabel", String.class);
		final String loginUrl = iProperties.getInherited("loginUrl", String.class);
		final String registerUrl = iProperties.getInherited("registerUrl", String.class);
		final String registerlabel = iProperties.getInherited("registerlabel", String.class);
		final String eventsUrl = CommonUtils.getProperURL(iProperties.getInherited("eventsUrl", String.class), slingRequest);
		final String eventslabel = iProperties.getInherited("eventslabel", String.class);
        // get value input from dialog and put value into model to use in jsp
        // tab 1
        putModel("browseOfferLabel", iProperties.getInherited("browseOfferLabel",String.class));
        putModel("browseOfferUrl", CommonUtils.getProperURL(iProperties.getInherited("browseOfferUrl", String.class), slingRequest));
        putModel("findaspecialistUrl", CommonUtils.getProperURL(iProperties.getInherited("findaspecialistUrl", String.class), slingRequest));
        putModel("findaspecialistLabel", iProperties.getInherited("findaspecialistLabel", String.class));
        putModel("contactuslabel", CommonUtils.getProperURL(iProperties.getInherited("contactuslabel", ""), slingRequest));
        putModel("contactusurl", CommonUtils.getProperURL(iProperties.getInherited("contactusurl", ""), slingRequest));
        putModel("aboutuslabel", iProperties.getInherited("aboutuslabel", "About Us"));
        putModel("aboutusurl", CommonUtils.getProperURL(iProperties.getInherited("aboutusurl", ""), slingRequest));
        putModel("phonenumber", iProperties.getInherited("phonenumber", "1300 131 141"));
        putModel("phonenumberTrim", iProperties.getInherited("phonenumber", "1300 131 141").replaceAll(" ", ""));
        String[] mobileOnly = iProperties.getInherited("mobileonlylist", String[].class);
        List<CustomXtype> mobileOnlyList = this.getCustomXtype(mobileOnly, slingRequest);
        putModel("mobileonlylist", mobileOnlyList);

        // tab 2
        putModel("onlinebankinglabel", iProperties.getInherited("onlinebankinglabel", "Online Banking"));
        putModel("onlinebankingurl",  CommonUtils.getProperURL(iProperties.getInherited("onlinebankingurl", ""), slingRequest));
        putModel("onlinebankingmobileurl",  CommonUtils.getProperURL(iProperties.getInherited("onlinebankingmobileurl", ""), slingRequest));
        putModel("notamemberlabel", iProperties.getInherited("notamemberlabel", "Not a member?"));
        putModel("registerlabel2", iProperties.getInherited("registerlabel2", "Register"));
        putModel("registerurl",  CommonUtils.getProperURL(iProperties.getInherited("registerurl", ""), slingRequest));

        // tab 3
        putModel("welcomebacklabel", iProperties.getInherited("welcomebacklabel", "Welcome back"));
        putModel("closelabel", iProperties.getInherited("closelabel", "Close"));
        putModel("message", iProperties.getInherited("message", "The last time you visited, you were looking at:"));
        putModel("registerlabel3", iProperties.getInherited("registerlabel3", "Register"));
        putModel("returnlabel", iProperties.getInherited("returnlabel", "Return to this page"));

        putModel("menuItemCompPath", currentPage.getPath() + "/jcr:content/menuitemscomp");
        // tab4
		

		putModel("loginlabel", loginlabel);
		putModel("registerlabel", registerlabel);
		putModel("loginUrl", loginUrl);
		putModel("registerUrl", registerUrl);
		putModel("eventslabel", eventslabel);
		putModel("eventsUrl", eventsUrl);
		putModel("logolabel", iProperties.getInherited("logolabel", BOQSConstant.BOQS_SPECIALIST));
		putModel("logoicon", iProperties.getInherited("registerlabel3", String.class));
    }

    /**
     * Get List distinctive bank, expertise, boqSpecialist input from dialog
     * 
     * @param listCustomXtype
     * @param slingRequest
     * @return list
     */
    public List<CustomXtype> getCustomXtype(String[] listCustomXtype, SlingHttpServletRequest slingRequest) {
        List<CustomXtype> footerCustomList = new ArrayList<CustomXtype>();
        try {
            if (listCustomXtype != null) {
                for (int i = 0; i < listCustomXtype.length; i++) {
                    if (!StringUtil.isEmpty(listCustomXtype[i])) {
                        CustomXtype footerCustom = CustomXtypeUtils.getCustomXtype(listCustomXtype[i]);
                        footerCustom.setLink(CommonUtils.getProperURL(footerCustom.getLink(), slingRequest));
                        footerCustomList.add(footerCustom);
                    }
                }
            }
        } catch (Exception e) {
            LOG.error("Error getCustomXtype(String[], slingRequest):" + e.toString());
        }
        return footerCustomList;
    }
}
