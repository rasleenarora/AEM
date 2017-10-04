<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.PhoneNumberCompPresenter"%>

<%
    PresenterUtils.makePresenter(PhoneNumberCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Phone number Component")%>
</c:if>

<c:if test="${alignment eq 'centred' }">
	<div class="inner text-center">
</c:if>

<c:if test="${alignment eq 'left' }">
	<div class="inner">
</c:if>
	<a href="tel:${phonenumberTrim}" class="phone-number">
		<span class="icon-1">
			<span class="wi-icon-white icon-phone" aria-hidden="true"></span>
		</span>
		<span class="number">${phonenumber}</span>
	</a>
</div>
