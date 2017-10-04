package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;

import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.bean.FilterListBean;
import com.investec.boqs.redesign.service.GetCardDetails;
import com.investec.boqs.redesign.utils.BOQSConstant;

public class DynamicResultCardCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		List<ResultCardBean> cardList = new ArrayList<ResultCardBean>();
		FilterListBean filterListBean = new FilterListBean();
		String pageContentType = properties.get(BOQSConstant.PAGE_CONTENT_TYPE, BOQSConstant.BLANK);
		String pagePath = properties.get(BOQSConstant.PAGE_PATH, BOQSConstant.BLANK);
		String currentPagePath = currentPage.getPath();
		if(!BOQSConstant.BLANK.equals(pageContentType)){
			String topics = slingRequest.getParameter(BOQSConstant.TOPICS);
			String relatedProfession = slingRequest.getParameter(BOQSConstant.RELATED_PROFESSION_PARAMETER);
			String relatedFinance = slingRequest.getParameter(BOQSConstant.FINANCE_PARAMETER);
			String relatedProducts = slingRequest.getParameter(BOQSConstant.RELATED_PRODUCT_PARAMETER);
			String states = slingRequest.getParameter(BOQSConstant.STATE_PARAMETER);
			
			filterListBean.setTopics(StringUtils.isNotEmpty(topics)? topics.split(BOQSConstant.PIPELINE_SEPARATOR) : null);
			filterListBean.setRelatedProfession(StringUtils.isNotEmpty(relatedProfession)? relatedProfession.split(BOQSConstant.PIPELINE_SEPARATOR) : null);
			filterListBean.setRelatedFinance(StringUtils.isNotEmpty(relatedFinance)? relatedFinance.split(BOQSConstant.PIPELINE_SEPARATOR) : null);
			filterListBean.setRelatedProducts(StringUtils.isNotEmpty(relatedProducts)? relatedProducts.split(BOQSConstant.PIPELINE_SEPARATOR) : null);
			filterListBean.setRelatedStates(StringUtils.isNotEmpty(states)? states.split(BOQSConstant.PIPELINE_SEPARATOR) : null);
			filterListBean.setPageContentType(pageContentType);
			
			final GetCardDetails cardDetailsService = sling.getService(GetCardDetails.class);
			cardList = cardDetailsService.getCardDetails(slingRequest,filterListBean,pagePath,currentPagePath);		
		}
		putModel("cardList", cardList);
	}

}
