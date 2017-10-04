<%@page import="com.investec.boqs.redesign.presenter.ButtonPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(ButtonPresenter.class, slingRequest, properties, currentNode);
    //log.info("++++++++++++++++ Reloads -------------------");
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Button Component")%>
</c:if>

<c:if test="${addtopmargin}">
	<div class="show-more">
</c:if>

<c:if test="${buttonstyle eq 'primary' }">
	<a href="${buttontargeturl}" <c:if test="${not empty buttonanalyticslabel}">data-analytics=""
						        data-hit-type="event"
						        data-event-category="button"
						        data-event-action="click"
						        data-event-label="${buttonanalyticslabel}"
								data-event-value="1"</c:if>
								class="btn btn-primary ${buttonalignment}"><span>${buttontext}</span><span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
</c:if>
<c:if test="${buttonstyle eq 'secondary' }">
	<a href="${buttontargeturl}" <c:if test="${not empty buttonanalyticslabel}">data-analytics=""
						        data-hit-type="event"
						        data-event-category="button"
						        data-event-action="click"
						        data-event-label="${buttonanalyticslabel}"
								data-event-value="1"</c:if>
								class="btn btn-default ${buttonalignment}"><span>${buttontext}</span><span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
</c:if>
<c:if test="${buttonstyle eq 'tertiary' }">
	<a href="${buttontargeturl}" <c:if test="${not empty buttonanalyticslabel}">data-analytics=""
						        data-hit-type="event"
						        data-event-category="button"
						        data-event-action="click"
						        data-event-label="${buttonanalyticslabel}"
								data-event-value="1"</c:if>
								class="btn-tertiary ${buttonalignment}"><span>${buttontext}</span><span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
</c:if>

<c:if test="${addtopmargin}">
	</div>
</c:if>