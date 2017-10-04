<%@page import="com.investec.boqs.redesign.presenter.CalculatorWidgetPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>

<%
	PresenterUtils.makePresenter(CalculatorWidgetPresenter.class,
			slingRequest, properties, currentNode);

	String calculatorScriptURL = "http://calculators.infochoice.com.au/Ui/GetScript/?clientId=4367742b-02c8-4756-b241-f2d1862859ed&calcId=b9d47181-d8f1-46b4-bed8-e0cec1946c77&target=";
    if(properties.get("./calculatorScriptURL","").trim().length()<=0)
    {
        slingRequest.setAttribute("calculatorScriptURL", calculatorScriptURL);
    }
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Calculator Widget Component")%>
</c:if>

<script type="text/javascript" src="${calculatorScriptURL}"></script><div id="ic-calculator"></div>
