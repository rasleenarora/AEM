<%@page import="com.investec.boqs.redesign.utils.CommonUtils"%>
<%@page import="org.apache.commons.lang3.StringEscapeUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.GlobalHeaderPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(GlobalHeaderPresenter.class, slingRequest, properties, currentNode);
	String searchInputId = CommonUtils.getRandomId("search-id");
%>

<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Global Header Component")%>
</c:if>
<%
       int absParent = currentStyle.get("absParent", 2L).intValue();
	   Page homePage = currentPage.getAbsoluteParent(absParent);
       String homePageValue=CommonUtils.getProperURL(homePage.getPath(), slingRequest);
%>

<c:set var="homePage" value="<%=homePageValue%>"/>

<header id="header" role="banner" class="header">
        <!-- Welcome back-->
        <div data-welcome-back data-close-button=".close-btn" class="well-block">
          <div class="container">
            <div class="row">
              <div class="col-xs-8">
                <p class="well-msg">${welcomebacklabel}</p>
              </div>
              <div class="col-xs-4 text-right"><a href="#" class="close-btn">${closelabel}<span aria-hidden="true" class="icon icon-close"></span></a>
              </div>
            </div>
          </div>
          <div class="container has-border">
            <div class="row">
              <div class="col-sm-8">
                <p>${message}&nbsp;<span class="icon-1"><img src="/etc/designs/boqs-redesign/headlibs/images/upload/icon-home.png" alt="" class="img-responsive" data-icon="data-icon"/></span><a href="#" data-title="data-title">Home loans</a>
                </p>
              </div>
              <div class="col-sm-4 text-right"><a href="#" class="btn btn-primary" data-url="data-url">${returnlabel}<span aria-hidden="true" class="icon icon-caret icon-small"></span></a>
              </div>
            </div>
          </div>
        </div>
        <!-- Header (white)-->
        <div id="navbar-top" class="navbar-top">
          <div class="container">
            <!-- Begin: logocomp (mobile)-->
              <a href="${homePage}" class="logo hidden-md hidden-lg">
               <span class="sr-only">BOQ Specialist</span>


              </a>
            <!-- End: logocomp (mobile)-->
            <button data-activate="#main-nav" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span aria-hidden="true" class="icon icon-close"></span><span aria-hidden="true" class="icon icon-menu"></span></button>
            <ul class="top-menu">
                <li><a href="tel:1300131141" class="link-phone"><span class="btn hidden-md hidden-lg"><span aria-hidden="true" class="icon icon-phone"></span></span><span class="hidden-xs hidden-sm">${phonenumber}</span></a>
              </li>
                <li class="hidden-xs hidden-sm"><a href="${browseOfferUrl}">${browseOfferLabel}</a>
              </li>
                <li class="hidden-xs hidden-sm"><a href="${eventsUrl}">${eventslabel}</a>
              </li>
                <li class="hidden-xs hidden-sm"><a href="${findaspecialistUrl}">${findaspecialistLabel}</a>
              </li>
              <li class="hidden-xs hidden-sm"><a href="${contactusurl}">${contactuslabel}</a>
              </li>
              <li class="hidden-md hidden-lg"><a href="https://secure.boqspecialist.com.au/MOB/Mobile" class="btn btn-login" target="_blank"><span aria-hidden="true" class="icon icon-login"></span></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- Main nav (blue parent wrapper)-->
        <nav id="main-nav" role="navigation" class="navbar-main">
          <div class="container">
            <!-- Begin: topnavigationcomp (blue)-->

		<div class="cells navbar-main-inner">
              <div class="cell hidden-xs hidden-sm">
                  <!-- Begin: logocomp (desktop)--><a href="${homePage}" class="logo hidden-xs"><span class="sr-only">BOQ Specialist</span></a>
                <!-- End: logocomp (desktop)-->

              </div>
              <div class="cell cell-fill">
              <cq:include path="searchinputcomp" resourceType="/apps/boqs-redesign/components/contents/searchinputcomp"/>    
              <sling:include path="topnavigationcomp" resourceType="/apps/boqs-redesign/components/contents/meganavcomp"/>

                                  <!-- Mobile extras nav-->
                <ul class="extras-menu hidden-md hidden-lg">
                    <li class="active"><a href="${contactusurl}" class="extras-menu-link"><span class="icon icon-contact-gold"></span>${contactuslabel}</a>
                  </li>
                    <li><a href="${findaspecialistUrl}" class="extras-menu-link"><span class="icon icon-find-gold"></span>${findaspecialistLabel}</a>
                  </li>
                        <li><a href="${browseOfferUrl}" class="extras-menu-link"><span class="icon icon-offers-gold"></span>${browseOfferLabel}</a>
                  </li>
                    <li><a href="${eventsUrl}" class="extras-menu-link"><span class="icon icon-events-gold"></span>${eventslabel}</a>
                  </li>
                </ul>

            </div>
             <div class="cell hidden-xs hidden-sm">
                <ul class="utility-menu">
                  <li><a href="#" class="btn btn-link btn-search"><span aria-hidden="true" class="icon icon-search-white"></span><span aria-hidden="true" class="icon icon-close-white"></span><span class="sr-only">Search</span></a>
                  </li>
                    <li><a href="${loginUrl}" class="btn btn-primary btn-login" data-newwindow="" data-newwindow=""> <span aria-hidden="true" class="icon icon-login-white"></span>${loginlabel}</a>
                  </li>
                    <li><a href="${registerUrl}" class="btn btn-default btn-register" data-analytics="data-analytics" data-event-label="register-button" data-newwindow="data-newwindow"><span aria-hidden="true" class="icon icon-register-white"></span>${registerlabel} </a>
                  </li>
                </ul>
              </div>
              </div>

            <!-- End: topnavigationcomp (blue)    -->
          </div>
        </nav>
      </header>
      <!-- End: globalheadercomp-->
