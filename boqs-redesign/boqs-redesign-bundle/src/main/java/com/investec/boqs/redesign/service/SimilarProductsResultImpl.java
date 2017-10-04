package com.investec.boqs.redesign.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.bean.FilterListBean;
import com.investec.boqs.redesign.bean.FiltersStatus;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.JcrUtils;

@Component(immediate = true, metatype = true, label = "Similar Products")
@Service(value = SimilarProductsResult.class)
public class SimilarProductsResultImpl implements SimilarProductsResult {
	protected final Logger LOG = LoggerFactory.getLogger(GetSearchResultImpl.class);
	private String boqsRedesignRootPage;

	@Reference
	QueryBuilder queryBuilder;

	@Activate
	public void activate(ComponentContext componentContext) {
		this.boqsRedesignRootPage = PropertiesUtil.toString(
				componentContext.getProperties().get(BOQSConstant.BOQS_REDESIGN_ROOT_PAGE_CONFIG),
				BOQSConstant.BOQS_REDESIGN_ROOT_PAGE);
	}

	/**
	 * This method is used to get all card details based on current page filters
	 * order by last-modified date
	 * 
	 * @param request
	 *            SlingRequest Object
	 * @param filterListBean
	 *            FilterListBean Object
	 * @param currentPagePath
	 *            Current Page path
	 * @param pagePath
	 *            Root page path to search
	 * @return List of ResultCardBean (List of card details)
	 */
	public List<ResultCardBean> getSimilarProducts(SlingHttpServletRequest request, FilterListBean filterListBean,
			String currentPagePath, String pathforSearch, FiltersStatus filtersStatus, String cardInfoSrc) {
		Session session = JcrUtils.getSession(request);
		List<ResultCardBean> similarProducts = new ArrayList<ResultCardBean>();
		ResourceResolver resourceResolver = request.getResourceResolver();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		Map<String, String> map = new HashMap<String, String>();
		String pageContentType = filterListBean.getPageContentType();
		boolean readCardFromPageProp = false;
		if (!BOQSConstant.CARD_COMP.equals(cardInfoSrc)) {
			readCardFromPageProp = true;
		}
		String pagePath = StringUtils.isNotBlank(pathforSearch) ? pathforSearch : boqsRedesignRootPage;
		map.put("path", pagePath);
		map.put("type", "cq:page");
		if (filtersStatus.isRelatedProfession() && filterListBean.getRelatedProfession() != null
				&& filterListBean.getRelatedProfession().length > 0) {
			map.put("1_group.1_property", BOQSConstant.RELATED_PROFESSION);
			getFilters(filterListBean.getRelatedProfession(), 1, map);
		}
		if (filtersStatus.isRelatedProducts() && filterListBean.getRelatedProducts() != null
				&& filterListBean.getRelatedProducts().length > 0) {
			map.put("2_group.2_property", BOQSConstant.RELATED_PRODUCT);
			getFilters(filterListBean.getRelatedProducts(), 2, map);
		}
		if (filtersStatus.isRelatedFinance() && filterListBean.getRelatedFinance() != null
				&& filterListBean.getRelatedFinance().length > 0) {
			map.put("3_group.3_property", BOQSConstant.RELATED_FINANCE);
			getFilters(filterListBean.getRelatedFinance(), 3, map);
		}
		if (filtersStatus.isRelatedStates() && filterListBean.getRelatedStates() != null
				&& filterListBean.getRelatedStates().length > 0) {
			map.put("4_group.4_property", BOQSConstant.RELATED_STATE);
			getFilters(filterListBean.getRelatedStates(), 4, map);
		}
		if (filtersStatus.isTopics() && filterListBean.getTopics() != null && filterListBean.getTopics().length > 0) {
			map.put("5_group.5_property", BOQSConstant.TOPICS);
			getFilters(filterListBean.getRelatedStates(), 5, map);
		}
		if (readCardFromPageProp) {
			if (filtersStatus.isPageContentType()) {
				map.put("6_group.6_property", BOQSConstant.PAGE_CONTENT_TYPE);
				map.put("6_group.6_property.1_value", pageContentType);
			}
			map.put("7_property", BOQSConstant.READ_CARD_DETAILS);
			map.put("7_property.operation", "exists");
			map.put("orderby", "@cq:lastModified");
			map.put("p.limit", String.valueOf(BOQSConstant.MAX_SIMILAR_PRODUCT_RESULTS + 1));
		} else {
			map.put("nodename", "resultcardcomp*");
			map.put("orderby", "@jcr:lastModified");
		}
		map.put("orderby.sort", "desc");

		Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
		SearchResult result = query.getResult();
		Page page;
		try {

			int count = 0;
			for (Hit hit : result.getHits()) {
				String path = hit.getPath();
				String correspondingPagePath = null;
				ResultCardBean resultCardBean = new ResultCardBean();
				String pageUrl = null;
				Resource resource = resourceResolver.getResource(path);
				if (resource != null) {
					ValueMap properties = resource.adaptTo(ValueMap.class);
					if (readCardFromPageProp) {
						correspondingPagePath = path.replace(BOQSConstant.PATH_SEPARATOR + BOQSConstant.JCR_CONTENT,
								"");
						String valuePath = CommonUtils.buildLinkPath(correspondingPagePath,"#");
						 pageUrl=request.getResourceResolver().map(valuePath);
						//pageUrl = CommonUtils.getProperURL(correspondingPagePath, request);
					} else {
						correspondingPagePath = properties.get(BOQSConstant.TARGET_URL) != null
								? properties.get(BOQSConstant.TARGET_URL).toString() : currentPagePath;
						page = pageManager.getPage(correspondingPagePath);
						// check pagecontenttype of the resultcard page
						if (filtersStatus.isPageContentType()) {
							if (page == null || !pageContentType
									.equals(page.getProperties().get(BOQSConstant.PAGE_CONTENT_TYPE))) {
								continue;
							}
						}
						 String valuePath = CommonUtils.buildLinkPath(properties.get(BOQSConstant.TARGET_URL).toString(),"#");
						 pageUrl=request.getResourceResolver().map(valuePath);
						//pageUrl = CommonUtils.getProperURL(
							//	properties.get(BOQSConstant.TARGET_URL, BOQSConstant.BLANK).toString(), request);

					}
					if (!correspondingPagePath.equals(currentPagePath)) {
						resultCardBean.setTitle(properties.get(BOQSConstant.TITLE, BOQSConstant.BLANK).toString());
						resultCardBean.setDescription(
								properties.get(BOQSConstant.DESCRIPTION, BOQSConstant.BLANK).toString());
						resultCardBean.setThumanailImage(
								properties.get(BOQSConstant.THUMBNAIL_IMAGE, BOQSConstant.BLANK).toString());
						resultCardBean.setAltText(properties.get(BOQSConstant.ALT_TEXT, BOQSConstant.BLANK).toString());
						resultCardBean.setPath(StringUtils.isNotBlank(pageUrl) ? pageUrl : BOQSConstant.SHARP);

						similarProducts.add(resultCardBean);
						count++;

						if (BOQSConstant.MAX_SIMILAR_PRODUCT_RESULTS == count) {
							break;
						}
					}

				}
			}
		}

		catch (RepositoryException e) {
			LOG.error(e.getMessage());
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		return similarProducts;
	}

	/**
	 * This method is used to get all card details based on current page filters
	 * order by last-modified date
	 * 
	 * @param filter
	 *            Array of filters
	 * @param groupindex
	 *            Group index for Xpath query
	 * @param map
	 *            map to set for Xpath query
	 * @return nothing
	 */
	private void getFilters(String[] filter, int groupindex, Map<String, String> map) {

		for (int i = 0; i < filter.length; i++) {
			map.put(groupindex + "_group." + groupindex + "_property." + (i + 1) + "_value", filter[i]);
		}
		if (filter != null && filter.length > 1) {
			map.put(groupindex + "_group.p.or", BOQSConstant.TRUE);
		}

	}
}
