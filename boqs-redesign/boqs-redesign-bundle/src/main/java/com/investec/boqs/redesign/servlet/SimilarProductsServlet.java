package com.investec.boqs.redesign.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.investec.boqs.redesign.bean.FilterListBean;
import com.investec.boqs.redesign.bean.FiltersStatus;
import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.service.SimilarProductsResult;
import com.investec.boqs.redesign.utils.BOQSConstant;

@SlingServlet(paths = { "/services/boqs-redesign/getSimilarProducts" }, methods = { "POST" }, extensions = { "json" })
public class SimilarProductsServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;
	private static final String CARD_INFO_SRC = "cardInfoSrc";
	private static final String FILTER_LIST = "filterList";
	private static final String NODE_PATH = "nodePath";
	protected final Logger LOG = LoggerFactory.getLogger(SimilarProductsServlet.class);
	List<ResultCardBean> similarProducts = new ArrayList<ResultCardBean>();

	@Reference(bind = "bindSearchClient", unbind = "unbindSearchClient")
	private SimilarProductsResult similarProductsResult;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
	

			FilterListBean filterListBean = new FilterListBean();

			List<ResultCardBean> similarProducts = new ArrayList<ResultCardBean>();
			Map<String,List<ResultCardBean>> products =new HashMap<String,List<ResultCardBean>>();
			FiltersStatus filtersStatus;
			String nodePath = request.getParameter(NODE_PATH);
			if (StringUtils.isNotEmpty(nodePath)) {
				ResourceResolver resolver = request.getResourceResolver();

				// Node properties
				Resource resource = resolver.getResource(nodePath);
				ValueMap properties = resource.adaptTo(ValueMap.class);
				String pathforSearch = properties.get(BOQSConstant.PAGE_PATH, BOQSConstant.BLANK);
				String cardInfoSrc = properties.get(CARD_INFO_SRC, BOQSConstant.BLANK);
				String[] appliedFilters = properties.get(FILTER_LIST, String[].class);
				filtersStatus = mapFilters(appliedFilters);

				String currentPagePath = nodePath.split(BOQSConstant.PATH_SEPARATOR + BOQSConstant.JCR_CONTENT)[0];
				// Page properties
				resource = resolver
						.getResource(currentPagePath.concat(BOQSConstant.PATH_SEPARATOR + BOQSConstant.JCR_CONTENT));
				properties = resource.adaptTo(ValueMap.class);
				filterListBean.setRelatedProfession(properties.get(BOQSConstant.RELATED_PROFESSION, String[].class));
				filterListBean.setRelatedProducts(properties.get(BOQSConstant.RELATED_PRODUCT, String[].class));
				filterListBean.setRelatedFinance(properties.get(BOQSConstant.RELATED_FINANCE, String[].class));
				filterListBean.setRelatedStates(properties.get(BOQSConstant.RELATED_STATE, String[].class));
				filterListBean.setTopics(properties.get(BOQSConstant.TOPICS, String[].class));
				filterListBean.setPageContentType(properties.get(BOQSConstant.PAGE_CONTENT_TYPE, String.class));

				similarProducts = similarProductsResult.getSimilarProducts(request, filterListBean, currentPagePath,
						pathforSearch, filtersStatus, cardInfoSrc);

				products.put("products",similarProducts);
			}

			Gson gson = new Gson();
			out.write(gson.toJson(products));
		
		
		out.flush();
		out.close();
	}

	protected void bindSearchClient(final SimilarProductsResult similarProductsResult) {
		this.similarProductsResult = similarProductsResult;
	}

	protected void unbindSearchClient(final SimilarProductsResult similarProductsResult) {
		if (this.similarProductsResult == similarProductsResult) {
			this.similarProductsResult = null;
		}
	}

	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	/**
	 * This method is used to map filters to FiltersStatus oject
	 * 
	 * @param filters
	 *            String array of applied filters to similar products comp
	 * @return FiltersStatus object
	 */
	private FiltersStatus mapFilters(String[] filters) {
		FiltersStatus filtersSatus = new FiltersStatus();
		if (filters != null) {
			for (String filter : filters) {
				if (BOQSConstant.PAGE_CONTENT_TYPE.equals(filter)) {
					filtersSatus.setPageContentType(true);
				} else if (BOQSConstant.RELATED_PROFESSION.equals(filter)) {
					filtersSatus.setRelatedProfession(true);
				} else if (BOQSConstant.RELATED_PRODUCT.equals(filter)) {
					filtersSatus.setRelatedProducts(true);
				} else if (BOQSConstant.RELATED_FINANCE.equals(filter)) {
					filtersSatus.setRelatedFinance(true);
				} else if (BOQSConstant.RELATED_STATE.equals(filter)) {
					filtersSatus.setRelatedStates(true);
				} else if (BOQSConstant.TOPICS.equals(filter)) {
					filtersSatus.setTopics(true);
				}
			}
		}
		return filtersSatus;

	}
}
