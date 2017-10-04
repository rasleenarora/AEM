package com.investec.boqs.redesign.presenter;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.jsp.PageContext;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.JcrUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMMode;
import com.day.cq.wcm.api.designer.Style;

/**
 * Abstract Presenter.
 * 
 * Put your business logic in this class to force separation of concerns, and
 * avoid java code in views (jsp)
 * 
 * all presenters must inherit this class
 * 
 * the method makePresenter. Perhaps we could make a custom servlet to force
 * Presenter calls
 * 
 */
public abstract class AbstractPresenter {

	protected SlingHttpServletRequest slingRequest;
	protected SlingScriptHelper sling;
	protected ResourceResolver resourceResolver;
	protected Style currentStyle;
	protected Page currentPage;
	protected Node currentNode;
	protected Session session;
	protected ValueMap properties;
//	protected PageContext pageContext;
	// protected Locale locale;
	protected String countryCode;

	/**
	 * Logger of this class.
	 */
	public static final Logger LOG = LoggerFactory.getLogger(AbstractPresenter.class);

	/**
	 * Set a bunch of useful vars in the presenter, then launch the abstract
	 * method process
	 * 
	 * @param request
	 *            SlingHttpServletRequest
	 * @param properties
	 *            ValueMap
	 * @param currentNode
	 *            Node
	 * @throws FileNotFoundException
	 */
	public void init(SlingHttpServletRequest request, ValueMap properties, Node currentNode) throws RepositoryException {
		this.slingRequest = request;
		currentPage = getCurrentPage(request);
		session = getSession(request);
		// locale = JcrUtils.getLocale(request);
		this.countryCode = JcrUtils.getCountryCode(request);
		this.sling = getSlingScriptHelper(request);
		this.currentNode = currentNode;
		this.properties = properties;
		this.resourceResolver = request.getResourceResolver();
		process();
	}

	/**
	 * Set a bunch of useful vars( included current style) in the presenter,
	 * then launch the abstract method process
	 * 
	 * @param request
	 *            SlingHttpServletRequest
	 * @param properties
	 *            ValueMap
	 * @param currentNode
	 *            Node
	 * @param currentStyle
	 *            Style
	 */
	public void init(SlingHttpServletRequest request, ValueMap properties, Node currentNode, Style currentStyle) throws RepositoryException {
		this.slingRequest = request;
		currentPage = getCurrentPage(request);
		session = getSession(request);
		// locale = JcrUtils.getLocale(request);
		this.countryCode = JcrUtils.getCountryCode(request);
		this.currentStyle = currentStyle;
		this.sling = getSlingScriptHelper(request);
		this.currentNode = currentNode;
		this.properties = properties;
		this.resourceResolver = request.getResourceResolver();

		process();
	}

	/**
	 * @return all the ccm keys you want to make available to the component
	 */
	protected String[] getCcmKeys() {
		return new String[0];
	}

	/**
	 * This method is there to implement light business logic, and preparing
	 * data for views
	 */
	protected abstract void process() throws RepositoryException;

	public String[] getSelectorParam(String selectorName) {
		String selectorString = slingRequest.getRequestPathInfo().getSelectorString();
		if (StringUtils.isNotEmpty(selectorString)) {
			String[] selectors = selectorString.split("\\.");
			for (int i = 0; i < selectors.length; i++) {
				String selector = selectors[i];
				if (selector.startsWith(selectorName)) {
					return selector.split("-");
				}
			}
		}
		return null;
	}

	/**
	 * shortcut to put variables in request scope
	 * 
	 * @param name
	 * @param object
	 */
	protected void putModel(String name, Object object) {
		slingRequest.setAttribute(name, object);
	}

	public SlingHttpServletRequest getSlingRequest() {
		return slingRequest;
	}

	public SlingScriptHelper getSling() {
		return sling;
	}

	public Style getCurrentStyle() {
		return currentStyle;
	}

	public Page getCurrentPage() {
		return currentPage;
	}

	public Node getCurrentNode() {
		return currentNode;
	}

	public Session getSession() {
		return session;
	}

	public ValueMap getProperties() {
		return properties;
	}

	// public Locale getLocale() {
	// return locale;
	// }
	public String getCountryCode() {
		return countryCode;
	}

	/**
	 * 
	 * @param request
	 * @return
	 */
	private static Page getCurrentPage(SlingHttpServletRequest request) {
		Resource resource = request.getResource();
		ResourceResolver resourceResolver = request.getResourceResolver();
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		return pageManager.getContainingPage(resource);
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

	/**
	 * return jcr current node object from request
	 * 
	 * @param request
	 */
	public static Node getCurrentNode(SlingHttpServletRequest request) {
		ResourceResolver resourceResolver = request.getResourceResolver();
		return resourceResolver.adaptTo(Node.class);
	}

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
	 * Gets list of field path
	 * 
	 * @return
	 * @throws RepositoryException
	 */
	public List<String> getFieldPaths() throws RepositoryException {
		List<String> fieldPaths = new ArrayList<String>();
		String dialogPath = (String) slingRequest.getAttribute(BOQSConstant.VAR_DIALOG_PATH);
		if (StringUtils.isNotBlank(dialogPath)) {
			SlingBindings bind = (SlingBindings) slingRequest.getAttribute(SlingBindings.class.getName());
			SlingRepository repo = bind.getSling().getService(SlingRepository.class);
			Session ses = repo.loginAdministrative(null);
			Node node = ses.getNode(dialogPath);
			getFieldPaths(node, fieldPaths);
			ses = null;
			repo = null;
			bind = null;
		}
		return fieldPaths;
	}

	/**
	 * Gets property value by property name.
	 * 
	 * @param node
	 *            a {@link Node}
	 * @param propName
	 * @return
	 */
	private String getPropValue(Node node, String propName) {
		String sRet = "";
		try {
			Property prop = node.getProperty(propName);
			if (prop != null) {
				Value val = prop.getValue();
				if (val != null) {
					sRet = val.getString();
				}
			}
		} catch (Exception e) {
			// System.out.println("getPropValue: " + e.toString());
		}
		return sRet;
	}

	/**
	 * Gets list of field path
	 * 
	 * @param node
	 *            a {@link Node}
	 * @param fieldPaths
	 * @throws RepositoryException
	 */
	private void getFieldPaths(Node node, List<String> fieldPaths) throws RepositoryException {
		if (node == null) {
			return;
		}
		if (fieldPaths == null) {
			fieldPaths = new ArrayList<String>();
		}

		String xtypeVal = getPropValue(node, BOQSConstant.XTYPE);
		if (node.hasNodes() && !BOQSConstant.PATH_FIELD.equalsIgnoreCase(xtypeVal) && !BOQSConstant.MULTI_FIELD.equalsIgnoreCase(xtypeVal)) {
			NodeIterator nodes = node.getNodes();
			while (nodes.hasNext()) {
				getFieldPaths(nodes.nextNode(), fieldPaths);
			}
		} else {
			String fieldName = getPropValue(node, BOQSConstant.NAME);
			if (BOQSConstant.PATH_FIELD.equalsIgnoreCase(xtypeVal)) {
				addPathFromNode(node, fieldPaths, fieldName);
			}

			if (BOQSConstant.MULTI_FIELD.equals(xtypeVal) && node.hasNode("fieldConfig")) {
				Node fieldConfigNode = node.getNode("fieldConfig");
				String fieldConfigXtype = getPropValue(fieldConfigNode, BOQSConstant.XTYPE);
				if (BOQSConstant.MEDIA.equalsIgnoreCase(fieldConfigXtype)) {
					addPathFromNode(node, fieldPaths, fieldName);
				}
			}
		}
	}

	/**
	 * Add path to List fieldPaths from node
	 * 
	 * @param node
	 *            a {@link Node}
	 * @param fieldPaths
	 * @param fieldName
	 * @throws RepositoryException
	 */
	private void addPathFromNode(Node node, List<String> fieldPaths, String fieldName) throws RepositoryException {
		String path = node.getPath();
		path = path.substring(0, path.lastIndexOf("/"));
		fieldPaths.add(path + fieldName);
	}

	public boolean isPublishMode(SlingHttpServletRequest slingRequest) {
		boolean isEdit = WCMMode.fromRequest(slingRequest) == WCMMode.EDIT;
		boolean isDesign = WCMMode.fromRequest(slingRequest) == WCMMode.DESIGN;
		if (isEdit || isDesign) {
			return false;
		}
		return true;
	}
}
