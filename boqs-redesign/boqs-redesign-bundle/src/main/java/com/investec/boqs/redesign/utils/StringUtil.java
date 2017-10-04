package com.investec.boqs.redesign.utils;

import java.text.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StringUtil {
	
	/**
     * Logger of this class
     */
    private static final Logger log = LoggerFactory.getLogger(StringUtil.class);
	
	private static final Random randomizer = new Random();

	/**
	 * Check whether a given string is null or empty
	 * @param s
	 * @return boolean
	 */
	public static boolean isEmpty(String s) {
		if(s == null) return true;
		if("".equals(s.trim())) return true;
		return false;
	}

    /**
     * Performs escaping of certain HTML characters that may be manipulated to
     * launch cross-site scripting attack.  By escaping off these characters,
     * the output string becomes relatively safe to be displayed onto the end-user
     * browser.
     * @param content - the original string, which may contain HTMl markups.
     * @param expandNewLine - option to replace newline with br
     * @return <type>String</type>
     */
    public static String htmlEncode(String content, boolean expandNewLine)
    {
        if(content == null || content.trim().length() == 0)
            return "";
        final StringBuffer sb = new StringBuffer();
        final StringCharacterIterator iterator = new StringCharacterIterator(content);
        
        char c = iterator.current();
        while( c!=StringCharacterIterator.DONE ) {
            switch(c) {
                case '<'  : sb.append("&lt;");   break;
                case '>'  : sb.append("&gt;");   break;
                case '&'  : sb.append("&amp;");  break;
                case '\"' : sb.append("&quot;"); break;
                case '\'' : sb.append("&#39;");  break;
                case '%'  : sb.append("&#37;");  break;
                case ';'  : sb.append("&#59;");  break;
                case '('  : sb.append("&#40;");  break;
                case ')'  : sb.append("&#41;");  break;
                case '+'  : sb.append("&#43;");  break;
                case '-'  : sb.append("&#45;");  break;
                case '\n' : if( expandNewLine ) { sb.append("<br/>"); }
                            else { sb.append(c); }
                            break;
                default: sb.append(c);
            }
            c = iterator.next();
        }
        return sb.toString();
    }

    /**
     * Performs escaping of certain HTML characters that may be manipulated to
     * launch cross-site scripting attack.  By escaping off these characters,
     * the output string becomes relatively safe to be displayed onto the end-user
     * browser.
     * @param content - the original string, which may contain HTMl markups.
     * @return <type>String</type>
     */
    public static String htmlEncode(String content) {
        return htmlEncode(content, false);
    }

    /**
     * Format a string to a length specified by left padding zero.
     * @param s
     * @param len
     * @return String
     */
	public static String leftZeroPad(String s, int length) {
		String q = s;
		for ( int i = s.length() ; i < length ; i ++ ) {
			q = "0" + q;
		}
		return q;
	}
	
	/**
	 * Generate a string of date and time, i.e. 'yyyymmddhhmmss'
	 * @return String
	 */
	public static String generateDateTimeKey() {
        Calendar now = Calendar.getInstance();
        String key = leftZeroPad( String.valueOf( now.get(Calendar.YEAR) ), 4 ) + 
                     leftZeroPad( String.valueOf( now.get(Calendar.MONTH) + 1 ), 2 ) + 
                     leftZeroPad( String.valueOf( now.get(Calendar.DATE) ), 2 ) + 
                     leftZeroPad( String.valueOf( now.get(Calendar.HOUR) ), 2 ) + 
                     leftZeroPad( String.valueOf( now.get(Calendar.MINUTE) ), 2 ) + 
                     leftZeroPad( String.valueOf( now.get(Calendar.SECOND) ), 2 );
        return key;
	}
	
    /**
     * Generate a string of random alphanumeric characters of length 22
     * @return String
     */
	public static String generateRandomKey() {
		String key = generateDateTimeKey();
		for ( int i = 0 ; i < 8 ; i ++ ) {
			key = key + (char)('A' + randomizer.nextInt(25));
		}
		log.info("#### key = " + key);
		return key;
	}
    
    /**
     * Generate a string of random alphanumeric characters of a length 
     * specified by len
     * @param len
     * @return String
     */
    public static String generateRandomString(int len) {
        String[] arr = { "a", "m", "4", "d", "r", "f", "8", "s", "i", "x", "k",
                "l", "2", "n", "o", "p", "z", "e", "h", "u", "v", "w", "j", "y", "q",
                "0", "1", "b", "3", "c", "5", "6", "7", "g", "9",
                "G", "B", "V", "D", "P", "F", "A", "R", "I", "U",
                "K", "W", "Z", "N", "O", "E", "Q", "H", "S", "T",
                "J", "C", "L", "X", "Y", "M" };
        
        StringBuffer sb = new StringBuffer();        
        if( len <= 0 ) { len = 8; }
        int size = arr.length;
        int i = 0;
        int x = 0;
        while( i<len ) {
            x = randomizer.nextInt();
            if( x<0 ) { x *= -1; }
            sb.append(arr[x%size]);
            i++;
        }
        log.info("#### string = " + sb.toString());
        return sb.toString();
    }
    
    /**
     * 
     * @return String
     */
    public static String generateRandomUUID() {
    	UUID uuid = UUID.randomUUID();
    	log.info("#### uuid = " + uuid.toString());
    	return uuid.toString();
    }
    
    public static String trimString(String string, int length) {
    	return trimString(string, length, "...", true);
    }
    
    /**
     * 
     * @return String
     */
    public static String trimString(String string, int length, String postfix, boolean soft) {
        if(string == null || string.trim().isEmpty()){
            return string;
        }

        StringBuffer sb = new StringBuffer(string);
        int actualLength = length;
        if(sb.length() > actualLength){
        	actualLength = length - postfix.length();
            if(!soft)
                return sb.insert(actualLength, postfix).substring(0, actualLength+postfix.length());
            else {
                int endIndex = sb.lastIndexOf(" ",actualLength);
                return sb.insert(endIndex, postfix).substring(0, endIndex+postfix.length());
            }
        }else{
            return string;
        }
    }
    
    /**
     * trim 'fist {@code<p>}' and 'last {@code</p>}' Tags
     * @param String
     * @return String
     */
    public static String trimPTags(String input) {
    	input = input.trim();
		if(input.startsWith("<p>") && input.endsWith("</p>")){
			input = input.substring(3, input.length()-4);
		}
		return input;
	}
   
    /***
     * Split input String into numOfLine line with separator 
     * @param input
     * @param numOfLine
     * @param separator
     * @return String
     */
    public static String splitString(String input, int numOfLine, String separator) {
    	List<String> result = new ArrayList<String>();
    	String output = "";
	    int length = input.length();
	    String[] items = input.split(" ");
	    if(items.length <= 1 || numOfLine == 1){
	    	return input;
	    }else{
		    output = items[0];
		    String temp = "";
		    for (int i = 1; i < items.length; i++) {
				temp = output + " " + items[i];
				if(result.size() == numOfLine-1){
					output = temp;
				}else{
					if(temp.length() <= length/numOfLine){
						output = temp;
					}else {
						result.add(output);
						output = items[i];
					}
				}
				if(i == items.length-1){
					result.add(output);
				}
			}
		    output = result.get(0);
		    if(result.size()>1){
			    for (int i = 1; i < result.size(); i++) {
					output += separator + result.get(i); 
				}
		    }
	    }
	    return output;
	}
    
    /**
     * Get Label For Author Mode
     * @param componentName
     * @return label
     */
    public static String getLabelAuthorMode(String componentName){
    	String label = "<p  style='color: #A4A4A4; text-decoration: underline;font-size: 11px;'>";
    	label += componentName;
    	label += "</p>";
    	return label;
    }
    
    /**
     * get Scene7 Thumbnail URL
     * @param input String
     * @param width String
     * @param height String
     * @return String
     */
    public static String getScene7ThumbnailURL(String input, String width, String height) {
     if(input != null && input.trim() != ""){
      input = input.trim();
      Pattern p = Pattern.compile("e2");
   Matcher m = p.matcher(input);
   input = m.replaceFirst("is/image");
   return input+"?fit=constrain,1&wid="+width+"&hei="+height;
     }else{
      return "";
     }
 }
}
