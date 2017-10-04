package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;

import com.investec.boqs.redesign.bean.CustomXtype;
import com.investec.boqs.redesign.bean.SearchResults;
import com.investec.boqs.redesign.service.GetSearchResult;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

public class SearchResultPresenter extends AbstractPresenter{

	@Override
	protected void process() throws RepositoryException {
		putModel("resultslabel", properties.get("resultslabel", "Results"));
		putModel("startofbreadcrumbinresultssection", properties.get("startofbreadcrumbinresultssection", 2));
		putModel("paginationrequired", properties.get("paginationrequired", true));
		putModel("numberofresultsperpage", properties.get("numberofresultsperpage", 10));	
		putModel(BOQSConstant.SEARCH_PAGE_PARAMETER, currentPage.getPath());
		
		final GetSearchResult getSearchResult = sling.getService(GetSearchResult.class);
		SearchResults searchResults = getSearchResult.search(slingRequest);
		
		putModel("searchResults", searchResults);	
		
		createPagination(searchResults);
	}

	private void createPagination(SearchResults searchResults) {
		String searchTerm = slingRequest.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER);
		String searchType = slingRequest.getParameter(BOQSConstant.TYPE_PARAMETER);
		String searchRelatedPro = slingRequest.getParameter(BOQSConstant.RELATED_PROFESSION_PARAMETER);
		
		searchTerm = StringUtils.isBlank(searchTerm) ? "" : searchTerm;
		searchType = StringUtils.isBlank(searchType) ? "" : searchType;
		searchRelatedPro = StringUtils.isBlank(searchRelatedPro) ? "" : searchRelatedPro;
		
		putModel("searchTerm", searchTerm);
		putModel("searchType", searchType);
		putModel("searchRelatedPro", searchRelatedPro);
		
		StringBuilder linkSb = new StringBuilder(CommonUtils.getProperURL(currentPage.getPath(), slingRequest)); 
		linkSb.append("?"); 
		linkSb.append(BOQSConstant.SEARCH_TERM_PARAMETER);
		linkSb.append("=");
		linkSb.append(searchTerm);
		if(!StringUtils.isBlank(searchType)){
			linkSb.append("&");
			linkSb.append(BOQSConstant.TYPE_PARAMETER);
			linkSb.append("=");
			linkSb.append(searchType);
		}
		if(!StringUtils.isBlank(searchRelatedPro)){
			linkSb.append("&");
			linkSb.append(BOQSConstant.RELATED_PROFESSION_PARAMETER);
			linkSb.append("=");
			linkSb.append(searchRelatedPro);
		}
		linkSb.append("&");
		linkSb.append(BOQSConstant.PAGE_NUMBER_PARAMETER);
		linkSb.append("=");
		
		String link = linkSb.toString();
		
		long totalPage = searchResults.getResultCount() / searchResults.getNumberToDisplay() + (searchResults.getResultCount() % searchResults.getNumberToDisplay() > 0 ? 1 : 0);
		List<CustomXtype> lst = new ArrayList<CustomXtype>();
		long curPage = searchResults.getCurrentPage();
		if(totalPage > 1){
			CustomXtype first = new CustomXtype();
			first.setLink(link + 1);
			first.setHeading(1 + "");
			lst.add(first);
			
			if(curPage > 4){
				CustomXtype dot = new CustomXtype();
				dot.setHeading("...");
				lst.add(dot);
			}
			
			if(curPage - 2 > 1){
				CustomXtype page = new CustomXtype();
				page.setLink(link + (curPage - 2));
				page.setHeading((curPage - 2) + "");
				lst.add(page);
			}
			
			if(curPage - 1 > 1){
				CustomXtype page = new CustomXtype();
				page.setLink(link + (curPage - 1));
				page.setHeading((curPage - 1) + "");
				lst.add(page);
			}
			
			if(curPage > 1){
				CustomXtype page = new CustomXtype();
				page.setLink(link + curPage);
				page.setHeading(curPage + "");
				lst.add(page);
			}
			
			if(curPage + 1 < totalPage){
				CustomXtype page = new CustomXtype();
				page.setLink(link + (curPage + 1));
				page.setHeading((curPage + 1) + "");
				lst.add(page);
			}
			
			if(curPage + 2 < totalPage){
				CustomXtype page = new CustomXtype();
				page.setLink(link + (curPage + 2));
				page.setHeading((curPage + 2) + "");
				lst.add(page);
			}
			
			if(curPage + 3 < totalPage){
				CustomXtype dot = new CustomXtype();
				dot.setHeading("...");
				lst.add(dot);
			}
			
			CustomXtype last = new CustomXtype();
			last.setLink(link + totalPage);
			last.setHeading(totalPage + "");
			lst.add(last);
			
			putModel("prevLink", link + (curPage - 1));
			putModel("nextLink", link + (curPage + 1));
		}
		putModel("curPage", curPage);
		putModel("lstPagings", lst);
		
		/*if(curPage > 1){
			putModel("prevLink", link + (curPage - 1));
		}
		
		if(curPage < totalPage){
			putModel("nextLink", link + (curPage + 1));
		}*/
	}

/*	private boolean check(int i, long totalPage) {
		if(totalPage < 8){
			return true;
		}
		for (int i = 2; i < totalPage; i++) {
			if(check(i, totalPage)){
				CustomXtype page = new CustomXtype();
				page.setLink(link + i);
				page.setHeading(i + "");
				lst.add(page);
			}
		}
		
		return true;
	}*/
}