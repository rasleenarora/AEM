<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.ContentCarouselCompPresenter"%>

<%
    PresenterUtils.makePresenter(ContentCarouselCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Content Carousel Component")%>
  <script type="text/javascript">
      function beforeSubmitCarousel(dialog) {
          var panelpages = dialog.getField('./panelpages').getValue();
          // validate Panel pages list
          if (panelpages.length < 1) {
              CQ.Ext.Msg.alert('Validation Failed', 'Panel pages list is not allow blank.');
              return false;
          }
          for(var i = 0; i< panelpages.length; i++){
              if(panelpages[i] == ''){
                  CQ.Ext.Msg.alert('Validation Failed', 'Panel pages list is not allow blank.');
                  return false;
              }
          }
      };
  </script>
</c:if>
<div class="content-carousel">
    <div data-carousel="" class="slider fade" data-autoplay="${ automatictransition }">
        <c:forEach var="panelPath" items="${panelPathList}">
            <div>
             	<% WCMMode mode = WCMMode.DISABLED.toRequest(request);%>
                <sling:include path="${panelPath}" resourceType="boqs-redesign/components/contents/panelcomp" />
		    	<%   mode.toRequest(request); %>
            </div>
        </c:forEach>
    </div>
    <div class="control control-1"></div>
</div>
