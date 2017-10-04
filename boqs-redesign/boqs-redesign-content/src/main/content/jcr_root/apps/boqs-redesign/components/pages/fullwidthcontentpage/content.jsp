<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@page import="com.day.cq.wcm.foundation.*"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>


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
<!-- Sticky Header -->
    <c:if test="${properties.includeStickyHeader}">
        <div class="navbar-section sticky"></div>
    </c:if>
     <!-- Breadcrumbss -->
					<sling:include path="breadcrumbcomp" resourceType="/apps/boqs-redesign/components/contents/breadcrumbcomp"/>


		<div class="container">
			<cq:include path="par_area_1" resourceType="foundation/components/parsys" />

	</div>
	 <div data-team="" class="parsys-area-5 parsys-wrap">
		<cq:include path="par_area_2" resourceType="foundation/components/parsys" />
	</div>
    </main>



