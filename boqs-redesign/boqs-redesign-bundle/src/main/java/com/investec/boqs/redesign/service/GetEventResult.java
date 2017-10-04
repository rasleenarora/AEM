package com.investec.boqs.redesign.service;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.EventResults;

/**
 * Get all events that match with filters for event calendar
 */
public interface GetEventResult {
	
	/**
	 * Get all events that match with filters in {@link SlingHttpServletRequest}
	 * @param request
	 * @return
	 */
	EventResults getEventResult(SlingHttpServletRequest request);
}