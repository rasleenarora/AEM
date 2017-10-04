package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.utils.CommonUtils;

public class CategoryPresenter extends AbstractPresenter {

	List<ResultCardBean> browsedPagesList = new ArrayList<ResultCardBean>();
	List<HashMap<String, String>> authoredPagesList = new ArrayList<HashMap<String, String>>();

	@Override
	protected void process() throws RepositoryException {
		String title = properties.get("title", String.class);
		String content = properties.get("content", String.class);
		String categoryInfoType = properties.get("categoryInfoType", String.class);
		String[] browsedCategories = properties.get("browsedCategories", String[].class);
		String[] authoredCategories = properties.get("authoredCategories", String[].class);

		browsedPagesList = CommonUtils.getCardDetails(browsedCategories, slingRequest);
		authoredPagesList = CommonUtils.getMapFromJSON(authoredCategories, slingRequest);

		putModel("title", title);
		putModel("content", content);
		putModel("categoryInfoType", categoryInfoType);
		putModel("browsedCategories", browsedPagesList);
		putModel("authoredCategories", authoredPagesList);

	}

}
