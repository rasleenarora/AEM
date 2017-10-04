package com.investec.boqs.redesign.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.investec.boqs.redesign.bean.EventResultBean;
import com.investec.boqs.redesign.bean.EventResults;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

@Component(immediate = true, metatype = true, label = "Search Event Service Client")
@Service(value = GetEventResult.class)
public class GetEventResultImpl implements GetEventResult {

	protected final Logger LOG = LoggerFactory.getLogger(GetEventResultImpl.class);

	@Activate
	public void activate(ComponentContext componentContext) {
	}

	private String rootPage;
	private Boolean resultsBasedOnUrlParameters;
	private String eventCalendarNodePath;

	public EventResults getEventResult(SlingHttpServletRequest request) {
		EventResults eventResults = new EventResults();
		try {
			ValueMap eventCalendarProperties = parseEventResults(eventResults, request);

			if (eventCalendarProperties == null) {
				LOG.debug("Event calendar is null");
				return eventResults;
			}
			
			List<EventResultBean> resultList = new ArrayList<EventResultBean>();
			List<Page> eventPage = getAllEvents(eventCalendarProperties, request);
			if (eventPage == null) {
				LOG.debug("No events found");
				return eventResults;
			}
			
			for (Page page : eventPage) {
				EventResultBean eventResultBean = CommonUtils.parseEvent(page, request);
				if (null != eventResultBean) {
					resultList.add(eventResultBean);
				}
			}
			Collections.sort(resultList);
			eventResults.setEventResults(resultList);
		} catch (Exception e) {
			LOG.error("Error when get list events: " + e.getMessage());
		}
		return eventResults;
	}

	/**
	 * Parse the results to {@link EventResults}
	 * 
	 * @param eventResults
	 * @param request
	 * @return
	 * @throws Exception
	 */
	private ValueMap parseEventResults(EventResults eventResults, SlingHttpServletRequest request) throws Exception {

		String eventCalendarNodePathParam = request.getParameter(BOQSConstant.EVENT_CALENDAR_NODE_PATH_PARAMETER);
		if (StringUtils.isNotBlank(eventCalendarNodePathParam)) {
			eventCalendarNodePath = eventCalendarNodePathParam;
		}
		
		ValueMap eventCalendarProperties = CommonUtils.getValueMap(request, eventCalendarNodePath);
		
		if (eventCalendarProperties == null) {
			return null;
		}
		
		rootPage = eventCalendarProperties.get("parentpage", "");

		eventResults.setFeatureEventsLabel(eventCalendarProperties.get("featuredeventslabel", "Featured Events"));
		eventResults.setMoreDetailText(eventCalendarProperties.get("moredetailsbuttonlabel", "More Events"));
		eventResults.setRegisterLabel(eventCalendarProperties.get("registerbuttonlabel", "Register"));
		eventResults.setPaginateResult(eventCalendarProperties.get("paginateresults", "no").equals("yes"));
		eventResults.setNumberOfResultPerPage(eventCalendarProperties.get("noofresultsperpage", 10));
		resultsBasedOnUrlParameters = eventCalendarProperties.get("resultsbasedonurlparameters", "no").equals("yes");
		eventResults.setResultBasedInUrlParameter(resultsBasedOnUrlParameters);

		eventResults.setCondensedView(eventCalendarProperties.get("condensedview", "no").equals("yes"));
		eventResults.setLoadMoreLabelInCondensedView(eventCalendarProperties.get("loadmoreeventslabelincondensedview", "Load more events"));
		eventResults.setNumberOfResultToShowInCondensedView(eventCalendarProperties.get("noofresultstoshowincondensedview", 10));
		eventResults.setLoadMoreUrlInCondensedView(CommonUtils.getProperURL(eventCalendarProperties.get("targeturl", ""), request));
		return eventCalendarProperties;
	}

	/**
	 * Get all children pages form parent path
	 * 
	 * @param parentpath
	 * @return
	 */
	private List<Page> getAllEvents(ValueMap eventCalendarProperties, SlingHttpServletRequest request) {
		List<Page> pages = new ArrayList<Page>();
		try {

			PageManager pageManager = request.getResourceResolver().adaptTo(PageManager.class);
			Page page = null;

			if (StringUtils.isNotBlank(rootPage)) {
				page = pageManager.getPage(rootPage);
			}

			if (page != null) {
				Iterator<Page> iterable = page.listChildren();
				if (iterable != null) {
					while (iterable.hasNext()) {
						Page childPage = iterable.next();
						if (checkFilter(childPage, eventCalendarProperties, request)) {
							pages.add(childPage);
						}
					}
				}
			}
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}
		return pages;
	}

	/**
	 * Check filter for each page
	 * 
	 * @param childPage
	 * @param request
	 * @return
	 */
	private boolean checkFilter(Page childPage, ValueMap eventCalendarProperties, SlingHttpServletRequest request) {

		ValueMap properties = childPage.getProperties();
		
		// check event detail has define or not
		if (null != properties && StringUtils.isNotBlank(properties.get("startdatetime", "")) 
				&& StringUtils.isNotBlank(properties.get("eventtype", ""))
				&& "event".equalsIgnoreCase(properties.get("pagecontenttype", "general-other"))) {

			// check related professtion
			String relatedProfessions = getSearchFilter(BOQSConstant.RELATED_PROFESSION_PARAMETER, BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION, request);
			if (!resultsBasedOnUrlParameters) {
				relatedProfessions = eventCalendarProperties.get("professionfilter", BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION);
			}
			boolean relatedProfessionsCheck = StringUtils.isBlank(relatedProfessions) || BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION.equals(relatedProfessions);
			if (!relatedProfessionsCheck) {
				String[] relatedProfessionsArr = properties.get("relatedprofessions", String[].class);
				if (null != relatedProfessionsArr) {
					for (String relatedProf : relatedProfessionsArr) {
						relatedProfessionsCheck = relatedProfessionsCheck || relatedProfessions.equals(relatedProf);
					}
				}
			}

			// check event type
			String eventType = getSearchFilter(BOQSConstant.TYPE_EVENT_PARAMETER, BOQSConstant.ALL_EVENT_OPTION, request);
			String[] eventTypeArr = null;
			boolean eventTypeCheck = StringUtils.isBlank(eventType);
			if (!resultsBasedOnUrlParameters) {
				eventTypeArr = eventCalendarProperties.get("eventtypefilter", String[].class);
				eventTypeCheck = null == eventTypeArr;
			} else {
				eventTypeArr = eventType.split("\\|");
			}

			if (!eventTypeCheck) {
				for (String et : eventTypeArr) {
					eventTypeCheck = eventTypeCheck || et.equals(properties.get("eventtype", BOQSConstant.ALL_EVENT_OPTION));
				}
			}

			// check related state
			String relatedStates = getSearchFilter(BOQSConstant.STATE_PARAMETER, BOQSConstant.ALL_STATES_OPTION, request);
			if (!resultsBasedOnUrlParameters) {
				relatedStates = eventCalendarProperties.get("statefilter", BOQSConstant.ALL_STATES_OPTION);
			}
			boolean relatedStatesCheck = StringUtils.isBlank(relatedStates) || BOQSConstant.ALL_STATES_OPTION.equals(relatedStates);
			if (!relatedStatesCheck) {
				String[] relatedStatesArr = properties.get("relatedstates", String[].class);
				if (null != relatedStatesArr) {
					for (String relatedState : relatedStatesArr) {
						relatedStatesCheck = relatedStatesCheck || relatedStates.equals(relatedState);
					}
				}
			}

			// check date range
			Date startDate = properties.get("./startdatetime", Date.class);
			Date endDate = properties.get("./enddatetime", Date.class);
			boolean dateRangeCheck = checkDateRange(startDate, endDate, eventCalendarProperties, request);

			return relatedProfessionsCheck && eventTypeCheck && relatedStatesCheck && dateRangeCheck;
		}

		return false;
	}

	/**
	 * Check Date range
	 * 
	 * @param startDatea
	 * @param endDate
	 * @param request
	 * @return
	 */
	private Boolean checkDateRange(Date startDate, Date endDate, ValueMap eventCalendarProperties, SlingHttpServletRequest request) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(BOQSConstant.DATE_FORMAT_FILTER);
		SimpleDateFormat simpleDateFormatEventCal = new SimpleDateFormat(BOQSConstant.DATE_FORMAT_FILTER_EVENT_CALENDAR);
		if (null != startDate && null != endDate) {
			Date start = null;
			Date end = null;

			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.HOUR, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);
			Date today = cal.getTime();

			try {
				if (resultsBasedOnUrlParameters) {
					String dateRange = StringUtils.isNotBlank(request.getParameter(BOQSConstant.DATE_RANGE_PARAMETER)) ? StringEscapeUtils.escapeXml(request
							.getParameter(BOQSConstant.DATE_RANGE_PARAMETER)) : "";
					if (StringUtils.isBlank(dateRange)) {
						return true;
					}

					if (dateRange.contains("|")) {
						String[] range = dateRange.split("\\|");
						start = BOQSConstant.TODAY.equals(range[0].toLowerCase()) ? today : simpleDateFormat.parse(range[0]);
						end = BOQSConstant.TODAY.equals(range[1].toLowerCase()) ? today : simpleDateFormat.parse(range[1]);
					}
				} else {
					String startStr = eventCalendarProperties.get("startdate", "");
					if (StringUtils.isNotBlank(startStr)) {
						start = simpleDateFormatEventCal.parse(startStr);
					} else {
						start = today;
					}
					String endStr = eventCalendarProperties.get("enddate", "");
					if (StringUtils.isNotBlank(endStr)) {
						end = simpleDateFormatEventCal.parse(endStr);
					}
				}

				if (null == start) {
					return false;
				}

				long startTime = start.getTime();

				if (null == end) {
					return startDate.getTime() < startTime;
				}

				long endTime = end.getTime() + 1000 * 60 * 60 * 24 - 1;

				if (endTime < startTime) {
					return false;
				}

				return (startTime < startDate.getTime() && startDate.getTime() < endTime) || (startTime < endDate.getTime() && endDate.getTime() < endTime)
						|| (startDate.getTime() < startTime && endTime < endDate.getTime());

			} catch (Exception e) {
				LOG.error("Error when check date range: " + e.toString());
			}
		}

		return false;
	}

	/**
	 * Get Filter from URL parameter
	 * 
	 * @param parameter
	 * @param optionAll
	 * @param request
	 * @return
	 */
	private String getSearchFilter(String parameter, String optionAll, SlingHttpServletRequest request) {
		String parameterValue = StringUtils.isNotBlank(request.getParameter(parameter)) ? StringEscapeUtils.escapeXml(request.getParameter(parameter)) : "";
		if (StringUtils.isNotBlank(parameterValue) && !parameterValue.contains(optionAll)) {
			return parameterValue;
		}
		return "";
	}
}