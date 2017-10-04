package com.investec.boqs.redesign.servlet;

import java.io.IOException;
import java.io.StringWriter;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.servlet.ServletException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.TidyJSONWriter;
import com.investec.boqs.redesign.service.ConfigurationCollector;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.JcrUtils;

@SlingServlet(paths = "/bin/boqs-redesign/mailtemplate", methods = { "GET" }, metatype = true)
public class MailTemplateServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;
	Logger logger = LoggerFactory.getLogger(MailTemplateServlet.class);

	@Reference
	ConfigurationCollector collector;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
		try {

			StringWriter writer = new StringWriter();
			TidyJSONWriter json = new TidyJSONWriter(writer);

			json.array();

			String mailTemplateRootPath = collector.getString(BOQSConstant.MAIL_TEMPLATE_ROOT_PATH, BOQSConstant.TEMPLATE_SENDMAIL);
			
			Node node = JcrUtils.getNode(request, mailTemplateRootPath);
			if (node != null) {
				NodeIterator iterator = node.getNodes();
				while (iterator.hasNext()) {
					Node node_file = (Node) iterator.next();
					if (node_file.getName() != null && node_file.getName().endsWith(BOQSConstant.DOT_HTML)) {
						json.object();
						json.key("text");
						json.value(node_file.getName().replaceAll(BOQSConstant.DOT_HTML, BOQSConstant.BLANK));
						json.key("value");
						json.value(node_file.getName().replaceAll(BOQSConstant.DOT_HTML, BOQSConstant.BLANK));
						json.endObject();
					}
				}
			}

			json.endArray();
			response.getWriter().write(writer.toString());

		} catch (JSONException e) {
			logger.error("Error at MailTemplateServlet.doGet(): " + e.getMessage());
		} catch (RepositoryException e) {
			logger.error("Error at MailTemplateServlet.doGet(): " + e.getMessage());
		}

	}

}