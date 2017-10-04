
<%@page import="com.investec.boqs.redesign.presenter.ImagePresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ page import="com.day.cq.commons.Doctype,
    com.day.cq.wcm.api.components.DropTarget,
    com.day.cq.wcm.foundation.Image, com.day.cq.wcm.foundation.Placeholder"%>
<%
%><%@include file="/libs/foundation/global.jsp"%>
<%
	Image image = new Image(resource);
	image.setIsInUITouchMode(Placeholder.isAuthoringUIModeTouch(slingRequest));

	//drop target css class = dd prefix + name of the drop target in the edit config
	image.addCssClass(DropTarget.CSS_CLASS_PREFIX + "image");
	image.loadStyleData(currentStyle);
	image.setSelector(".img"); // use image script
	image.setDoctype(Doctype.fromRequest(request));
	// add design information if not default (i.e. for reference paras)
	if (!currentDesign.equals(resourceDesign)) {
		image.setSuffix(currentDesign.getId());
	}
	String divId = "cq-image-jsp-" + resource.getPath();
	PresenterUtils.makePresenter(ImagePresenter.class, slingRequest, properties, currentNode);
%>
<c:choose>
	<c:when test="${empty fileReferenceDesktop or empty fileReferenceMobile or fileReferenceDesktop eq fileReferenceMobile}">
		<div id="<%=divId%>"><%image.draw(out);%></div>
	</c:when>
	<c:otherwise>
		<c:if test="${not empty linkURL}">
			<a href="${linkURL }">
		</c:if>
		<picture>
			<source media="(min-width: 768px)" srcset=${ fileReferenceDesktop}>
			<img title="${imageTitle }" alt="${imageAlt }" class="cq-dd-image" <c:if test="${not empty width and not empty height}">style="width: ${width}px; height: ${height}px;"</c:if> src="${fileReferenceMobile }" />
		</picture>
		<c:if test="${not empty linkURL}">
			</a>
		</c:if>
	</c:otherwise>
</c:choose>

<cq:text property="jcr:description" placeholder="" tagName="small" escapeXml="true" />

<%@include file="/libs/foundation/components/image/tracking-js.jsp"%>

