<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.CategoryPresenter"%>
<%
    PresenterUtils.makePresenter(CategoryPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Author Category Component")%>
</c:if>




<section class="panel">
          <div class="container">
            <div class="block recommended">
              <h2 class="block-heading">${title}</h2>
                <c:choose>
			        <c:when test="${categoryInfoType ne 'browse'}">
              <div class="row row-ib row-ib-left">
                  <c:forEach items="${authoredCategories}" var="authoredCategory">
                <div class="card col-xs-12 col-sm-6 col-md-4">
                    <a href="${authoredCategory['path']}" class="card-inner" data-item="data-item">
                    <div class="card-thumb">
                      <!-- 3:1 ratio--><img src=" ${authoredCategory['thumanailImage']}" alt="${authoredCategory['altText']}" class="img-responsive">
                    </div>
                    <h2 class="card-heading">${authoredCategory['title']}</h2>
                    <div class="card-body wysiwygcomp">
                        <p>${authoredCategory['description']}</p>
                    </div></a>
                </div>
                      </c:forEach>
                        </div>
                    </c:when>

                    <c:otherwise>
                   <div class="row row-ib row-ib-left">
                  <c:forEach items="${browsedCategories}" var="browsedCategory">
                <div class="card col-xs-12 col-sm-6 col-md-4 ">
                    <a href="${browsedCategory.path}" class="card-inner" data-item="data-item">
                    <div class="card-thumb">
                      <!-- 3:1 ratio--><img src=" ${browsedCategory['thumanailImage']}" alt="${browsedCategory['altText']}" class="img-responsive">
                    </div>
                    <h2 class="card-heading">${browsedCategory['title']}</h2>
                    <div class="card-body wysiwygcomp">
                        <p>${browsedCategory['description']}</p>
                    </div></a>
                </div>
                      </c:forEach>
                        </div>

                    </c:otherwise>
                    </c:choose>
            </div>
          </div>
        </section>