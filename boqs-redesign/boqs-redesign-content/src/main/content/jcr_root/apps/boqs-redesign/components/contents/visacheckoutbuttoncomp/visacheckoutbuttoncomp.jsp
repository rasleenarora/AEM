<%@page import="com.investec.boqs.redesign.presenter.VisaCheckoutButtonPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(VisaCheckoutButtonPresenter.class,
			slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Visa Checkout Button Component")%>
	<script type="text/javascript">
		function checkScriptFormat(txtCheck, firstTime) {
			var openScript = txtCheck.indexOf('<script'), closeScript = txtCheck
					.indexOf('/script>'), firstScript;
			if (firstTime) {
				if (openScript == -1) {
					return false;
				}
			} else {
				if (openScript == -1 && closeScript == -1) {
					return true;
				}
			}
			if (openScript != -1 && closeScript != -1
					&& closeScript > openScript) {
				firstScript = txtCheck.substring(openScript, closeScript);
				if (firstScript.indexOf('<style') != -1
						|| firstScript.indexOf('</style>') != -1) {
					return false;
				} else {
					var newtxtCheck = txtCheck.replace(
							firstScript + '/script>', '');
					return checkScriptFormat(newtxtCheck);
				}
			} else {
				return false;
			}
		}

		function checkStyleFormat(txtCheck) {
			var openStyle = txtCheck.indexOf('<style'), closeStyle = txtCheck
					.indexOf('</style>'), firstStyle;
			if (openStyle == -1 && closeStyle == -1) {
				return true;
			}
			if (openStyle != -1 && closeStyle != -1 && closeStyle > openStyle) {
				firstStyle = txtCheck.substring(openStyle, closeStyle);
				if (firstStyle.indexOf('<script') != -1
						|| firstStyle.indexOf('/script>') != -1) {
					return false;
				} else {
					var newtxtCheck = txtCheck.replace(firstStyle + '</style>',
							'');
					return checkStyleFormat(newtxtCheck);
				}
			} else {
				return false;
			}
		}
		function checkJavascriptValid(dialog) {
			var javascriptcode = dialog.getField('./javascriptcode').getValue();

			var resultCheck = checkScriptFormat(javascriptcode, true)
					&& checkStyleFormat(javascriptcode);
			//alert(resultCheck);

			if (javascriptcode.length < 1 || resultCheck == false) {
				CQ.Ext.Msg.alert('Validation Failed',
						'Please input a valid Javasrcipt Code.');
				return false;
			}
		};
	</script>
</c:if>

<button <c:if test="${not empty buttonanalyticslabel}">data-analytics=""
		data-hit-type="event"
		data-event-category="button"
		data-event-action="click"
		data-event-label="${buttonanalyticslabel}"
		data-event-value="1"</c:if>
		class="btn btn-primary v-button ${buttonalignment}">
	<span>${buttontext}</span><span class="wi-icon icon-arrow" aria-hidden="true"></span>
</button>
${javascriptcode}
