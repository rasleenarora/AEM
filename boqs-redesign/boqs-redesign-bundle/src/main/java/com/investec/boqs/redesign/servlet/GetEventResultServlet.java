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
import com.investec.boqs.redesign.bean.EventResults;
import com.investec.boqs.redesign.service.GetEventResult;

@SlingServlet(paths = { "/services/boqs-redesign/geteventsresult" }, methods = { "POST", "GET" }, extensions = { "json" })
public class GetEventResultServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 2L;

	protected final Logger LOG = LoggerFactory.getLogger(GetEventResultServlet.class);

	@Reference(bind = "bindEventClient", unbind = "unbindEventClient")
	private GetEventResult getEventResult;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		response.setContentType("application/json; charset=UTF-8");
		try{
			EventResults eventResults = getEventResult.getEventResult(request);
			Gson gson = new Gson();
			out.write(gson.toJson(eventResults));
		} catch (Exception e) {
			LOG.error("Exception", e);
		}
		out.flush();
		out.close();
	}
	
	protected void bindEventClient(final GetEventResult getEventResult) {
		this.getEventResult = getEventResult;
	}

	protected void unbindEventClient(final GetEventResult getEventResult) {
		if (this.getEventResult == getEventResult) {
			this.getEventResult = null;
		}
	}


	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}