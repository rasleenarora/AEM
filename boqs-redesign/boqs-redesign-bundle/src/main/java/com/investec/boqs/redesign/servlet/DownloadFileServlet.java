package com.investec.boqs.redesign.servlet;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;

import org.apache.commons.lang.StringUtils;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.service.ConfigurationCollector;
import com.investec.boqs.redesign.utils.BOQSConstant;

@SlingServlet(paths = "/bin/boqs-redesign/download", methods = { "GET" }, metatype = true)
public class DownloadFileServlet extends SlingAllMethodsServlet {

	private static final long serialVersionUID = 1L;

	@Reference
	SlingRepository repo;

	@Reference
	ConfigurationCollector collector;

	protected static final Logger logger = LoggerFactory.getLogger(DownloadFileServlet.class);

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {

		String image = request.getParameter("image");
		logger.error("############### Image Path: " + image);

		String publishHost = collector.getString(BOQSConstant.BOQS_REDESIGN_PUBLISH_HOST, "");
		logger.error("############### publishHost: " + publishHost);
		
		String host = "";

		if (StringUtils.isNotBlank(publishHost)) {
			host = publishHost;
		} else {
			host = request.getScheme() + "://" + request.getServerName();
		}

		logger.error("############### Final Host: " + host);
		
		// forces download
		File dwnldFile = new File(host + image);
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"", dwnldFile.getName());
		response.setHeader(headerKey, headerValue);
		response.setContentType("image/jpeg");
		
		InputStream stream = null;
		BufferedOutputStream outStream = null;
		
		try {
			URL url = new URL(host + image);
			URLConnection connection = url.openConnection();
			stream = connection.getInputStream();
			outStream = new BufferedOutputStream(response.getOutputStream());

			byte[] buffer = new byte[4096];
			int bytesRead = -1;
			while ((bytesRead = stream.read(buffer)) != -1) {
				outStream.write(buffer, 0, bytesRead);
			}

		} catch (Exception e) {
			logger.error("############### Download File exception: " + e.getMessage());
			response.sendRedirect(image);
		} finally {
			if (null != stream) {
				stream.close();
			}

			if (null != outStream) {
				outStream.close();
			}
		}
	}
}
