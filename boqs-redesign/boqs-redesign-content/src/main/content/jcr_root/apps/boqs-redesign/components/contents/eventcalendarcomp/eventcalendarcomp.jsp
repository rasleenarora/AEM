<%@page import="com.investec.boqs.redesign.utils.BOQSConstant"%>
<%@page import="com.investec.boqs.redesign.presenter.EvenCalendarPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
PresenterUtils.makePresenter(EvenCalendarPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Event Calendar Component")%>

	<script type="text/javascript">
	      function setDefaultValue(dialog) {
	    	  var currDate = new Date();
	          var startdateObj = dialog.getField('./startdate');
	          var enddateObj = dialog.getField('./enddate');
	          startdateObj.minValue = currDate;
	          enddateObj.minValue = currDate;
	      };
	</script>
</c:if>

<c:if test="${not condensedview }">
	<div data-event-calendar="" 
		data-event-calendar-path="${eventCalendarNodePath}" 
		class="event-calendar"
		data-result-type="${resulttypeoverride}" 
		data-result-type-plural="${resulttypepluraloverride}"
		data-init-ajax="${ajaxLinkDefault}">
		
	  <div class="feature-event">
	    <h3 class="static-title">Featured Events</h3>
	    <div class="events"></div>
	  </div>
	  <div class="event-card-block">
	    <div class="events"></div>
	    <div class="event-result">
	      <div class="row">
	        <div class="col-md-4 col-sm-6 result">
	        	<c:if test="${haspaginateresults }">
					<div class="control-result load-more">
			           <div class="content load-more"><span class="icon-1"><c:if test="${not empty loadmoreiconpath }"><img src="${loadmoreiconpath }" alt=""></c:if></span>
			             <p class="desc">${moreresultstext}</p><a href="javascript:;" data-title="" class="load-more">${loadmoretext}<span aria-hidden="true" class="wi-icon icon-arrow"></span></a>
			           </div>
			         </div>
			        <div class="control-result no-more-result">
			          <div class="content no-more-result">
			            <p class="desc">${nomoreresultstext}</p><a href="javascript:;" class="back-top"><span aria-hidden="true" class="wi-icon icon-arrow-up"></span>${backtotoptext}</a>
			          </div>
			        </div>
		        </c:if>
				<div class="control-result zero-result">
		           <div class="content zero-result"><span class="icon-1"><img src="/etc/designs/boqs-redesign/headlibs/images/icon-zero-more.png" alt=""/></span>
		             <p class="desc">${noresultstext}</p><a href="javascript:;" class="clear-all"><span aria-hidden="true" class="wi-icon icon-clear-filters"></span>${clearallfilterstext}</a>
		           </div>
				</div>
	        </div>
	      </div>
	    </div>
	  </div>
	  <nav class="control-nav">
	    <button data-role="none" aria-label="previous" class="prev visible-xs"><span aria-hidden="true" class="wi-icon-white icon-arrow"></span></button>
	    <div class="main-control">
	      <button data-role="none" aria-label="control navigation" class="control-active visible-xs">Feature Event</button>
	      <ul class="list-unstyled list-control"></ul>
	    </div>
	    <button data-role="none" aria-label="next" class="next visible-xs"><span aria-hidden="true" class="wi-icon-white icon-arrow"></span></button>
	  </nav> 
	</div>
</c:if>
<c:if test="${condensedview }">
	<div data-event-calendar data-init-ajax="${ajaxLinkDefault}" class="event-calendar">
	  <div class="event-calendar-wrap feature">
	    <h3 class="static-title"><span class="feature-label">Featured Events</span><span class="num">(0)</span></h3>
	    <ul class="list-unstyled static-list"></ul>
	  </div>
	  <div class="month"></div>
	  <div class="text-center"><a href="#" class="link-more"><span class="load-more-label">View more events</span><span aria-hidden="true" class="wi-icon icon-arrow-gray-sm"></span></a>
	  </div>
	</div>
</c:if>