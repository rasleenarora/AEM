<%@page import="com.investec.boqs.redesign.presenter.DynamicResultCardCompPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(DynamicResultCardCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Dynamic Result Card Component")%>
</c:if>

             <p class="num-cards"><span></span> results to display</p>
             <div data-item-selector=".card" data-number-more="8" data-result-type="result" data-result-type-plural="results" class="card-listing filter-container">
              <div data-sameheight class="row row-ib row-ib-left">

                       <c:forEach items="${cardList}" var="resultcard" varStatus="counter">
                   <div class="card filter-item col-xs-12 col-sm-6"
					data-filter-finance="${resultcard.relatedFinance}"
					data-filter-related-profession="${resultcard.relatedProfession}"
					data-filter-related-product="${resultcard.relatedProduct}"
					data-filter-state="${resultcard.states}"
					data-filter-topic="${resultcard.topics}"> <a href="${resultcard.path}" class="card-inner" data-item="data-item">
                      <div class="card-thumb">
                        <!-- 3:1 ratio--><img src="${resultcard.thumanailImage}" alt="${resultcard.altText}" class="img-responsive">
                      </div>
                      <h2 class="card-heading">${resultcard.title}</h2>
                      <div class="card-body wysiwygcomp">
                        ${resultcard.description}
                      </div></a>
                  </div>
                              </c:forEach>
            </div>


                 <div class="control-result no-more-result hidden">
                <div class="content no-more-result">
                    <p class="desc">${properties.nomoreresultstext}</p><a href="javascript:;" class="btn btn-default back-top"><span aria-hidden="true" class="icon icon-caret-up icon-medium"></span>${properties.backtotoptext}</a>
                </div>
              </div>

          <div class="control-result load-more-trigger hidden">
              <div class="content load-more"><img src="/etc/designs/boqs-redesign/headlibs/images/upload/icon-load-more.png" alt=""/>
                  <p class="desc">There are <span class="num">5</span> more <span class="result">results</span> matching your filters </p><a href="javascript:;" class="btn btn-default load-more">${properties.loadMore}</a>
                </div>
              </div>
              <div class="control-result zero-result hidden">
                <div class="content zero-result"><span class="icon icon-no-gold icon-xlarge"></span>
                    <p class="desc">${properties.noresultstext}</p><a href="javascript:;" class="btn btn-default clear-all"><span aria-hidden="true" class="icon icon-bin"></span>${properties.clearallfilterstext}</a>
                </div>
              </div>


                </div>




