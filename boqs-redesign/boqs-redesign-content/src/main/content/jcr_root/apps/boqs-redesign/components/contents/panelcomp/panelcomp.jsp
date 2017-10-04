<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.PanelCompPresenter"%>

<%
    PresenterUtils.makePresenter(PanelCompPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Panel Component")%>
</c:if>

<div class="panel-block"> 
  <a href="${targeturl}" class="link-panel">
    <picture>
      <source media="(min-width: 768px)" srcset="${fileReferenceDesktop}"><img src="${fileReferenceMobile}" alt="${AltText}"/>
    </picture>
    <div class="content-panel ${ verticalalignment }">
      <div class="container">
        <div class="inner">
           <sling:include path="par_container" resourceType="foundation/components/parsys" />
        </div>
      </div>
    </div>
  </a>
</div>