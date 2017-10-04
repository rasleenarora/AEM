<%@page import="com.investec.boqs.redesign.presenter.ContainerPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>

<%@ include file="/apps/boqs-redesign/global.jsp"%>

<%
	//PresenterUtils.makePresenter(ContainerPresenter.class, slingRequest, properties, currentNode);
	pageContext.setAttribute("backgroundstyle", properties.get("backgroundstyle", "none"));
	pageContext.setAttribute("dividecomponentarea", properties.get("dividecomponentarea", "pc100"));
	pageContext.setAttribute("visiblecontainer", properties.get("visiblecontainer", "fullwidth"));
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Container Component")%>
</c:if>

<c:if test="${backgroundstyle eq 'grey'}"><div class="grey"></c:if>
	<c:if test="${visiblecontainer eq 'resolution960'}"><div class="container"></c:if>
		<c:if test="${dividecomponentarea eq 'pc100'}">
			<cq:include path="par_container" resourceType="foundation/components/parsys" />
		</c:if>
		<c:if test="${dividecomponentarea eq 'pc7525'}">
			<div class="row">
				<div class="col-sm-9">
					<cq:include path="par_container_left" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-3">
					<cq:include path="par_container_right" resourceType="foundation/components/parsys" />
				</div>
			</div>
		</c:if>
		<c:if test="${dividecomponentarea eq 'pc5050'}">
			<div class="row">
				<div class="col-sm-6">
					<cq:include path="par_container_left" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-6">
					<cq:include path="par_container_right" resourceType="foundation/components/parsys" />
				</div>
			</div>
		</c:if>
		<c:if test="${dividecomponentarea eq 'pc333333'}">
			<div class="row">
				<div class="col-sm-4">
					<cq:include path="par_container_left" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-4">
					<cq:include path="par_container_center" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-4">
					<cq:include path="par_container_right" resourceType="foundation/components/parsys" />
				</div>
			</div>
		</c:if>
		<c:if test="${dividecomponentarea eq 'pc25252525'}">
			<div class="row">
				<div class="col-sm-3">
					<cq:include path="par_container_1" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-3">
					<cq:include path="par_container_2" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-3">
					<cq:include path="par_container_3" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-3">
					<cq:include path="par_container_4" resourceType="foundation/components/parsys" />
				</div>
			</div>
		</c:if>
		<c:if test="${dividecomponentarea eq 'pc255025'}">
			<div class="row">
				<div class="col-sm-3">
					<cq:include path="par_container_left" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-6">
					<cq:include path="par_container_center" resourceType="foundation/components/parsys" />
				</div>
				<div class="col-sm-3">
					<cq:include path="par_container_right" resourceType="foundation/components/parsys" />
				</div>
			</div>
		</c:if>
	<c:if test="${visiblecontainer eq 'resolution960'}"></div></c:if>
<c:if test="${backgroundstyle eq 'grey'}"></div></c:if>
