<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.EmailCompPresenter"%>

<%
    PresenterUtils.makePresenter(EmailCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Email and Confirm Email Component")%>
</c:if>

<div class="form-group textfield-component">
  <div class="row">
    <div class="col-sm-6">
      <label for="${emailaddresselement}">${ emailaddresslbl }</label>
      <c:if test="${isRequired eq true}">
          <span class="wi-icon icon-required" aria-hidden="true"></span>
      </c:if>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6 input-1">
        <input id="${emailaddresselement}" name="${emailaddresselement}" type="email" value="" 
        placeholder="${ emailaddressplaceholder }" class="form-control" 
        <c:if test="${isRequired eq true}"> 
        data-required
        data-required-message="${requiredmsg}"
        </c:if> 
        data-email=""
        data-email-message="Please enter a valid Email address"
        />
    </div>
  </div>
</div>
<div class="form-group textfield-component no-paste">
  <div class="row">
    <div class="col-sm-6">
      <label for="${ confirmemailaddresselement }">${ confirmemailaddresslbl }</label>
      <c:if test="${isRequired eq true}">
          <span class="wi-icon icon-required" aria-hidden="true"></span>
      </c:if>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6 input-1">
        <input id="<%=properties.get("./confirmemailaddresselement")%>" name="<%=properties.get("./confirmemailaddresselement")%>" type="email" value="" 
        placeholder="${ confirmemailaddressplaceholder }" class="form-control" 
        <c:if test="${isRequired eq true}"> 
        data-required
        data-required-message="${requireconfirmmsg}" 
        </c:if>
        data-email="" 
        data-equalto="${emailaddresselement}"
        data-email-message="Please enter a valid Email address"
		data-equalto-message="${messageofnonequality}"
        />
    </div>
  </div>
</div>