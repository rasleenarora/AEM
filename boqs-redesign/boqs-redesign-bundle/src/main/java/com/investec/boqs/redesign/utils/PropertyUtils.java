package com.investec.boqs.redesign.utils;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PropertyUtils {
	
	private static final Logger logger = LoggerFactory.getLogger(PropertyUtils.class);
	
	/**
	 * Returns {@link SlingScriptHelper} by slingRequest
	 *
	 * @param request
	 * @return
	 */
	public static SlingScriptHelper getSlingScriptHelper(SlingHttpServletRequest request) {
		SlingBindings bindings = (SlingBindings) request.getAttribute(SlingBindings.class.getName());
		return bindings.getSling();
	}

	/**
	 * get Node
	 * @param request
	 * @param nodePath
	 * @return Node
	 * @throws RepositoryException
	 */
	public static Node getNode(SlingHttpServletRequest request, String nodePath) throws RepositoryException {
		Session session = getSession(request);
		Node root = session.getRootNode();
		nodePath = convertToRelativePath(nodePath);
		if (root.hasNode(nodePath)) {
			return root.getNode(nodePath);
		}
		return null;
	}
	
	/**
	 * Convert To Relative Path
	 * @param nodePath
	 * @return
	 */
	public static String convertToRelativePath(String nodePath) {
		if (nodePath.charAt(0) == '/') {
			return nodePath.substring(1, nodePath.length());
		}
		return nodePath;
	}
	
	/**
	 * return jcr Session object from request
	 *
	 * @param request
	 */
	public static Session getSession(SlingHttpServletRequest request) {
		ResourceResolver resourceResolver = request.getResourceResolver();
		return resourceResolver.adaptTo(Session.class);
	}
	
	public static ValueMap getValueMap(SlingHttpServletRequest request, Node node) {
		ValueMap properties = null;
		try {
			if (node != null) {
				ResourceResolver resolver = request.getResourceResolver();
				Resource resource = resolver.getResource(node.getPath());
				properties = resource.adaptTo(ValueMap.class);
			}
		} catch (Exception ex) {
			logger.error("error in converting node to ValueMap: " + ex.toString());
		}
		return properties;
	}
	
	public static ValueMap getValueMap(SlingHttpServletRequest request, String nodePath) {
		ValueMap properties = null;
		try {
			ResourceResolver resolver = request.getResourceResolver();
			Resource resource = resolver.getResource(nodePath);
			properties = resource.adaptTo(ValueMap.class);
		} catch (Exception ex) {
			logger.error("error in converting node to ValueMap: " + ex.toString());
		}
		return properties;
	}
	
}