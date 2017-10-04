package com.investec.boqs.redesign.utils;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.jcr.Node;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FormUtil {    
    /**
     * Logger of this class
     */
    private static final Logger log = LoggerFactory.getLogger(FormUtil.class);

    public static final String PATTERN_EMAIL = "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    
    public static final String PATTERN_PHONE = "^[+]?[0-9]*[0-9]+$";
    
    /**
     * 
     * @param email
     * @return
     */
    public static boolean isValidEmailFormat(String email) {
        Pattern pattern = Pattern.compile(PATTERN_EMAIL);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
    
    /**
     * Accept initial characters to be [+] sign
     * @param phone
     * @return
     */
    public static boolean isValidPhoneFormat(String inputData) {
        if (inputData == null || inputData.isEmpty())
            return true;
        Pattern pattern = Pattern.compile(PATTERN_PHONE);
        Matcher matcher = pattern.matcher(inputData);
        return matcher.matches();
    }

    
    /**
     * 
     * @param date
     * dd/MM/yyyy with leap years 100% integrated Valid years : from 1600 to 9999 
     * Matches 29/02/2000 | 30/04/2003 | 01/01/2003
     * Non-Matches 29/02/2001 | 30-04-2003 | 1/1/2003
     * @return
     */
    public static boolean isDateFormatValid(String date) {
        boolean isValid = false;
        String expression = "^(((0[1-9]|[12]\\d|3[01])\\/(0[13578]|1[02])\\/((1[6-9]|[2-9]\\d)\\d{2}))|((0[1-9]|[12]\\d|30)\\/(0[13456789]|1[012])\\/((1[6-9]|[2-9]\\d)\\d{2}))|((0[1-9]|1\\d|2[0-8])\\/02\\/((1[6-9]|[2-9]\\d)\\d{2}))|(29\\/02\\/((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$";
        CharSequence inputStr = date;
        
        //Make the comparison case-insensitive.
        Pattern pattern = Pattern.compile(expression,Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);
        
        if(matcher.matches()) {
            isValid = true;
        }
        
        return isValid;
    }
    
    public static boolean isAlphanumeric(String s) {
        if(s == null) {
            return false;
        }
        
        if(s.matches("[a-zA-z0-9]*")) {
            return true;
        }
        
        return false;
    }
    
    public static boolean isNumeric(String s) {
        if(s == null) {
            return false;
        }
        
        try {
            long number = Long.parseLong(s);
            return true;
        }
        catch(Exception ex) {}
        
        return false;
    }
    
    /**
     * 
     * @param s
     * @return
     */
    public static String toUnicodeString(String s) {
        if(s == null) {
            return null;
        }
        
        if(s.trim().length() == 0) {
            return "";
        }
        
        try {           
            s = new String(s.getBytes("ISO8859_1"), "utf-8");
            return s;
        }
        catch(Exception e) {
            return s;
        }
    }
    
    public static java.util.Date toDate(java.sql.Timestamp timestamp) {
        long milliseconds = timestamp.getTime() + (timestamp.getNanos() / 1000000);
        return new java.util.Date(milliseconds);
    }
    
    public static java.sql.Timestamp toTimestamp(String dateStr, String format) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            Date date = sdf.parse(dateStr);
            return new java.sql.Timestamp(date.getTime());
        }
        catch(ParseException parseEx) {
            log.error("ParseException on FormUtil - toTimestamp :: " + parseEx.getMessage());
        }
        
        return null;
    }
    
    /**
     * Compares the second date against the first date
     * @param startDate
     * @param endDate
     * @return
     */
    public static final int DATE_IS_BEFORE = 1;
    public static final int DATE_IS_AFTER = 2;
    public static final int DATE_IS_EQUAL = 3;
    
    public static int compareDates(String startDateStr, String endDateStr, String dateFormat) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
            Date startDate = sdf.parse(startDateStr);
            Date endDate = sdf.parse(endDateStr);
            
            return FormUtil.compareDates(startDate, endDate);
        }
        catch(Exception ex) {}
        
        return -1;
    }
    
    public static int compareDates(Date startDate, Date endDate) {
        try {
            Calendar startDateCal = Calendar.getInstance();
            Calendar endDateCal = Calendar.getInstance();
            
            startDateCal.setTime(startDate);
            endDateCal.setTime(endDate);
            
            if(endDateCal.before(startDateCal)) {
                return DATE_IS_BEFORE;
            }
            else if(endDateCal.after(startDateCal)) {
                return DATE_IS_AFTER;
            }
            else if(endDateCal.equals(startDateCal)) {
                return DATE_IS_EQUAL;
            }
        }
        catch(Exception ex) {}
        
        return -1;
    }
    
	/**
	 * Validation TextField using set property  
	 * @param node jcr.Node
	 * @param slingRequest SlingHttpServletRequest
	 * @param parName String
	 * @param field String
	 * @param constraintType String
	 * @param constraintMessage string
	 * @param required boolean
	 * @param requiredMessage string
	 * @param css String
	 * @param inputHTML String
	 * @param rows String
	 * @param cssTitle String
	 */
	public static void setPropertyTextField(Node node, 
											SlingHttpServletRequest slingRequest, 
											String field, 
											String constraintType, 
											String constraintMessage, 
											boolean required, 
											String requiredMessage, 
											String css, 
											String inputHTML,
											String labelTitle,
											String rows,
											String cssTitle){
		   
	   try {
		   
		    String nodePath = node.getPath()+"/"+field;
		    Node nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    if(nodePar==null){
		    	 node.addNode(field);
		    	 node.save();  
		    	 nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    }
		    if(nodePar != null){
			     if(!nodePar.hasProperty("sling:resourceType")){
			    	 nodePar.setProperty("sling:resourceType", "foundation/components/form/text");
			     }
			     if(!nodePar.hasProperty("sling:resourceSuperType")){
			    	 nodePar.setProperty("sling:resourceSuperType", "foundation/components/form/defaults/field");
			     }
			     nodePar.setProperty("name", field);
			     if(!StringUtil.isEmpty(constraintType) && constraintType.equalsIgnoreCase("email")){
			    	 nodePar.setProperty("constraintType", "foundation/components/form/constraints/email");
			    	 nodePar.setProperty("constraintMessage", constraintMessage);
			     }
			     if(!StringUtil.isEmpty(constraintType) && constraintType.equalsIgnoreCase("captcha")){
			    	 nodePar.setProperty("sling:resourceType", "foundation/components/form/captcha");
			    	 nodePar.setProperty("constraintMessage", constraintMessage);			    	 
			     }	
			     if(!StringUtil.isEmpty(constraintType) && (constraintType.equalsIgnoreCase("number") || constraintType.equalsIgnoreCase("phone"))){
			    	 nodePar.setProperty("constraintType", "foundation/components/form/constraints/numeric");
			    	 nodePar.setProperty("constraintMessage", constraintMessage);			    	 
			     }	
			     if(!StringUtil.isEmpty(constraintType) && constraintType.equalsIgnoreCase("dropdown")){
			    	 nodePar.setProperty("sling:resourceType", "foundation/components/form/dropdown");
			    	 //nodePar.setProperty("constraintMessage", constraintMessage);				    	
			     }
			     if(required==true){
			    	 nodePar.setProperty("required", required+"");
			    	 nodePar.setProperty("requiredMessage", requiredMessage);
			     }else{
			    	 nodePar.setProperty("required", "false");
			     }
			     if(!StringUtil.isEmpty(css)){
			    	 nodePar.setProperty("css", css);
			     }
			     if(!StringUtil.isEmpty(rows)){
			    	 nodePar.setProperty("rows", rows);
			     }
			     if(!StringUtils.isEmpty(inputHTML)){
			    	 nodePar.setProperty("inputHTML", inputHTML);
			     }
			     if(!StringUtils.isEmpty(labelTitle)){
			    	 nodePar.setProperty("jcr:title", labelTitle);
			     }
			     if(!StringUtils.isEmpty(cssTitle)){
			    	 nodePar.setProperty("cssTitle", cssTitle);
			     }
			     nodePar.save();  
		    }
	   }catch (Exception e) {
		   log.error("Error setPropertyTextField():"+ e.toString());
	   }
	
	}
	
	/**
	 * Validation TextField using set property  
	 * @param node
	 * @param slingRequest
	 * @param parName
	 * @param field
	 * @param constraintType
	 * @param required
	 * @param requiredMessage
	 * @param css
	 * @param labelTitle
	 */
	public static void setPropertyDropdownField(Node node, 
											SlingHttpServletRequest slingRequest, 
											String field, 
											String constraintType, 
											boolean required, 
											String requiredMessage, 
											String css, 
											String inputHTML,
											String labelTitle){
		   
	   try {
		   
		    String nodePath = node.getPath()+"/"+field;
		    Node nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    if(nodePar==null){
		    	 node.addNode(field);
		    	 node.save();  
		    	 nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    }
		    if(nodePar != null){

			     if(!nodePar.hasProperty("sling:resourceSuperType")){
			    	 nodePar.setProperty("sling:resourceSuperType", "foundation/components/form/defaults/field");
			     }
			     nodePar.setProperty("name", field);

			     if(!StringUtil.isEmpty(constraintType) && constraintType.equalsIgnoreCase("dropdown")){
			    	 nodePar.setProperty("sling:resourceType", "foundation/components/form/dropdown");
			    	 //nodePar.setProperty("constraintMessage", constraintMessage);				    	
			     }
			     if(required==true){
			    	 nodePar.setProperty("required", required+"");
			    	 nodePar.setProperty("requiredMessage", requiredMessage);
			     }else{
			    	 nodePar.setProperty("required", "false");
			     }
			     if(!StringUtil.isEmpty(css)){
			    	 nodePar.setProperty("css", css);
			     }
		     	
			     if(!StringUtils.isEmpty(inputHTML)){
			    	 nodePar.setProperty("inputHTML", inputHTML);
			     }
			     if(!StringUtils.isEmpty(labelTitle)){
			    	 nodePar.setProperty("jcr:title", labelTitle);
			     }
			     nodePar.save();
		    }
	   }catch (Exception e) {
		   log.error("Error setPropertyTextField():"+ e.toString());
	   }
	
	}
	
	/**
	 * Validation TextField using set property  
	 * @param node
	 * @param slingRequest
	 * @param parName
	 * @param field
	 * @param constraintType
	 * @param saveType 
	 * 			isValue => Get values
	 * 			isNode => Get child nodes
	 * 			isPage => Get child pages
	 * @param requiredValidate String []
	 * @param css
	 * @param inputHTML
	 */
	public static void setPropertyDropdownField(Node node,
											SlingHttpServletRequest slingRequest,
											String field,
											String constraintType,
											int saveType,
											String requiredValidate[],
											String css,
											String inputHTML){
		   
	   try {
		   
		    String nodePath = node.getPath() + "/" + field;
		    Node nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    if(nodePar==null){
		    	 node.addNode(field);
		    	 node.save();  
		    	 nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    }
		    if(nodePar != null){

			     if(!nodePar.hasProperty("sling:resourceSuperType")){
			    	 nodePar.setProperty("sling:resourceSuperType", "foundation/components/form/defaults/field");
			     }
			     nodePar.setProperty("name", field);

			     if(!StringUtil.isEmpty(constraintType) && constraintType.equalsIgnoreCase("dropdown")){
			    	 nodePar.setProperty("sling:resourceType", "foundation/components/form/dropdown");
			    	 //nodePar.setProperty("constraintMessage", constraintMessage);				    	
			     }
			     if(requiredValidate != null){
			    	 nodePar.setProperty("requiredValidate", requiredValidate);
			     }else{
			    	 nodePar.setProperty("required", "false");
			     }
			     if(!StringUtil.isEmpty(css)){
			    	 nodePar.setProperty("css", css);
			     }
		     	
			     nodePar.setProperty("saveType", saveType);
			     if(!StringUtils.isEmpty(inputHTML)){
			    	 nodePar.setProperty("inputHTML", inputHTML);
			     }
			     nodePar.save();
		    }
	   }catch (Exception e) {
		   log.error("Error setPropertyTextField():"+ e.toString());
	   }
	
	}
	
	/**
	 * Validation TextField using set property  
	 * @param node
	 * @param slingRequest
	 * @param parName
	 * @param field
	 * @param constraintType
	 * @param required
	 * @param requiredMessage
	 * @param css
	 * @param labelTitle
	 */
	public static void setPropertyRadioField(Node node, 
											SlingHttpServletRequest slingRequest, 
											String field, 
											String constraintType, 
											boolean required, 
											String requiredMessage, 
											String css, 
											String labelTitle){
		   
	   try {
		   
		    String nodePath = node.getPath()+"/"+field;
		    Node nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    if(nodePar==null){
		    	 node.addNode(field);
		    	 node.save();  
		    	 nodePar=JcrUtils.getNode(slingRequest, nodePath);
		    }
		    if(nodePar != null){

			     if(!nodePar.hasProperty("sling:resourceSuperType")){
			    	 nodePar.setProperty("sling:resourceSuperType", "foundation/components/form/defaults/field");
			     }
			     nodePar.setProperty("name", field);

			     if(!StringUtil.isEmpty(constraintType) && constraintType.equalsIgnoreCase("radio")){
			    	 nodePar.setProperty("sling:resourceType", "foundation/components/form/radio");
			    	 //nodePar.setProperty("constraintMessage", constraintMessage);				    	
			     }
			     if(required==true){
			    	 nodePar.setProperty("required", required+"");
			    	 nodePar.setProperty("requiredMessage", requiredMessage);
			     }else{
			    	 nodePar.setProperty("required", "false");
			     }
			     if(!StringUtil.isEmpty(css)){
			    	 nodePar.setProperty("css", css);
			     }
		     	
			     if(!StringUtils.isEmpty(labelTitle)){
			    	 nodePar.setProperty("jcr:title", labelTitle);
			     }
			     nodePar.save();
		    }
	   }catch (Exception e) {
		   log.error("Error setPropertyTextField():"+ e.toString());
	   }
	
	}
	
}