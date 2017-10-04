<%@page import="com.investec.boqs.redesign.presenter.HeadingPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(HeadingPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Heading Component")%>
</c:if>
<c:choose>
	<c:when test="${headingtype eq 'h2'}">
		<h2 class="h2 ${style} ${dontshowintoc}">${heading}</h2>
	</c:when>
	<c:when test="${headingtype eq 'h3'}">
		<h3 class="h3 ${style} ${dontshowintoc}">${heading}</h3>
	</c:when>
	<c:when test="${headingtype eq 'h4'}">
		<h4 class="h4 ${style} ${dontshowintoc}">${heading}</h4>
	</c:when>
</c:choose>

