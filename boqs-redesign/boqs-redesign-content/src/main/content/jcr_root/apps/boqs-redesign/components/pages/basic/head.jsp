<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@page import="com.investec.boqs.redesign.utils.WCMUtil"%>
<%@page import="com.investec.boqs.redesign.utils.BOQSConstant"%>
<%@page import="com.investec.boqs.redesign.utils.PageCustomPropertiesUtil"%>
<%@page import="com.investec.boqs.redesign.bean.PageCustomProperties"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@page import="com.investec.boqs.redesign.utils.JcrUtils"%>
<%@page import="com.day.cq.commons.Doctype"%>
<%@page import="com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap"%>
<%@page import="com.day.cq.commons.inherit.InheritanceValueMap,
    		org.apache.sling.settings.SlingSettingsService,
			java.util.Set"%>

<%
	InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));
	
	String googleAnalyticsId = iProperties.getInherited("googleAnalyticsId", "");
	
	//final ConfigurationCollector collector = sling.getService(ConfigurationCollector.class);
    PageCustomProperties pageCustomProperties = PageCustomPropertiesUtil.getPageCustomProperties(currentPage.getPath(), slingRequest);
	String pageTitle  = pageCustomProperties.getTitle();

	pageContext.setAttribute("pageTitle", pageTitle);
	
	String xs = Doctype.isXHTML(request) ? "/" : "";
	boolean isAuthorEnvironment = WCMMode.fromRequest(request) != WCMMode.DISABLED;
	pageContext.setAttribute("isAuthorEnvironment", isAuthorEnvironment);
 
	String favIcon = currentDesign.getPath() + "/favicon.ico";
    if (resourceResolver.getResource(favIcon) == null) {
        favIcon = null;
    }
    
	boolean isProductPage = BOQSConstant.TYPE_PRODUCT.equals(currentPage.getProperties().get("./pagecontenttype", String.class));
	pageContext.setAttribute("isProductPage", isProductPage);
	pageContext.setAttribute("pageIcon", currentPage.getProperties().get("./pageicon", ""));
	pageContext.setAttribute("pageTitle", pageTitle);
	String pageUrl = CommonUtils.getProperURL(currentPage.getPath(), slingRequest);
	if(null != pageUrl){
		if(pageUrl.endsWith(BOQSConstant.DOT_HTML)){
			pageUrl = pageUrl.substring(0, pageUrl.length() - BOQSConstant.DOT_HTML.length());
		}
		if(pageUrl.contains(BOQSConstant.HOME_PAGE_PATH)){
			pageUrl = pageUrl.replace(BOQSConstant.HOME_PAGE_PATH, "");
		}
	}
	pageContext.setAttribute("pageUrl", pageUrl);
	
	//String googleAnalyticsId = collector.getString(BOQSConstant.BOQS_REDESIGN_GOOGLE_ANALYTICS_ID, "");
	pageContext.setAttribute("googleAnalyticsId", googleAnalyticsId);
	//code for getting the prevent clickjacking checkbox value from page properties dialog
	Boolean preventClickJacking = properties.get("preventClickJacking", false);
    pageContext.setAttribute("preventClickJacking", preventClickJacking);
   
			
	String canonicalURL = request.getRequestURL().toString();
	if(null != canonicalURL){
		if(canonicalURL.endsWith(BOQSConstant.DOT_HTML)){
			canonicalURL = canonicalURL.substring(0, canonicalURL.length() - BOQSConstant.DOT_HTML.length());
		}
		String ridString = ":80" + BOQSConstant.HOME_PAGE_PATH;
		if(canonicalURL.contains(ridString)){
			canonicalURL = canonicalURL.replace(ridString, "");
		}
		if(canonicalURL.contains("boqspecialist.com.au:80")){
			canonicalURL = canonicalURL.replace("boqspecialist.com.au:80", "boqspecialist.com.au");
		}
		if(canonicalURL.contains(BOQSConstant.HOME_PAGE_PATH)){
			canonicalURL = canonicalURL.replace(BOQSConstant.HOME_PAGE_PATH, "");
		}
	}
    pageContext.setAttribute("canonicalURL", canonicalURL);
    boolean excludeExternalSearch = currentPage.getProperties().get("excludeexternalsearch", false);

	//getting the sling settings service and checking for prod runmode
	SlingSettingsService slingSettings = sling.getService(SlingSettingsService.class);
	boolean isProd = false;
	if(slingSettings != null){
        Set<String> runModes = slingSettings.getRunModes();
		isProd = runModes.contains("prod");
	}

	//setting the dtm script for prod and non-prod environments
	String dtmScript = null;
	if(isProd){
        //production DTM script
        dtmScript = "<script src=\"//assets.adobedtm.com/2e68e0a5b8480478975603e2c0ac69faa444eea1/satelliteLib-132e2cb23067143c5759018cf2cec473a91d13bf.js\"></script>";
    }else{
		//non-production DTM script
        dtmScript = "<script src=\"//assets.adobedtm.com/2e68e0a5b8480478975603e2c0ac69faa444eea1/satelliteLib-132e2cb23067143c5759018cf2cec473a91d13bf-staging.js\"></script>";
    }
	pageContext.setAttribute("dtmScript", dtmScript);
%>


<head>
	<meta charset="utf-8">
	<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
	<title><%= StringUtils.isBlank(currentPage.getTitle()) ? xssAPI.encodeForHTML(currentPage.getName()) : xssAPI.encodeForHTML(currentPage.getTitle()) %></title>
	<meta name="keywords" content="<%= xssAPI.encodeForHTMLAttr(WCMUtils.getKeywords(currentPage, false)) %>"<%=xs%>>
    <meta name="description" content="<%= xssAPI.encodeForHTMLAttr(properties.get("jcr:description", "")) %>"<%=xs%>>
    <% if (excludeExternalSearch) { %>
   		<meta name="robots" content="noindex, nofollow">
    <% } else { %>
    	<meta name="robots" content="index, follow">
    <% } %>
    <meta name="author" content="">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui, user-scalable=0">
    <% if (favIcon != null) { %>
    	<link rel="shortcut icon" type="image/x-icon" href="<%= xssAPI.getValidHref(favIcon) %>">
    <% } %>

    <%-- Adding the dtm script --%>
    <c:if test="${not empty dtmScript}">
        ${dtmScript}
	</c:if>
	
	<!-- Adding CDN JS Function -->
	<cq:include script="headlibs.jsp"/>
    
	<c:if test="${isAuthorEnvironment}">
		<link rel="stylesheet" href="<%= currentDesign.getPath()%>/headlibs/css/colorpicker.css" type="text/css">
	    <cq:includeClientLib js="boqs-redesign.commons.widgets"/>
	    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
	    <cq:include script="stats.jsp"/>
	</c:if>
	
	<link rel="canonical" href="${canonicalURL}"/>
	<script>
	    function doOpenDlg(url, path) {
	        var d = CQ.WCM.getDialog(url);
	        var reloadPage = true;
	        if(d) {
	            if( reloadPage ) {
	                d.success = function(form, action) {
	                    CQ.Util.reload(CQ.WCM.getContentWindow());
	                };
	            }
	            d.show();
	            d.loadContent(path);
	        }
	    }
    	if(${isProductPage}) {
    		var dataWelcomeData = { "icon": "${pageIcon}", "title": "${pageTitle}", "url" : "${pageUrl}" };
    	}
	</script>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', '${googleAnalyticsId}', 'auto');
			ga('send', 'pageview');
    </script>


        <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })
          (window,document,'script','dataLayer','GTM-M854S8G');
       </script>

    <c:if test="${not isAuthorEnvironment and preventClickJacking}">
		<!--Clickjacking code is to be run only on disabled not, as in the edit mode, it is redirecting the page to the URL without cf# when the there is cf# present in the URL -->
    	<!-- Clickjacking Prevention -->
		<style id="antiClickjack">body{display:none;} </style>
		<script type="text/javascript">
			if (self === top) {
				var antiClickjack = document.getElementById("antiClickjack");
				antiClickjack.parentNode.removeChild(antiClickjack);
			}
			else {
				top.location = self.location;
			}
		</script>
    </c:if>

    <link type="text/css" rel="stylesheet" href="https://offerswidget.visa.com/vos/styles/syndication-style.css">
	<link type="text/css" rel="Stylesheet" href="https://offerswidget.visa.com/vos/styles/syndication/boq-en-syndication-style.css" />
</head>