<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.CategoryPresenter"%>
<%
    PresenterUtils.makePresenter(CategoryPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Author Category Component")%>
</c:if>
<c:set var="randomNumber" value="<%= (int) (Math.random() * 100) %>" />
<c:set var="nodeName" value="<%= currentNode.getName() %>" />
<section id="category-${nodeName}-${randomNumber}" class="panel"
	${properties.removeTitleStickyHeader ? '' : 'data-section-nav'}>
	<div class="container">
		<div class="block rich-text">
			<h2>${title}</h2>
			<p>${content}</p>
		</div>
		<c:choose>
			<c:when test="${categoryInfoType ne 'browse'}">
				<div class="block cards">
					<div class="row row-ib row-ib-left">
						<c:forEach items="${authoredCategories}" var="authoredCategory">
							<div class="card col-xs-12 col-sm-6 col-md-4">
								<a href="${authoredCategory['path']}" class="card-inner">
									<div class="card-thumb">
										<!-- 3:1 ratio-->
										<img src=" ${authoredCategory['thumanailImage']}"
											alt="${authoredCategory['altText']}" class="img-responsive">
									</div>
									<h2 class="card-heading">${authoredCategory['title']}</h2>
									<div class="card-body">
										${authoredCategory['description']}</div>
								</a>
							</div>
						</c:forEach>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="block cards">
					<div class="row">
						<c:forEach items="${browsedCategories}" var="browsedCategory">
							<div class="card col-xs-12 col-sm-6 col-md-4">
								<a href="${browsedCategory.path}" class="card-inner">
									<div class="card-thumb">
										<!-- 3:1 ratio-->
										<img src="${browsedCategory.thumanailImage}"
											alt="${browsedCategory.altText}" class="img-responsive">
									</div>
									<h2 class="card-heading">${browsedCategory.title}</h2>
									<div class="card-body">${browsedCategory.description}</div>
								</a>
							</div>
						</c:forEach>
					</div>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</section>