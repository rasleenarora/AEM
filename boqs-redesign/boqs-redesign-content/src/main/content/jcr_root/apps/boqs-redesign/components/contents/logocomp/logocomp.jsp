<%@page import="com.investec.boqs.redesign.presenter.LogoPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.BOQSConstant"%>
<%@page session="false"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(LogoPresenter.class, slingRequest, properties, currentNode, currentStyle);
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Logo Component")%>
</c:if>

<a href="${homePage}" class="logo">
	<c:if test="${not hasImage}">
		BOQ Specialist
	</c:if>
	<c:if test="${hasImage}">
    	<img src="${imagePath}" alt="${logoalttext}" class="img-responsive hidden-xs"/>
       	<img src="${imagePathMobile}" alt="${logoalttext}" class="img-responsive visible-xs"/>
       	<img src="${imagePathSticky}" alt="${logoalttext}" class="img-responsive only-sticky"/>
   	</c:if>
</a>
