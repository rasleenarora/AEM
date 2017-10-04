package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.commons.lang.math.RandomUtils;

import com.investec.boqs.redesign.utils.CommonUtils;

public class ExpandableContentAreaComponentCompPresenter extends AbstractPresenter{

	@Override
	protected void process() throws RepositoryException {
		
		putModel("componentalignment", properties.get("componentalignment", "left").replaceAll("left", ""));
		putModel("width", properties.get("width", "12"));
		String visiblecontent = properties.get("visiblecontent", "");
		putModel("visiblecontent", CommonUtils.removePTag(visiblecontent));
		putModel("hiddencontent", properties.get("hiddencontent", ""));
		putModel("contenttype", properties.get("contenttype", ""));
		putModel("visiblecontenttextstyle", properties.get("visiblecontenttextstyle", ""));
		putModel("collapseId", "" + RandomUtils.nextInt(1000));
	}
	
}