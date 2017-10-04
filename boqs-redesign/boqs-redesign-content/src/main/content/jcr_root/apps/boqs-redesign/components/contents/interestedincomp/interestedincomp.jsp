<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.InterestedInCompPresenter"%>

<%
    PresenterUtils.makePresenter(InterestedInCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Interested In Component")%>
</c:if>

<div class="interested-component">
	<div class="form-group dropdown-component">
		<div class="row">
			<div class="col-sm-6">
				<label for="${selectBoxId}">${wouldlikelbl}</label>
				<c:if test="${isRequired eq true}">
					<span aria-hidden="true" class="wi-icon icon-required"></span>
				</c:if>
			</div>
		</div>
		<div class="row">
              <div class="col-sm-6">
              <div data-customselectbox data-select-info class="custom-select">
				<select id="${selectBoxId}" name="${wouldlikeelement}" class="custom-box"
						<c:if test="${isRequired eq true}">
						 data-required
						 data-required-message="${requiredmessage}"
						 </c:if> >
					<option value="">Please select</option>
					<c:forEach var="wouldLikeItem" items="${wouldlikeList }">
						<c:choose>
							<c:when test="${wouldLikeItem eq 'becomespecialist' }">
								<option value="${wouldLikeItem}" data-option-info="data-option-info">Become a BOQ Specialist member</option>
							</c:when>
							<c:when test="${wouldLikeItem eq 'learnmore' }">
								<option value="${wouldLikeItem}" data-option-info="data-option-info">Learn more about a product</option>
							</c:when>
							<c:when test="${wouldLikeItem eq 'askevent' }">
								<option value="${wouldLikeItem}">Ask about an event</option>
							</c:when>
							<c:when test="${wouldLikeItem eq 'givecompliment' }">
								<option value="${wouldLikeItem}">Give a compliment</option>
							</c:when>
							<c:when test="${wouldLikeItem eq 'makecomplaint' }">
								<option value="${wouldLikeItem}">Make a complaint</option>
							</c:when>
							<c:when test="${wouldLikeItem eq 'makeenquiry' }">
								<option value="${wouldLikeItem}">Make some other enquiry</option>
							</c:when>
						</c:choose>
					</c:forEach>
				</select>
			</div>
			</div>
        </div>
	</div>
	<c:if test="${not empty intertestedinList}">
		<div data-more-info class="form-group hide">
			<label>${interestedlbl}</label>
			<div class="row">
				<div class="col-sm-6">
				<c:forEach var="firstInterestedInItem" items="${intertestedinList}" varStatus="loop">
					<c:if test="${loop.index eq 4}">
							</div>
						<div class="col-sm-6">
					</c:if>
					<div class="checkbox-group">
						<input id="${firstInterestedInItem}" name="${interestedelement}" type="checkbox" value="${firstInterestedInItem}" />
						<c:choose>
							<c:when test="${firstInterestedInItem eq 'savingsaccount' }">
								<label for="${firstInterestedInItem}" class="label-text">Savings Accounts</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'homeloans' }">
								<label for="${firstInterestedInItem}" class="label-text">Home Loans</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'creditcards' }">
								<label for="${firstInterestedInItem}" class="label-text">Credit Cards</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'carloans' }">
								<label for="${firstInterestedInItem}" class="label-text">Car Loans</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'commercialpropertyloan' }">
								<label for="${firstInterestedInItem}" class="label-text">Commercial Property Loan</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'equipmentfinance' }">
								<label for="${firstInterestedInItem}" class="label-text">Equipment Finance</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'partnerbuy-ins' }">
								<label for="${firstInterestedInItem}" class="label-text">Partner Buy-ins</label>
							</c:when>
							<c:when test="${firstInterestedInItem eq 'other' }">
								<label for="${firstInterestedInItem}" class="label-text">Other - please specify below</label>
							</c:when>
						</c:choose>
					</div>
				</c:forEach>
				</div>
			</div>
		</div>
	</c:if>
</div>
