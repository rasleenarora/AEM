<%@page import="org.apache.commons.lang3.StringEscapeUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.SocialSharingCompPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
	PresenterUtils.makePresenter(SocialSharingCompPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
	<%=StringUtil.getLabelAuthorMode("Social Sharing Component")%>

	<script type="text/javascript">
		function setDefaultValueSocialSharing(dialog) {
		    if (typeof(dialog) == 'undefined') {
		        return;
		    }
		    var tabPanelObj = dialog.findByType('tabpanel')[0];
		    if (typeof(tabPanelObj) == 'undefined') {
		        return;
		    }
		    
		    var objUrl = dialog.getField('./url');
		    if (objUrl) {
		    	var val = objUrl.getValue();
		    	if (val == null || val.length < 1) {
		    		objUrl.setValue('<%=slingRequest.getAttribute("url")%>');
		    	}
		    }
		    
		    var objTitle = dialog.getField('./title');
		    if (objTitle) {
		    	var val = objTitle.getValue();
		    	if (val == null || val.length < 1) {
		    		objTitle.setValue('<%=slingRequest.getAttribute("title")%>');
		    	}
		    }
		    
		    var objDescription = dialog.getField('./description');
		    if (objDescription) {
		    	var val = objDescription.getValue();
		    	if (val == null || val.length < 1) {
			    	var valDesc = $('head').find('meta[name="description"]').attr('content');
		    		objDescription.setValue(valDesc);
		    	}
		    }
		}
	</script>
</c:if>

<div class="social-sharing">
	<div data-share-button="" data-url="${url}"
		data-title="${title}" data-description="${description}"
		data-image="${image}" class="share-button"></div>
</div>

