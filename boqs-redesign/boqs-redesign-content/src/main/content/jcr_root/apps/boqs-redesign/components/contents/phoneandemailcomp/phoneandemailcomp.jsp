<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.PhoneAndEmailCompPresenter"%>

<%
    PresenterUtils.makePresenter(PhoneAndEmailCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Phone and Email Component")%>
</c:if>
<div data-phone-container 
	 data-placeholder-phone="${phoneplaceholder}" 
	 data-placeholder-email="${emailplaceholder}" 
	 data-valid-phone="${phonenumbervaliditymessage}"
	 data-valid-email="${emailvaliditymessage}"
	 data-title-phone="${phoneandemailmainlbl}"
	 data-title-email="${phoneandemailaltlbl}"
	 class="twice-component">
	<div class="form-group phone-component">
		<div class="row">
			<div class="col-sm-6">
				<label for="phone">${phoneandemailmainlbl}</label>
				<c:if test="${isRequired eq true }">
					<span aria-hidden="true" class="wi-icon icon-required"></span>
				</c:if>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6">
				<div class="input-group">
					<div class="dropdown">
						<div data-customselectbox="data-customselectbox"
							class="custom-select">
							<select class="custom-box">
								<option value="phone">Phone</option>
								<option value="email">Email</option>
							</select>
						</div>
					</div>
					<div class="wrap">
							<input id="${phoneName}" name="${phoneName}" type="text" value=""
							placeholder="${phoneplaceholder}" autocomplete="off"
							class="form-control" 
							<c:if test="${isRequired eq true }">
							data-required="true"
							data-required-message="${requiredmessage}"
							</c:if>
							data-phonenumber="true"
							data-phonenumber-message="${phonenumbervaliditymessage}"/>
					</div>
				</div>
			</div>
		</div>
	</div>
	 <div class="form-group">
	 	<a href="javascript:;"
	 	   class="text-link" 
	 	   data-add-contact="data-add-contact"
	 	   data-validate-required="${isRequired}">
	 	   ${addmorelbl}
		</a>
     </div>
     <input data-phone-hidden type="hidden" name="additional">
</div>