<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.LandingPagePresenter"%>

<%
    PresenterUtils.makePresenter(LandingPagePresenter.class, slingRequest, properties, currentNode);
%>

<main id="main" class="main grey">
  <div class="landing-page">
    <div class="landing-top">
      <div class="container">
        <a href="${landingpageiconurl}" class="logo"><img src="${ landingpageicon }" alt="${ iconalt }" class="img-responsive"/></a>
        <div class="img-wrap"><img src="${ fileReference }" alt="${ promoimagealt }"/></div>
      </div>
    </div>
    <div class="header-text">
      <div style="background-color: #${headingbackground}" class="container">
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">${ headingtext }</div>
        </div>
      </div>
    </div>
    <div class="wrap-area-one">
      <div class="container">
        <div class="inner">
            <cq:include path="par_area_1" resourceType="foundation/components/parsys" />
        </div>
      </div>
    </div>
    <div class="landing-footer">
      <div class="container">
        <div class="row">

          <div class="col-sm-4 col-md-push-8">

            <div class="wrap-area-three">
            	<cq:include path="par_area_3" resourceType="foundation/components/parsys" />
            </div>

          </div>
          <div class="col-sm-8 col-md-pull-4">

            <div class="wrap-area-two">
              <cq:include path="par_area_2" resourceType="foundation/components/parsys" />
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</main>