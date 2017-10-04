<%@page import="com.investec.boqs.redesign.presenter.ResultCardCompPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(ResultCardCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Result Card Component")%>
</c:if>

<div data-filter-finance="${relatedFinanceCategorysList}"
 	data-filter-related-profession="${relatedProfessionsList}"
 	data-filter-related-product="${relatedProductTypesList}"
    data-filter-state="${relatedStatesList}"
    class="card-item filter-item">
	<div class="collapse-cmp result-card-cmp">
		<div data-expand-handle="" data-target="#expand-card-${idCard}" class="heading">
			<h2 data-expand-title="" class="title">${headinglbl}</h2>
			<a href="javascript:;" class="link-1">
				<span class="wi-icon icon-arrow" aria-hidden="true"></span>
			</a>
		</div>
		<div data-expand-content="" id="expand-card-${idCard}" class="content">
			<div class="thumb">
				<c:if test="${not empty thumbnailimage}">
					<img src="${thumbnailimage}" alt="${alternatetext}" class="img-responsive"/>
				</c:if>
			</div>
			<div class="desc">
				<c:if test="${not empty headingtargeturl}"><a href="${headingtargeturl}" title="${headinglbl}"></c:if>
					<h2 data-expand-title="" class="title">
						<c:if test="${not empty iconpath}">
							<img src="${iconpath}" alt="${headinglbl}" />
						</c:if>
						<span>${headinglbl}</span>
					</h2>
				<c:if test="${not empty headingtargeturl}"></a></c:if>
				${content}
			</div> 
			<ul class="list-unstyled list-link-1">
				<c:if test="${not empty targeturl}">
					<li>
						<a href="${targeturl}" class="btn btn-default btn-default-1">
							<span class="wi-icon icon-arrow-1" aria-hidden="true"></span>
							${mainbuttonlbl}
						</a>
					</li>
				</c:if>
				<c:forEach items="${additionalButtonList}" var="additionalButton" varStatus="i">
					<li>
						<a href="${additionalButton.link}" class="btn btn-default btn-default-1">
							<span class="wi-icon icon-arrow-1" aria-hidden="true"></span>
							${additionalButton.heading}
						</a>
					</li>
				</c:forEach>
			</ul>
		</div>
	</div>
</div>