package com.investec.boqs.redesign.service;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.bean.FilterListBean;
import com.investec.boqs.redesign.bean.FiltersStatus;

public interface SimilarProductsResult {

	/**
	 * Get results for similar products that match with filters in {@link SlingHttpServletRequest}
	 * @param request
	 * @return
	 */
	List<ResultCardBean> getSimilarProducts(SlingHttpServletRequest request,FilterListBean pagePropertiesFilter,String currentPagePath,
			String pathforSearch,FiltersStatus filtersStatus,String cardInfoSrc);
}
