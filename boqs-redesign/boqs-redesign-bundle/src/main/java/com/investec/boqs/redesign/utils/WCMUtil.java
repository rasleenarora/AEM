package com.investec.boqs.redesign.utils;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.servlet.http.HttpServletRequest;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingBindings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.Externalizer;
import com.day.cq.rewriter.linkchecker.Link;
import com.day.cq.rewriter.linkchecker.LinkChecker;
import com.day.cq.rewriter.linkchecker.LinkValidity;
//import com.day.text.Text;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.foundation.Paragraph;
import com.day.cq.wcm.foundation.ParagraphSystem;
import com.day.cq.wcm.foundation.Image;
import com.day.cq.wcm.api.designer.Style;

import java.text.SimpleDateFormat;

public class WCMUtil {

    private static final Logger log = LoggerFactory.getLogger(WCMUtil.class);
    
    public static Node getNode(PageManager pageManager, String pageHandle, String parName) {
        Node node = null;
        if (pageHandle == null) {
            log.error("No valid pageHandle is specified");
        }
        if (parName == null) {
            log.error("No valid pargraph name is specified");
        }
        log.debug("Getting nodes based on path " + pageHandle + " parName " + parName);
        try{
            Page glossarypage = pageManager.getPage(pageHandle);
            
            if(glossarypage != null) {
                ParagraphSystem parsys = new ParagraphSystem(glossarypage.getContentResource());
                List<Paragraph> pars = parsys.paragraphs();
                for (int i = 0; i < pars.size(); i++) {
                    Paragraph par = (Paragraph) pars.get(i);
                    if (par.getPath().endsWith(parName)) {
                        node = (Node) par.adaptTo(Node.class);
                    }
                }
            }
        }catch(Exception e){log.error("",e);}
        return node;
    }
    
    public static String getPageTitle(Page page) {
        String untitled = "";
        if(page == null) return untitled;
        
        if(page.getPageTitle() != null && !page.getPageTitle().equals(""))
            return page.getPageTitle();
            //return StringEscapeUtils.escapeXml(page.getPageTitle());
        
        return page.getTitle();
    }
    
    public static String getNavTitle(Page page) {
        String untitled = "";
        if(page == null) return untitled;
        
        if(page.getNavigationTitle() != null && !page.getNavigationTitle().equals(""))
            return page.getNavigationTitle();
            //return StringEscapeUtils.escapeXml(page.getNavigationTitle());
        
        return WCMUtil.getPageTitle(page);
    }
    
    public static String getSubtitle(Page page) {
        String untitled = "";
        if(page == null) return untitled;
        
        //return StringEscapeUtils.escapeXml(WCMUtil.getFieldValue(page.getProperties(), "subtitle"));
        return WCMUtil.getFieldValue(page.getProperties(), "subtitle");
    }
    
    public static String[] replaceValues(String[] orig, String from, String to){
        if(orig==null) return null;
        String[] newValues = new String[orig.length];
        for(int i=0; i<orig.length; i++){
            if(orig[i]!=null){
                newValues[i] = orig[i].replace("/"+from+"/", "/"+to+"/");
                log.info("=== orig["+ i + "] is " + orig[i]);
                log.info("=== newValues["+ i + "] is " + newValues[i]);
            }
        }
        return newValues;
    }
    
    public static int getResourceSize(ResourceResolver resourceResolver, String fileReference){
        long size = 0;
        try{
            Resource resource = resourceResolver.getResource(fileReference);
            Node node = resource.adaptTo(Node.class);
            size = node.getProperty("jcr:content/renditions/original/jcr:content/./jcr:data").getLength();
        }catch(Exception e){
            //log.error("",e);
        }
        
        if(size<1024)
            return 1;
        return (int)size/1024;
    }
    
    public static String getCurrentSiteName(Page currentPage){
        //String path = currentPage.getPath();
        Page parentPage = currentPage.getAbsoluteParent(2);
        if(parentPage!=null){
            return parentPage.getName();
        }
        return "";
    }
    
    public static String getSiteName(Page countrySitePage){
        if(countrySitePage!=null){
            return countrySitePage.getName();
        }
        return "";
    }
    
    public static String getCountryCode(String path){
        try{
            String[] split = path.split("/");
            return split[3];
        }catch(Exception e){}
        return "sg";
    }
    
    public static String getLanguageCode(String path){
        /*
         * /content/[domain]/[language]/[page]
         * will return [language]
         */ 
        try{
            String[] split = path.split("/");
            return split[3];

        }catch(Exception e){}
        return "en";
    }
    
    public static String getLocale(String path) {
        return WCMUtil.getCountryCode(path) + "-" + WCMUtil.getLanguageCode(path);
    }
    
    /*
     * Generic method to get value from design dialog fields
     */
    public static String getDesignFieldValue(Style currentStyle, String key){
        return currentStyle.get(key,"");
    }
    
    /*
     * Generic method to get value from dialog fields
     */
    public static String getFieldValue(ValueMap properties, String key, String defaultValue){
        return properties.get(key,defaultValue);
    }
    
    public static String getFieldValue(ValueMap properties, String key){
        return properties.get(key,"");
    }
    
    /*
     * Generic method to get value from node properties.
     */
    public static String getNodePropertyValue(Node node, String key) {
        String value = "";
        try {
            if (node.hasProperty(key)) {
                value = node.getProperty(key).getString();
            }
        } catch (Exception e) {
        }
        return value;
    }
    
    /**
     * Generic method to get multi-value from node properties.
     * @param node - node
     * @param key - key
     * @return String
     */
    public static String[] getNodePropertyValues(final Node node,
            final String key) {
        String[] values = null;

        try {
            if (node.hasProperty(key)) {
                if (node.getProperty(key).isMultiple()) {
                    // if property is multi field
                    Property prop = node.getProperty(key);
                    int propertyLen = prop.getValues().length;
                    values = new String[propertyLen];
                    int counter = 0;
                    //put into array
                    for (Value v : prop.getValues()) {
                        values[counter] = v.getString();
                        counter++;
                    }
                } else {
                    // multi fields will become single-field when there is only
                    // one value, do the check here and return array for
                    // consistency.
                    // if is single-field
                    values = new String[0];
                    values[0] = WCMUtil.getNodePropertyValue(node, key);
                }
            }
        } catch (Exception e) {
        }
        return values;
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
    
    public static SimpleDateFormat getDateFormat(Page currentPage) {
        String defaultDateFormat = "MM/dd/yyyy"; //based on java.text.SimpleDateFormat
        
        try {
            Page homePage = currentPage.getAbsoluteParent(2);
            
            if(homePage.getProperties().get("dateFormat") != null) {
                defaultDateFormat = homePage.getProperties().get("dateFormat", String.class).toString();
            }
        }
        catch(Exception ex) {
            log.error("Exception thrown while retrieving date format: " + ex.getMessage());
            ex.printStackTrace();
        }
        
        return new SimpleDateFormat(defaultDateFormat);
    }
        
    public static boolean linkIsValid(HttpServletRequest request, String path) {
        try {
            SlingBindings bindings = (SlingBindings) request.getAttribute("org.apache.sling.api.scripting.SlingBindings");
            LinkChecker linkChecker = bindings.getSling().getService(LinkChecker.class);
            Link link = linkChecker.getLink(path, linkChecker.createSettings(bindings.getRequest()));
            
            if(link.getValidity() == LinkValidity.VALID) return true;
        }
        catch(Exception ex) {
            ex.printStackTrace();
        }
        
        return false;
    }
    
    public static boolean isExternalLink(String url) {
        if(url == null) return false;
        
        int protocolIndex = url.indexOf(":/");
        
        return (protocolIndex > -1) ? true : false;
    }
    
    public static String getURL(Page page, char s, Boolean arg1) {
        // @TODO add the include for com.day.text 
        //return getURL(Text.escape(page.getPath(), s, arg1));
        return getURL(page.getPath());
    }
    
    public static String getURL(Page page, char s) {
        return getURL(page, s, true);
    }
    
    public static String getURL(Page page) {
        return getURL(page.getPath());
    }
    
    public static String getURL(String path) {
        if(path == null) return path;

        int protocolIndex = path.indexOf(":/");
        int queryIndex = path.indexOf('?');
        int anchorIndex = path.indexOf('#');
        int javascriptIndex = path.indexOf("javascript:");
        
        path = path.replaceAll(" ", "%20");
        
        //if ( protocolIndex > -1 && (queryIndex == -1 || queryIndex > protocolIndex) ) {
      //external URL || an external/internal URL with query parameters || javascript call
        if ( protocolIndex > -1 || queryIndex > 0 || javascriptIndex > -1 || anchorIndex > -1) { 
            return path;
        } else if(path.endsWith(".html") || path.endsWith(".htm") || path.contains(".html#") || path.contains(".htm#")) {
            return path;
        } else if(path.startsWith("/content/dam/")) {
            return path;
        } else {
            return path.concat(".html");
        }
    }

    //get absolute path
    public static String getURL(String path,
            ResourceResolver resourceResolver) {

        path = WCMUtil.getURL(path);
        
        int protocolIndex = path.indexOf(":/");
        int javascriptIndex = path.indexOf("javascript:");
        
        if ( protocolIndex > -1 || javascriptIndex > -1 ) { 
            return path;
        } else if((null != path) &&
                (null != resourceResolver)){
          //  Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
          //  path = externalizer.externalLink(resourceResolver, Externalizer.LOCAL, path);
        }
        return path;
    }
    
    public static String getDomain(ResourceResolver resourceResolver) {
        Externalizer externalizer = resourceResolver.adaptTo(Externalizer.class);
        return externalizer.externalLink(resourceResolver, Externalizer.LOCAL, "").replace("/$", "");
    }
    
    public static String getImg(Image img) {
        String img_out = "";

        if(img != null && img.hasContent()){
            
            img.setSelector(".img");
            
            img_out += "<img src=\"" + img.getSrc() + "\"";
            
            if(img.getTitle() != null){
                if(!StringUtil.isEmpty(img.getTitle())){
                    img_out += " title=\"" + img.getTitle(true) + "\""; //true to escape title
                }
            }
            
            if(img.getAlt() != null){
                if(!StringUtil.isEmpty(img.getAlt())){
                    img_out += " alt=\"" + img.getAlt() + "\""; //need to escape in the future
                }
            }

            if(img.get("width") != null){
                if(!StringUtil.isEmpty(img.get("width"))){
                    img_out += " width=\"" + img.get("width") + "\"";
                }
            }
            
            if(img.get("height") != null){
                if(!StringUtil.isEmpty(img.get("height"))){
                    img_out += " height=\"" + img.get("height") + "\"";
                }
            }
            
            if(img.getAttributes() != null){
                Map <String, String> m = img.getAttributes();
                String style = "";
                if(!m.isEmpty()){
                    for(Map.Entry<String, String> entry: m.entrySet()){
                        if(entry.getKey() != "class"){ //make sure it is not class attribute
                            style += entry.getKey()+":"+entry.getValue()+"; ";                          
                        }else{ //print class attribute
                            img_out += " class=\""+entry.getValue()+"\"";
                        }
                    }
                    if(!StringUtil.isEmpty(style)){ //make sure there is style
                        img_out += " style=\""+style+"\"";                      
                    }
                }
            }
            
            
            img_out += " />";
        }
        
        return img_out; // <grumble content="y doesnt CQ do it with a toHTML or something?" />
    }
    
    public static String getATag(Node buttonComponentNode){
        Map <String, String> opts = new HashMap<String, String>();
        
        if(!getNodePropertyValue(buttonComponentNode, "label").isEmpty()){
            opts.put("content", getNodePropertyValue(buttonComponentNode, "label"));
        }
        
        if(!getNodePropertyValue(buttonComponentNode, "target").isEmpty()){
            opts.put("target", getNodePropertyValue(buttonComponentNode, "target"));
        }
        
        if(!getNodePropertyValue(buttonComponentNode, "linkURL").isEmpty()){
            opts.put("href", getURL(getNodePropertyValue(buttonComponentNode, "linkURL")));
        }
        
        if(!getNodePropertyValue(buttonComponentNode, "tagging").isEmpty()){
            opts.put("onclick", getNodePropertyValue(buttonComponentNode, "tagging"));
        }
        
        return getATag(opts);
    }
    
    /** 
     * Note: get_a_tag() and get_button_tag() are similar
     * Reason for not combining them into 1 is to have clearer difference 
     * 
     * @param opt - a Map containing the following variables
     * Required variables (for <a> to work)
     * opt[content]
     * opt[href]
     * 
     * Optional
     * opt[target]
     * opt[class]
     * opt[style]
     * opt[onclick]
     * etc... (the code will generate key = value )
     *  
     * @return html for <a> tag
     * 
     */
    public static String getATag(Map <String, String> opts){
        String out = "";
        
        out += "<a"; //open a tag

        for(Map.Entry<String, String> opt: opts.entrySet()){
            if(!opt.getKey().equals("content")){ //make sure it is not content
                String key = opt.getKey();
                String value = opt.getValue();
                
                if("href".equals(key))
                    value = WCMUtil.getURL(value);
                
                out+= " "+ key +"=\""+ value +"\"";
            }
        }   
        out += " >"; //close open tag

        out += opts.get("content"); //content   
        out += "</a>"; //close a tag

        return out;
    }

    /** 
     * Note: get_a_tag() and get_button_tag() are similar
     * Reason for not combining them into 1 is to have clearer difference 
     * 
     * @param opt - a Map containing the following variables
     * Required variables (for <button> to work)
     * opt[content]
     * opt[href]
     * 
     * Optional
     * opt[target]
     * opt[class]
     * opt[style]
     * opt[onclick]
     * etc... (the code will generate key = value )
     *  
     * @return html for <button> tag
     * 
     */
    public static String getButtonTag(Map <String, String> opts){
        String out = "";
        
        out += "<button"; //open a tag

        for(Map.Entry<String, String> opt: opts.entrySet()){
            if(!opt.getKey().equals("content")){ //make sure it is not content
                out+= " "+opt.getKey()+"=\""+opt.getValue()+"\"";
            }
        }   
        out += " >"; //close open tag

        out += opts.get("content"); //content   
        out += "</button>"; //close a tag

        return out;
    }

    /**
     * Function to return first child node of parent with component type
     * Scans 1 layer only
     * 
     * @param parentNode
     * @param pageHandle
     * @param parName
     * @return
     */
    public static Node getFirstInstanceofChildNode(Node parentNode, String componentName) throws RepositoryException{
        
        try{
            NodeIterator childNodes = parentNode.getNodes();
            
            while(childNodes.hasNext()){
                Node childNode = childNodes.nextNode();
                if(WCMUtil.getComponentName(childNode).equals(componentName)) {
                //if(childNode.getProperty("sling:resourceType").getString().endsWith("\\" + componentName)) {
                    return childNode;
                }
            }
        }catch(Exception e){log.error("",e);}
        
        return null;
    }
    
    public static String getKeywords(Page page, String propertyName) {
        if(page == null || StringUtil.isEmpty(propertyName)) return "";
        
        String keywords = "";
        
        try {
            ValueMap valueMap = page.getProperties();
            if(valueMap != null && valueMap.containsKey(propertyName)) {
                String[] tagsArr = valueMap.get(propertyName, String[].class);
                
                if(tagsArr != null) {
                    for(int i = 0; i < tagsArr.length; i++) {
                        String tag = tagsArr[i];
                        log.info(i + "= " + tagsArr[i]);
                        
                        if(tag.lastIndexOf(":") > 0)
                            tag = tag.substring(tag.lastIndexOf(":") + 1);
                        
                        if(tag.lastIndexOf("/") > 0)
                            tag = tag.substring(tag.lastIndexOf("/") + 1);
                        
                        if(i != (tagsArr.length - 1))
                            keywords += tag + ",";
                        else
                            keywords += tag;
                    }
                }
            }
        } catch(Exception ex) {
            log.error("Error getting keywords: " + ex.getMessage());
            ex.printStackTrace();
        }
        
        return keywords;
    }
    
    public static String getRedirectOpenTarget(Page redirectPage) 
    { 
        String target = "_self"; 
        if(redirectPage.getTemplate().getName().equals("redirect")) 
        { 
            if (redirectPage.getProperties().get("redirectTarget") != null) 
            { 
                String url = redirectPage.getProperties().get("redirectTarget").toString(); 
                if (url.indexOf("http://") >= 0) 
                { 
                    target = "_blank"; 
                } 
            } 
        } 
        return target; 
    }
    
}
