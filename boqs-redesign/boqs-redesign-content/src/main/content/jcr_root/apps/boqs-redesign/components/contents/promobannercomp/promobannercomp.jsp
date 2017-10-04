
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.PromoBannerCompPresenter"%>

<%
	PresenterUtils.makePresenter(PromoBannerCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Promo Banner Component")%>
</c:if>



<div class="content-carousel promo">
        <div data-carousel="promo" class="slider">
            <c:forEach items="${promocarousels }" var="promocarousel">
          <div class="promo-banner">
            <div class="hero hero-promo">
              <div class="hero-bg hero-bg-right">
                <picture class="hero-picture">
                  <!-- 4:1 ratio (desktop)-->
                  <source media="(min-width: 768px)" srcset="${promocarousel.promoimage}">
                  <!-- 16:9 ratio (mobile)--><img src="${promocarousel.promoimageMobile}" alt="${promocarousel.alternatetext}">
                </picture>
              </div>
              <div class="hero-overlay">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-7 col-md-6 col-lg-7">
                      <h2 class="hero-heading"><span class="small">${promocarousel.promotext}</span></h2>
                      <div class="actions hero-actions">
                          <a href="${promocarousel.targeturl}"  class="btn btn-primary btn-lg">${promocarousel.ctatextoverride}</a>
                          <a href="${promocarousel.targeturl2}" class="btn btn-default btn-lg">${promocarousel.ctatextoverride2}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
			  </div>
			  </div>
                </c:forEach>
            </div>



        <div class="control promo"></div>
  </div>