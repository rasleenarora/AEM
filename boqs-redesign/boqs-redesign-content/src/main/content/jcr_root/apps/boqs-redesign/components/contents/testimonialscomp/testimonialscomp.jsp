<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.TestimonialsCompPresenter"%>

<%
    PresenterUtils.makePresenter(TestimonialsCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Testimonials Component")%>
</c:if>



<div class="block testimonial">
          <div class="row">
            <div class="col-sm-4">
              <!-- 3:2 ratio--><img src="${personimage}" alt="${alternatetext}" class="img-responsive">
            </div>
            <div class="col-sm-8">
              <blockquote>
                <h5 class="blockquote-heading">${personname}</h5>
                <p>${quotetext}</p>
              </blockquote>
            </div>
          </div>
        </div>


