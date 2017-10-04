<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@page import="org.apache.commons.lang3.StringEscapeUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.SearchInputPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>

<%@ include file="/apps/boqs-redesign/global.jsp"%>

<%
	PresenterUtils.makePresenter(SearchInputPresenter.class, slingRequest, properties, currentNode);
%>

<script>
    window.defaultSuggestions = ${suggestionJson};
</script>
<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Search Input Component")%>
</c:if>

<div class="search-panel">
     <form action="${searchresult}" method="GET" id="search-form-global" name="search-form" class="form" data-search="data-search" data-input-content=""
            data-charecterlimit="${charecterlimit}"
            data-maxautosuggestresults="${maxautosuggestresults}"
            data-quicklinkslabel="${quicklinkslabel}"
            data-suggestionjson="${suggestionJson}"
            data-searchlabel="${hinttitle}">
			<%
				String searchTerm = slingRequest.getAttribute("searchterm") == null ? "" : String.valueOf(slingRequest.getAttribute("searchterm")) ;
				searchTerm = new String(searchTerm.getBytes("iso-8859-1"), "UTF-8");
				searchTerm = StringEscapeUtils.escapeHtml4(searchTerm);
			%>

         <input id="search-global" name="search-term" type="search" value="<%=searchTerm%>" placeholder="${searchPlaceholder}" autocomplete="off" class="form-control" data-input-focus=""/>
		 <c:if test="${not empty filtertype}">
             <input name="type" type="hidden" value="${filtertype}"/>
         </c:if>
         <c:if test="${not empty filterpro}">
             <input name="related-profession" type="hidden" value="${filterpro}"/>
         </c:if>

    </form>             
</div>