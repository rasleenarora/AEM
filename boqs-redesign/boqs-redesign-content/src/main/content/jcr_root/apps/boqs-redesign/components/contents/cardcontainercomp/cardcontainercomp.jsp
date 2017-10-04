<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.CardContainerCompPresenter"%>

<%
	PresenterUtils.makePresenter(CardContainerCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Card Container Component")%>
</c:if>
<p class="num-cards">${numcardsstring}</p>

<c:if test="${not isEditMode }">

<div data-mymasonry data-item-selector=".card-item" 
		data-desktop-only="" class="card-container filter-container" 
		data-number-more="${numberofcardstoshowperpage}" 
		data-result-type="${resulttypeoverride}" 
		data-result-type-plural="${resulttypepluraloverride}" >
</c:if>
<c:if test="${isEditMode }">
	<div data-item-selector=".card-item"  data-desktop-only="">
</c:if>
		<div class="grid-sizer"></div>
		<div class="gutter-sizer"></div>
		<sling:include path="par_card_container" resourceType="foundation/components/parsys" />
		
		<c:if test="${haspaginateresults }">
			<div class="card-item control-result load-more-trigger">
	           <div class="content load-more"><span class="icon-1"><c:if test="${not empty loadmoreiconpath }"><img src="${loadmoreiconpath }" alt=""></c:if></span>
	             <p class="desc">${moreresultstext}</p><a href="javascript:;" data-title="" class="load-more">${loadmoretext}<span aria-hidden="true" class="wi-icon icon-arrow"></span></a>
	           </div>
	         </div>
	        <div class="card-item control-result no-more-result hidden">
	          <div class="content no-more-result">
	            <p class="desc">${nomoreresultstext}</p><a href="javascript:;" class="back-top"><span aria-hidden="true" class="wi-icon icon-arrow-up"></span>${backtotoptext}</a>
	          </div>
	        </div>
        </c:if>
		<div class="card-item control-result zero-result hidden">
           <div class="content zero-result"><span class="icon-1"><img src="/etc/designs/boqs-redesign/headlibs/images/icon-zero-more.png" alt=""/></span>
             <p class="desc">${noresultstext}</p><a href="javascript:;" class="clear-all"><span aria-hidden="true" class="wi-icon icon-clear-filters"></span>${clearallfilterstext}</a>
           </div>
		</div>
	</div>
