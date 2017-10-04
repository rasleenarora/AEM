<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.CheckboxCompPresenter"%>

<%
    PresenterUtils.makePresenter(CheckboxCompPresenter.class, slingRequest, properties, currentNode);
	//log.info("AAAAAAAAAA Reloads toai test Checkbox AAAAAAAAAAAAAAAAAAA");
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Checkbox Component")%>
</c:if>
<div class="form-group">
  <div class="checkbox-group">
    <input id="${checkboxelement}" name="${checkboxelement}" type="checkbox" value="${checkboxelement}" 
    	<c:if test="${isRequired eq true}"> 
    	data-required
    	data-required-message="${requiredmsg}"
    	</c:if> />
    <label for="${checkboxelement}" class="label-text">${checkboxlbl}</label>
  </div>
</div>