<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@page import="java.util.List"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.GlobalFooterPresenter"%>

<%
	PresenterUtils.makePresenter(GlobalFooterPresenter.class,
			slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
	<%=StringUtil
						.getLabelAuthorMode("Global Footer Component")%>

	<script type="text/javascript">
		function beforeSubmitGlobalFooter(dialog) {
			var distincbanklinks = dialog.getField('./distincbanklinks')
					.getValue();
			var expertiselinks = dialog.getField('./expertiselinks').getValue();
			var boqspecialistlinks = dialog.getField('./boqspecialistlinks')
					.getValue();
			var customlist = dialog.getField('./customlist').getValue();
			// validate Distinctive Bank Links
			if (distincbanklinks.length < 1) {
				CQ.Ext.Msg.alert('Validation Failed',
						'Distinctive Bank Links is not allow blank.');
				return false;
			}
			for (var i = 0; i < distincbanklinks.length; i++) {
				if (distincbanklinks[i] == '') {
					CQ.Ext.Msg.alert('Validation Failed',
							'Distinctive Bank Links is not allow blank.');
					return false;
				}
			}
			// validate Expertise Links
			if (expertiselinks.length < 1) {
				CQ.Ext.Msg.alert('Validation Failed',
						'Expertise Links is not allow blank.');
				return false;
			}
			for (var i = 0; i < expertiselinks.length; i++) {
				if (expertiselinks[i] == '') {
					CQ.Ext.Msg.alert('Validation Failed',
							'Expertise Links is not allow blank.');
					return false;
				}
			}
			// validate BOQ Specialist Links
			if (boqspecialistlinks.length < 1) {
				CQ.Ext.Msg.alert('Validation Failed',
						'BOQ Specialist Links is not allow blank.');
				return false;
			}
			for (var i = 0; i < boqspecialistlinks.length; i++) {
				if (boqspecialistlinks[i] == '') {
					CQ.Ext.Msg.alert('Validation Failed',
							'BOQ Specialist Links is not allow blank.');
					return false;
				}
			}
			// validate Custom List
			if (customlist.length < 1) {
				CQ.Ext.Msg.alert('Validation Failed',
						'Custom List is not allow blank.');
				return false;
			}
			for (var i = 0; i < customlist.length; i++) {
				if (customlist[i] == '') {
					CQ.Ext.Msg.alert('Validation Failed',
							'Custom List is not allow blank.');
					return false;
				}
			}
		};
	</script>
</c:if>

<footer id="footer" class="footer">
	<div class="container">
		<div class="row">
			<div class="col-sm-3 hidden-xs">
				<h3 class="info-hd">${ distincbank }</h3>
				<ul class="list-unstyled info-list">
					<c:forEach items="${ distincbanklinks }" var="distincbanklinks">
						<li><a href="${ distincbanklinks.link }"> ${ distincbanklinks.heading }</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="col-sm-3 hidden-xs">
				<h3 class="info-hd">${ expertisehead }</h3>
				<ul class="list-unstyled info-list">
					<c:forEach items="${ expertiselinks }" var="expertiselinks">
						<li><a href="${ expertiselinks.link }"> ${ expertiselinks.heading }</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="col-sm-3 hidden-xs">
				<h3 class="info-hd">${ boqspecialist }</h3>
				<ul class="list-unstyled info-list">
					<c:forEach items="${ boqspecialistlinks }" var="boqspecialistlinks">
						<li><a href="${ boqspecialistlinks.link }"> ${ boqspecialistlinks.heading }</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="col-sm-3">
				<!-- TODO icon must be dynamic link -->
				<h3 class="info-hd">
					<span class="icon"><img src="${ phoneicon }" alt="" class="img-responsive" /></span><strong>${ phonenumber }</strong>
				</h3>
				<div class="row">
					<div class="col-xs-6 col-sm-12">
						<ul class="list-unstyled info-list info-list-1">
							<c:forEach items="${ customlist }" var="customlist">
								<li><a href="${ customlist.link }"> <span class="icon" aria-hidden="true"><img src="${ customlist.icon }" alt="" class="img-responsive" /></span>${ customlist.label }</a></li>
							</c:forEach>
						</ul>
					</div>
					<div class="col-xs-6 col-sm-12 visible-xs-block">
						<ul class="list-unstyled info-list">
							<c:forEach items="${ mobileItems }" var="mobileItem">
								<li><a href="${ mobileItem.link }">${ mobileItem.heading }</a></li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="copyright">${ disclaimer }</div>
	</div>
</footer>