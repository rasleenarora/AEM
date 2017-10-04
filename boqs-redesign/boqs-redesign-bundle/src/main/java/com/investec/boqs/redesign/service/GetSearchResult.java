package com.investec.boqs.redesign.service;

import java.util.HashMap;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.SearchResults;

/**
 * Get all search result that match with filters
 */
public interface GetSearchResult {
	
	/**
	 * Get all search result that match with filters in {@link SlingHttpServletRequest}
	 * @param request
	 * @return
	 */
	SearchResults search(SlingHttpServletRequest request);
	
	/**
	 * Get results for auto suggestions that match with filters in {@link SlingHttpServletRequest}
	 * @param request
	 * @return
	 */
	List<HashMap<String, String>> getAutoSuggestions(SlingHttpServletRequest request);
}