<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.PhotoGalleryCompPresenter"%>

<%
    PresenterUtils.makePresenter(PhotoGalleryCompPresenter.class, slingRequest, properties, currentNode);
%>


<c:if test="${isEditMode }">
	<%= StringUtil.getLabelAuthorMode("Photo Gallery Component")%>
</c:if>
<div data-gallery data-name="${galleryname}" data-gallery-source="${fn:escapeXml(listPhotoGalleryJson)}" class="photo-gallery">
	<div class="row gallery-thumb">
		<c:forEach var="photoGalleryItem" items="${photoGalleryList}">
			<div class="col-md-2 col-sm-3 col-xs-6 thumb-image">
				<a href="#">
					<span style="background-image: url('${photoGalleryItem.thumbSrc}')"></span>
				</a>
			</div>
		</c:forEach>
	</div>
	<div class="popup-gallery">
		<div class="close-gallery">
			<p>${galleryname}</p>
			<button type="button" class="close" aria-label="Close">
				<span aria-hidden="true" class="wi-icon icon-close"></span>
			</button>
		</div>
		<div data-slide class="slider slider-for"></div>
		<div data-nav class="slider slider-nav"></div>
	</div>
</div>