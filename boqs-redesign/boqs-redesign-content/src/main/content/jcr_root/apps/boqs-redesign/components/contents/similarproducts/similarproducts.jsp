<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>


<c:set var="currentMode" value="<%= WCMMode.fromRequest(request)%>" />
<c:set var="editmode" value="<%= WCMMode.EDIT%>" />
<c:if test="${(currentMode == editmode)}">
	<p style="color: #A4A4A4; text-decoration: underline; font-size: 11px;">Author
		Similar Products Component</p>
</c:if>
<c:set var="nodePath" value="<%= currentNode.getPath()%>" />

<div class="placeholder placeholder-similar" data-nodePath="${nodePath}">
          <script type="text/x-tmpl-mustache" class="template"> 
            <section class="panel">
              <div class="container">
                <div class="block similar">
                  <h2 class="block-heading">${properties.title}</h2>
                  <div class="row row-ib row-ib-left">{{#products}}
                    <div class="card col-xs-12 col-sm-6  col-md-4"><a href="{{path}}" class="card-inner">
                                                       <div class="card-thumb"><img src="{{thumanailImage}}" alt="{{title}}" class="img-responsive" alt="{{altText}}"></div>
                        <h2 class="card-heading">{{title}}</h2>
                        <div class="card-body">{{{description}}}</div></a>
                    </div>{{/products}}
                  </div>
                </div>
              </div>
            </section>
          </script>
        </div>