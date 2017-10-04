<%@page session="false" import="
		com.adobe.granite.xss.XSSAPI,
        com.day.cq.wcm.commons.WCMUtils,
        com.day.cq.wcm.api.WCMMode,
        com.investec.boqs.redesign.utils.JcrUtils,
        com.investec.boqs.redesign.utils.StringUtil,
        java.util.Locale,
        com.investec.boqs.redesign.utils.WCMUtil"
%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@include file="/libs/foundation/global.jsp"%><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %><%
%><%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><%
%><%@ page contentType="text/html; charset=utf-8" %>
<cq:defineObjects />
<%
	Locale currentLocale = new Locale(WCMUtil.getLanguageCode(currentPage.getPath()));
	final String countryCode = JcrUtils.getCountryCode(slingRequest); //en
    final boolean isEditMode = WCMMode.fromRequest(request) == WCMMode.EDIT;
    final boolean isDesignMode = WCMMode.fromRequest(request) == WCMMode.DESIGN;
 	String hostURL = request.getScheme() + "://" + request.getServerName();
    
    pageContext.setAttribute("hostURL", hostURL);
	pageContext.setAttribute("countryCode", countryCode);
	pageContext.setAttribute("currentLocale", currentLocale);
	pageContext.setAttribute("isEditMode", isEditMode);
	pageContext.setAttribute("isDesignMode", isDesignMode);
%>
