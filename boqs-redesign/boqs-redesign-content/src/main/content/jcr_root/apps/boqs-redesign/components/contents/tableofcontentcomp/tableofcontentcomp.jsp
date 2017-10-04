<%@page import="com.investec.boqs.redesign.presenter.TableOfContentPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
PresenterUtils.makePresenter(TableOfContentPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%=StringUtil.getLabelAuthorMode("Table of Content Component")%>
</c:if>

<div data-table-content="" class="table-of-content" data-toc-level="${maxlevels}"  data-toc-type="${liststyle}" >
<!-- JS GENERRATE CONTENT -->
</div>