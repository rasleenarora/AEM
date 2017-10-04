package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.WCMUtil;

public class EvenCalendarPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String resultTypeOverride = properties.get("resulttypeoverride", "event");
		putModel("resulttypeoverride", resultTypeOverride);

		String resultTypePluralOverride = properties.get("resulttypepluraloverride", "events");
		putModel("resulttypepluraloverride", resultTypePluralOverride);

		String paginateResults = properties.get("paginateresults", "no");
		putModel("paginateresults", paginateResults);

		boolean hasPaginateResults = !"no".equals(paginateResults);
		putModel("haspaginateresults", hasPaginateResults);

		putModel("loadmoreiconpath", properties.get("loadmoreiconpath", ""));
		String moreResultsText = properties.get("moreresultstext", "There are %n more %t to display");
		putModel("moreresultstext", parseText(moreResultsText));
		String loadMoreText = properties.get("loadmoretext", "Load More %t");
		putModel("loadmoretext", parseText(loadMoreText));

		String noMoreResultsText = properties.get("nomoreresultstext", "There are no other %t to display");
		putModel("nomoreresultstext", noMoreResultsText.replaceAll("%t", resultTypePluralOverride));
		putModel("backtotoptext", properties.get("backtotoptext", "Back to Top"));

		String noResultsText = properties.get("noresultstext", "We could not find any %t matching your filters");
		putModel("noresultstext", noResultsText.replaceAll("%t", resultTypePluralOverride));
		putModel("clearallfilterstext", properties.get("clearallfilterstext", "Clear all filters"));

		String eventCalendarNodePath = "";
		if (null != currentNode) {
			eventCalendarNodePath = currentNode.getPath();
		}
		putModel("eventCalendarNodePath", eventCalendarNodePath);

		StringBuilder ajaxLink = new StringBuilder("");
		ajaxLink.append("/services/boqs-redesign/geteventsresult?event-calendar-path=");
		ajaxLink.append(eventCalendarNodePath);
		putModel("ajaxLinkDefault", ajaxLink.toString());
		putModel("eventTitle", WCMUtil.getPageTitle(currentPage));

		putModel("condensedview", "yes".equals(properties.get("condensedview", "no")));
	}

	private String parseText(String text) {
		text = text.replaceAll("%n", "<span class=\"num\">%n</span>");
		text = text.replaceAll("%t", "<span class=\"result\">%t</span>");
		return text;
	}
}