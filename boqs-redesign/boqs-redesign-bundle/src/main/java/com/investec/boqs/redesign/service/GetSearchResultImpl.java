package com.investec.boqs.redesign.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import javax.jcr.query.Row;
import javax.jcr.query.RowIterator;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.investec.boqs.redesign.bean.CustomXtype;
import com.investec.boqs.redesign.bean.SearchFilter;
import com.investec.boqs.redesign.bean.SearchResultBean;
import com.investec.boqs.redesign.bean.SearchResults;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;
import com.investec.boqs.redesign.utils.JcrUtils;
import com.investec.boqs.redesign.utils.WCMUtil;

@Component(immediate = true, metatype = true, label = "Search Service Client")
@Service(value = GetSearchResult.class)
public class GetSearchResultImpl implements GetSearchResult {

	private static final String TEXT = "text";
	private static final String VALUE = "value";
	private String resultslabel = "Result";
	private int startOfBreadcrumb = 2;
	private boolean paginationRequired = true;
	private int numberOfResultsPerPage = 10;
	private String boqsRedesignRootPage = "/content/boqs-live";
	private int maxResult = 10000;
	private String noResultMessage = "No result";

	protected final Logger LOG = LoggerFactory.getLogger(GetSearchResultImpl.class);

	@Activate
	public void activate(ComponentContext componentContext) {
		this.boqsRedesignRootPage = PropertiesUtil
				.toString(componentContext.getProperties().get("boqs.redesign.root.page"), boqsRedesignRootPage);
		this.maxResult = PropertiesUtil.toInteger(componentContext.getProperties().get("boqs.redesign.max.result"),
				maxResult);
		if (!boqsRedesignRootPage.endsWith("/")) {
			boqsRedesignRootPage = boqsRedesignRootPage + "/";
		}
	}

	public SearchResults search(SlingHttpServletRequest request) {
		SearchResults searchResults = new SearchResults();
		try {
			getSearchProperties(request, searchResults);

			long start = 0;
			long pageNum = 1;
			String pageNumStr = request.getParameter(BOQSConstant.PAGE_NUMBER_PARAMETER);

			if (StringUtils.isNumeric(pageNumStr)) {
				pageNum = Integer.parseInt(pageNumStr);
				start = (pageNum - 1) * numberOfResultsPerPage;
				start = start > 0 ? start : 0;
			}

			searchResults.setCurrentPage(pageNum);

			String keyword = StringUtils.isNotBlank(request.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER))
					? StringEscapeUtils.escapeXml(request.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER)) : "";

			if (StringUtils.isNotBlank(keyword)) {
				searchWithJcr(start, keyword, getAllFilters(request), request, searchResults);
			}
			buildResultLabel(searchResults);

		} catch (Exception e) {
			LOG.error("Exception", e);
		}

		// LOG.error("Search count: " + searchResults.getResultCount());

		return searchResults;
	}

	/**
	 * Get all filters from request
	 * 
	 * @param request
	 * @return
	 */
	private List<SearchFilter> getAllFilters(SlingHttpServletRequest request) {
		List<SearchFilter> filters = new ArrayList<SearchFilter>();

		// Related Profession
		filters.add(getSearchFilter(BOQSConstant.RELATED_PROFESSION_PARAMETER, "relatedprofessions",
				BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION, request));

		// Result Type
		filters.add(getSearchFilter(BOQSConstant.TYPE_PARAMETER, "pagecontenttype", BOQSConstant.ALL_RESULT_TYPE_OPTION,
				request));

		// Finance
		filters.add(getSearchFilter(BOQSConstant.FINANCE_PARAMETER, "relatedfinancecategories",
				BOQSConstant.ALL_FINANCE_CATEGORY_OPTION, request));

		// Related Product
		filters.add(getSearchFilter(BOQSConstant.RELATED_PRODUCT_PARAMETER, "relatedproducttypes",
				BOQSConstant.ALL_RELATED_PRODUCT_OPTION, request));

		return filters;
	}

	/**
	 * Get {@link SearchFilter} by parameter
	 * 
	 * @param parameter
	 * @param attributeName
	 * @param optionAll
	 * @param request
	 * @return
	 */
	private SearchFilter getSearchFilter(String parameter, String attributeName, String optionAll,
			SlingHttpServletRequest request) {
		String parameterValue = StringUtils.isNotBlank(request.getParameter(parameter))
				? StringEscapeUtils.escapeXml(request.getParameter(parameter)) : "";
		String[] parameterArr = null;
		if (StringUtils.isNotBlank(parameterValue) && !parameterValue.contains(optionAll)) {
			parameterArr = parameterValue.split("\\|");
		}
		return new SearchFilter(attributeName, parameterArr);
	}

	/**
	 * Build Result label, if Result count equal 0, no result message will be
	 * used
	 * 
	 * @param searchResults
	 */
	private void buildResultLabel(SearchResults searchResults) {

		if (searchResults.getResultCount() == 0) {
			searchResults.setResultslabel(noResultMessage);
		} else {
			StringBuilder resultLabel = new StringBuilder(searchResults.getResultslabel());
			resultLabel.append(" ");
			resultLabel.append((searchResults.getCurrentPage() - 1) * searchResults.getNumberToDisplay() + 1);
			resultLabel.append(" - ");
			long end = searchResults.getCurrentPage() * searchResults.getNumberToDisplay();
			resultLabel.append(end < searchResults.getResultCount() ? end : searchResults.getResultCount());
			resultLabel.append(" of ");
			resultLabel.append(searchResults.getResultCount());

			searchResults.setResultslabel(resultLabel.toString());
		}
	}

	/**
	 * Get all search properties that store in request or in the search result
	 * component properties.
	 * 
	 * @param request
	 * @param searchResults
	 */
	private void getSearchProperties(SlingHttpServletRequest request, SearchResults searchResults) {

		Object searchPage = request.getAttribute(BOQSConstant.SEARCH_PAGE_PARAMETER);
		if (StringUtils.isNotBlank((String) searchPage)) {
			String searchNode = searchPage + "/jcr:content/searchresultcomp";
			ValueMap properties = CommonUtils.getValueMap(request, searchNode);

			if (null != properties) {
				resultslabel = properties.get("resultslabel", "Results");
				startOfBreadcrumb = properties.get("startofbreadcrumbinresultssection", 2);
				paginationRequired = properties.get("paginationrequired", true);
				numberOfResultsPerPage = properties.get("numberofresultsperpage", 10);
				noResultMessage = properties.get("noresultmessage", "No result");
			}

			if (!paginationRequired) {
				// if paginationRequired = false, all the results are shown at
				// once, no pagination will be present.
				numberOfResultsPerPage = maxResult;
			}
		}

		searchResults.setPaginationRequired(paginationRequired);
		searchResults.setStartOfBreadcrumb(startOfBreadcrumb);
		searchResults.setResultslabel(resultslabel);
		searchResults.setNumberToDisplay(numberOfResultsPerPage);
	}

	/**
	 * Search, all search result will store in {@link SearchResults} object
	 * 
	 * @param start
	 * @param numtodisplay
	 * @param keyword
	 * @param resourceResolver
	 */
	private void searchWithJcr(long start, String keyword, List<SearchFilter> filters, SlingHttpServletRequest request,
			SearchResults searchResults) {
		try {

			Session session = JcrUtils.getSession(request);
			QueryManager queryManager = session.getWorkspace().getQueryManager();
			StringBuilder strQuery = createQueryJcr(keyword, filters);

			// LOG.error("Search query: " + strQuery.toString());

			javax.jcr.query.Query query = queryManager.createQuery(strQuery.toString(), "xpath");
			searchResults.setResultCount(countRow(strQuery, keyword, session));

			query.setOffset(start);
			query.setLimit(numberOfResultsPerPage);
			QueryResult results = query.execute();

			ResourceResolver resourceResolver = request.getResourceResolver();
			PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
			RowIterator rit = results.getRows();
			List<SearchResultBean> listSearchResults = new ArrayList<SearchResultBean>();
			while (rit.hasNext()) {
				SearchResultBean searchResult = new SearchResultBean();

				Row row = rit.nextRow();
				String path = row.getValue("jcr:path").getString();
				try {

					Page page = pageManager.getPage(path);
					searchResult.setUrl(request.getResourceResolver().map(page.getPath() + BOQSConstant.DOT_HTML));
					searchResult.setTitle(StringEscapeUtils.escapeHtml4(page.getTitle()));
					searchResult.setDescription(StringEscapeUtils.escapeHtml4(page.getDescription()));
					// searchResult.setDescription(path + "<br>" +
					// strQuery.toString());
					searchResult.setIconPath(page.getProperties().get("pageicon", ""));
					searchResult.setBreadcrumbItems(buildBreadcrumb(page, request));

					listSearchResults.add(searchResult);
				} catch (Exception e) {
					LOG.error(e.toString() + ", Parse node error: Path: " + path);
				}
			}
			searchResults.setSearchResultBeans(listSearchResults);
		} catch (Exception e) {
			LOG.error("search() error: " + e.toString());
		}
	}

	/**
	 * Create breadcrumb items
	 * 
	 * @param page
	 * @param request
	 * @return
	 * @throws PathNotFoundException
	 * @throws RepositoryException
	 */
	private List<CustomXtype> buildBreadcrumb(Page page, SlingHttpServletRequest request)
			throws PathNotFoundException, RepositoryException {
		List<CustomXtype> list = new ArrayList<CustomXtype>();
		Page start = page.getAbsoluteParent(startOfBreadcrumb);
		if (null == start) {
			return list;
		}

		Page parent = page.getParent();
		if (null != parent && start.getPath().length() > parent.getPath().length()) {
			return list;
		}
		while (null != parent && !parent.getPath().equals(start.getPath())) {
			CustomXtype customXtype = new CustomXtype();
			customXtype.setHeading(WCMUtil.getPageTitle(parent));
			customXtype.setLink(request.getResourceResolver().map(parent.getPath() + BOQSConstant.DOT_HTML));
			list.add(customXtype);
			parent = parent.getParent();
		}

		CustomXtype customXtype = new CustomXtype();
		customXtype.setHeading(WCMUtil.getPageTitle(parent));
		customXtype.setLink(request.getResourceResolver().map(parent.getPath() + BOQSConstant.DOT_HTML));
		list.add(customXtype);

		// reverse the list
		Collections.reverse(list);
		return list;
	}

	/**
	 * Create the XPath and apply filters for searching result
	 * 
	 * @param keyword
	 * @param filters
	 * @return
	 */
	private StringBuilder createQueryJcr(String keyword, List<SearchFilter> filters) {
		StringBuilder strQuery = new StringBuilder();
		strQuery.append("/jcr:root");
		strQuery.append(boqsRedesignRootPage);
		strQuery.append("/*[");
		strQuery.append("( @jcr:primaryType = 'cq:Page'");
		strQuery.append(" and not(jcr:content/@excludeinternalsearch))");
		strQuery.append(" and (	jcr:contains(., '" + keyword + "')");
		strQuery.append(")");

		// add filters
		for (SearchFilter filter : filters) {
			strQuery.append(createFilter(filter.getAttributeName(), filter.getFilters()));
		}

		strQuery.append("] ");

		return strQuery;
	}

	/**
	 * Apply filters for searching result.
	 * 
	 * @param attributeName
	 * @param filtersKeys
	 * @return
	 */
	private String createFilter(String attributeName, String[] filtersKeys) {
		StringBuilder strQuery = new StringBuilder("");
		if (null != filtersKeys) {
			strQuery.append(" and (");
			boolean isFirst = true;
			for (String filterKey : filtersKeys) {
				if (isFirst) {
					strQuery.append(" jcr:content/@" + attributeName + " = '" + filterKey + "'");
					isFirst = false;
				} else {
					strQuery.append(" or jcr:content/@" + attributeName + " = '" + filterKey + "'");
				}
			}
			strQuery.append(") ");
		}

		return strQuery.toString();
	}

	/**
	 * Get total result count
	 * 
	 * @param strQuery
	 * @param keyword
	 * @param session
	 * @return
	 */
	public long countRow(StringBuilder strQuery, String keyword, Session session) {
		long totalRow = 0;
		try {
			QueryManager queryManager = session.getWorkspace().getQueryManager();
			javax.jcr.query.Query query = queryManager.createQuery(strQuery.toString(), "xpath");
			query.setLimit(maxResult);
			totalRow = query.execute().getRows().getSize();
		} catch (Exception e) {
			LOG.error("countRow(keyword) error: " + e.getMessage());
		}
		return totalRow;
	}

	/**
	 * Get results for auto suggestion
	 * 
	 * @param request
	 * @return list of values for auto-suggestions
	 */
	public List<HashMap<String, String>> getAutoSuggestions(SlingHttpServletRequest request) {

		ResourceResolver resourceResolver = request.getResourceResolver();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		List<HashMap<String, String>> autoSuggestionsResults = new ArrayList<HashMap<String, String>>();
		Set<String> suggestionSet = new LinkedHashSet<String>();
		String key = StringUtils.isNotEmpty(request.getParameter(BOQSConstant.KEY))
				? request.getParameter(BOQSConstant.KEY).toLowerCase() : BOQSConstant.BLANK;
		if (StringUtils.isNotEmpty(key)) {		
		String maxsuggestions = request.getParameter(BOQSConstant.MAX_RESULTS_OF_AUTO_SUGGESTIONS);
		int maxAutoSuggestionResults = StringUtils.isNotEmpty(maxsuggestions) ? Integer.parseInt(maxsuggestions) : BOQSConstant.MAX_NUMBER_OF_AUTO_SUGGESTIONS;
		Session session = JcrUtils.getSession(request);		
			try {
				QueryManager queryManager = session.getWorkspace().getQueryManager();
				StringBuilder strQuery = new StringBuilder();
				strQuery.append("/jcr:root");
				strQuery.append(boqsRedesignRootPage);
				strQuery.append("/*[");
				strQuery.append("( @jcr:primaryType = 'cq:Page'");
				strQuery.append(" and not(jcr:content/@excludeinternalsearch))");
				strQuery.append(" and (jcr:like(fn:lower-case(@jcr:content/pageTitle)," + "'" + key + "%')");
				strQuery.append(" or jcr:like(fn:lower-case(@jcr:content/jcr:title)," + "'" + key + "%')");
				strQuery.append(" or jcr:like(fn:lower-case(@jcr:content/navTitle)," + "'" + key + "%')");
				strQuery.append(")");

				List<SearchFilter> filters = getAllFilters(request);
				// add filters
				for (SearchFilter filter : filters) {
					strQuery.append(createFilter(filter.getAttributeName(), filter.getFilters()));
				}

				strQuery.append("] ");
				javax.jcr.query.Query query = queryManager.createQuery(strQuery.toString(), "xpath");
				QueryResult results = query.execute();
				RowIterator rit = results.getRows();

				int count = 0;

				while (rit.hasNext()) {
					Row row = rit.nextRow();
					String path = row.getValue("jcr:path").getString();
					Page page = pageManager.getPage(path);
					HashMap<String, String> searchResults = new HashMap<String, String>();
					
					 String valuePath = CommonUtils.buildLinkPath(page.getPath(),"#");
					 String pageUrl=request.getResourceResolver().map(valuePath);
					if (page != null) {
						if (page.getPageTitle() != null && page.getPageTitle().toLowerCase().startsWith(key)) {
							suggestionSet.add(page.getPageTitle());
							// avoid duplication
							if (suggestionSet.size() > count) {
								searchResults.put(TEXT, page.getPageTitle());
								searchResults.put(VALUE, pageUrl);
								autoSuggestionsResults.add(searchResults);
								count++;
							}

						} else if (page.getTitle() != null && page.getTitle().toLowerCase().startsWith(key)) {
							suggestionSet.add(page.getTitle());
							// avoid duplication
							if (suggestionSet.size() > count) {
								searchResults.put(TEXT, page.getTitle());
								searchResults.put(VALUE, pageUrl);
								autoSuggestionsResults.add(searchResults);
								count++;
							}

						} else if (page.getNavigationTitle() != null
								&& page.getNavigationTitle().toLowerCase().startsWith(key)) {
							suggestionSet.add(page.getNavigationTitle());
							// avoid duplication
							if (suggestionSet.size() > count) {
								searchResults.put(TEXT, page.getNavigationTitle());
								searchResults.put(VALUE, pageUrl);
								autoSuggestionsResults.add(searchResults);
								count++;
							}

						}

						if (autoSuggestionsResults.size() > maxAutoSuggestionResults) {
							break;
						}
					}
				}

			} catch (RepositoryException e) {
				LOG.error(e.getMessage());
			}
		}
		return autoSuggestionsResults;
	}

}