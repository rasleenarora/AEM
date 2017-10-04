package com.investec.boqs.redesign.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.investec.boqs.redesign.service.GetSearchResult;

@SlingServlet(paths = { "/services/boqs-redesign/getAutoSuggestions" }, methods = { "POST", "GET" }, extensions = { "json" })
public class AutoSuggestSearchServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;
	
	protected final Logger LOG = LoggerFactory.getLogger(AutoSuggestSearchServlet.class);
	@Reference(bind = "bindSearchClient", unbind = "unbindSearchClient")
	private GetSearchResult getSearchResult;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
		try{
			List<HashMap<String, String>> results = getSearchResult.getAutoSuggestions(request);
			Gson gson = new Gson();
			out.write(gson.toJson(results));
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
