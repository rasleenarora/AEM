<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.ContactFormCompPresenter"%>

<%
    PresenterUtils.makePresenter(ContactFormCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Contact Form Component")%>
    <script type="text/javascript">
     function checkUnsubsciptionScenario(dialog){
    	 var enableUnsubscription = dialog.getField('./enableUnsubscription').getValue(),
    	     adobeCampaignUrl;
    	 if(enableUnsubscription == 'true'){
    		 adobeCampaignUrl = dialog.getField('./adobeCampaignUrl').getValue();
    		 if(!adobeCampaignUrl){
    			 CQ.Ext.Msg.alert('Kindly Enter the Adobe Campaign Url. It has to be provided if unsubscription is enabled');
    			    return false;
    		 }
        }
         return true;
         }

        function checkDownloadScenario(dialog){
    	 var enableDownload = dialog.getField('./enableDownload').getValue(),
    	    downloadLinkId,
    	    downloadUrl;
    	 if(enableDownload == 'true'){
    		 downloadUrl = dialog.getField('./downloadUrl').getValue();
    		 downloadLinkId = dialog.getField('./downloadLinkId').getValue();
    		 if(!downloadUrl || !downloadLinkId){
    			 CQ.Ext.Msg.alert('Please enter the Download Link ID and Downlaod URL. These have to be provided if download checkbox is enabled');
    			    return false;
    		 }
        }
            return true;
         }
    </script>
</c:if>

<c:if test="${isEditMode or isEmbedded}"><div class="embedded-style"></c:if>

	<c:if test="${addtopmargin}">
		<div class="show-more">
	</c:if>
	
	<c:if test="${buttonstyle eq 'primary' }">
		<button type="button" id="${contactButtonId}" class="${buttonalignment} btn btn-primary <c:if test="${isEmbedded}">embedded-hidden</c:if>">
			${ctabuttonlbl}
			<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
		</button>
	</c:if>
	<c:if test="${buttonstyle eq 'secondary' }">
		<button type="button" id="${contactButtonId}" class="${buttonalignment} btn btn-default <c:if test="${isEmbedded}">embedded-hidden</c:if>">
			${ctabuttonlbl}
			<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
		</button>
	</c:if>
	<c:if test="${buttonstyle eq 'tertiary' }">
		<button type="button" id="${contactButtonId}" class="${buttonalignment} btn-tertiary <c:if test="${isEmbedded}">embedded-hidden</c:if>">
			${ctabuttonlbl}
			<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
		</button>
	</c:if>
	
	<c:if test="${addtopmargin}">
		</div>
	</c:if>

	
	
	<div data-popin <c:if test="${isEditMode or isEmbedded}">data-showonload="true"</c:if> class="popup contact-popup">
		<c:if test="${not isEmbedded and not isEditMode}"><div class="container"></c:if>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button class="close" type="button" aria-label="Close">
							<span aria-hidden="true" class="wi-icon icon-close-1"></span>
						</button>
						<div class="wrap-error hidden">
	                        <span aria-hidden="true" class="wi-icon icon-close-2"></span>
	                        <p class="text-error">${errormsg}</p>
						</div>
					</div>
					<div class="modal-body">
						<div class="event-group">
							<span class="wi-icon icon-required" aria-hidden="true"></span>
							<div class="desc">
								<p>= ${requiredsignlbl}</p>
							</div>
						</div>
						<div>
							<cq:include path="par_form_content" resourceType="foundation/components/parsys" />
						</div>
						<div class="row">
							<div class="col-sm-6">
								<button type="submit" class="btn btn-default btn-primary btn-submit">
									${submitbtnlbl}
									<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
								</button>
							</div>
							<div class="col-sm-6 text-center">
	                          <button type="reset" class="btn-cancel">Cancel Enquiry</button>
	                        </div>
						</div>
					</div>
				</div>
			</div>
		<c:if test="${not isEmbedded and not isEditMode}"></div></c:if>
	</div>
	
	<div id="${submitSuccessId}" data-popin class="popup information-popup" <c:if test="${showMessage}"> data-showonload="true" </c:if>>
		<c:if test="${not isEmbedded and not isEditMode}"><div class="container"></c:if>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button class="close" type="button" aria-label="Close">
							<span aria-hidden="true" class="wi-icon icon-close-1"></span>
						</button>
						<c:if test="${not empty popupheading}">
							<h4 class="modal-title">${popupheading }</h4>
						</c:if>
					</div>
					<div class="modal-body">
						<div class="desc boqs-download">
						      ${popupmsg} 
						      <%--Adding the code for download link --%>
                              <c:if test="${success and enableDownload and not empty downloadLinkId and not empty downloadUrl}">
                                <a href='${downloadUrl}' id='${downloadLinkId}' download='' >${downloadLinkLabel}</a>
                            
                                <script type="text/javascript">
                                  var timer = setTimeout(function(){
                                	  timer = 0;

                                    var isChromeOrFirefox = /firefox|chrome/i.test(navigator.userAgent);

                                    if (isChromeOrFirefox) {
                                        $('#${downloadLinkId}').get(0).click();
                                    }
                                    else {
                                        window.location.href = $('#${downloadLinkId}').attr('href');
                                    }
                                  }, 2000);

                                  $('#${downloadLinkId}').on('click', function(e){

                                	    if (timer) {
                                	        clearTimeout(timer);
                                	        timer = 0;
                                	        }
                                  });                            
                            </script>
                        </c:if>
						</div>
						<a href="#"></a>
						<button type="button" class="btn btn-default btn-primary btn-popup">
							${popupbtnlbl}
							<span aria-hidden="true" class="wi-icon icon-arrow icon-btn"></span>
						</button>
					</div>
				</div>
			</div>
		<c:if test="${not isEmbedded and not isEditMode}"></div></c:if>
	</div>
<c:if test="${isEditMode or isEmbedded}"></div></c:if>

<%--Adding the code for unsubscription --%>
<c:if test="${success and enableUnsubscription and not empty adobeCampaignUrl}">
    <script>
        document.write("<img height='0' width='0' alt='' src='${adobeCampaignUrl}" +  Math.random().toString() + "?tagid=unsubAEM'/>");
    </script>
    <noscript><img height='0' width='0' alt='' src='${adobeCampaignUrl}?tagid=unsubAEM'/></noscript>
</c:if>

