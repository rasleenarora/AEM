<%@page import="com.investec.boqs.redesign.utils.BOQSConstant"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.EventRegistrationCompPresenter"%>

<%
    PresenterUtils.makePresenter(EventRegistrationCompPresenter.class,slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%=StringUtil.getLabelAuthorMode("Event Registration Component")%>
</c:if>

<div id='event-ajax-form' data-popin <c:if test="${isEditMode }">data-showonload="true"</c:if> class="popup register-popup">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" aria-label="Close">
					<span aria-hidden="true" class="wi-icon icon-close-1"></span>
				</button>
				<div class="wrap-error hidden">
                        <span aria-hidden="true" class="wi-icon icon-close-2"></span>
                        <p class="text-error">${errormsg}</p>
				</div>
                <h4 class="modal-title">
	                <span class="register-label">${registerheading}</span>
	                <span class="event-name"></span>
                </h4>
                <input type="hidden" name="<%=BOQSConstant.PARAM_EVENT_NAME%>" value="">
                <input type="hidden" name="<%=BOQSConstant.PARAM_EVENT_PAGE%>" value="">
                <input type="hidden" name="<%=BOQSConstant.PARAM_EVENT_START_DATE%>" value="">
                <input type="hidden" name="<%=BOQSConstant.PARAM_EVENT_END_DATE%>" value="">
			</div>
            <div class="modal-body">
            	<div class="event-group">
                	<span aria-hidden="true" class="wi-icon icon-time"></span>
                    <div class="desc">
                    	<p class="time"></p>
                    	<p>${instruction}</p>
					</div>
            	</div>
                <div class="event-group">
                	<span aria-hidden="true" class="wi-icon icon-required"></span>
                 	<p class="desc">= ${requiredsigntext}</p>
                </div>
                <div class="register-form">
                	<div>
                		<cq:include path="par_content" resourceType="foundation/components/parsys" />
                	</div>
                    <button type="submit" class="btn btn-primary btn-submit">${submitbuttontext}
                    	<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
                    </button>
                    <button type="reset" class="btn-cancel">${cancelbuttontext}</button>
                </div>
        	</div>
    	</div>
	</div>
</div>

<div id="submit-success" data-popin class="popup information-popup" <c:if test="${showMessage}"> data-showonload="true" </c:if>>
	<div class="container">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-label="Close">
						<span aria-hidden="true" class="wi-icon icon-close-1"></span>
					</button>
					<h4 class="modal-title">
						${popupheading}
					</h4>
				</div>
				<div class="modal-body">
					<div class="desc">${popupmsg}</div>
					<a href="#"></a>
					<button type="button" class="btn btn-default btn-primary">
						${popupbtnlbl}
						<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>