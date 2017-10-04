package com.investec.boqs.redesign.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.ResultPage;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;

/**
 * Query Util
 *
 */
public final class QueryUtil {

    /**
     * These are the possible metadata names
     */
    /**
     * JCR_TITLE 
     */
    public static final String JCR_TITLE = "jcr:title";
    /**
     * NAV_TITLE
     */
    public static final String NAV_TITLE = "navTitle";
    /**
     * OFF_TIME
     */
    public static final String OFF_TIME = "offTime";
    /**
     * ON_TIME
     */
    public static final String ON_TIME = "onTime";
    /**
     * HIDE_IN_NAV
     */
    public static final String HIDE_IN_NAV = "hideInNav";
    /**
     * LAST_PUB_DATE
     */
    public static final String LAST_PUB_DATE = "cq:lastPublished";
    /**
     * LAST_PUB_BY
     */
    public static final String LAST_PUB_BY = "cq:lastPublishedBy";
    /**
     * RESOURCE_TYPE
     */
    public static final String RESOURCE_TYPE = "sling:resourceType";
    /**
     * CREATED_DATE
     */
    public static final String CREATED_DATE = "jcr:created";
    /**
     * CREATED_BY
     */
    public static final String CREATED_BY = "jcr:createdBy";
    /**
     * LAST_MODIFIED_DATE
     */
    public static final String LAST_MODIFIED_DATE = "cq:lastModified";
    /**
     * LAST_MODIFIED_BY
     */
    public static final String LAST_MODIFIED_BY = "cq:lastModifiedBy";
    
    /**
     * Logger of this class.
     */
    public static final Logger LOG = LoggerFactory
        .getLogger(QueryUtil.class);

    /**
     * Hide constructor.
     */
    private QueryUtil() {
    }



    /**
     * wrapper class for QueryBuilder.createQuery(session).
     * @param resourceResolver resourceResolver
     * @return Query Query
     */
    public static Query createQuery(final ResourceResolver resourceResolver) {

        if (resourceResolver == null) {
            LOG.warn("createQuery(resourceResolver):resourceResolver is null");
            return null;
        }

        Session session = resourceResolver.adaptTo(Session.class);
        QueryBuilder builder = resourceResolver.adaptTo(QueryBuilder.class);
        return builder.createQuery(session);
    }

    /**
     * wrapper class for QueryBuilder.createQuery(predicates, session).
     * @param resourceResolver resourceResolver
     * @param predicates predicates
     * @return Query
     */
    public static Query createQuery(final ResourceResolver resourceResolver,
            final PredicateGroup predicates) {

        if (resourceResolver == null) {
            LOG.warn("createQuery(resourceResolver, predicates): "
                    + "resourceResolver is null");
            return null;
        }

        if (predicates == null) {
            LOG.warn("createQuery(resourceResolver, predicates): "
                    + "predicates is null");
            return null;
        }

        Session session = resourceResolver.adaptTo(Session.class);
        QueryBuilder builder = resourceResolver.adaptTo(QueryBuilder.class);
        return builder.createQuery(predicates, session);
    }

    /**
     * helper class for:
     * CXQueryBuilder.createQuery(resourceResolver,predicates).
     * @param resourceResolver resourceResolver
     * @param searchMap searchMap
     * @return Query
     */
    public static Query createQuery(final ResourceResolver resourceResolver,
            final Map<String, String> searchMap) {

        if (searchMap == null) {
            LOG.warn("createQuery(resourceResolver, searchMap): "
                    + "searchMap is null");
            return null;
        }

        // null checking for other parameters is done in:
        // QueryUtil.createQuery(resourceResolver, predicates)
        return QueryUtil.createQuery(resourceResolver,
                PredicateGroup.create(searchMap));
    }

    /**
     * helper class for:
     * QueryUtil.createQuery(resourceResolver,predicates).
     * @param resourceResolver resourceResolver
     * @param searchMap searchMap
     * @return SearchResult
     */
    public static SearchResult searchGetResult(
            final ResourceResolver resourceResolver,
            final Map<String, String> searchMap) {

        return QueryUtil.searchGetResult(resourceResolver,
                searchMap,
                (long) 0);
    }

    /**
     * helper class for:
     * QueryUtil.createQuery(resourceResolver,predicates).
     * @param resourceResolver resourceResolver
     * @param searchMap searchMap
     * @param offsetNum offsetNum
     * @return SearchResult
     */
    public static SearchResult searchGetResult(
            final ResourceResolver resourceResolver,
            final Map<String, String> searchMap,
            final Long offsetNum) {

        if (offsetNum == null) {
            LOG.warn("searchGetResult(resourceResolver, searchMap, offsetNum"
                    + "): offsetNum is null");
            return null;
        }

        Query query = QueryUtil.createQuery(resourceResolver,
                searchMap);
        query.setStart(offsetNum);
        SearchResult result = query.getResult();

        return result;
    }

    /**
     * helper class for:
     * QueryUtil.createQuery(resourceResolver,predicates).
     * @param resourceResolver resourceResolver
     * @param searchMap searchMap
     * @param offsetNum offsetNum
     * @return List<Hit>
     */
    public static List<Hit> searchGetHits(
            final ResourceResolver resourceResolver,
            final Map<String, String> searchMap,
            final Long offsetNum) {

        SearchResult result = QueryUtil.searchGetResult(resourceResolver,
                searchMap, offsetNum);
        List<Hit> hits = result.getHits();

        return hits;
    }

    /**
     * helper class for:
     * QueryUtil.createQuery(resourceResolver,predicates).
     * @param resourceResolver resourceResolver
     * @param searchMap searchMap
     * @return List<Hit>
     */
    public static List<Hit> searchGetHits(
            final ResourceResolver resourceResolver,
            final Map<String, String> searchMap) {

        return QueryUtil.searchGetHits(resourceResolver,
                searchMap,
                (long) 0);
    }
    
    /**
     * helper function to get pages ordered by:
     * @param resourceResolver resourceResolver
     * @param String parentPath
     * @param String orderBy, refer to QueryUtil static strings
     * @param String orderBySort, desc or asc
     * @return List<Hit>
     */
    public static List<Page> getPagesOrderedBy(
            final ResourceResolver resourceResolver,
            final String parentPath,
            final String orderBy,
            final String orderBySort) {
    	
    	String mapOrderBySort = "asc";
    	
        Map<String, String> searchMap = new HashMap<String, String> ();
        searchMap.put("path", parentPath);
        searchMap.put("type", "cq:Page"); 
        
    	if(!StringUtil.isEmpty(orderBy)){
    		searchMap.put("orderby", "@jcr:content/" + orderBy);
    		
        	if(!StringUtil.isEmpty(orderBySort)){
                searchMap.put("orderby.sort", orderBySort);
        	}else{
        		searchMap.put("orderby.sort", mapOrderBySort);
        	}
    	}
    	
    	return QueryUtil.getPagesOrderedBy(resourceResolver, searchMap);
    }
    /**
     * helper function to get pages ordered by:
     * @param resourceResolver resourceResolver
     * @param String parentPath
     * @param String orderBy, refer to QueryUtil static strings
     * @param String orderBySort, desc or asc
     * @return List<Hit>
     */
    public static List<Page> getPagesOrderedBy(
            final ResourceResolver resourceResolver,
            final String parentPath,
            final String orderBy,
            final String orderBySort,
            final int limit) {
    	
    	String mapOrderBySort = "asc";
    	
        Map<String, String> searchMap = new HashMap<String, String> ();
        searchMap.put("path", parentPath);
        searchMap.put("type", "cq:Page"); 
        if(limit>0){
        	searchMap.put("p.limit", limit+"");
        }       
    	if(!StringUtil.isEmpty(orderBy)){
    		searchMap.put("orderby", "@jcr:content/" + orderBy);
    		
        	if(!StringUtil.isEmpty(orderBySort)){
                searchMap.put("orderby.sort", orderBySort);
        	}else{
        		searchMap.put("orderby.sort", mapOrderBySort);
        	}
    	}
    	
    	return QueryUtil.getPagesOrderedBy(resourceResolver, searchMap);
    }
   
    /**
     * helper function to get pages:
     * @param resourceResolver resourceResolver
     * @param searchMap searchMap
     * @return
     */
    public static List<Page> getPagesOrderedBy(
            final ResourceResolver resourceResolver,
            final Map<String, String> searchMap) {
    	
    	List<Page> results = new ArrayList<Page>();
    	List<Hit> hits = QueryUtil.searchGetHits(resourceResolver, searchMap);
    	
        for(Hit searchHit : hits){
        	try{
            	Page pageHit = searchHit.getResource().adaptTo(Page.class);
            	if(null != pageHit){
                	results.add(pageHit);        		
            	}
			} catch (RepositoryException e1) {
	            LOG.warn("getPagesOrderedBy(resourceResolver, searchMap) " +
	            		"have RepositoryException:" + e1.getMessage());
        	} catch (Exception e) {
	            LOG.warn("getPagesOrderedBy(resourceResolver, searchMap) " +
	            		"have Exception:" + e.getMessage());
	        }
        }
        
    	return results;
    }
    
    /**
     * wrapper class for QueryBuilder.loadQuery(path, session).
     * @param resourceResolver resourceResolver
     * @param path path
     * @return Query
     */
    public static Query loadQuery(final ResourceResolver resourceResolver,
            final String path) {

        if (resourceResolver == null) {
            LOG.warn("loadQuery(resourceResolver, path): "
                    + "resourceResolver is null");
            return null;
        }

        if (StringUtil.isEmpty(path)) {
            LOG.warn("loadQuery(resourceResolver, path): "
                    + "path is empty");
            return null;
        }

        Session session = resourceResolver.adaptTo(Session.class);
        QueryBuilder builder = resourceResolver.adaptTo(QueryBuilder.class);
        try {
            return builder.loadQuery(path, session);
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        } catch (IOException e) {
            LOG.error(e.getMessage());
        }

        return null;
    }


    /**
     * wrapper class for.
     * QueryBuilder.storeQuery(query, path, createFile, session).
     * @param resourceResolver resourceResolver
     * @param query query
     * @param path path
     * @param createFile createFile
     */
    public static void storeQuery(final ResourceResolver resourceResolver,
            final Query query,
            final String path,
            final boolean createFile) {

        if (resourceResolver == null) {
            LOG.warn("storeQuery(resourceResolver, query, path, createFile): "
                    + "resourceResolver is null");
        }

        if (query == null) {
            LOG.warn("storeQuery(resourceResolver, query, path, createFile): "
                    + "query is null");
        }

        if (StringUtil.isEmpty(path)) {
            LOG.warn("storeQuery(resourceResolver, query, path, createFile): "
                    + "path is empty");
        }

        Session session = resourceResolver.adaptTo(Session.class);
        QueryBuilder builder = resourceResolver.adaptTo(QueryBuilder.class);
        try {
            builder.storeQuery(query, path, createFile, session);
        } catch (RepositoryException e) {
            LOG.error(e.getMessage());
        } catch (IOException e) {
            LOG.error(e.getMessage());
        }

    }

    /**
     * Used to generate pagination of the search results
     * @param SlingHttpServletRequest request
     * @param ResultPage resultPage
     * @return
     */
    public static String getURL(SlingHttpServletRequest request,
    		ResultPage resultPage) {
        StringBuffer url = new StringBuffer();
        url.append(request.getRequestURI());

        url.append("?").append("start");
        url.append("=").append(resultPage.getStart());
        
        Enumeration<String> paramNames = request.getParameterNames();
        
        while(paramNames.hasMoreElements()){
        	String paramName = paramNames.nextElement();
        	if(!paramName.toLowerCase().contentEquals("start")){
        		String value = request.getParameter(paramName);
                try {
                	value = URLEncoder.encode(value, "UTF-8");
                	paramName = URLEncoder.encode(paramName, "UTF-8");
                } catch (UnsupportedEncodingException e) {

                }
                url.append("&").append(paramName);
                url.append("=").append(value);
        	}
        }
        
        return url.toString();
    }
    
}
