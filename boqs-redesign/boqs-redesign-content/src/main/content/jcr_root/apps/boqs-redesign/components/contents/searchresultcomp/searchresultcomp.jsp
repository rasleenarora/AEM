<%@page import="com.investec.boqs.redesign.presenter.SearchResultPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(SearchResultPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Search Result Component")%>
</c:if>

<%-- <div id="search-result-ajax" data-paging="/services/boqs-redesign/getsearchresult"
	data-term="${searchterm}"
	data-type="${type}"
	data-related-profession="${relatedprofession}"
	class="col-sm-9">
</div> --%>

<div id="search-result-ajax"
data-current-page ="${searchResults.currentPage }"
data-result-count ="${searchResults.resultCount }"
data-number-to-display ="${searchResults.numberToDisplay }"
class="search-result-block">
	
	  <h3 class="static-title">${searchResults.resultslabel }</h3>
	  <ul class="list-unstyled static-list">
		  <c:forEach items="${ searchResults.searchResultBeans }" var="searchResultBean">
		  	 <li>
		      <div class="result-container-block">
	        	<c:if test="${ not empty searchResultBean.iconPath }">
			        <div class="icon-box">
			        		<img src="${searchResultBean.iconPath }" alt="" class="img-responsive"/>
			        </div>
	        	</c:if>
		        <div class="text-box">
		          <ol class="breadcrumb">
			          <c:forEach items="${ searchResultBean.breadcrumbItems }" var="breadcrumbItem">
						<li><a x-cq-linkchecker="skip" href="${breadcrumbItem.link }"><span>${breadcrumbItem.heading }</span><span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
		            	</li>			          
			          </c:forEach>
		          </ol>
		          <a x-cq-linkchecker="skip" href="${searchResultBean.url }" class="text">${searchResultBean.title }</a>
		          <p class="hidden-xs desc">${searchResultBean.description }</p>
		        </div>
		      </div>
		    </li>
		  </c:forEach>
	  </ul>
		<nav class="text-center">
		  <ul class="pagination">
		  	<c:if test="${ not empty prevLink}">
			    <li><a href="javascript:void(0);" title="Previous page" rel="prev"><span class="wi-icon icon-arrow" aria-hidden="true"></span><span>Prev</span></a>
			    </li>
		    </c:if>
		    <c:forEach items="${lstPagings}" var="page">
			    <c:if test="${ not empty page.link}">
				    <li <c:if test="${page.heading eq curPage}">class="active"</c:if>>
				    	<a href="javascript:void(0);">${page.heading}</a>
				    </li>
		    	</c:if>
		    	<c:if test="${ empty page.link}">
			    	<li class="dot">${page.heading}</li>
		    	</c:if>
		    </c:forEach>
		    <c:if test="${ not empty nextLink}">
			    <li><a href="javascript:void(0);"  title="Next page" rel="next"><span>Next</span><span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
			    </li>
		    </c:if>
		  </ul>
		</nav>
</div>
