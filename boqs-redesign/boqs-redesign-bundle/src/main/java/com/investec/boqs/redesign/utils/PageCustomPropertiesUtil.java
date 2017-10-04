package com.investec.boqs.redesign.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import javax.jcr.Node;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.investec.boqs.redesign.bean.PageCustomProperties;

public class PageCustomPropertiesUtil {
	
	public static final Logger LOG = LoggerFactory.getLogger(PageCustomPropertiesUtil.class);
	
	/***
	 * Get page custom properties from pagepath
	 * @param pagePath String
	 * @param slingRequest SlingHttpServletRequest
	 * @return PageCustomProperties
	 */
	public static PageCustomProperties getPageCustomProperties(String pagePath, SlingHttpServletRequest slingRequest) {
		PageCustomProperties pageCustom = null;
		try {
			ResourceResolver resolver = slingRequest.getResourceResolver();
			PageManager pageManager = resolver.adaptTo(PageManager.class);
			Page page = null;
			if (!StringUtil.isEmpty(pagePath)) {
				page = pageManager.getPage(pagePath);
			}
			if (page != null) {
				Node jcrNode = JcrUtils.getNode(slingRequest, page.getPath()
						+ BOQSConstant.PATH_SEPARATOR + BOQSConstant.JCR_CONTENT);
				if (jcrNode != null) {
					pageCustom = setPageCustomProperties(jcrNode, slingRequest, page);
				}
			}
		} catch (Exception e) {
			LOG.error("Error getPageCustomProperties(): " + e.getMessage());
		}
		return pageCustom;
	}
	
	
	/***
	 * Get page custom properties from pagepath
	 * @param jcrNode Node
	 * @param slingRequest SlingHttpServletRequest
	 * @param page Page
	 * @return PageCustomProperties
	 */
	public static PageCustomProperties setPageCustomProperties(Node jcrNode, SlingHttpServletRequest slingRequest, Page page) {
		PageCustomProperties pageCustom = new PageCustomProperties();
		pageCustom.setPage(page);
		try {
			if (jcrNode != null) {
				pageCustom.setTitle(WCMUtil.getPageTitle(page));
				if (jcrNode.hasProperty("image/fileReference")) {
					pageCustom.setImage(JcrUtils.getImageOfParentNode(slingRequest, jcrNode, "image"));
				}
				
				if (jcrNode.hasProperty("subtext")) {
					pageCustom.setSubtext(jcrNode.getProperty("subtext").getValue().getString());
				}

				if (jcrNode.hasProperty("breadcrumb")) {
					pageCustom.setBreadcrumb(jcrNode.getProperty("breadcrumb").getValue().getBoolean());
				}
				
				/*if (jcrNode.hasProperty(BOQSConstant.CQ_LAST_REPLICATION_ACTION)) {
					pageCustom.setActive(jcrNode.getProperty(BOQSConstant.CQ_LAST_REPLICATION_ACTION).getValue().equals("Active"));
				}
				
				if (jcrNode.hasProperty(BOQSConstant.CQ_LAST_REPLICATED)) {
					//GregorianCalendar lastPublished = (GregorianCalendar) node.getProperty("cq:lastReplicated").getValue();
					GregorianCalendar lastPublished = (GregorianCalendar) jcrNode.getProperty(BOQSConstant.CQ_LAST_REPLICATED).getValue();
					//pageCustom.setLastPublished(lastPublished.getTime());
					pageCustom.setLastPublished(lastPublished);
				}

				if (jcrNode.hasProperty(BOQSConstant.CQ_LAST_REPLICATED_BY)) {
					pageCustom.setLastPublishedBy(jcrNode.getProperty(BOQSConstant.CQ_LAST_REPLICATED_BY).getValue().getString());
				}*/
				
				if (jcrNode.hasProperty("keywords")) {
					pageCustom.setKeywords(jcrNode.getProperty("keywords").getValue().getString());
				}
				
				if (jcrNode.hasProperty("stack")) {
					boolean stack =  jcrNode.getProperty("stack").getValue().getBoolean();
					pageCustom.setStack(stack);
				}
				
				if (jcrNode.hasProperty("disableChildList")) {
					boolean disableChildList =  jcrNode.getProperty("disableChildList").getValue().getBoolean();
					pageCustom.setDisableChildList(disableChildList);
				}
				
				//Get result url Site
				pageCustom.setPathSite(WCMUtil.getURL(page));
			}
		} catch (Exception e) {
			LOG.error("Error getPageCustomProperties(Node, SlingHttpServletRequest, Page): " + e.getMessage());
		}
		return pageCustom;
	}
	
	public static List<PageCustomProperties> getChildPages(String parentPath,SlingHttpServletRequest slingRequest) {
    	List<PageCustomProperties> pageCustoms = new ArrayList<PageCustomProperties>();
    	try{	
			ResourceResolver resolver = slingRequest.getResourceResolver();
		    PageManager pageManager = resolver.adaptTo(PageManager.class);
		    Page parentPage=null;
		    
		    if(!StringUtil.isEmpty(parentPath)){
		    	parentPage=pageManager.getPage(parentPath);
		    	if(parentPage!=null){
		    		Iterator<Page> it=parentPage.listChildren();
			    	if (it != null) {
						while (it.hasNext()) {
							Page childPage=it.next();
							PageCustomProperties childPageCust = getPageCustomProperties(childPage.getPath(), slingRequest);
							pageCustoms.add(childPageCust);
						}
			    	}
		    	}
		    }
		    	
		} catch (Exception e) {
			LOG.error("Exception getChildPages(String, SlingHttpServletRequest):"+ e.toString() );
		} 
    	
    	return pageCustoms;
	}

	
	/**
	 * get value col to display on html
	 * @param listPageCustom
	 * @param slingRequest
	 * @return int col
	 */
	public static int getColForMegaMenu(List<PageCustomProperties> listPageCustom,SlingHttpServletRequest slingRequest ){
		int colNum = -1;
		try {
			List<PageCustomProperties> pageCustoms = listPageCustom;
			colNum = pageCustoms.size();
			for (int i=0; i < pageCustoms.size(); i++){
				if (i>0){
					if (pageCustoms.get(i).isStack()){
						colNum--;
					}
				}
				
			}
		} catch (Exception e) {
			LOG.error("Exception getColForMegaMenu(listPage, SlingHttpServletRequest):"+ e.toString() );
		}
		return colNum;
	}
	
	/**
	* get all child Page and order by Last Published
	* @param parentPath
	* @param slingRequest
	* @return List<Page>
	*/
    public static List<PageCustomProperties> getChildPagesPublisedSort(String parentPath,SlingHttpServletRequest slingRequest) {
    	List<PageCustomProperties> pageCustoms = new ArrayList<PageCustomProperties>();
    	try{	
			ResourceResolver resolver = slingRequest.getResourceResolver();
		    PageManager pageManager = resolver.adaptTo(PageManager.class);
		    Page parentPage=null;
		    
		    if(!StringUtil.isEmpty(parentPath)){
		    	parentPage=pageManager.getPage(parentPath);
		    	if(parentPage!=null){
		    		Iterator<Page> it=parentPage.listChildren();
			    	if (it != null) {
						while (it.hasNext()) {
							Page childPage=it.next();
							PageCustomProperties childPageCust = getPageCustomProperties(childPage.getPath(), slingRequest);
							pageCustoms.add(childPageCust);
						}
			    	}
		    	}
		    }
		    PublisedOderByDesc(pageCustoms);
		    	
		} catch (Exception e) {
			LOG.error("Exception getChildPagesPublisedSort(String, SlingHttpServletRequest):"+ e.toString() );
		} 
    	
    	return pageCustoms;
    }
    
    /**
     * Publised Oder By Desc
     * @param pageCustoms
     */
    public static void PublisedOderByDesc(List<PageCustomProperties> pageCustoms){
    	try{
    		Collections.sort(pageCustoms, new Comparator<PageCustomProperties>() {// sort pages by lastPublished
    			
    			public int compare(PageCustomProperties one, PageCustomProperties other) {
    				
    				if(!other.isActive()){
    					return -1;
    				}else if(!one.isActive()){
    					return 1;
    				}else{
    					return other.getLastPublished().compareTo(one.getLastPublished());
    				}
    			}
    		});
    	} catch (Exception e) {
    		LOG.error("Exception PublisedOderByDesc(List<PageCustomProperties>):"+ e.toString() );
    	} 
    }
    
    /**
     * Modified Oder By Desc
     * @param pageCustoms
     */
    public static void ModifiedOderByDesc(List<PageCustomProperties> pageCustoms){
    	try{
    		Collections.sort(pageCustoms, new Comparator<PageCustomProperties>() {// sort pages by lastModified
    			
    			public int compare(PageCustomProperties one, PageCustomProperties other) {
    				
    				if(!other.isActive()){
    					return -1;
    				}else if(!one.isActive()){
    					return 1;
    				}else{
    					return other.getPage().getLastModified().compareTo(one.getPage().getLastModified());
    				}
    			}
    		});
    	} catch (Exception e) {
    		LOG.error("Exception ModifiedOderByDesc(List<PageCustomProperties>):"+ e.toString() );
    	} 
    }
}
