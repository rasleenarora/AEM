<%--

  Iframe component.

  This is an iframe component which authors can use to iframe any page.

--%><%
%><%@include file="/apps/boqs-redesign/global.jsp"%><%
%><%@page session="false" %><%
%><%@page import="com.investec.boqs.redesign.utils.PresenterUtils,
        com.investec.boqs.redesign.presenter.IframePresenter,
        com.investec.boqs.redesign.utils.StringUtil"%>    
<%	
	//calling the make presenter method to pu the dilaog values in request context
    PresenterUtils.makePresenter(IframePresenter.class, slingRequest, properties, currentNode);
%>
<%-- Show the components's name to authors in author or design mode so that authors know which component they are authoring --%>
<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Iframe Component")%>
</c:if>
<%-- Iframe element will be added only when there is an iframe source provided by the author --%>
<c:if test="${not empty iframeSrc}">
    <div class="iframe <c:if test="${alignment == 'left' ||  alignment == 'right'}">clearfix</c:if>">
        <iframe class="${alignment}" src="${iframeSrc}" <c:if test="${not empty height}">height="${height}"</c:if> <c:if test="${not empty width}">width="${width}"</c:if>></iframe>
    </div>
</c:if>

