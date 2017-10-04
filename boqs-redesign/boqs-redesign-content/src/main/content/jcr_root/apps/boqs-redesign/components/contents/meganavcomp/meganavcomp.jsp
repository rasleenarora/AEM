
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.MegaNavigationPresenter"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%
	PresenterUtils.makePresenter(MegaNavigationPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Mega Navigation Component")%>
</c:if>
<%
       int absParent = currentStyle.get("absParent", 2L).intValue();
	    Page homePage = currentPage.getAbsoluteParent(absParent);
%>

 <ul class="main-menu">
                  <!-- Specialties-->
                    <li><a href="#" class="main-menu-link">${specialtiestitle}<span aria-hidden="true" class="icon icon-caret-white icon-small"></span></a>
                    <div class="sub-menu">
                      <div class="container">
                        <div class="cells cells-fixed">
                            <c:forEach items="${specialtiesitems}" var="specialtiesitems">
                            <a href="${specialtiesitems.path}" class="cell sub-menu-link" target="${specialtiesitems.openinnewtab ? '_blank':''}"><span class="icon"><img src="${specialtiesitems.iconsrc}" alt="" class="img-responsive"/></span><span class="link-text">${specialtiesitems.title}</span></a>
							</c:forEach>
                        </div>
                      </div>
                    </div>
                  </li>
                  <!-- Personal banking-->
                    <li><a href="#" class="main-menu-link">${personalbankingtitle}<span aria-hidden="true" class="icon icon-caret-white icon-small"></span></a>
                    <div class="sub-menu"> 
                      <div class="container">
                        <div class="cells cells-fixed">
                             <c:forEach items="${personalbankingitems}" var="personalbankingitems">
                            <a href="${personalbankingitems.path}" class="cell sub-menu-link" target="${personalbankingitems.openinnewtab ? '_blank':''}"><span class="icon"><img src="${personalbankingitems.iconsrc}" alt="" class="img-responsive"/></span><span class="link-text">${personalbankingitems.title}</span></a>
							</c:forEach>
                          </div>
                      </div>
                    </div>
                  </li>
                  <!-- Practice finance-->
                    <li><a href="#" class="main-menu-link">${practicefinancetitle}<span aria-hidden="true" class="icon icon-caret-white icon-small"></span></a>
                    <div class="sub-menu">
                      <div class="container">
                        <div class="cells cells-fixed">

                           <c:forEach items="${practicefinanceitems}" var="practicefinanceitems">
                            <a href="${practicefinanceitems.path}" class="cell sub-menu-link" target="${practicefinanceitems.openinnewtab ? '_blank':''}" ><span class="icon"><img src="${practicefinanceitems.iconsrc}" alt="" class="img-responsive"/></span><span class="link-text">${practicefinanceitems.title}</span></a>
							</c:forEach>
                          </div>
                      </div>
                    </div>
                  </li>
                  <!-- Expertise-->
                    <li><a href="#" class="main-menu-link">${expertisetitle}<span aria-hidden="true" class="icon icon-caret-white icon-small"></span></a>
                    <div class="sub-menu">
                      <div class="container">
                        <div class="cells cells-fixed">
						    <c:forEach items="${expertiseitems}" var="expertiseitems">

                                <c:url var="expertiseUrl" value="${expertiseitems.path}"  scope="request">

    								<c:param name="topic" value="${expertiseitems.topics}" />

								</c:url>


                                <a href="${expertiseitems.path}?topic=${expertiseitems.topics}" class="cell sub-menu-link" target="${expertiseitems.openinnewtab? '_blank':''}"><span class="icon"><img src="${expertiseitems.iconsrc}" alt="" class="img-responsive"/></span><span class="link-text">${expertiseitems.title}</span></a>
							</c:forEach>


                          </div>
                      </div>
                    </div>
                  </li>
                </ul>
