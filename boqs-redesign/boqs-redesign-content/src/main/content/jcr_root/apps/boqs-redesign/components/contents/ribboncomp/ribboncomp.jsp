<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.RibbonCompPresenter"%>

<%
    PresenterUtils.makePresenter(RibbonCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Ribbon Component")%>
</c:if>

<section class="panel">
<div data-ribbon class="ribbon-block">
  <div class="ribbon-header">
    <div class="container">
      <h2 class="block-heading">${TitleLabel}</h2>
    </div>
  </div>
  <div class="ribbon-body">
    <div class="container">
      <div data-sameheight class="row row-nogutter row-ib row-ib-left">
        <div class="ribbon-item col-xs-6 col-sm-3"><a data-item="data-item" href="${FirstLink}" class="ribbon-link"><i class="pro-icon"><img src="${FirstIcon}" alt="" class="img-responsive"/></i>
            <h5 class="ribbon-link-heading">${FirstLabel}</h5></a>
        </div>
        <div class="ribbon-item col-xs-6 col-sm-3"><a data-item="data-item" href="${SecondLink}" class="ribbon-link"><i class="pro-icon"><img src="${SecondIcon}" alt="" class="img-responsive"/></i>
            <h5 class="ribbon-link-heading">${SecondLabel}</h5></a>
        </div>
        <div class="ribbon-item col-xs-6 col-sm-3"><a data-item="data-item" href="${ThirdLink}" class="ribbon-link"><i class="pro-icon"><img src="${ThirdIcon}" alt="" class="img-responsive"/></i>
            <h5 class="ribbon-link-heading">${ThirdLabel}</h5></a>
        </div>
        <div class="ribbon-item col-xs-6 col-sm-3"><a data-item="data-item" href="${FourthLink}" class="ribbon-link"><i class="pro-icon"><img src="${FourthIcon}" alt="" class="img-responsive"/></i>
            <h5 class="ribbon-link-heading">${FourthLabel}</h5></a>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
