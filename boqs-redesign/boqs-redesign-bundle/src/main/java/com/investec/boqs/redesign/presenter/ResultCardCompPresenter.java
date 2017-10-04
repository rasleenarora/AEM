package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.CustomXtype;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.CustomXtypeUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class ResultCardCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		// Tab 1
		putModel("headinglbl", properties.get("headinglbl", ""));
		putModel("headingtargeturl", CommonUtils.getProperURL(properties.get("headingtargeturl", ""), slingRequest));
		putModel("iconpath", properties.get("iconpath", ""));
		putModel("thumbnailimage", properties.get("fileReference", ""));
		putModel("alternatetext", properties.get("alternatetext", ""));
		putModel("content", properties.get("content", ""));
		// Tab 2
		putModel("mainbuttonlbl", properties.get("mainbuttonlbl", "More details"));
		putModel("targeturl", CommonUtils.getProperURL(properties.get("targeturl", ""), slingRequest));
		String[] additionalButton = properties.get("additionalbuttonlist", String[].class);
		List<CustomXtype> additionalButtonList = this.getCustomXtype(additionalButton, slingRequest);
		putModel("additionalButtonList", additionalButtonList);

		// Tab 3
		String[] relatedProfessionsList = properties.get("relatedprofessions", String[].class);
		String[] relatedProductTypesList = properties.get("relatedproducttypes", String[].class);
		String[] relatedFinanceCategorysList = properties.get("relatedfinancecategorys", String[].class);
		String[] relatedStatesList = properties.get("relatedstates", String[].class);

		putModel("relatedProfessionsList", getFilterString(relatedProfessionsList));
		putModel("relatedProductTypesList", getFilterString(relatedProductTypesList));
		putModel("relatedFinanceCategorysList", getFilterString(relatedFinanceCategorysList));
		putModel("relatedStatesList", getFilterString(relatedStatesList));

		Object idCardObj = slingRequest.getAttribute("idCard");
		Long idCard = 0L;
		if (null != idCardObj) {
			idCard = (Long) idCardObj;
		}
		putModel("idCard", idCard + 1);
	}

	private String getFilterString(String[] filterArr) {
		StringBuilder sb = new StringBuilder("");
		if (null != filterArr) {
			for (int i = 0; i < filterArr.length; i++) {
				sb.append(filterArr[i]);
				if (i < filterArr.length - 1) {
					sb.append("|");
				}
			}
		}
		return sb.toString();
	}

	/**
	 * Get List distinctive bank, expertise, boqSpecialist input from dialog
	 * 
	 * @param listCustomXtype
	 * @param slingRequest
	 * @return list
	 */
	public List<CustomXtype> getCustomXtype(String[] listCustomXtype, SlingHttpServletRequest slingRequest) {
		List<CustomXtype> additionalButtonList = new ArrayList<CustomXtype>();
		try {
			if (listCustomXtype != null) {
				for (int i = 0; i < listCustomXtype.length; i++) {
					if (!StringUtil.isEmpty(listCustomXtype[i])) {
						CustomXtype additionalButton = CustomXtypeUtils.getCustomXtype(listCustomXtype[i]);
						additionalButton.setLink(CommonUtils.getProperURL(additionalButton.getLink(), slingRequest));
						additionalButtonList.add(additionalButton);
					}
				}
			}
		} catch (Exception e) {
			LOG.error("Error getCustomXtype(String[], slingRequest):" + e.toString());
		}
		return additionalButtonList;
	}
}