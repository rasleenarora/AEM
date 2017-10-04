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
import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.bean.FilterListBean;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.JcrUtils;

@Component(immediate = true, metatype = true, label = "Get Card Details")
@Service(value = GetCardDetails.class)
public class GetCardDetailsImpl implements GetCardDetails {
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
	 * This method is used to get all pages based on content type order by
	 * last-modified date
	 * 
	 * @param request
	 *            SlingRequest Object
	 * @param filterListBean
	 *            FilterListBean Object
	 * @param pagePath
	 *            Root page path to search
	 * @return SearchResult Object
	 */

	public SearchResult getResult(SlingHttpServletRequest request, FilterListBean filterListBean, String pagePath) {
		boqsRedesignRootPage = StringUtils.isNotBlank(pagePath) ? pagePath : boqsRedesignRootPage;

		Session session = JcrUtils.getSession(request);
		Map<String, String> map = new HashMap<String, String>();
		String pageContentType = filterListBean.getPageContentType();
		map.put("path", boqsRedesignRootPage);
		map.put("type", "cq:page");
		if (StringUtils.isNotBlank(pageContentType)) {
			map.put("1_property",BOQSConstant.PAGE_CONTENT_TYPE);
			map.put("1_property.value", pageContentType);
		}
		map.put("2_property",BOQSConstant.READ_CARD_DETAILS);
		map.put("2_property.operation", "exists");
		map.put("orderby", "@cq:lastModified");
		map.put("orderby.sort", "desc");
		map.put("p.limit", "-1");

		Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
		SearchResult result = query.getResult();

		return result;
	}
	/**
	 * This method is used to get card details dynamically based on page content type
	 * 
	 * @param request
	 *            SlingRequest Object
	 * @param filterListBean
	 *            FilterListBean Object
	 * @param pagePath
	 *            Root page path to search
	 * @param currentPagePath
	 *           Current Page Path
	 * @return SearchResult Object
	 */

	public List<ResultCardBean> getCardDetails(SlingHttpServletRequest request, FilterListBean filterListBean,
			String pagePath, String currentPagePath) {
		List<ResultCardBean> cardList = new ArrayList<ResultCardBean>();
		ResourceResolver resourceResolver = request.getResourceResolver();

		SearchResult result = getResult(request, filterListBean, pagePath);
		try {
			for (Hit hit : result.getHits()) {
				String path = hit.getPath();
				String pageURL = StringUtils.isNotEmpty(hit.getPath())
						? hit.getPath().replace(BOQSConstant.PATH_SEPARATOR + BOQSConstant.JCR_CONTENT, "")
						: BOQSConstant.BLANK;
				ResultCardBean resultCardBean = new ResultCardBean();
				Resource resource = resourceResolver.getResource(path);
				if (resource != null && !pageURL.equals(currentPagePath)) {
					ValueMap properties = resource.adaptTo(ValueMap.class);
					resultCardBean.setTitle(properties.get(BOQSConstant.TITLE, BOQSConstant.BLANK).toString());
					resultCardBean
							.setDescription(properties.get(BOQSConstant.DESCRIPTION, BOQSConstant.BLANK).toString());
					resultCardBean.setThumanailImage(
							properties.get(BOQSConstant.THUMBNAIL_IMAGE, BOQSConstant.BLANK).toString());
					resultCardBean.setAltText(properties.get(BOQSConstant.ALT_TEXT, BOQSConstant.BLANK).toString());
					pageURL = CommonUtils.getProperURL(pageURL, request);
					resultCardBean.setPath(StringUtils.isNotBlank(pageURL) ? pageURL : BOQSConstant.SHARP);
					resultCardBean.setRelatedProfession(
							convertArraytoString(properties.get(BOQSConstant.RELATED_PROFESSION, String[].class)));
					resultCardBean.setRelatedProduct(
							convertArraytoString(properties.get(BOQSConstant.RELATED_PRODUCT, String[].class)));
					resultCardBean.setRelatedFinance(
							convertArraytoString(properties.get(BOQSConstant.RELATED_FINANCE, String[].class)));
					resultCardBean.setTopics(convertArraytoString(properties.get(BOQSConstant.TOPICS, String[].class)));
					resultCardBean
							.setStates(convertArraytoString(properties.get(BOQSConstant.RELATED_STATE, String[].class)));
					resultCardBean
							.setPageContentType(properties.get(BOQSConstant.PAGE_CONTENT_TYPE, BOQSConstant.BLANK));
					cardList.add(resultCardBean);
				}
			}
		} catch (RepositoryException e) {
			LOG.error(e.getMessage());
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		return cardList;
	}
	/**
	 * This method is used to get card details dynamically based on page content type
	 * 
	 * @param property
	 *            Array of String values
	 * @return String. Property values separated by pipeline separator
	 */
	private String convertArraytoString(String[] property) {
		String propertyValue = BOQSConstant.BLANK;
		if (property != null) {
			for (int i = 0; i < property.length; i++) {
				if (i == 0) {
					propertyValue = property[i];
				} else {
					propertyValue = propertyValue.concat(BOQSConstant.PIPELINE_SEPARATOR + property[i]);
				}
			}
		}
		return propertyValue;

	}

}