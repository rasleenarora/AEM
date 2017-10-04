package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.investec.boqs.redesign.bean.CustomXtypeWithIcon;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.CustomXtypeWithIconUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class MenuItemsPresenter extends AbstractPresenter{

    @Override 
    protected void process() throws RepositoryException {

    	if(null == currentNode){
			return;
		}
    	
        InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));
        String[] listGlobalMenu = iProperties.getInherited("globalmenu", String[].class);
        String[] listLocalMenu = properties.get("localmenu", String[].class);
        List<CustomXtypeWithIcon> globalMenu = this.getCustomXtypeWithIcon(listGlobalMenu, slingRequest);
        List<CustomXtypeWithIcon> localMenu = this.getCustomXtypeWithIcon(listLocalMenu, slingRequest);

        putModel("globalMenu", globalMenu);
        putModel("localMenu", localMenu);
        putModel("layout", properties.get("layout","vertical"));
        
	   	String mobileRenditionName = iProperties.getInherited("mobilerenditionname", "");
	   	String hoverRenditionName = iProperties.getInherited("hoverrenditionname", "");
	   	
	   	String mobileImgPath = StringUtils.isBlank(mobileRenditionName) ? "" : BOQSConstant.IMAGE_RENDITION_PATH + mobileRenditionName;
	   	String whileImgPath = StringUtils.isBlank(hoverRenditionName) ? "" : BOQSConstant.IMAGE_RENDITION_PATH + hoverRenditionName;
	   	
        putModel("mobileImgPath", mobileImgPath);
        putModel("whileImgPath", whileImgPath);
        
        putModel("localSize", localMenu.size());
    }
    
    /**
     * Get List MenuItem input from dialog
     * @param listCustomXtype
     * @param slingRequest
     * @return List CustomXtype
     */
    public List<CustomXtypeWithIcon> getCustomXtypeWithIcon(String[] listCustomXtype,SlingHttpServletRequest slingRequest){
        List<CustomXtypeWithIcon> customXtypes = new ArrayList<CustomXtypeWithIcon>();
        try{
            if(listCustomXtype != null){
                for (int i = 0; i < listCustomXtype.length; i++) {
                    if (!StringUtil.isEmpty(listCustomXtype[i])) {
                        CustomXtypeWithIcon customXtype = CustomXtypeWithIconUtils.getCustomXtypeWithIcon(listCustomXtype[i]);
                        customXtype.setLink(CommonUtils.getProperURL(customXtype.getLink(), slingRequest));
                        customXtypes.add(customXtype);
                    }
                }
            }
        }catch(Exception e){
            LOG.error("Error getCustomXtypeWithIcon(String[], slingRequest):" + e.toString());
        }
        return customXtypes;
    }
}