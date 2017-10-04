package com.investec.boqs.redesign.utils;

public class BOQSConstant {

	public static final String CQ_LAST_REPLICATED = "cq:lastReplicated";
	public static final String CQ_LAST_REPLICATED_BY = "cq:lastReplicatedBy";
	public static final String CQ_LAST_REPLICATION_ACTION = "cq:lastReplicationAction";
	public static final String DEFAULT_COUNTRY_CODE = "en";
	public static final int DEPTH_HOMEPAGE = 2;
	public static final String FLD_FILE_REF = "fileReference";
	public static final String HTML = ".html";
	public static final String JCR_CONTENT = "jcr:content";
	public static final String JCR_LAST_MODIFIED = "jcr:lastModified";
	public static final String JCR_LAST_MODIFIED_BY = "jcr:lastModifiedBy";
	public static final String LOGIN_PATH = "/libs/cq/core/content/login.html";
	public static final String MEDIA = "media";
	public static final String MULTI_FIELD 	= "multifield";
	public static final String NAME = "name";
	public static final String NT_UNSTRUCTURED = "nt:unstructured";
	public static final String PATH_FIELD = "pathfield";
	public static final String PATH_SEPARATOR = "/";
	public static final String SEPARTOR = "#@";
	public static final String SEPARTOR_ELEMENT = "####";
	public static final String SHARP = "#";
	public static final String SLING_RESOURCE_TYPE 	= "sling:resourceType";
	public static final String VAR_DIALOG_PATH = "dialogPath";
	public static final String XTYPE = "xtype";
	public static final String IMAGE_RENDITION_PATH = "/jcr:content/renditions/";
	public static final String RES_TYPE_TEXTCOMP = "boqs/components/textcomp";
	public static final String RES_TYPE_TEXTIMAGECOMP = "boqs/components/textandimagecomp";
	public static final String RES_TYPE_TABLECOMP = "boqs/components/tablecomp";
	public static final String RES_TYPE_PAGES = "boqs/component/page/%";
	public static final String SEARCH_TERM_PARAMETER = "search-term";
	public static final String RELATED_PROFESSION_PARAMETER = "related-profession";
	public static final String PAGE_NUMBER_PARAMETER = "page-number";
	public static final String TYPE_PARAMETER = "type";
	public static final String FINANCE_PARAMETER = "finance";
	public static final String RELATED_PRODUCT_PARAMETER = "related-product";
	public static final String SEARCH_PAGE_PARAMETER = "search-page";
	public static final String EVENT_CALENDAR_NODE_PATH_PARAMETER = "event-calendar-path";
	public static final String TYPE_EVENT_PARAMETER = "type-event";
	public static final String STATE_PARAMETER = "state";
	public static final String DATE_RANGE_PARAMETER = "date-range";
	public static final String TODAY = "today";
	public static final String DATE_FORMAT_FILTER = "MMM yyyy";
	public static final String DATE_FORMAT_FILTER_EVENT_CALENDAR = "MM/dd/yy";
	public static final String HYPHEN_HTML = "&nbsp;-&nbsp;";
	public static final String HYPHEN = " - ";
	public static final String PHOTOGALLERY_THUMB_PATH = "/jcr:content/renditions/cq5dam.thumbnail.319.319.png";
	public static final String EVENT_REGISTRATION_CONFIG_PAGE = "/content/boqs-redesign/configurations/event-registration";
	public static final String EVENT_REGISTRATION_CONFIG_PATH = "/jcr:content/par_content";
	
	public static final String ALL_RELATED_PROFESSIONS_OPTION = "allprofessions";
	public static final String ALL_FINANCE_CATEGORY_OPTION = "allcate";
	public static final String ALL_RELATED_PRODUCT_OPTION = "allproduct";
	public static final String ALL_RESULT_TYPE_OPTION = "alltype";
	public static final String ALL_EVENT_OPTION = "allevent";
	public static final String ALL_STATES_OPTION = "allstates";
	public static final String ALL_TOPICS_OPTION = "alltopics";
	public static final String TYPE_PRODUCT = "product";
	public static final String BLANK = "";
	public static final String TEMPLATE_SENDMAIL = "/content/dam/boqs-redesign/mailtemplate";
	public static final String MAIL_TEMPLATE_ROOT_PATH = "boqs.redesign.mail.template.root.path";
	public static final String BOQS_REDESIGN_PUBLISH_HOST = "boqs.redesign.publish.host";
	public static final String ATT_REDIRECT_LINK = "cq.form.redirect";
	public static final String PARAM_RESULT_SENDMAIL = "result";
	public static final String PARAM_EVENT_NAME = "eventName";
	public static final String PARAM_EVENT_PAGE = "eventPage";
	public static final String PARAM_EVENT_START_DATE = "eventStartDate";
	public static final String PARAM_EVENT_END_DATE = "eventEndDate";
	public static final String DOT_HTML = ".html";
	public static final String HOME_PAGE_PATH = "/content/boqs-live/home";
	public static final String BOQS_REDESIGN_ROOT_PAGE = "/content/boqs-live";
	public static final String ASSET_METADATA_PATH = "/jcr:content/metadata";
	public static final String ASSET_DESCRIPTION_PROPERTY = "dc:description";
	public static final String ASSET_TITLE_PROPERTY = "dc:title";
	
	//presenter InterestedInCompPresenter
	public static final String WOULD_LIKE_LBL = "I would like to";
	public static final String INTERESTED_LBL = "I'm interested in";
	public static final String WOULD_LIKE_NAME = "wouldlikeselect";
	public static final String INTERESTED_NAME = "interestedcb";
	
	//presenter ContactFormCompPresenter
	public static final String CONTINUE_BUTTON_LBL = "OK";
	public static final String EEMBEDDED_MODE = "embeddedinpage";
	public static final String CTA_BUTTON_LBL = "Enquire Now";
	public static final String FORM_HEADING_LBL = "Send us an enquiry";
	public static final String REQUIRED_SIGN_LBL = "Required Field";
	public static final String SUBMIT_BUTTON_LBL = "Submit Enquiry";
	public static final String YOUR_CONTACT_LBL = "Your contact details";
	public static final String YES_VALUE = "yes";
	public static final String NO_VALUE = "no";
	public static final String THANKYOU_HEADING = "Thank you for enquiry";
	
	//presenter TextareaCompPresenter
	public static final String ADDITIONAL_DETAIL_LBL = "Additional details or comments:";
	public static final String ADDITIONAL_DETAIL_NAME = "comment";

	//presenter TextfieldCompPresenter
	public static final String TEXTFIELD_LBL = "Full Name:";
	public static final String TEXTFIELD_TYPE = "text";
	public static final String TEXTFIELD_PLACEHOLDER = "Enter your first and last names";
	public static final String TEXTFIELD_NAME = "fullname";
	public static final String REQUIRED_MSG = "It is required.";
	
	//presenter PhoneAndEmailCompPresenter
	public static final String PHONE_LBL = "Preferred contact method";
	public static final String EMAIL_LBL = "Alternate contact";
	public static final String PHONE_NAME = "phone";
	public static final String EMAIL_NAME = "email";
	public static final String ADD_MORE_LBL = "Add antoher contact method";
	public static final String PHONE_PLACEHOLDER = "Enter a phone number";
	public static final String EMAIL_PLACEHOLDER = "Enter an email address";
	
	//event details
	public static final String REGISTRATION_STATUS_OPEN = "open";
	public static final String REGISTRATION_STATUS_WAITING_LIST = "waitinglist";
	public static final String REGISTRATION_STATUS_NOT_AVAILABLE = "notavailable";
	
	//presenter CheckboxCompPresenter
	public static final String CHECKBOX_NAME = "agreepolicy";
		
	// email address
	public static final String EMAIL_ADDRESS_LBL = "Email Address:";
	public static final String EMAIL_ADDRESS_PLACEHOLDER = "Enter your email address";
	public static final String EMAIL_ADDRESS_NAME = "email";
	public static final String CONFIRM_EMAIL_ADDRESS_LBL = "Confirm Email Address:";
	public static final String CONFIRM_EMAIL_ADDRESS_PLACEHOLDER = "Re-type your email address";
	public static final String CONFIRM_EMAIL_ADDRESS = "confirm-email";
	public static final String MESSAGE_OF_NON_EQUALITY = "Confirm email address does not match Email address";	
	
	// event registration
	public static final String REGISTER_HEADING = "Register Heading";
	public static final String REQUIRED_SIGN_TEXT = "Required field";
	public static final String SUBMIT_BUTTON_TEXT = "Submit";
	public static final String CANCEL_BUTTON_TEXT = "Cancel Registration";
	public static final String CONFIRMATION_HEADING = "You have been registered for";
	public static final String CONTINUE_BTN_LBL = "Continue";
	
	public class SaveTypeDropdown{
		public static final int isValue = 0;
		public static final int isNode = 1;
		public static final int isPathPage = 2;
	}

    //adding constants for DTM tracking of forms
    public static final String TYPE = "type";
    public static final String TYPE_CONTACT = "contact";
    public static final String TYPE_LEAD = "lead";
    
    //adding constants for Auto-Suggestions
    public static final String KEY = "key";
    public static final String MAX_RESULTS_OF_AUTO_SUGGESTIONS = "maxautosuggestresults";
    public static final int MAX_NUMBER_OF_AUTO_SUGGESTIONS = 10;
    
    
	// template level filter properties
	public static String RELATED_PROFESSION = "relatedprofessions";
	public static String RELATED_PRODUCT = "relatedproducttypes";
	public static String RELATED_FINANCE = "relatedfinancecategories";
	public static String RELATED_STATE = "relatedstates";
	public static String PAGE_CONTENT_TYPE = "pagecontenttype";
	public static String TOPICS = "topics";
	public static String TOPIC = "topic";
	
	public static String EXPERTISE = "expertise";
	
	//Card Properties 
	public static String TITLE = "headinglbl";
	public static String DESCRIPTION = "content";
	public static String THUMBNAIL_IMAGE = "fileReference";
	public static String ALT_TEXT = "alternatetext";
	public static String TARGET_URL = "targeturl";
	public static String PATH = "path";
	
	
	public static String TRUE = "true";
	public static String PAGE_PATH = "pagePath";
	public static String PIPELINE_SEPARATOR = "|";
	public static String READ_CARD_DETAILS = "readCardDetails";
	
	public static int MAX_SIMILAR_PRODUCT_RESULTS = 2;
	public static String OPEN_IN_NEW_TAB = "openinnewtab";
	public static String EMPTY_STRING_ARRAY = "[]";
	
	public static String BOQS_REDESIGN_ROOT_PAGE_CONFIG = "boqs.redesign.root.page";
	public static String CARD_COMP = "cardcomp";
	public static String BOQS_SPECIALIST = "BOQS SPECIALIST";
	
}