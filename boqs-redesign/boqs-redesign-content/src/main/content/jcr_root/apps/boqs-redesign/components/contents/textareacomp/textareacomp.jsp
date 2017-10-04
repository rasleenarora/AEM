<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.TextareaCompPresenter"%>

<%
    PresenterUtils.makePresenter(TextareaCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Textarea Component")%>
</c:if>

<div class="form-group textarea-component">
	<label for="${textareaName}">${textarealbl}</label>
	<c:if test="${isRequired eq true}">
		<span aria-hidden="true" class="wi-icon icon-required"></span>
	</c:if>
	<div class="row">
		<textarea name="${textareaName}" id="${textareaName}" class="textarea-control"
		<c:if test="${isRequired eq true}"> data-required="" data-required-message="${requiredmessage}" </c:if> ></textarea>
	</div>
</div>