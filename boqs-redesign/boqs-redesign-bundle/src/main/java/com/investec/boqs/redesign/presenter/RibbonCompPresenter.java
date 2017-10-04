package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.CommonUtils;

public class RibbonCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		putModel("TitleLabel", properties.get("titlelabel", ""));
		putModel("FirstLabel", properties.get("firstlabel", ""));
		putModel("SecondLabel", properties.get("secondlabel", ""));
		putModel("ThirdLabel", properties.get("thirdlabel", ""));
		putModel("FourthLabel", properties.get("fourthlabel", ""));

		putModel("FirstIcon", properties.get("firsticonpath", ""));
		putModel("SecondIcon", properties.get("secondiconpath", ""));
		putModel("ThirdIcon", properties.get("thirdiconpath", ""));
		putModel("FourthIcon", properties.get("fourthiconpath", ""));

		putModel("FirstIconHover", properties.get("firsticonpathhover", ""));
		putModel("SecondIconHover", properties.get("secondiconpathhover", ""));
		putModel("ThirdIconHover", properties.get("thirdiconpathhover", ""));
		putModel("FourthIconHover", properties.get("fourthiconpathhover", ""));

		putModel("FirstLink", CommonUtils.getProperURL(properties.get("firstlink", ""), slingRequest));
		putModel("SecondLink", CommonUtils.getProperURL(properties.get("secondlink", ""), slingRequest));
		putModel("ThirdLink", CommonUtils.getProperURL(properties.get("thirdlink", ""), slingRequest));
		putModel("FourthLink", CommonUtils.getProperURL(properties.get("fourthlink", ""), slingRequest));

		putModel("defaultdesktopbackground", properties.get("defaultdesktopbackground", ""));
		putModel("defaultmobilebackground", properties.get("defaultmobilebackground", ""));
		putModel("firstdesktopbackground", properties.get("firstdesktopbackground", ""));
		putModel("firstmobilebackground", properties.get("firstmobilebackground", ""));
		putModel("seconddesktopbackground", properties.get("seconddesktopbackground", ""));
		putModel("secondmobilebackground", properties.get("secondmobilebackground", ""));
		putModel("thirddesktopbackground", properties.get("thirddesktopbackground", ""));
		putModel("thirdmobilebackground", properties.get("thirdmobilebackground", ""));
		putModel("fourthdesktopbackground", properties.get("fourthdesktopbackground", ""));
		putModel("fourthmobilebackground", properties.get("fourthmobilebackground", ""));

	}
}