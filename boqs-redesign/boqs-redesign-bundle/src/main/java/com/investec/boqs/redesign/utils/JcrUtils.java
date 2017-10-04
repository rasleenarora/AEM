package com.investec.boqs.redesign.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingBindings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.designer.Style;
import com.day.cq.wcm.foundation.Image;

public class JcrUtils {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JcrUtils.class);
	
	/**
	 * Get Session
	 * @param request
	 * @return
	 */
	public static Session getSession(SlingHttpServletRequest request) {
		return request.getResourceResolver().adaptTo(Session.class);
	}
    
    private static String[] prefixes = {"/content/boqs/","/content/"};

	
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
	 * Gets value of a property by propertyName. If no <code>propertyName</code> found in {@link Node}, or blank value, or exception, the <code>false</code> value will be returned
	 *
	 * @param node a {@link Node}
	 * @param propertyName
	 * @return a boolean value
	 */
	public static boolean getBooleanValue(Node node, String propertyName) {
		return getBooleanValue(node, propertyName, false);
	}

	public static boolean getBooleanValue(Node node, String propertyName, boolean defaultValue) {
		boolean val = defaultValue;
		try {
			if (node != null && node.hasProperty(propertyName)) {
				val = node.getProperty(propertyName).getBoolean();
			}
		} catch (RepositoryException ex) {
			LOGGER.info("Exception: get boolean value [" + propertyName + "] error:" + ex.toString() + "default value return");
		}
		return val;
	}
	
	/**
	 * Get All Child Pages
	 * @param slingRequest
	 * @param parentpath
	 * @return List<Page>
	 */
	public static List<Page> getAllChildPages(SlingHttpServletRequest slingRequest,String parentpath) {
		List<Page> pages = new ArrayList<Page>();
		try {
			ResourceResolver resolver = slingRequest.getResourceResolver();
		    PageManager pageManager = resolver.adaptTo(PageManager.class);
		    Page page=null;
		    if(!StringUtil.isEmpty(parentpath)){
		    	page=pageManager.getPage(parentpath);
		    }			
			if(page!=null){
				Iterator<Page> iterable= page.listChildren();
				if(iterable!=null){
					while(iterable.hasNext()){
						Page childPage=iterable.next();						
						pages.add(childPage);						
					}
				}			  
			}
			
		} catch (Exception e) {
			LOGGER.info("Exception: " + e.toString() + "default value return");
		}
		return pages;
	}

	/**
	 * Get Image Value
	 *
	 * @param node a {@link Node}
	 * @param fieldName name of image field
	 * @return a path of image if found, otherwise return empty string
	 */
	public static String getImageValue(Node node, String fieldName) {
		String val = "";
		try {
			if (node == null || StringUtils.isBlank(fieldName)) {
				LOGGER.debug("node is null or no fields found!");
				return val;
			}
			Session session = node.getSession();
			String path = node.getPath() + "/" + fieldName;
			
			if (session.itemExists(path)) {
				Node imgNode = session.getNode(path);
				if (imgNode != null && imgNode.hasProperty(BOQSConstant.FLD_FILE_REF)) {
					if (null != imgNode.getProperty(BOQSConstant.FLD_FILE_REF).getValue()) {
						val = imgNode.getProperty(BOQSConstant.FLD_FILE_REF).getValue().getString();
					}
				}
			}			
			
		} catch (RepositoryException ex) {
			LOGGER.info("Exception: " + ex.toString() + "default value return");
		}
		return val;
	}
	
	/**
	 * Get Image Value
	 *
	 * @param node a {@link Node}
	 * @param fieldName name of image field
	 * @param thumbSize Size of Thumbnail
	 * @return a path of image if found, otherwise return empty string
	 */
	public static String getImageValue(Node node, String fieldName, String thumbSize) {
		String val = "";
		try {
			if (node == null || StringUtils.isBlank(fieldName)) {
				LOGGER.debug("node is null or no fields found!");
				return val;
			}
			Session session = node.getSession();
			String path = node.getPath() + "/" + fieldName;
			
			if (session.itemExists(path)) {
				Node imgNode = session.getNode(path);
				if (imgNode != null && imgNode.hasProperty(BOQSConstant.FLD_FILE_REF)) {
					if (null != imgNode.getProperty(BOQSConstant.FLD_FILE_REF).getValue()) {
						val = imgNode.getProperty(BOQSConstant.FLD_FILE_REF).getValue().getString();
					}
				}
			}
			if(StringUtils.isNotEmpty(val) && StringUtils.isNotEmpty(thumbSize)){
				if(session.itemExists(val + thumbSize)){
					return val + thumbSize;
				}
			}
			
		} catch (RepositoryException ex) {
			LOGGER.info("Exception: " + ex.toString() + "default value return");
		}
		return val;
	}
	/**
	 * Get Thumbnail from Image
	 * @param imageValue String
	 * @param thumbSize String
	 * @param slingRequest SlingGttpServletRequest
	 * @return String
	 */
	public static String getThumbFromImage(String imageValue, String thumbSize, SlingHttpServletRequest slingRequest) {
		String val = ""; 
		if(StringUtils.isNotBlank(imageValue) && StringUtils.isNotBlank(thumbSize)){
			try {
				if (getNode(slingRequest, imageValue + thumbSize) != null) {
					return imageValue + thumbSize;
				}
			} catch (RepositoryException ex) {
				LOGGER.info("Exception: " + ex.toString() + "default value return");
			}
		}
		return val;
	}
	/**
	 * Get Page
	 * @param slingRequest
	 * @param path
	 * @return
	 */
	public static Page getPage(SlingHttpServletRequest slingRequest, String path) {
		Page page = null;
		try {			
			ResourceResolver resolver = slingRequest.getResourceResolver();
		    PageManager pageManager = resolver.adaptTo(PageManager.class);
		    if(!StringUtil.isEmpty(path)){
		    	page=pageManager.getPage(path);		
		    }				
		} catch (Exception e) {
			LOGGER.info("Exception: " + e.toString() + "default value return");
		}
		return page;
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
	 * Get List<Tag> from String[] tags
	 * @param SlingHttpServletRequest
	 * @param tags String[]
	 * @return List<Tag>
	 */
	public static List<Tag> getListTagsFromArrayTagName(SlingHttpServletRequest slingRequest,String[] tags){
		
		List<Tag> list=new ArrayList<Tag>();
		try{	
			
			ResourceResolver resourceResolver = slingRequest.getResourceResolver();
			TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
			if(tags != null){
				for (String tagId : tags) {	
					if(!StringUtil.isEmpty(tagId)){
						Tag tag = tagManager.resolve(tagId);		
						if(tag!=null){
							list.add(tag);
						}
					}				
				}		
			}
		}catch(Exception e){
			LOGGER.error("getListTagsFromArrayTagName() error: " + e.getMessage());
		}
		return list;	
	}

	/**
	 * Get Value of Component
	 * @param slingRequest SlingHttpServletRequest
	 * @param node Node
	 * @return ValueMap
	 */
	public static ValueMap getCompValue(SlingHttpServletRequest slingRequest, Node node) {
		ValueMap valueMap = null;
		ResourceResolver resourceResolver = slingRequest.getResourceResolver();
		try {					
			if (node != null) {
				Resource res = resourceResolver.getResource(node.getPath());
				valueMap = ResourceUtil.getValueMap(res);
			}
		} catch (Exception e) {
			LOGGER.error("getCompValue() error: " + e.getMessage());
		}
		return valueMap;
	}
	
	/**
	 * find node by ResourceType
	 * @param slingRequest SlingHttpServletRequest
	 * @param parentPath String
	 * @param resType "suffix node name ex: ..../name" String
	 * @param isNodePath "False: add jcr:content" boolean
	 * @return Node
	 */
	public static Node findNode(SlingHttpServletRequest slingRequest, String parentPath, String resType, boolean isNodePath){
		try{
			if(StringUtils.isNotBlank(parentPath)){
		        if(getNode(slingRequest, parentPath) != null){
		        	if(!isNodePath){
		        		parentPath += BOQSConstant.PATH_SEPARATOR + NameConstants.NN_CONTENT;
		        	}

		    		ResourceResolver resourceResolver = slingRequest.getResourceResolver();
		    		SlingBindings bindings = (SlingBindings) slingRequest.getAttribute(SlingBindings.class.getName());
		    		QueryBuilder builder = bindings.getSling().getService(QueryBuilder.class);        	
		    		String componentName = resType.substring(resType.lastIndexOf("/") + 1);
		    		Map<String, String> map = new HashMap<String, String>();
		    		map.put("property","sling:resourceType");
		    		map.put("property.value","%"+resType);
		    		map.put("property.operation","like");
		    		map.put("path", parentPath);
		    		map.put("type", "nt:unstructured");
		    		
		    		com.day.cq.search.Query query = builder.createQuery(
		    				PredicateGroup.create(map),
		    				resourceResolver.adaptTo(Session.class));			
		    		
		    		SearchResult results = query.getResult();
		    		Iterator<Node> it = results.getNodes();
		    		while (it.hasNext()) {
		    			Node node = (Node) it.next();
		    			if(getComponentName(node).equals(componentName)) {
		    				return node;
		    			}
		    		}
		        }
			}
		}catch(Exception e){
			LOGGER.error("findNode() error: " + e.getMessage());
		}
        return null;
    }

	   
    /*
     * Get the component's name
     */
    public static String getComponentName(Node node) {
        String resourceType = "";
        try {
            if (node.hasProperty("sling:resourceType")) {
                resourceType = node.getProperty("sling:resourceType")
                        .getString();
            }
        } catch (Exception e) {
        }

        return resourceType.substring(resourceType.lastIndexOf("/") + 1);
    }
    
    public static boolean CheckResourceType(Node node, String resourceType){
    	boolean result = false;
    	try {
    		if (node.hasProperty("sling:resourceType")) {
    			String resourceNode = node.getProperty("sling:resourceType").getString();
    			if(resourceNode.equals(resourceType)){
    				result = true;
    			}
            }
    	}catch (Exception e) {
        }
    	return result;
    }
    
	/**
	 * Gets value of a property by propertyName. If no <code>propertyName</code> found in {@link Node}, or blank value, or exception, the <code>null</code> value will be returned
	 *
	 * @param node a {@link Node}
	 * @param propertyName
	 * @return string
	 */
	public static String getStringValue(Node node, String propertyName) {
		String val = null;
		try {
			if (node != null && node.hasProperty(propertyName)) {
				val = node.getProperty(propertyName).getValue().getString();
			}
		} catch (Exception ex) {
			LOGGER.error("Exception: get string value [" + propertyName + "] error:" + ex.toString(),ex);
		}
		return val;
	}
	

	
	/***
	 * get home page of sitepath
	 * 
	 * @param sitepath
	 *            String
	 * @param slingRequest
	 *            SlingHttpServletRequest
	 * @return String
	 */
	public static String getHomepage(String sitepath,
			SlingHttpServletRequest slingRequest) {
		String result = "";
		// for (String prefix : prefixes) {
		// if (sitepath.startsWith(prefix)) {
		// String path = sitepath;
		// if (sitepath.length() >= prefix.length() + 5) {
		// path = sitepath.substring(0, prefix.length() + 2);
		// }
		// ResourceResolver resolver = slingRequest.getResourceResolver();
		// PageManager pageManager = resolver.adaptTo(PageManager.class);
		// Page page = pageManager.getPage(path);
		// if (page != null && (path.length() >= prefix.length() + 2)) {
		// result = path;
		// } else {
		// result = prefix + "en";
		// }
		// return result;
		// }
		// }
		for (String prefix : prefixes) {
			if (sitepath.startsWith(prefix)) {
				String pathResult = "";
				String[] argSite = sitepath.split("/");
				String[] argPrefix = prefix.split("/");
				if (argSite.length >= argPrefix.length + 1) {
					for (int i = 0; i < argPrefix.length; i++) {
						pathResult += argSite[i] + "/";
					}
					pathResult += argSite[argPrefix.length];
				}
				Page page = null;
				if (!"".equals(pathResult)) {
					ResourceResolver resolver = slingRequest
							.getResourceResolver();
					PageManager pageManager = resolver
							.adaptTo(PageManager.class);
					page = pageManager.getPage(pathResult);
				}
				if (page != null) {
					result = pathResult;
				} else {
					result = prefix + "en";
				}

				return result;
			}
		}
		return result;
	}
	
	/***
	 * Get country of sitepath
	 * @param sitepath String
	 * @param slingRequest SlingHttpServletRequest
	 * @return String
	 */
	public static String getCountry(String sitepath, SlingHttpServletRequest slingRequest) {
		String result = "";
		String homepath = getHomepage(sitepath, slingRequest);
		result = homepath.substring(homepath.length()-5, homepath.length()-3);		
		return result;
	}	
	
//	/***
//	 * Get language of sitepath
//	 * @param sitepath String
//	 * @param slingRequest SlingHttpServletRequest
//	 * @return String
//	 */
//	public static String getLanguage(String sitepath, SlingHttpServletRequest slingRequest) {
//		String result = "";
//		String homepath = getHomepage(sitepath, slingRequest);
//		result = homepath.substring(homepath.length()-2);		
//		return result;
//	}
	
	/**
	 * Set Link Page
	 * @param linkPage
	 * @param slingRequest
	 * @return
	 */
	public static String setLinkPage(String linkPage, SlingHttpServletRequest slingRequest){
		Page Page = JcrUtils.getPage(slingRequest, linkPage);
		
		if (Page!=null) {
			linkPage += BOQSConstant.HTML;
			return linkPage;
		}
		return BOQSConstant.SHARP;
	}
	
	/**
	 * Get Image In Page
	 * @param page
	 * @param imageName
	 * @return Image
	 */
	public static Image getImageOfPage(Page page,String imageName){		
		Image image=null;
		try{	
            Resource r =null;
            if(page!=null){
                r = page.getContentResource(imageName);
            }           
            if (r != null) {  
                image = new Image(r);                
            }            				
        }catch(Exception e){
            LOGGER.info("Error getImageOfPage: " + e.toString());
        } 	
		return image;
	}
	
	/**
	  * Get Image Of ParentNode
	  * @param slingRequest SlingHttpServletRequest
	  * @param parentNode Node
	  * @param imageName String
	  * @return Image
	  */
	 public static Image getImageOfParentNode(SlingHttpServletRequest slingRequest, Node parentNode, String imageName) {
		  Image image = null;
		  if(StringUtils.isNotBlank(imageName)){
			   try {
				    ResourceResolver resourceResolver = slingRequest.getResourceResolver();
				    Resource res = resourceResolver.getResource(parentNode.getPath()+"/"+imageName);
				    if (res != null) {
				     image = new Image(res);
				    }
			   } catch (Exception e) {
				   LOGGER.info("Error getImageOfParentNode: " + e.toString());
			   }
		  }
		  return image;
	 }
	 
	 /**
	  *  Get value from properies of component .if design mode empty is get value edit mode
	  * @param currentStyle
	  * @param properties
	  * @param field
	  * @param defaultValue
	  * @return value String
	  */
	 public static String getPropertiesOrCurrentStyle(Style currentStyle,ValueMap properties,String fieldCurrentStyle,String fieldProperty,String defaultValue){
		 String value=defaultValue;	
		 try{			
			 value=properties.get(fieldProperty, currentStyle.get(fieldCurrentStyle, defaultValue));			
		 }catch(Exception e){
			 LOGGER.info("Error getPropertiesOrCurrentStyle"+e.toString());
		 }
		 return value;
	 }
	 /**
	  * Check Not Empty Image
	  * @param image
	  * @return Boolean
	  */
	 public static boolean notEmptyImage(Image image){
		 boolean isImage=false;
		 try {
			 if(image!=null && image.getData()!=null){
				 isImage=true;
			 }
		 } catch (RepositoryException e) {
			 LOGGER.info(" Error isEmptyImage:"+e.toString());
		 }
		 return isImage;
	 }
	 
	 /**
	 * find all tags in tag manager
	 * @param slingRequest SlingHttpServletRequest
	 * @return {@code List<Tag>}
	 */
	public static List<Tag> findAllTags(SlingHttpServletRequest slingRequest) {
		List<Tag> listTags = new ArrayList<Tag>();
		try {
		    TagManager tagManager = slingRequest.getResourceResolver().adaptTo(TagManager.class);	
		    Tag[] tags = tagManager.getNamespaces();
		    for (Tag tag : tags) {
	    		recursive(tag, listTags);
			}		   
		} catch (Exception e) {
			LOGGER.error("Error findAllTags():"+ e.getMessage());
		}
		return listTags;
	}
	
	/**
	 * Get ALL tags in /etc/tags
	 * @param tag Tag
	 * @return {@code List<Tag>}
	 */
	public static List<Tag> recursive(Tag tag, List<Tag> listTags){		
		Iterator<Tag> ls= tag.listChildren();		
		while(ls.hasNext()) {			
			Tag tagChild = ls.next();
			listTags.add(tagChild);
			recursive(tagChild, listTags);
		}		
		return listTags;
	}
	
	 /**
     * Get Country from Path
     * @param path String
     * @return a Country String
     */
    public static String getCountryCode(String path) {
        String country = BOQSConstant.DEFAULT_COUNTRY_CODE;
        if (StringUtils.isBlank(path)) {
            return country;
        }
        for (String prefix : prefixes) {    
            if (path.startsWith(prefix)) {
            	
            	path = path.substring(prefix.length());
            	if (path.length() >= 5) {
                    country = path.substring(0, 2).toLowerCase();
                    return country;
                }
            }
        }
        return country;
    }

    /**
     *  Get Country from SlingHttpServletRequest
     * @param cqRequest the DCQ's request object
     * @return a Country String
     */
    public static String getCountryCode(SlingHttpServletRequest request) {
        return getCountryCode(request.getResource().getPath());
    }

}