<%@page import="com.investec.boqs.redesign.presenter.VisaWidgetPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>

<%
	PresenterUtils.makePresenter(VisaWidgetPresenter.class,
			slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("VISA Offers Widget Component")%>
</c:if>

<div id="visaoffers" visa-responsive="true"></div>

 <script type="text/javascript" src="https://offerswidget.visa.com/vos/scripts/VisaSyndicationWidget.js"></script>
<script>
	//Configuration JS Object

	window.visaClientwidgetConfig = {
		apiKey: 'OWS_BOQ_AE1B2789-99E5-4036-A19F-51B639901464',
		template: 'A',
		enabledFilters: ['category', 'cards', 'country'],
		includeCountryList: ['AT', 'AU','BE','BR','KH','CA','CN','DK','EG','FI','FR','DE','GB','GR','HK','HU','IN','ID','IT','JP','MO','MY','MV','MX','MC','MA','NL','NZ','NO','PH','PL','PT','IL','SG','ZA','KR','SE','SZ','TW','TH','TR','UK','US'],                        
		cards: ['CS_BOQSpecialist_platinum', 'CS_BOQSpecialist_signature'],
		categories: ['CS_BOQ_travel', 'CS_BOQ_entertainment', 'CS_BOQ_dining', 'CS_BOQ_activities', 'CS_BOQ_retail'],
		viewMode: {
			display: 'list',
			listFilterParam: '&cardType=platinum,signature&merchantCountry=!empty'
		},
		language: 'en',
		pageSize: 6,
		sortOptions: {
			order: 'desc',
			params: 'lastModifiedDatetime'
		},
        title: '${title}',
        description: '${description}',
        header: '${headerText}'
	}
	//initialize offers widget
	window.syndication.init();
</script>       


