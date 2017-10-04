<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.TabContainerPresenter"%>

<%
    PresenterUtils.makePresenter(TabContainerPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
    <cq:include script="tabcontainercomp-author.jsp" />
</c:if>
<c:if test="${not isEditMode }">
	<c:if test="${ (not empty numberoftabs) && (not empty internalcolumns) 
	                && (not empty firsttablabel) && (not empty secondtablabel)}">
	<div data-tabs="" class="tabbed-container">
	  <div class="tabs <c:if test="${ numberoftabs > 2 }">more-two-tabs</c:if>">
	    <a href="javascript:;" class="tab-active">${ firsttablabel }</a>
	    <c:set var="hashSign" value="#" />
	    <ul class="list-unstyled list-tabs">
	          <li class="active">
	            <a href="${hashSign}${tabid1}"><span class="img-wrap"><c:if test="${not empty firsttabiconpath}"><img src="${ firsttabiconpath }" alt="${ firstalternate }"/></c:if></span><span class="tab-title">${ firsttablabel }</span></a>
	          </li>
	          <li>
	            <a href="${hashSign}${tabid2}"><span class="img-wrap"><c:if test="${not empty secondtabiconpath}"><img src="${ secondtabiconpath }" alt="${ secondalternate }"/></c:if></span><span class="tab-title">${ secondtablabel }</span></a>
	          </li>
	      <c:if test="${ numberoftabs eq '3' || numberoftabs eq '4'}">
	          <li>
	            <a href="${hashSign}${tabid3}"><span class="img-wrap"><c:if test="${not empty thirdtabiconpath}"><img src="${ thirdtabiconpath }" alt="${ thirdalternate }"/></c:if></span><span class="tab-title">${ thirdtablabel }</span></a>
	          </li>
	      </c:if>
	      <c:if test="${ numberoftabs eq '4'}">
	          <li>
	            <a href="${hashSign}${tabid4}"><span class="img-wrap"><c:if test="${not empty fourthtabiconpath}"><img src="${ fourthtabiconpath }" alt="${ fourthalternate }"/></c:if></span><span class="tab-title">${ fourthtablabel }</span></a>
	          </li>
	      </c:if>
	    </ul>
	  </div>
	  <div class="tabs-content">
	    <div id="${tabid1}" class="tab-layout active">
	        <c:if test="${internalcolumns eq '1'}">
	            <cq:include path="par_container_tab1" resourceType="foundation/components/parsys" />
	        </c:if>
	        <c:if test="${internalcolumns eq '2'}">
	            <div class="row">
	                <div class="col-sm-6">
	                    <cq:include path="par_container_tab1_left" resourceType="foundation/components/parsys" />
	                </div>
	                <div class="col-sm-6">
	                    <cq:include path="par_container_tab1_right" resourceType="foundation/components/parsys" />
	                </div>
	            </div>
	        </c:if>
	        <c:if test="${internalcolumns eq '3'}">
	            <div class="row">
	                <div class="col-sm-4">
	                    <cq:include path="par_container_tab1_left" resourceType="foundation/components/parsys" />
	                </div>
	                <div class="col-sm-4">
	                    <cq:include path="par_container_tab1_center" resourceType="foundation/components/parsys" />
	                </div>
	                <div class="col-sm-4">
	                    <cq:include path="par_container_tab1_right" resourceType="foundation/components/parsys" />
	                </div>
	            </div>
	        </c:if>
	    </div>
	    <div id="${tabid2}" class="tab-layout">
	        <c:if test="${internalcolumns eq '1'}">
	            <cq:include path="par_container_tab2" resourceType="foundation/components/parsys" />
	        </c:if>
	        <c:if test="${internalcolumns eq '2'}">
	            <div class="row">
	                <div class="col-sm-6">
	                    <cq:include path="par_container_tab2_left" resourceType="foundation/components/parsys" />
	                </div>
	                <div class="col-sm-6">
	                    <cq:include path="par_container_tab2_right" resourceType="foundation/components/parsys" />
	                </div>
	            </div>
	        </c:if>
	        <c:if test="${internalcolumns eq '3'}">
	            <div class="row">
	                <div class="col-sm-4">
	                    <cq:include path="par_container_tab2_left" resourceType="foundation/components/parsys" />
	                </div>
	                <div class="col-sm-4">
	                    <cq:include path="par_container_tab2_center" resourceType="foundation/components/parsys" />
	                </div>
	                <div class="col-sm-4">
	                    <cq:include path="par_container_tab2_right" resourceType="foundation/components/parsys" />
	                </div>
	            </div>
	        </c:if>
	    </div>
	    <c:if test="${ numberoftabs eq '3' || numberoftabs eq '4'}">
	        <div id="${tabid3}" class="tab-layout">
	            <c:if test="${internalcolumns eq '1'}">
	                <cq:include path="par_container_tab3" resourceType="foundation/components/parsys" />
	            </c:if>
	            <c:if test="${internalcolumns eq '2'}">
	                <div class="row">
	                    <div class="col-sm-6">
	                        <cq:include path="par_container_tab3_left" resourceType="foundation/components/parsys" />
	                    </div>
	                    <div class="col-sm-6">
	                        <cq:include path="par_container_tab3_right" resourceType="foundation/components/parsys" />
	                    </div>
	                </div>
	            </c:if>
	            <c:if test="${internalcolumns eq '3'}">
	                <div class="row">
	                    <div class="col-sm-4">
	                        <cq:include path="par_container_tab3_left" resourceType="foundation/components/parsys" />
	                    </div>
	                    <div class="col-sm-4">
	                        <cq:include path="par_container_tab3_center" resourceType="foundation/components/parsys" />
	                    </div>
	                    <div class="col-sm-4">
	                        <cq:include path="par_container_tab3_right" resourceType="foundation/components/parsys" />
	                    </div>
	                </div>
	            </c:if>
	        </div>
	    </c:if>
	    <c:if test="${ numberoftabs eq '4'}">
	        <div id="${tabid4}" class="tab-layout">
	            <c:if test="${internalcolumns eq '1'}">
	                <cq:include path="par_container_tab4" resourceType="foundation/components/parsys" />
	            </c:if>
	            <c:if test="${internalcolumns eq '2'}">
	                <div class="row">
	                    <div class="col-sm-6">
	                        <cq:include path="par_container_tab4_left" resourceType="foundation/components/parsys" />
	                    </div>
	                    <div class="col-sm-6">
	                        <cq:include path="par_container_tab4_right" resourceType="foundation/components/parsys" />
	                    </div>
	                </div>
	            </c:if>
	            <c:if test="${internalcolumns eq '3'}">
	                <div class="row">
	                    <div class="col-sm-4">
	                        <cq:include path="par_container_tab4_left" resourceType="foundation/components/parsys" />
	                    </div>
	                    <div class="col-sm-4">
	                        <cq:include path="par_container_tab4_center" resourceType="foundation/components/parsys" />
	                    </div>
	                    <div class="col-sm-4">
	                        <cq:include path="par_container_tab4_right" resourceType="foundation/components/parsys" />
	                    </div>
	                </div>
	            </c:if>
	        </div>
	    </c:if>
	  </div>
	</div>
	</c:if>
</c:if>