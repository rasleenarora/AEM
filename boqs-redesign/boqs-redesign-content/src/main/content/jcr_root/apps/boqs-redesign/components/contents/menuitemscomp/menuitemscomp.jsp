<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.MenuItemsPresenter"%>

<%
    PresenterUtils.makePresenter(MenuItemsPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Menu Items Component")%>
</c:if>
<c:choose>
<c:when test="${layout eq 'vertical'}">
	<div data-item="" class="action-link col-sm-3 pull-right">
</c:when>
<c:otherwise>
	<div class="action-link horizontal">
</c:otherwise>
</c:choose>
<ul data-mobile-top="" class="link-list">
	<c:forEach items="${globalMenu}" var="globalMenu" varStatus="i">
		<li>
			<a href="${globalMenu.link}" class="btn btn-side">
			<span class="icon">
				<img src="${globalMenu.icon}"
					 alt="" class="img-responsive hidden-xs icon-origin" />
				<img src="${globalMenu.icon}${whileImgPath}"
					 alt="" class="img-responsive hidden-xs icon-white" />
				<img src="${globalMenu.icon}${mobileImgPath}"
					 alt="" class="img-responsive visible-xs" />
			</span><span>${globalMenu.label}</span>
			</a>
		</li>
	</c:forEach>
	<c:if test="${localSize > 0 }">
       <c:forEach items="${localMenu}" var="localMenu" varStatus="i">
			<li>
				<a href="${localMenu.link}" class="btn btn-side">
				<span class="icon">
					<img src="${localMenu.icon}"
						 alt="" class="img-responsive hidden-xs icon-origin" />
					<img src="${localMenu.icon}${whileImgPath}"
						 alt="" class="img-responsive hidden-xs icon-white" />
				 	<img src="${localMenu.icon}${mobileImgPath}"
						 alt="" class="img-responsive visible-xs" />
				</span><span>${localMenu.label}</span>
				</a>
			</li>
		</c:forEach>
    </c:if>
	</ul>
</div>
