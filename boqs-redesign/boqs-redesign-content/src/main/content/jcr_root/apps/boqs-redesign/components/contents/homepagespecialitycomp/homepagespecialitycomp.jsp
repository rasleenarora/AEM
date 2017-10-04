<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@page import="java.util.List"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.HomePageSpecialityPresenter"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<%
    PresenterUtils.makePresenter(HomePageSpecialityPresenter.class, slingRequest, properties, currentNode);
%>
<script type="text/javascript">
  function beforeSubmitHomePageSpeciality(dialog) {
      var listLinks = dialog.getField('./specialitybuttonlist').getValue();
      if (listLinks.length < 1) {
          CQ.Ext.Msg.alert('Validation Failed', 'Speciality Button List is not allow blank.');
          return false;
      }
      for(var i = 0; i< listLinks.length; i++){
          if(listLinks[i] == ''){
              CQ.Ext.Msg.alert('Validation Failed', 'Speciality Button List is not allow blank.');
              return false;
          }
      }
  };
</script>
<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Home Page Speciality Component")%>
</c:if>


<section class="panel">
<div class="container">
        <div class="block button-items">
          <h2 class="block-heading">${specialityheading}</h2>
          <ul class="row row-ib row-ib-left items">

              <c:forEach items="${ specialitybuttonlist }" var="specialityButtonLeftList">
               <li class="col-xs-12 col-sm-6"><a href="${ specialityButtonLeftList.link }" class="btn btn-default btn-xl btn-block">
                   ${ specialityButtonLeftList.heading }</a>
               </li>
           </c:forEach>
          </ul>
        </div>

     <c:if test="${ not empty seeallspecialitiestargeturl}">
        <div class="text-center <c:if test="${margintop}">show-more</c:if>">
            <a href="${ seeallspecialitiestargeturl }" class="btn-tertiary">${ seeallspecialitieslabel }
                <span class="wi-icon icon-arrow" aria-hidden="true"></span>
            </a>
        </div>
    </c:if>
      </div>

</section>














