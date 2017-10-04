<%@ include file="/apps/boqs-redesign/global.jsp"%>

<c:set var="currentMode" value="<%= WCMMode.fromRequest(request)%>" />
<c:set var="editmode" value="<%= WCMMode.EDIT%>" />
<c:if test="${(currentMode == editmode)}">
	<p style="color: #A4A4A4; text-decoration: underline;font-size: 11px;">WYSIWYG Component Settings</p>
</c:if>

<c:if test="${properties.hideimageonmobile eq 'true'}">
	<div class="hide-img-xs">
</c:if>
		${properties.wysiwyg}
<c:if test="${properties.hideimageonmobile eq 'true'}">
	</div>
</c:if>