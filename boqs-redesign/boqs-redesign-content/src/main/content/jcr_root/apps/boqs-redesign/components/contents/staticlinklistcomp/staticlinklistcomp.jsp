<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.StaticLinkListPresenter"%>

<%
    PresenterUtils.makePresenter(StaticLinkListPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<script type="text/javascript">
		function beforeSubmit(dialog) {
			var listLinks = dialog.getField('./listitems').getValue();
			if (listLinks.length < 1) {
				CQ.Ext.Msg.alert('Validation Failed', 'List Items is not allow blank.');
				return false;
			}
			for(var i = 0; i< listLinks.length; i++){
				if(listLinks[i] == ''){
					CQ.Ext.Msg.alert('Validation Failed', 'List Items is not allow blank.');
					return false;
				}
			}
		};
	</script>
    <%= StringUtil.getLabelAuthorMode("Static Link List Component")%>
</c:if>
<c:if test="${not empty headinglbl }">
	<div class="static-list-block">
		<h3 class="static-title">${headinglbl}</h3>
		<ul class="list-unstyled static-list">
		<c:forEach items="${staticLinkItems}" var="staticLinkItem" varStatus="i">
			<li <c:if test="${i.last && empty staticLinkItem.icon}"> class="no-border-bottom" </c:if> >
				<a href="${staticLinkItem.url}" class="static-link">
					<c:if test="${not empty staticLinkItem.icon}">
						<div class="icon-box">
							<img src="${staticLinkItem.icon}" alt="" aria-hidden="true" />
						</div>
					</c:if>
					<div class="text-box">
						<span class="text">${staticLinkItem.linklbl}</span>
						<c:if test="${not empty staticLinkItem.description }">
							<span class="desc">${staticLinkItem.description}</span>
						</c:if>
					</div>
				</a>
			</li>
		</c:forEach>
		</ul>
	</div>
</c:if>