<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.EventDetailsCompPresenter"%>

<%
    PresenterUtils.makePresenter(EventDetailsCompPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
    <%=StringUtil.getLabelAuthorMode("Event Detail Component")%>
</c:if>

<c:if test="${not empty startdatetime and not empty location and not empty eventtype }">
  <div class="row">
    <div class="col-sm-8">
      <div class="event-details">
        <div class="thumb clearfix">
          <div class="thumb-content">
            <div class="date-time">
              <p class="desc-1">
                <span aria-hidden="true" class="wi-icon icon-date-time"></span>
                <span class="blue-text">${ startdatetime }</span>
              </p>
            </div>
            <div class="location">
              <p class="desc-1">
                <span aria-hidden="true" class="wi-icon icon-location"></span>
                <span class="blue-text">${ location }</span>
              </p>
            </div>
            <div class="event-type">
              <p class="desc-1">
                <span aria-hidden="true" class="wi-icon icon-event-type"></span>
                <span class="blue-text">
                    <c:choose>
                        <c:when test="${ eventtype eq 'annualevent'}">Annual Event</c:when>
                        <c:when test="${ eventtype eq 'conference'}">Conference</c:when>
                        <c:when test="${ eventtype eq 'luncheon'}">Luncheon</c:when>
                        <c:when test="${ eventtype eq 'industryevent'}">Industry Event</c:when>
                        <c:when test="${ eventtype eq 'seminar'}">Seminar</c:when>
                        <c:when test="${ eventtype eq 'sportingevent'}">Sporting Event</c:when>
                        <c:when test="${ eventtype eq 'workshop'}">Workshop</c:when>
                        <c:otherwise><!-- nothing --></c:otherwise>
                    </c:choose></span>
              </p>
            </div>
          </div>
          <c:if test="${ not empty fileReference }"><div class="thumb-image"><img src="${ fileReference }" alt="${eventimagealt}"/></div></c:if>
        </div>
        <c:if test="${isDisplayRegistration}">
	        <div class="content">
	             <h3 class="blue-text">${ registrationstatusheading }</h3>
	             <p class="blue-text">${ registrationstatustext }</p>
	             <a href="#" class="btn btn-primary center"
	             data-show-event-registration="data-show-event-registration" data-event-page="<%=currentPage.getPath() %>" data-title="${eventTitle}" data-event-page="${eventPage}" data-start-date="${startDate}" data-end-date="${endDate}" data-time="${ startdatetime }">
	                <span>${ registerbutton }</span><span aria-hidden="true" class="wi-icon icon-arrow"></span>
	             </a>
		        <c:if test="${isEditMode }">
			    	  <a href="${eventRegistrationConfigPage}" class="btn-cancel" target="_blank">Config Event Registration Here</a>
			    </c:if>
	        </div>
        </c:if>
      </div>
    </div>
    <%  WCMMode mode = WCMMode.DISABLED.toRequest(request);%>
    	<sling:include path="${eventRegistrationConfigPath}" resourceType="foundation/components/parsys" />
    <%   mode.toRequest(request); %>
  </div>
</c:if>