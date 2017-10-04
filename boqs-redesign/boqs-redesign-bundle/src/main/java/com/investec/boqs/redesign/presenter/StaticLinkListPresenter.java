package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.CustomXtypeWithDesc;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.CustomXtypeWithDescUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class StaticLinkListPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {

        String[] listItems = properties.get("listitems", String[].class);
        List<CustomXtypeWithDesc> staticLinkItems = this.getCustomXtypeWithDesc(listItems, slingRequest);

        putModel("staticLinkItems", staticLinkItems);
        putModel("headinglbl", properties.get("headinglbl",""));
    }

    /**
     * Get List MenuItem input from dialog
     * @param listCustomXtype
     * @param slingRequest
     * @return List CustomXtype
     */
    public List<CustomXtypeWithDesc> getCustomXtypeWithDesc(String[] listLinkCustomXtype,SlingHttpServletRequest slingRequest){
        List<CustomXtypeWithDesc> linkCustomXtypes = new ArrayList<CustomXtypeWithDesc>();
        try{
            if(listLinkCustomXtype != null){
                for (int i = 0; i < listLinkCustomXtype.length; i++) {
                    if (!StringUtil.isEmpty(listLinkCustomXtype[i])) {
                        CustomXtypeWithDesc linkcustomXtype = CustomXtypeWithDescUtils.getCustomXtypeWithDesc(listLinkCustomXtype[i]);
                        linkcustomXtype.setUrl(CommonUtils.getProperURL(linkcustomXtype.getUrl(), slingRequest));
                        linkCustomXtypes.add(linkcustomXtype);
                    }
                }
            }
        }catch(Exception e){
            LOG.error("Error getCustomXtypeWithDesc(String[], slingRequest):" + e.toString());
        }
        return linkCustomXtypes;
    }
}