package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.CustomXtype;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.CustomXtypeUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class HomePageSpecialityPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {

        // get value from dialog
        String[] speciality = properties.get("specialitybuttonlist", String[].class);

        List<CustomXtype> specialityButtonList = this
                .getCustomXtype(speciality, slingRequest);
        int sizeList = specialityButtonList.size();
        int leftList = 0;
        int rightList = 0;
        try {
            if (sizeList != 0) {
                if (sizeList % 2 == 0) {
                    leftList = (sizeList / 2) - 1;
                } else
                    leftList = sizeList / 2;
            }
            rightList = leftList + 1;
        } catch (NumberFormatException e) {
            LOG.error("Error spilit size of list specialityButtonList ):" + e.toString());
        }

        // put value to model to use in jsp
        putModel("specialityheading", properties.get("specialityheading", ""));
        putModel("seeallspecialitieslabel", properties.get("seeallspecialitieslabel", ""));
        putModel("seeallspecialitiestargeturl",
                CommonUtils.getProperURL(
                    properties.get("seeallspecialitiestargeturl", ""), slingRequest));
        putModel("specialitybuttonlist", specialityButtonList);
        putModel("leftList", leftList);
        putModel("rightList", rightList);
        putModel("margintop", properties.get("margintop", false));
    }

    /**
     * Get list Speciality Button List input from dialog
     * @param listCustomXtype
     * @param slingRequest
     * @return list
     */
    public List<CustomXtype> getCustomXtype(
            String[] listCustomXtype, SlingHttpServletRequest slingRequest) {
        List<CustomXtype> customList = new ArrayList<CustomXtype>();
        try {
            if (listCustomXtype != null) {
                for (int i = 0; i < listCustomXtype.length; i++) {
                    if (!StringUtil.isEmpty(listCustomXtype[i])) {
                        CustomXtype custom = CustomXtypeUtils
                                .getCustomXtype(listCustomXtype[i]);
                        custom.setLink(CommonUtils.getProperURL(custom.getLink(), slingRequest));
                        customList.add(custom);
                    }
                }
            }
        } catch (Exception e) {
            LOG.error("Error getCustomXtype(String[], slingRequest):" + e.toString());
        }
        return customList;
    }
}