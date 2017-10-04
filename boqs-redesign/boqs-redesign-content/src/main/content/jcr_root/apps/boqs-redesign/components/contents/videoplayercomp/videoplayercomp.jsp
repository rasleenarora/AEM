<%@ include file="/apps/boqs-redesign/global.jsp"%>

<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Video Player Component")%>
</c:if>

<video style="width:100%; height:100%" <c:if test="${properties.autoplay eq 'true'}">data-autoplay=""</c:if>>
	<source type="video/mp4" src="${properties.asset}">
</video>
