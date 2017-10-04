<%@ include file="/apps/boqs-redesign/global.jsp"%>

<%= StringUtil.getLabelAuthorMode("Tabbed Container")%>

<script type="text/javascript">
       function showHideTab(dialog, numberOfTabs) {
           if (typeof(dialog) == 'undefined') {
               return;
           }
           var tabPanelObj = dialog.findByType('tabpanel')[0];
           if (typeof(tabPanelObj) == 'undefined') {
               return;
           }
           if (numberOfTabs == null || numberOfTabs == 'undefined' || numberOfTabs == '') {
               numberOfTabs = '2';
           }
           if (numberOfTabs == '2') {
               dialog.getField('./thirdtablabel').allowBlank = true;
               dialog.getField('./fourthtablabel').allowBlank = true;
               tabPanelObj.hideTabStripItem(3);
               tabPanelObj.hideTabStripItem(4);
           } else if (numberOfTabs == '3') {
               dialog.getField('./thirdtablabel').allowBlank = false;
               dialog.getField('./fourthtablabel').allowBlank = true;
               tabPanelObj.unhideTabStripItem(3);
               tabPanelObj.hideTabStripItem(4);
           } else if (numberOfTabs == '4') {
               dialog.getField('./thirdtablabel').allowBlank = false;
               dialog.getField('./fourthtablabel').allowBlank = false;
               tabPanelObj.unhideTabStripItem(3);
               tabPanelObj.unhideTabStripItem(4);
           }
       }
       
       function showHideTabs(dialog) {
           var numberOfTabsObj = dialog.getField("./numberoftabs");
           var numberOfTabs = '';
           if (numberOfTabsObj) {
               numberOfTabs = '' + numberOfTabsObj.getValue();
           }
           showHideTab(dialog, numberOfTabs);
       }
</script>
<c:if test="${ (not empty numberoftabs) && (not empty internalcolumns) 
	                && (not empty firsttablabel) && (not empty secondtablabel)}">
	<div data-tabs="" data-tabs-author="" class="tabbed-container">
	  <div class="tabs <c:if test="${ numberoftabs > 2 }">more-two-tabs</c:if>">
	    <a href="javascript:;" class="tab-active">${ firsttablabel }</a>
	    <ul class="list-unstyled list-tabs">
	          <li <c:if test="${ tabActive eq '1'}">class="active"</c:if>>
	            <a href="?id=1"><span class="img-wrap"><c:if test="${not empty firsttabiconpath}"><img src="${ firsttabiconpath }" alt="${firstalternate}"/></c:if></span><span class="tab-title">${ firsttablabel }</span></a>
	          </li>
	          <li <c:if test="${ tabActive eq '2'}">class="active"</c:if>>
	            <a href="?id=2"><span class="img-wrap"><c:if test="${not empty secondtabiconpath}"><img src="${ secondtabiconpath }" alt="${secondalternate}"/></c:if></span><span class="tab-title">${ secondtablabel }</span></a>
	          </li>
	      <c:if test="${ numberoftabs eq '3' || numberoftabs eq '4'}">
	          <li <c:if test="${ tabActive eq '3'}">class="active"</c:if>>
	            <a href="?id=3"><span class="img-wrap"><c:if test="${not empty thirdtabiconpath}"><img src="${ thirdtabiconpath }" alt="${thirdalternate}"/></c:if></span><span class="tab-title">${ thirdtablabel }</span></a>
	          </li>
	      </c:if>
	      <c:if test="${ numberoftabs eq '4'}">
	          <li <c:if test="${ tabActive eq '4'}">class="active"</c:if>>
	            <a href="?id=4"><span class="img-wrap"><c:if test="${not empty fourthtabiconpath}"><img src="${ fourthtabiconpath }" alt="${fourthalternate}"/></c:if></span><span class="tab-title">${ fourthtablabel }</span></a>
	          </li>
	      </c:if>
	    </ul>
	  </div>
	  <div class="tabs-content">
	  	<c:if test="${ tabActive eq '1'}">
		    <div id="" class="tab-layout <c:if test="${ tabActive eq '1'}">active</c:if>">
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
		</c:if>
	    <c:if test="${ tabActive eq '2'}">
		    <div id="" class="tab-layout <c:if test="${ tabActive eq '2'}">active</c:if>">
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
		</c:if>
	    <c:if test="${ tabActive eq '3'}">
	        <div id="" class="tab-layout <c:if test="${ tabActive eq '3'}">active</c:if>">
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
	    <c:if test="${ tabActive eq '4'}">
	        <div id="" class="tab-layout <c:if test="${ tabActive eq '4'}">active</c:if>">
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
