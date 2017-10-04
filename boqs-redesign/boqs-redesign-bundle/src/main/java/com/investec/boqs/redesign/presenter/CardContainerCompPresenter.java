package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

public class CardContainerCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String numCardsString = properties.get("numcardsstring", "We have %n %t matching your filters:");
		putModel("numcardsstring", parseText(numCardsString));
		
		String resultTypeOverride = properties.get("resulttypeoverride", "result");
		putModel("resulttypeoverride", resultTypeOverride);
		
		String resultTypePluralOverride = properties.get("resulttypepluraloverride", "results");
		putModel("resulttypepluraloverride", resultTypePluralOverride);
		
		String paginateResults = properties.get("paginateresults", "no");
		putModel("paginateresults", paginateResults);
		
		int numberOfCardsToShowPerPage = properties.get("numberofcardstoshowperpage", 10);
		boolean hasPaginateResults = !"no".equals(paginateResults);
		if(!hasPaginateResults){
			numberOfCardsToShowPerPage = 1000;
		}
		
		putModel("numberofcardstoshowperpage", numberOfCardsToShowPerPage);
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
		putModel("noresultstext", noResultsText.replaceAll("%t", resultTypeOverride));
		putModel("clearallfilterstext", properties.get("clearallfilterstext", "Clear all filters"));

	}

	private String parseText(String text) {
		text = text.replaceAll("%n", "<span class=\"num\">%n</span>");
		text = text.replaceAll("%t", "<span class=\"result\">%t</span>");
		return text;
	}
}