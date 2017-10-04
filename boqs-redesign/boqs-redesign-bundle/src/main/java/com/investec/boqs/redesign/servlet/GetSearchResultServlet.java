package com.investec.boqs.redesign.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.investec.boqs.redesign.bean.SearchResults;
import com.investec.boqs.redesign.service.GetSearchResult;

@SlingServlet(paths = { "/services/boqs-redesign/getsearchresult" }, methods = { "POST", "GET" }, extensions = { "json" })
public class GetSearchResultServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 2L;

	protected final Logger LOG = LoggerFactory.getLogger(GetSearchResultServlet.class);

	@Reference(bind = "bindSearchClient", unbind = "unbindSearchClient")
	private GetSearchResult getSearchResult;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
		try{
			SearchResults searchResults = getSearchResult.search(request);
			Gson gson = new Gson();
			out.write(gson.toJson(searchResults));
		} catch (Exception e) {
			LOG.error("Exception", e);
		}
		out.flush();
		out.close();
	}
	
	protected void bindSearchClient(final GetSearchResult getSearchResult) {
		this.getSearchResult = getSearchResult;
	}

	protected void unbindSearchClient(final GetSearchResult getSearchResult) {
		if (this.getSearchResult == getSearchResult) {
			this.getSearchResult = null;
		}
	}


	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}