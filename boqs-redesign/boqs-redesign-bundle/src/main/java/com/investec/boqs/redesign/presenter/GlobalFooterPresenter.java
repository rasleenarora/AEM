package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.investec.boqs.redesign.bean.CustomXtype;
import com.investec.boqs.redesign.bean.CustomXtypeWithIcon;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.CustomXtypeUtils;
import com.investec.boqs.redesign.utils.CustomXtypeWithIconUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class GlobalFooterPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {
    	if(null == currentNode){
			return;
		}

        InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));
        // get value from dialog
        String[] listDistincBank = iProperties.getInherited("distincbanklinks", String[].class);
        String[] listExpertise = iProperties.getInherited("expertiselinks", String[].class);
        String[] listBoqSpecial = iProperties.getInherited("boqspecialistlinks", String[].class);
        String[] listCustom = iProperties.getInherited("customlist", String[].class);
        String[] mobileList = iProperties.getInherited("mobilelist", String[].class);

        List<CustomXtype> distincBankLinks = this.getCustomXtype(listDistincBank, slingRequest);
        List<CustomXtype> expertiseLinks = this.getCustomXtype(listExpertise, slingRequest);
        List<CustomXtype> boqSpecialistLinks = this.getCustomXtype(listBoqSpecial, slingRequest);
        List<CustomXtypeWithIcon> customList = this.getCustomXtypeWithIcon(listCustom, slingRequest);
        List<CustomXtype> mobileItems = this.getCustomXtype(mobileList, slingRequest);

        // put value to model to use in jsp
        putModel("distincbank", iProperties.getInherited("distincbank", "Distinctive Banking"));
        putModel("expertisehead", iProperties.getInherited("expertisehead", "Expertise"));
        putModel("boqspecialist", iProperties.getInherited("boqspecialist", "BOQ Specialist"));
        putModel("phoneicon", iProperties.getInherited("phoneicon", ""));
        putModel("phonenumber", iProperties.getInherited("phonenumber", "1300 131 141"));
        putModel("disclaimer", iProperties.getInherited("disclaimer", ""));

        putModel("distincbanklinks", distincBankLinks);
        putModel("expertiselinks", expertiseLinks);
        putModel("boqspecialistlinks", boqSpecialistLinks);
        putModel("customlist", customList);
        putModel("mobileItems", mobileItems);
    }

    /**
     * Get List Custom input from dialog
     * @param listCustomXtype
     * @param slingRequest
     * @return List Custom
     */
    public List<CustomXtypeWithIcon> getCustomXtypeWithIcon(String[] listCustomXtype, SlingHttpServletRequest slingRequest){
        List<CustomXtypeWithIcon> customList = new ArrayList<CustomXtypeWithIcon>();
        try{
            if(listCustomXtype != null){
                for (int i = 0; i < listCustomXtype.length; i++) {
                    if (!StringUtil.isEmpty(listCustomXtype[i])) {
                        CustomXtypeWithIcon custom = CustomXtypeWithIconUtils.getCustomXtypeWithIcon(listCustomXtype[i]);
                        custom.setLink(CommonUtils.getProperURL(custom.getLink(), slingRequest));
                        customList.add(custom);
                    }
                }
            }
        }catch(Exception e){
            LOG.error("Error getCustomXtypeWithIcon(String[], slingRequest):" + e.toString());
        }
        return customList;
    }

    /**
     * Get List distinctive bank, expertise, boqSpecialist input from dialog
     * @param listCustomXtype
     * @param slingRequest
     * @return list
     */
    public List<CustomXtype> getCustomXtype(String[] listCustomXtype, SlingHttpServletRequest slingRequest){
        List<CustomXtype> footerCustomList = new ArrayList<CustomXtype>();
        try{
            if(listCustomXtype != null){
                for (int i = 0; i < listCustomXtype.length; i++) {
                    if (!StringUtil.isEmpty(listCustomXtype[i])) {
                        CustomXtype footerCustom = CustomXtypeUtils.getCustomXtype(listCustomXtype[i]);
                        footerCustom.setLink(CommonUtils.getProperURL(footerCustom.getLink(), slingRequest));
                        footerCustomList.add(footerCustom);
                    }
                }
            }
        }catch(Exception e){
            LOG.error("Error getCustomXtype(String[], slingRequest):" + e.toString());
        }
        return footerCustomList;
    }
}