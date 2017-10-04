<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%><%
%>

<c:set var="heroImage" value="<%=CommonUtils.getImageReference(currentPage) %>"/>
<main id="main" class="main">
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


  <div class="parsys-area-1 grey">
    <div class="container">
      <cq:include path="par_area_1" resourceType="foundation/components/parsys" />
    </div>
  </div>
  <div class="grey">
    <div class="container">
      <div class="row">
        <div class="col-sm-3 filter-component">
            <cq:include path="filteringcontrolscomp" resourceType="boqs-redesign/components/contents/filteringcontrolscomp" />
        </div>
        <div class="col-sm-9">
          <cq:include path="par_area_2" resourceType="foundation/components/parsys" />
        </div>
      </div>
    </div>
  </div>
 
  <div class="parsys-area-4 grey">
    <cq:include path="par_area_4" resourceType="foundation/components/parsys" />
  </div>
</main>