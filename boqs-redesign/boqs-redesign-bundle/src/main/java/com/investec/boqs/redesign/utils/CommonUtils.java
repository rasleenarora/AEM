package com.investec.boqs.redesign.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.foundation.Image;
import com.investec.boqs.redesign.bean.ResultCardBean;
import com.investec.boqs.redesign.bean.EventResultBean;

public class CommonUtils {
	private static final Logger LOG = LoggerFactory
			.getLogger(CommonUtils.class);

	private CommonUtils() {
	}

	
	/**
     * Build a link based on different input criteria
     *
     * @param link
     * @param hashTag
     * @return
     */
    public static String buildLinkPath(final String link, final String hashTag) {
        String fullLinkPath = "#";

        if (StringUtils.startsWith(link, "http")
                || StringUtils.startsWith(link, "/content/dam")) {
            fullLinkPath = link;
            if (StringUtils.isNotBlank(hashTag)) {
                fullLinkPath = fullLinkPath + "#" + hashTag;
            }
        } else if (StringUtils.equals("#", link)) {
            fullLinkPath = link;
            if (StringUtils.isNotBlank(hashTag)) {
                fullLinkPath = fullLinkPath + hashTag;
            }
        } else if (StringUtils.startsWith(link, "#")) {
            fullLinkPath = link;
        } else if (StringUtils.contains(link, ".html")) {
            fullLinkPath = StringUtils.isNotBlank(hashTag) ? link + "#" + hashTag : link;
        } else {
            fullLinkPath = StringUtils.isNotBlank(hashTag) ? link + ".html"
                    + "#" + hashTag : link + ".html";

        }
        return fullLinkPath;
    }

	/**
	 * This method gives proper URL.
	 * 
	 * @param url
	 * @return Returns proper URL.
	 */
	public static String getProperURL(final String url,
			final SlingHttpServletRequest slingRequest) {

		String properURL = url;

		HttpServletRequest request = (HttpServletRequest) slingRequest;

		if (url != null && slingRequest.getResourceResolver() != null
				&& request != null && !url.isEmpty()) {
			// check for absolute path
			final int protocolIndex = url.indexOf(":/");
			final int queryIndex = url.indexOf('?');
			if (protocolIndex > -1
					&& (queryIndex == -1 || queryIndex > protocolIndex)) {
				properURL = url;
			}
			if (!url.startsWith("/content/") || url.startsWith("/content/dam/")) {
				properURL = url;
			} else {
				properURL = slingRequest.getResourceResolver()
						.map(request, url) + BOQSConstant.DOT_HTML;
			}
		}
		return properURL;
	}

	public static String getImageRenditons(String imagePath,
			String renditionName, final SlingHttpServletRequest request) {

		if (StringUtils.isBlank(renditionName)) {
			return imagePath;
		}

		String renditionPath = imagePath + BOQSConstant.IMAGE_RENDITION_PATH
				+ renditionName;

		ResourceResolver resolver = request.getResourceResolver();
		Resource resource = resolver.getResource(renditionPath);

		if (null == resource) {
			return imagePath;
		}

		return renditionPath;
	}

	public static ValueMap getValueMap(SlingHttpServletRequest request,
			Node node) {
		ValueMap properties = null;
		try {
			if (node != null) {
				ResourceResolver resolver = request.getResourceResolver();
				Resource resource = resolver.getResource(node.getPath());
				properties = resource.adaptTo(ValueMap.class);
			}
		} catch (Exception ex) {
		}
		return properties;
	}

	public static ValueMap getValueMap(SlingHttpServletRequest request,
			String nodePath) {
		ValueMap properties = null;
		try {
			ResourceResolver resolver = request.getResourceResolver();
			Resource resource = resolver.getResource(nodePath);
			properties = resource.adaptTo(ValueMap.class);
		} catch (Exception ex) {
		}
		return properties;
	}

	/**
	 * formate date
	 * 
	 * @param startDate
	 * @param endDate
	 */
	public static String formatDateTime(Date startDate, Date endDate) {
		DateFormat simpleDateFormat = new SimpleDateFormat(
				"EEE dd MMMMMMMMM yyyy");
		DateFormat endTime = new SimpleDateFormat("hh:mma");
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
		String format = BOQSConstant.BLANK;
		if (startDate != null && endDate != null) {
			if (dateFormat.format(endDate).compareTo(
					dateFormat.format(startDate)) > 0) {
				format = simpleDateFormat.format(startDate) + ", "
						+ endTime.format(startDate).toLowerCase()
						+ BOQSConstant.HYPHEN
						+ simpleDateFormat.format(endDate) + ", "
						+ endTime.format(endDate).toLowerCase();
			} else if (dateFormat.format(endDate).compareTo(
					dateFormat.format(startDate)) == 0) {
				if (endTime.format(endDate)
						.compareTo(endTime.format(startDate)) != 0) {
					format = simpleDateFormat.format(startDate) + ", "
							+ endTime.format(startDate).toLowerCase()
							+ BOQSConstant.HYPHEN_HTML
							+ endTime.format(endDate).toLowerCase();
				} else {
					format = simpleDateFormat.format(startDate) + ", "
							+ endTime.format(startDate).toLowerCase();
				}
			}
		}
		return format;
	}

	/**
	 * Get title of {@link Page}
	 * 
	 * @param page
	 * @return
	 */
	public static String getBreadcrumbTitle(Page page) {

		String title = null;
		if (page != null) {
			title = page.getNavigationTitle();
			if (title == null) {
				title = page.getTitle();
				if (title == null) {
					title = page.getName();
				}
			}
		}
		return title;
	}

	public static String getPageHeading(Page page) {
		String title = null;
		if (page == null) {
			return title;
		} else {
			title = page.getProperties().get("pageheading", String.class);
			if (title == null) {
				title = page.getPageTitle();
				if (title == null) {
					title = page.getTitle();
				}

				return "<h1 class=\"title bold\">" + title + "</h1>";
			}
		}
		return title;
	}

	/**
	 * Parse path to {@link EventResultBean}
	 * 
	 * @param page
	 * @return
	 */
	public static EventResultBean parseEventFromPath(
			SlingHttpServletRequest request, String eventPagePath) {
		try {

			PageManager pageManager = request.getResourceResolver().adaptTo(
					PageManager.class);
			Page page = null;

			if (StringUtils.isNotBlank(eventPagePath)) {

				if (eventPagePath.endsWith(BOQSConstant.DOT_HTML)) {
					eventPagePath = eventPagePath.replaceAll(
							BOQSConstant.DOT_HTML, BOQSConstant.BLANK);
				}

				page = pageManager.getPage(eventPagePath);
			}

			if (page != null) {
				return parseEvent(page, request);
			}
		} catch (Exception e) {

		}
		return null;
	}

	/**
	 * Parse page to {@link EventResultBean}
	 * 
	 * @param page
	 * @return
	 */
	public static EventResultBean parseEvent(Page page,
			SlingHttpServletRequest slingRequest) {
		ValueMap properties = page.getProperties();
		// check event detail has define or not
		if (null != properties) {
			EventResultBean eventResultBean = new EventResultBean();
			eventResultBean.setDesc(properties.get("shortdescription", ""));
			eventResultBean.setIcon(properties.get("pageicon", ""));
			eventResultBean.setImage(properties.get("eventFileReference", ""));
			eventResultBean.setName(WCMUtil.getPageTitle(page));
			eventResultBean.setLocation(properties.get("location", ""));
			String regisStatus = properties.get("registrationstatus", "");
			eventResultBean.setStatus(regisStatus);
			if (regisStatus.equalsIgnoreCase("open")) {
				eventResultBean.setButtonLabel(properties.get(
						"registerbuttonopen", ""));
			} else if (regisStatus.equalsIgnoreCase("waitinglist")) {
				eventResultBean.setButtonLabel(properties.get(
						"registrationbuttonwaitinglist", ""));
			}

			// ISMUAT-317 Fix
			if (slingRequest != null) {
				HttpServletRequest request = (HttpServletRequest) slingRequest;
				eventResultBean.setMoreDetailLink(slingRequest
						.getResourceResolver().map(request,
								page.getPath() + BOQSConstant.DOT_HTML));
				// fixing the registration path issue
				String registrationPath = properties.get(
						"registrationpagepath", "");
				if (StringUtils.isNotEmpty(registrationPath)) {
					registrationPath = slingRequest.getResourceResolver().map(
							request, registrationPath + BOQSConstant.DOT_HTML);
				}
				eventResultBean.setButtonPath(registrationPath);
			}

			Date startDate = properties.get("./startdatetime", Date.class);
			Date endDate = properties.get("./enddatetime", Date.class);
			Calendar cal = Calendar.getInstance();
			cal.setTime(startDate);
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			eventResultBean.setStartMonth(month);
			eventResultBean.setStartYear(year);
			eventResultBean.setStartDate(startDate);
			eventResultBean.setEndDate(endDate);
			eventResultBean.setTime(CommonUtils.formatDateTime(startDate,
					endDate));

			eventResultBean
					.setIsFeature(properties.get("featuredevent", false));

			return eventResultBean;
		}
		return null;
	}

	/**
	 * Random Id
	 * 
	 * @param prefix
	 * @return
	 */
	public static String getRandomId(String prefix) {
		return prefix + "-" + RandomUtils.nextInt(99999);
	}

	/**
	 * Remove &lt;p&gt; tag
	 * 
	 * @param str
	 * @return
	 */
	public static String removePTag(String text) {
		String str = text.trim();
		if (StringUtils.isNotBlank(str) && str.startsWith("<p>")
				&& str.endsWith("</p>")) {
			return str.substring(3, str.length() - 4);
		}
		return str;
	}

	/**
	 * Get Card details from page
	 * 
	 * @param array
	 *            of path and slingrequest
	 * @return list of ResultCardBean object
	 */
	public static List<ResultCardBean> getCardDetails(String[] cardPagePaths, SlingHttpServletRequest request) {
		List<ResultCardBean> cardList = new ArrayList<ResultCardBean>();
		ResourceResolver resourceResolver = request.getResourceResolver();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		ResultCardBean resultCardBean;
		Page page;
		ValueMap properties;
		if (cardPagePaths != null) {
			for (int i = 0; i < cardPagePaths.length; i++) {
				if (StringUtils.isNotEmpty(cardPagePaths[i])) {
					page = pageManager.getPage(cardPagePaths[i]);
					properties = page.getProperties();
					if (StringUtils.isNotEmpty(properties.get(BOQSConstant.READ_CARD_DETAILS, BOQSConstant.BLANK))) {
						resultCardBean = new ResultCardBean();
						resultCardBean.setPath(getProperURL(cardPagePaths[i], request));
						resultCardBean.setTitle(properties.get(BOQSConstant.TITLE, BOQSConstant.BLANK));
						resultCardBean.setDescription(properties.get(BOQSConstant.DESCRIPTION, BOQSConstant.BLANK));
						resultCardBean
								.setThumanailImage(properties.get(BOQSConstant.THUMBNAIL_IMAGE, BOQSConstant.BLANK));
						resultCardBean.setAltText(properties.get(BOQSConstant.ALT_TEXT, BOQSConstant.BLANK));
						cardList.add(resultCardBean);
					}
				}
			}
		}
		return cardList;
	}

	/**
	 * Method to convert Json to map
	 * 
	 * @param links
	 *            - Array of links
	 * @param linksList
	 *            Param having list of links in a map convert json to map
	 * @return Nothing
	 */
	public static List<HashMap<String, String>> getMapFromJSON(String[] items,
			SlingHttpServletRequest request) {
		List<HashMap<String, String>> itemsList = new ArrayList<HashMap<String, String>>();
		try {
			if (null != items) {
				for (String item : items) {
					JSONObject jsonObject = new JSONObject(item);
					Iterator<?> keys = jsonObject.keys();
					HashMap<String, String> itemValues = new HashMap<String, String>();
					boolean flag = true;
					while (keys.hasNext()) {
						String key = (String) keys.next();
						String value = jsonObject.getString(key);

						if (key.equals(BOQSConstant.PATH)
								&& StringUtils.isNotEmpty(value)) {
							value = getProperURL(value, request);
						} else if (key.equals(BOQSConstant.OPEN_IN_NEW_TAB)
								&& !BOQSConstant.EMPTY_STRING_ARRAY
										.equals(value)) {
							value = BOQSConstant.TRUE;
						}

						itemValues.put(key, value);
					}
					if (flag) {
						itemsList.add(itemValues);
					}
				}
			}
		} catch (JSONException e) {
			LOG.error("JSONException : {} ", e);
		}
		return itemsList;
	}
	public static String getImageReference(Page currentPage) {

		String fileReference = "";
		Resource imgRes = currentPage.getContentResource("image");
		if (imgRes != null) {
			Image image = new Image(imgRes);
			fileReference = image.getFileReference();
		}
		return fileReference;
	}
	
}
