<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.DropdownCompPresenter"%>

<%
    PresenterUtils.makePresenter(DropdownCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Drop down Component")%>
</c:if>

<div class="form-group dropdown-component">
	<div class="row">
		<div class="col-sm-6">
			<label for="${dropdownElement}">${dropdownlbl}</label>
			<c:if test="${isRequired eq true}">
				<span aria-hidden="true" class="wi-icon icon-required"></span>
			</c:if>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6">
			<div data-customselectbox="data-customselectbox" class="custom-select">
				<select id="${dropdownElement}" class="custom-box" name="${dropdownElement}" <c:if test="${isRequired eq true}"> data-required="" data-required-message="${requiredmessage}" </c:if> >
					<option value="">Please select</option>
					<c:forEach var="options" items="${itemsList}">
						<option value="${options.name}">${options.item}</option>
					</c:forEach>
				</select>
			</div>
		</div>
	</div>
</div>
