<%@page import="com.investec.boqs.redesign.utils.BOQSConstant"%>
<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%><%
%>
<c:set var="heroImage" value="<%=CommonUtils.getImageReference(currentPage) %>"/>
<main id="main" class="main">
<%
request.setAttribute("searchServletPath","/services/boqs-redesign/getsearchresult");
%>

	<div class="hero hero-page">
        <div class="hero-bg hero-bg-right">
          <picture class="hero-picture">
            <!-- 6:1 ratio (desktop)-->
              <source media="(min-width: 768px)" srcset="${heroImage}">
            <!-- 21:9 ratio (mobile)--><img src="${heroImage}" alt="">
          </picture>
        </div>


					<div class="hero-overlay">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-6">
                <h1 class="hero-heading"><%=CommonUtils.getPageHeading(currentPage) %></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- Breadcrumb -->
					<sling:include path="breadcrumbcomp" resourceType="/apps/boqs-redesign/components/contents/breadcrumbcomp"/>

                    <!-- Sticky Header -->
                    <c:if test="${properties.includeStickyHeader}">
                        <div class="navbar-section sticky"></div>
                    </c:if>

	<%
	if(isEditMode ||  StringUtils.isNotBlank(request.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER)))
	{
	%>
	<div class="search-parsys-area">
	 	<div class="container">
	    	<div class="row">
	        	<div class="col-sm-3">
					<cq:include path="filteringcontrolscomp" resourceType="boqs-redesign/components/contents/filteringcontrolscomp" />
	        	</div>
	            <div class="col-sm-9">
					<cq:include path="searchresultcomp" resourceType="boqs-redesign/components/contents/searchresultcomp" />
	            </div>
			</div>
		</div>
	</div>
	<%
	} 
	if(isEditMode || StringUtils.isBlank(request.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER))) {
	%>
	<div class="search-no-query">
	 	<div class="container">
       		<%
       		if(isEditMode) {
      			%>
      			<span class="text-1">Parsys for NO QUERY state</span>
      			<%
       		}
       		%>
			<cq:include path="par_no_query" resourceType="foundation/components/parsys" />
		</div>
	</div>
	<%
	}
	if(isEditMode || StringUtils.isNotBlank(request.getParameter(BOQSConstant.SEARCH_TERM_PARAMETER))) {
	%>
	<div class="parsys-area-1 grey">
	    <div class="container">
			<cq:include path="par_content" resourceType="foundation/components/parsys" />
		</div>
	</div>
	<%
	}
	%>
</main>
