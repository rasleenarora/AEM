<%@ include file="/apps/boqs-redesign/global.jsp"%>

<body class="search-page <c:if test="${isEditMode }"> author-mode</c:if>">
    <!-- Google Tag Manager (noscript) --> 
 <noscript>
     <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M854S8G" height="0" width="0" style="display:none;visibility:hidden"></iframe>
 </noscript> <!-- End Google Tag Manager (noscript) -->

	<cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>
	<div id="container" class="app">
   		<!--Header--> 
		<cq:include script="header.jsp" />
		<!--Content-->
		<cq:include script="content.jsp" />
		<!--Footer-->
		<cq:include script="footer.jsp" />
    </div>
	 <div class="cover"></div>
    <!-- Adding CDN JS Function -->
	<cq:include script="footlibs.jsp"/>

	<!-- Adding the dtm script-->
    <script type="text/javascript">_satellite.pageBottom();</script>

	<!--[if lt IE 8]><p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->
    <noscript>JavaScript is off. Please enable to view full site.</noscript>
</body>
