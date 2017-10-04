<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@page import="com.day.cq.wcm.api.Page"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.utils.WCMUtil"%>
<%@page
	import="com.investec.boqs.redesign.presenter.BreadcrumbCompPresenter"%>

<%
    PresenterUtils.makePresenter(BreadcrumbCompPresenter.class, slingRequest, properties, currentNode, currentStyle);
%>

<%
    	int level = (Integer)slingRequest.getAttribute("parentlevel");
		Page trail = currentPage.getAbsoluteParent((int) level);
        Page parentPage = currentPage.getParent();

		String linkStr = WCMUtil.getURL(trail.getPath(), resource.getResourceResolver());
        String parentPagePath = WCMUtil.getURL(parentPage.getPath(), resource.getResourceResolver());

            if(linkStr.equals(parentPagePath)){
				request.setAttribute("homepage",true);
            }else{
                request.setAttribute("homepage",false);
            }
		%>


<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Breadcrumb Component")%>
</c:if>

<div class="container">

<div class="breadcrumb">
      <div class="container"><a href="<%= parentPagePath%>"><%=CommonUtils.getBreadcrumbTitle(parentPage) %></a>
      </div>
    </div>
</div>








