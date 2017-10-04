<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.TextfieldCompPresenter"%>

<%
    PresenterUtils.makePresenter(TextfieldCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Textfield Component")%>
</c:if>

<div class="form-group textfield-component">
	<div class="row">
		<div class="col-sm-6">
			<label for="${textfieldname}">${textfieldlbl}</label>
			<c:if test="${isRequired eq true}">
				<span class="wi-icon icon-required" aria-hidden="true"></span>
			</c:if>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-6 input-1 custom-box">
			<input  id="${textfieldname}" name="${textfieldname}" type="text" value=""
					placeholder="${textfieldplaceholder}" autocomplete="off"
					class="form-control" 
					<c:if test="${isRequired eq true}"> 
						data-required
					</c:if>
					<c:if test="${not empty requiredmsg}">
						data-required-message="${requiredmsg}"
					</c:if>
					<c:if test="${fieldtype eq 'phone'}">
						data-phonenumber=""
						data-phonenumber-message="${phonenumbervaliditymessage}"
					</c:if> 
        			<c:if test="${fieldtype eq 'email'}">
						data-email=""
						data-email-message="${emailValidityMessage}"
					</c:if> />
		</div>
	</div>
</div>