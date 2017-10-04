package com.investec.boqs.redesign.service;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.bean.FilterListBean;

public interface GetCardDetails {

	public List<ResultCardBean> getCardDetails(SlingHttpServletRequest request,FilterListBean filterListBean,String pagePath,String currentPagePath);
}
