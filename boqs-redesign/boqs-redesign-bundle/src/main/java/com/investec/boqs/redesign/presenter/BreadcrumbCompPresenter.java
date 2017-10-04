package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;

public class BreadcrumbCompPresenter extends AbstractPresenter{

	@Override
	protected void process() throws RepositoryException {
		putModel("parentlevel", currentStyle.get("parentlevel", BOQSConstant.DEPTH_HOMEPAGE));
	}
	
}