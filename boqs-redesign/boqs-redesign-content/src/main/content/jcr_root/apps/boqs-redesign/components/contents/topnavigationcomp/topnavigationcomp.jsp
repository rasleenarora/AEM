<%@page import="com.investec.boqs.redesign.presenter.TopNavigationPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%
    PresenterUtils.makePresenter(TopNavigationPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Top Navigation Component")%>
	<script type="text/javascript">
	  function beforeSubmitTopNav(dialog) {
	      var primarylist = dialog.getField('./primaryspecialtieslist').getValue();
	      var otherlist = dialog.getField('./otherspecialtieslist').getValue();
	      var guideslist = dialog.getField('./guideslist').getValue();
	      var featuredlist = dialog.getField('./featuredlist').getValue();
	      // validate Distinctive Bank Links
	      if (primarylist.length < 1) {
	          CQ.Ext.Msg.alert('Validation Failed', 'Primary Specialties List is not allow blank.');
	          return false;
	      }
	      for(var i = 0; i< primarylist.length; i++){
	          if(primarylist[i] == ''){
	              CQ.Ext.Msg.alert('Validation Failed', 'Primary Specialties List is not allow blank.');
	              return false;
	          }
	      }
	      // validate Distinctive Bank Links
	      if (otherlist.length < 1) {
	          CQ.Ext.Msg.alert('Validation Failed', 'Other Specialties List is not allow blank.');
	          return false;
	      }
	      for(var i = 0; i< otherlist.length; i++){
	          if(otherlist[i] == ''){
	              CQ.Ext.Msg.alert('Validation Failed', 'Other Specialties List is not allow blank.');
	              return false;
	          }
	      }
	      // validate Guide Links
	      if (guideslist.length < 1) {
	          CQ.Ext.Msg.alert('Validation Failed', 'Guides List is not allow blank.');
	          return false;
	      }
	      for(var i = 0; i< guideslist.length; i++){
	          if(guideslist[i] == ''){
	              CQ.Ext.Msg.alert('Validation Failed', 'Guides List is not allow blank.');
	              return false;
	          }
	      }
	      // validate Featured Link
	      if (featuredlist.length < 1) {
	          CQ.Ext.Msg.alert('Validation Failed', 'Featured List is not allow blank.');
	          return false;
	      }
	      for(var i = 0; i< featuredlist.length; i++){
	          if(featuredlist[i] == ''){
	              CQ.Ext.Msg.alert('Validation Failed', 'Featured List is not allow blank.');
	              return false;
	          }
	      }
	  };
	</script>
</c:if>


 <div class="blue">
  <div class="container">
    <ul class="main-menu">
        <li class="logo-sticky">
	        <c:if test="${ not isDesignMode }">
	            <cq:include path="logo" resourceType="boqs-redesign/components/contents/logocomp" />
			</c:if>
        </li>
      <li>
      <a href="${specialtiesurl}" class="link-lever-1">${specialtieslabel}<span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
        <div class="inner">
          <div class="row">
            <div class="col-sm-8">
              <h3>${primaryspecialtieslabel}</h3>
              <ul data-sameheight="" class="sub-menu">
                <c:forEach items="${ primaryspecialtieslist }" var="primaryspeciality">
                    <li data-item="">
                        <a href="${primaryspeciality.link }" class="link-lever-2"><span class="icon"><c:if test="${ not empty primaryspeciality.icon }"><img src="${primaryspeciality.icon }" alt="" class="img-responsive"/></c:if></span><span class="text-1">${primaryspeciality.label}</span></a>
                    </li>
                </c:forEach>
              </ul>
            </div>
            <div class="col-sm-4">
              <h3>${otherspecialtieslabel}</h3>
              <ul class="sub-menu-2 orther-list">
                  <c:forEach items="${ otherspecialtieslist }" var="otherspeciality">
                    <li>
                        <a href="${otherspeciality.link}" class="link-lever-2"><span class="icon"><c:if test="${ not empty otherspeciality.icon }"><img src="${otherspeciality.icon}" alt="" class="img-responsive"/></c:if></span><span class="text-1">${otherspeciality.label}</span></a>
                       </li>
                </c:forEach>
                <li>
                    <a href="${viewalltargeturl}" class="link-lever-2"><span class="text-1">${viewalllabel}</span><span aria-hidden="true" class="wi-icon icon-arrow"></span></a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li><a href="${productsurl}" class="link-lever-1">${productslabel}<span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
        <div class="inner">
          <div class="row">
            <div class="col-sm-8">
              <h3>${primaryproductslabel}</h3>
              <ul data-sameheight="" class="sub-menu sub-menu-2">
                    <li data-item="">
                        <a href="${savingsaccountspage.link }" class="link-lever-2"><span class="icon"><c:if test="${ not empty savingsaccountspage.icon }"><img src="${savingsaccountspage.icon }" alt="" class="img-responsive"/></c:if></span><span class="text-1">${savingsaccountspage.label }<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                        <ul class="arrow-list">
                            <c:forEach items="${ savingsaccountspage.childs }" var="child">
                                <li><a href="${child.link }"><span class="text-1">${child.label}</span><span class="icon"><span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                                </li>
                            </c:forEach>
                        </ul>
                    </li>
                    <li data-item="">
                        <a href="${propertyfinancepage.link }" class="link-lever-2"><span class="icon"><c:if test="${ not empty propertyfinancepage.icon }"><img src="${propertyfinancepage.icon }" alt="" class="img-responsive"/></c:if></span><span class="text-1">${propertyfinancepage.label }<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                        <ul class="arrow-list">
                            <c:forEach items="${ propertyfinancepage.childs }" var="child">
                                <li><a href="${child.link }"><span class="text-1">${child.label}</span><span class="icon"><span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                                </li>
                            </c:forEach>
                        </ul>
                    </li>
                    <li data-item="">
                        <a href="${creditcardspage.link }" class="link-lever-2"><span class="icon"><c:if test="${ not empty creditcardspage.icon }"><img src="${creditcardspage.icon }" alt="" class="img-responsive"/></c:if></span><span class="text-1">${creditcardspage.label }<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                        <ul class="arrow-list">
                            <c:forEach items="${ creditcardspage.childs }" var="child">
                                <li><a href="${child.link }"><span class="text-1">${child.label}</span><span class="icon"><span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                                </li>
                            </c:forEach>
                        </ul>
                    </li>
                    <li data-item="">
                        <a href="${assetfinancepage.link }" class="link-lever-2"><span class="icon"><c:if test="${ not empty assetfinancepage.icon }"><img src="${assetfinancepage.icon }" alt="" class="img-responsive"/></c:if></span><span class="text-1">${assetfinancepage.label }<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                        <ul class="arrow-list">
                            <c:forEach items="${ assetfinancepage.childs }" var="child">
                                <li><a href="${child.link }"><span class="text-1">${child.label}</span><span class="icon"><span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                                </li>
                            </c:forEach>
                        </ul>
                    </li>
              </ul>
            </div>
            <div class="col-sm-4">
              <h3>${findmoreproductslabel}</h3>
              <div class="desc">${findmoredescription}</div>
              <a href="${productfindertargeturl }" class="link-style-1 btn-find-1"><span class="text-2"><span class="icon"><c:if test="${ not empty productfindericonpath }"><img src="${productfindericonpath}" alt="" class="img-responsive"/></c:if></span>${productfinderlabel}<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
            </div>
          </div>
        </div>
      </li>
      <li><a href="${expertiseurl}" class="link-lever-1">${expertiselabel}<span class="wi-icon icon-arrow" aria-hidden="true"></span></a>
        <div class="inner">
          <div class="row">
            <div class="col-sm-8">
              <h3>${primaryexpertiselabel}</h3>
              <ul class="sub-menu sub-menu-2">
                <li>
                  <a href="${guidestargeturl}" class="link-lever-2"><span class="icon"><span class="wi-icon-white icon-guide" aria-hidden="true"></span></span><span class="text-1">Guides<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                  <ul class="arrow-list">
                      <c:forEach items="${ guideslist }" var="guide">
                          <li>
                              <a href="${guide.link }" ><span class="text-1">${guide.label }</span><span class="icon"><span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                        </li>
                      </c:forEach>
                  </ul>
                </li>
                <li>
                    <a href="${publicationstargeturl}" class="link-lever-2"><span class="icon"><span class="wi-icon-white icon-publication" aria-hidden="true"></span></span><span class="text-1">Publications<span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                  <ul class="arrow-list">
                    <c:forEach items="${ publicationslist }" var="publication">
                          <li><a href="${publication.link }"><span class="text-1">${publication.label }</span><span class="icon"><span class="wi-icon icon-arrow" aria-hidden="true"></span></span></a>
                        </li>
                      </c:forEach>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="col-sm-4">
              <h3>${featuredlabel}</h3>
               <c:forEach items="${ featuredlist }" var="featured">
                  <a href="${featured.link}" class="link-style-1"><span class="text-2">${featured.label }</span></a>
               </c:forEach>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>