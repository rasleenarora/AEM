package com.investec.boqs.redesign.presenter;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrUtil;
import com.investec.boqs.redesign.service.GetSearchResultImpl;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;


public class SearchInputPresenter extends AbstractPresenter {
	protected final Logger LOG = LoggerFactory.getLogger(SearchInputPresenter.class);
	@Override
	protected void process() throws RepositoryException {

		if (null == currentNode) {
			return;
		}
		 JSONArray array= new JSONArray();
		 
		InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));
		// get value input from dialog and put value into model to use in jsp
		putModel("searchPlaceholder", iProperties.getInherited("searchPlaceholder", "Search the Site"));
		putModel("hinttitle", iProperties.getInherited("hinttitle", "Press Enter to search"));
		
		String filterPro = iProperties.getInherited("filterpro", BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION);
		putModel("filterpro", BOQSConstant.ALL_RELATED_PROFESSIONS_OPTION.equals(filterPro) ? "" : filterPro);

		String[] filterTypeArr = iProperties.getInherited("filtertype", String[].class);
		if (null != filterTypeArr) {
			StringBuilder filtertypeSb = new StringBuilder("");
			for (String string : filterTypeArr) {
				filtertypeSb.append(string);
				filtertypeSb.append("|");
			}
			String filtertype = filtertypeSb.toString();
			if (filtertype.length() > 1) {
				filtertype = filtertype.substring(0, filtertype.length() - 1);
			}
			putModel("filtertype", filtertype);
		}
		putModel("searchresult", CommonUtils.getProperURL(iProperties.getInherited("searchresult", ""), slingRequest));
		
		putModel(BOQSConstant.MAX_RESULTS_OF_AUTO_SUGGESTIONS, iProperties.getInherited(BOQSConstant.MAX_RESULTS_OF_AUTO_SUGGESTIONS, BOQSConstant.MAX_NUMBER_OF_AUTO_SUGGESTIONS));
		putModel("charecterlimit", iProperties.getInherited("charecterlimit", "3"));
		putModel("quicklinkslabel", iProperties.getInherited("quicklinksLabel", "Quick links"));
		String suggestionpath=  iProperties.getInherited("suggestionJsonPath","/content/public_meta/search/autosuggestions_list") + "/jcr:content/list";
		putModel("suggestionJsonPath", iProperties.getInherited("suggestionJsonPath","/content/public_meta/search/autosuggestions_list"));
		LOG.info("suggestionpath" + suggestionpath);
		Node currentNode = resourceResolver.getResource(suggestionpath).adaptTo(Node.class);
		LOG.info("currentNode" + currentNode);
		 NodeIterator iterator = currentNode.getNodes();
		
		
		
         while(iterator.hasNext()){
        	 JSONObject object= new JSONObject();
              Node childNode = iterator.nextNode();
              LOG.info("childNode" + childNode);
              if(childNode.hasProperty("value")){
            	
            	  String value=childNode.getProperty("value").getValue().getString();
            	  String valuePath = CommonUtils.buildLinkPath(value,"#");
            	  String propertyValue=slingRequest.getResourceResolver().map(valuePath);
            	  String text=childNode.getProperty("jcr:title").getValue().getString();
            	  try {
            		
					object.put("text",text );
					object.put("value",propertyValue );
				
            	  } catch (JSONException e) {
  					
  					e.printStackTrace();
  				} 
         }
         array.put(object);
         }
		putModel("suggestionJson", array);
		
		
		putModel("searchterm", slingRequest.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER));
		putModel("type", slingRequest.getParameter(BOQSConstant.TYPE_PARAMETER));
		putModel("relatedprofession", slingRequest.getParameter(BOQSConstant.RELATED_PROFESSION_PARAMETER));
		String searchInputId = CommonUtils.getRandomId("search-id");
		putModel("searchInputId", searchInputId);
	}
}
