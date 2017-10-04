<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@page import="com.investec.boqs.redesign.presenter.FilteringControlsCompPresenter"%>

<%
    PresenterUtils.makePresenter(FilteringControlsCompPresenter.class, slingRequest, properties, currentNode);
%>
<c:if test="${isEditMode }">
    <%= StringUtil.getLabelAuthorMode("Filtering Controls Component")%>
</c:if>


<div class="filtering-controls-component">



              <div id="filtering-controls" data-accordion data-expand-content data-hidehandler="true" data-close=".close, .text-link, .btn-submit" class="filtering-controls">
                <header>
                  <h3 data-template="[data-popover-template=&quot;filter-control&quot;]" data-close=".close, .btn-ok" data-offsettop="5" data-offsetleft="10" data-autoshow="true" data-removewhenclose="true" data-triggeroffsettop="5" data-popover data-placementtrigger="bottom" data-trigger="[data-popover-trigger=&quot;filter-control&quot;]">${refineresults}</h3>
                </header>
                <div class="clear-btn">
                  <button type="reset" class="btn-reset-filters title"><span aria-hidden="true" class="icon icon-bin"> </span>${clearallfilters}
                  </button>
                </div>

                  <c:if test="${empty searchServletPath}">
	    	<c:set var="searchServletPath" value="/services/boqs-redesign/geteventsresult"/>
	    	<c:set var="addsearchpage" value="true"/>
   		</c:if>
               <form action="${searchServletPath}" method="GET"
            	name="filtering-controls-form"
            	data-filters=""
            	class="filtering-controls-form">
             	<%-- <c:if test="${not empty addsearchpage}">
            		<input type="hidden" name="search-page" id="search-page" value="<%=currentPage.getPath() %>"/>
            	</c:if> --%>
            	<input type="hidden" name="search-term" id="search-term" value="${searchTerm}"/>
					<c:if test="${not empty topicLists && showTopicList eq true}">
						<fieldset data-type="topic" class="item">
							<div class="handle">
								<h4 class="title">${topiclbl}</h4>
							</div>
							<div class="form-group content">
								<div class="checkbox-group">
									<input id="${alltopics}" name="cbTopic" data-default=""
										type="checkbox" value="${alltopics}" data-check-all=""
										<c:if test="${showCheckedTypeTopic eq true }">checked="checked"</c:if> />
									<label for="${alltopics}" class="label-text">All Topics</label>
								</div>
								<p
									class="<c:if test="${showCheckedTypeTopic eq true }"></c:if> note-text"></p>
								<c:forEach items="${topicLists}" var="topicList">
									<div class="checkbox-group">
										<input id="${topicList.value}" name="cbTypeEvent" type="checkbox"
											value="${topicList.value}"
											<c:if test="${(fn:indexOf(topic, topicList.value))>=0}">checked="checked"</c:if> />
		
										<label for="${topicList.value}" class="label-text">${topicList.label}
										</label>
									</div>
								</c:forEach>
							</div>
						</fieldset>
					</c:if>

			<c:if test="${not empty relatedProfessionList}">
				<fieldset data-type="related-profession" class="item">
	                   <div class="handle">
	                     <h4 class="title">
	                     	${relatedprofession}
	                     	<span class="decs">
	                     		<c:if test="${empty relatedPro}">All professions</c:if>
	                     		<c:if test="${not empty relatedPro}">
		                     		<c:forEach items="${relatedProfessionList}" var="relatedProfessionList">
		                     		<c:if test="${relatedPro eq relatedProfessionList.value}">${relatedProfessionList.label}</c:if>
		                     		</c:forEach>
	                        	</c:if>
	                     	</span>
	                     </h4>
	                   </div>
	                   <div class="form-group content">
	                     <div class="radio-group">
	                       <input id="${allprofessions}" name="radioRelatedPro" data-default="" type="radio" value="${allprofessions}" <c:if test="${not showRelatedProfession}">checked="checked"</c:if>/>
	                       <label for="${allprofessions}" class="label-text">All professions</label>
	                     </div>
	                      <c:forEach items="${relatedProfessionList}" var="relatedProfessionList">
	                      	<div class="radio-group">
	                        	<input id="${relatedProfessionList.value}" name="radioRelatedPro" type="radio" value="${relatedProfessionList.value}"
	                        	<c:if test="${relatedPro eq relatedProfessionList.value }">checked="checked"</c:if>/>
	                        	<label for="${relatedProfessionList.value}" class="label-text">
	                        			${relatedProfessionList.label}
	                        	</label>
	                      	</div>
	                      </c:forEach>
	                   </div>
	                </fieldset>
	               </c:if>
	               <c:if test="${not empty specificFinanceList && showrspecificFinanceList eq true}">
	                <fieldset data-type="finance" class="item">
	                  <div class="handle">
	                    <h4 class="title">
		                    ${financelbl}
		                    <span class="decs">
		                    	<c:if test="${empty finance}">All Categories</c:if>
	                     		<c:if test="${not empty finance}">
		                    	<c:choose>
		                    		<c:when test="${finance eq allcate}">All Categories</c:when>
		                       		<c:when test="${finance eq 'personalfinance'}">Personal Finance</c:when>
									<c:when test="${finance eq 'practicefinance'}">Practice Finance</c:when>
									<c:when test="${finance eq 'financeforclient'}">Finance for my clients</c:when>
								</c:choose>
								</c:if>
		                    </span>
	                    </h4>
	                  </div>
	                  <div class="form-group content">
	                  	<div class="radio-group">
	                      	<input id="${allcate}" name="radioFinance"  data-default="" type="radio" value="${allcate}" <c:if test="${not showFinance}">checked="checked"</c:if>/>
	                      	<label for="${allcate}" class="label-text">All Categories</label>
	                    	</div>
	                  	<c:forEach items="${specificFinanceList}" var="specificFinanceList">
						<div class="radio-group">
		                	<input id="${specificFinanceList}" name="radioFinance" type="radio" value="${specificFinanceList}"
		                		<c:if test="${finance eq specificFinanceList }">checked="checked"</c:if>/>
		                	<label for="${specificFinanceList}" class="label-text">
		                       	<c:choose>
		                       		<c:when test="${specificFinanceList eq 'personalfinance'}">Personal Finance</c:when>
									<c:when test="${specificFinanceList eq 'practicefinance'}">Practice Finance</c:when>
									<c:when test="${specificFinanceList eq 'financeforclient'}">Finance for my clients</c:when>
								</c:choose>
							</label>
						</div>
	                  	</c:forEach>
	                  </div>
	               	</fieldset>
	              	</c:if>
	              	<c:if test="${not empty specificRelatedProductList && showspecificRelatedProductList eq true }">
	               	<fieldset data-type="related-product" class="item">
				<div class="handle">
					<h4 class="title">${relatedproductlbl}</h4>
				</div>
				<div class="form-group content">
	                  	<div class="checkbox-group">
	                       <input id="${allproduct}" name="cbRelatedProduct" data-default="" type="checkbox" data-check-all="" value="${allproduct}" 
	                       	<c:if test="${showCheckedProduct eq true }">checked="checked"</c:if> />
	                       <label for="${allproduct}" class="label-text">All Products</label>
	                   </div>
	                   <p class="<c:if test="${showCheckedProduct eq true }"></c:if> note-text">Or only:</p>
	                  	<c:forEach items="${specificRelatedProductList}" var="specificRelatedProductList">
						<div class="checkbox-group">
							<input id="${specificRelatedProductList}" name="cbRelatedProduct" type="checkbox" value="${specificRelatedProductList}"
								<c:if test="${(fn:indexOf(relatedProduct, specificRelatedProductList))>=0}">checked="checked"</c:if>/>
		                	<label for="${specificRelatedProductList}" class="label-text">
		                       	<c:choose>
		                       		<c:when test="${specificRelatedProductList eq 'savingsaccount'}">Savings Accounts</c:when>
									<c:when test="${specificRelatedProductList eq 'creditcard'}">Credit Cards</c:when>
									<c:when test="${specificRelatedProductList eq 'propertyfinance'}">Property Finance</c:when>
									<c:when test="${specificRelatedProductList eq 'assetfinance'}">Asset Finance</c:when>
								</c:choose>
							</label>
						</div>
	                  	</c:forEach>
	                  </div>
	               	</fieldset>
	              	</c:if>
	        <c:if test="${not empty specificResultList && showspecificResultList eq true}">
			<fieldset data-type="type" class="item">
				<div class="handle">
	            	<h4 class="title">${resulttypelbl}</h4>
	            </div>
	                  <div class="form-group content">
	                  	<div class="checkbox-group">
	                       <input id="${alltype}" name="cbResultType"  data-default="" type="checkbox" value="${alltype}" data-check-all=""
								<c:if test="${showCheckedType eq true }">checked="checked"</c:if> />
	                       <label for="${alltype}" class="label-text">Show all website content</label>
	                   </div>
	                   <p class="<c:if test="${showCheckedType eq true }"></c:if> note-text"></p>
	                  	<c:forEach items="${specificResultList}" var="specificResultList">
						<div class="<c:if test="${showCheckedType eq true }"></c:if> checkbox-group">
							<input id="${specificResultList}" name="cbResultType" type="checkbox" value="${specificResultList}"
									<c:if test="${(fn:indexOf(type, specificResultList))>=0}">checked="checked"</c:if>/>
		                	<label for="${specificResultList}" class="label-text">
		                       	<c:choose>
		                       		<c:when test="${specificResultList eq 'product'}">Product</c:when>
									<c:when test="${specificResultList eq 'expertise'}">Expertise</c:when>
									<c:when test="${specificResultList eq 'event'}">Event</c:when>
									<c:when test="${specificResultList eq 'specialistbanker'}">Specialist Banker Profile</c:when>
									<c:when test="${specificResultList eq 'news'}">News</c:when>
									<c:when test="${specificResultList eq 'legaldocument'}">Legal</c:when>
								</c:choose>
							</label>
						</div>
	                  	</c:forEach>
	                  </div>
			</fieldset>
		</c:if>
		<c:if test="${showdateRange eq true }">
	              	<fieldset data-type="date-range" class="item">
	                <div class="handle"> 
	                  <h4 class="title">${daterangelbl}</h4>
	                 </div>
	                 <div class="form-group content">
	                   <div class="date-picker-group">
	                     <div class="row">
	                       <div class="col-sm-12">
	                         <label for="date-range-from">From:</label>
	                       </div>
	                     </div>
	                     <div class="row">
	                       <div class="col-sm-12 date-picker" data-template="[data-popover-template=&quot;date-range-from&quot;]" data-close=".icon-close-popover, [data-today=&quot;data-today&quot;], .btn-cancel" data-offsettop="25" data-offsetleft="-5" data-popover="data-popover">
	                         <input id="date-range-from" readonly="readonly" name="date-range-from" type="text" value="${startDateParam}" autocomplete="off" class="form-control" data-required="" data-number=""/>
	                       </div>
	                     </div>
	                   </div>
	                   <div class="date-picker-group">
	                     <div class="row">
	                       <div class="col-sm-12">
	                         <label for="date-range-to">To:</label>
	                       </div>
	                     </div>
	                     <div class="row">
	                       <div class="col-sm-12 date-picker" data-template="[data-popover-template=&quot;date-range-to&quot;]" data-close=".icon-close-popover, [data-today=&quot;data-today&quot;], .btn-cancel" data-offsettop="25" data-offsetleft="-5" data-popover="data-popover">
	                         <input id="date-range-to" readonly="readonly" name="date-range-to" type="text" value="${endDateParam}" autocomplete="off" class="form-control" data-required="" data-number=""/>
	                       </div>
	                     </div>
	                   </div>
	                 </div>
					<!-- data-calendar -->
				</fieldset>
	            </c:if>
		<c:if test="${not empty specificTypeEventList && showspecificTypeEventList eq 'true'}">
			<fieldset data-type="type-event" class="item">
				<div class="handle">
					<h4 class="title">${typeeventlbl}</h4>
	                 	</div>
	                 	<div class="form-group content">
	                  	<div class="checkbox-group">
	                       <input id="${allevent}" name="cbTypeEvent"  data-default=""  type="checkbox" value="${allevent}" data-check-all=""  
								<c:if test="${showCheckedTypeEvent eq true }">checked="checked"</c:if>/>
	                       <label for="${allevent}" class="label-text">Show all events</label>
	                   </div>
	                   <p class="<c:if test="${showCheckedTypeEvent eq true }"></c:if> note-text">Or only:</p>
	                  	<c:forEach items="${specificTypeEventList}" var="specificTypeEventList">
						<div class="<c:if test="${showCheckedTypeEvent eq true }"></c:if> checkbox-group">
							<input id="${specificTypeEventList}" name="cbTypeEvent" type="checkbox" value="${specificTypeEventList}" 
							<c:if test="${(fn:indexOf(typeEvent, specificTypeEventList))>=0}">checked="checked"</c:if>/>
							
		                	<label for="${specificTypeEventList}" class="label-text">
		                       	<c:choose>
		                       		<c:when test="${specificTypeEventList eq 'annualevent'}">Annual Event</c:when>
									<c:when test="${specificTypeEventList eq 'conference'}">Conference</c:when>
									<c:when test="${specificTypeEventList eq 'luncheon'}">Luncheon</c:when>
									<c:when test="${specificTypeEventList eq 'industryevent'}">Industry Event</c:when>
									<c:when test="${specificTypeEventList eq 'sportingevent'}">Sporting Event</c:when>
									<c:when test="${specificTypeEventList eq 'seminar'}">Seminar</c:when>
									<c:when test="${specificTypeEventList eq 'workshop'}">Workshop</c:when>
								</c:choose>
							</label>
						</div>
	                  	</c:forEach>
	                  </div>
			</fieldset>
			</c:if>
		<c:if test="${not empty specificStateList && showspecificStateList eq true}">
			<fieldset data-type="state" class="item">
	                  <div class="handle"> 
	                    <h4 class="title">${statelbl }</h4>
	                  </div>
	                  <div class="form-group states-group content">
	                    <div data-customselectbox="" class="custom-select">
		                    <select name="selStates">
		                    	<option data-default="" value="${allstates}">All states</option>
			                    <c:forEach items="${specificStateList}" var="specificStateList">
			                    	<c:choose>
										<c:when test="${specificStateList eq 'act'}">
											<option value="act" <c:if test="${state eq 'act' }">selected</c:if>>ACT</option>
										</c:when>
										<c:when test="${specificStateList eq 'nt'}">
						           			<option value="nt" <c:if test="${state eq 'nt' }">selected</c:if>>NT</option>
										</c:when>
										<c:when test="${specificStateList eq 'nsw'}">
						           			<option value="nsw" <c:if test="${state eq 'nsw' }">selected</c:if>>NSW</option>
										</c:when>
										<c:when test="${specificStateList eq 'qld'}">
						           			<option value="qld" <c:if test="${state eq 'qld' }">selected</c:if>>QLD</option> Event
										</c:when>
										<c:when test="${specificStateList eq 'sa'}">
						           			<option value="sa" <c:if test="${state eq 'sa' }">selected</c:if>>SA</option> Event
										</c:when>
										<c:when test="${specificStateList eq 'tas'}">
						           			<option value="tas" <c:if test="${state eq 'tas' }">selected</c:if>>TAS</option>
										</c:when>
										<c:when test="${specificStateList eq 'vic'}">
						          			<option value="vic" <c:if test="${state eq 'vic' }">selected</c:if>>VIC</option>
										</c:when>
										<c:when test="${specificStateList eq 'wa'}">
						         			<option value="wa" <c:if test="${state eq 'wa' }">selected</c:if>>WA</option>
										</c:when>
									</c:choose>
			                    </c:forEach>
		                    </select>
		                  </div>
	                  </div>
	               	</fieldset>
	              	</c:if>

			<div class="filtering-submit visible-xs">
                    <div class="row group-btn">
                      <div class="col-xs-6"><a href="#" class="text-link">Cancel</a>
                      </div>
                      <div class="col-xs-6">
                        <button type="submit" class="btn btn-primary btn-submit pull-right">Apply<span aria-hidden="true"></span></button>
                      </div>
                    </div>
                  </div>
		</form>
              </div>
              <div data-calendar="#date-range-from" data-popover-template="date-range-from" class="popover right-bottom">
                <div class="inner">
                  <h3 class="title">Select start date:</h3><a href="#" title="Close" class="close hidden-xs"><span class="wi-icon-blue icon-close-popover"></span></a>
                  <div data-init-calendar="" class="calendar"></div>
                  <div class="group-btn"><a href="#" title="Today" data-today="data-today" class="btn btn-primary btn-ok">Today</a><a href="#" title="Cancel" class="btn-cancel title visible-xs">Cancel</a></div>
                </div>
              </div>
              <div data-calendar="#date-range-to" data-popover-template="date-range-to" class="popover right-bottom">
                <div class="inner">
                  <h3 class="title">Select start date:</h3><a href="#" title="Close" class="close hidden-xs"><span class="wi-icon-blue icon-close-popover"></span></a>
                  <div data-init-calendar="" class="calendar"></div>
                  <div class="group-btn"><a href="#" title="Today" data-today="data-today" class="btn btn-primary btn-ok">Today</a><a href="#" title="Cancel" class="btn-cancel title visible-xs">Cancel</a></div>
                </div>
              </div>
            </div>



            <div class="col-sm-4"><a href="#" class="btn btn-primary btn-block btn-refine filters-applied" data-popover-trigger="filter-control" data-expand-handle="data-expand-handle" data-target="#filtering-controls"><span class="num-filters">3</span>Filters have been applied</a>
                 <c:if test="${showPopover}">

                        <div data-popover-template="filter-control" class="popover-filter-control">
                <div class="inner">
                  <h3 class="title">We've applied filters:</h3><a href="#" class="close"><span aria-hidden="true" class="icon icon-close-gold"></span></a>

               <c:if test="${showTopic}">
					<h4 class="title">${topiclbl}:</h4>
					<p class="text-2">
                        <c:forEach items="${topicLists}" var="topicList">
						<c:forEach items="${topicFilters}" var="topicFilters">
                            <c:if test="${topicList.value eq topicFilters}">
                            <span>${topicList.label}</span>
                            </c:if>
						</c:forEach>
                        </c:forEach>   
					</p>
				</c:if>


                <c:if test="${showRelatedProfession}">
				<h4 class="title">${relatedprofession}:</h4>
					<p class="text-2"><span>
					<c:forEach items="${relatedProfessionList}" var="relatedProfessionList">
		                <c:if test="${relatedPro eq relatedProfessionList.value}">
		                <c:set var="professionFlag" value="true" />
		                ${relatedProfessionList.label}</c:if>
		            </c:forEach>
		            <c:if test="${professionFlag == false}">
		            ${relatedPro}
		            </c:if>
	               	</span></p>
               	</c:if>
				<c:if test="${showFinance}">
					<h4 class="title">${financelbl}:</h4>
					<p class="text-2"><span>
						<c:choose>
	                    	<c:when test="${finance eq 'personalfinance'}">Personal Finance</c:when>
							<c:when test="${finance eq 'practicefinance'}">Practice Finance</c:when>
							<c:when test="${finance eq 'financeforclient'}">Finance for my clients</c:when>
							<c:otherwise>${finance}</c:otherwise>
						</c:choose>
					</span></p>
				</c:if>
				<c:if test="${shoDateRange}">
					<h4 class="title">${daterangelbl}:</h4>
					<p class="text-2">
						<span>From: ${startDateParam}</span>
						<span>To: ${endDateParam}</span>
					</p>
				</c:if>
				<c:if test="${showRelatedProduct}">
					<h4 class="title">${relatedproductlbl}:</h4>
					<p class="text-2">
						<c:forEach items="${relatedProductFilters}" var="relatedProductFilter">
							<c:choose>
	                       		<c:when test="${relatedProductFilter eq 'savingsaccount'}"><span>Savings Accounts</span></c:when>
								<c:when test="${relatedProductFilter eq 'creditcard'}"><span>Credit Cards</span></c:when>
								<c:when test="${relatedProductFilter eq 'propertyfinance'}"><span>Property Finance</span></c:when>
								<c:when test="${relatedProductFilter eq 'assetfinance'}"><span>Asset Finance</span></c:when>
							</c:choose>
						</c:forEach>
					</p>
				</c:if>
				<c:if test="${showResultType}">
					<h4 class="title">${resulttypelbl}:</h4>
					<p class="text-2">
						<c:forEach items="${typeFilters}" var="typeFilter">
							<c:choose>
	                       		<c:when test="${typeFilter eq 'product'}"><span>Product</span></c:when>
								<c:when test="${typeFilter eq 'expertise'}"><span>Expertise</span></c:when>
								<c:when test="${typeFilter eq 'event'}"><span>Event</span></c:when>
								<c:when test="${typeFilter eq 'specialistbanker'}"><span>Specialist Banker Profile</span></c:when>
								<c:when test="${typeFilter eq 'news'}"><span>News</span></c:when>
								<c:when test="${typeFilter eq 'legaldocument'}"><span>Legal</span></c:when>
							</c:choose>
						</c:forEach>
					</p>
				</c:if>
				<c:if test="${showTypeEvent}">
					<h4 class="title">${typeeventlbl}:</h4>
					<p class="text-2">
						<c:forEach items="${typeEventFilters}" var="typeEventFilter">
							<c:choose>
	                       		<c:when test="${typeEventFilter eq 'annualevent'}"><span>Annual Event</span></c:when>
								<c:when test="${typeEventFilter eq 'conference'}"><span>Conference</span></c:when>
								<c:when test="${typeEventFilter eq 'luncheon'}"><span>Luncheon</span></c:when>
								<c:when test="${typeEventFilter eq 'industryevent'}"><span>Industry Event</span></c:when>
								<c:when test="${typeEventFilter eq 'sportingevent'}"><span>Sporting Event</span></c:when>
								<c:when test="${typeEventFilter eq 'seminar'}"><span>Seminar</span></c:when>
								<c:when test="${typeEventFilter eq 'workshop'}"><span>Workshop</span></c:when>
							</c:choose>
						</c:forEach>
					</p>
				</c:if>
				<c:if test="${showState}">
					<h4 class="title">${statelbl}:</h4>
					<p class="text-2"><span>
						<c:choose>
							<c:when test="${state eq 'act'}">ACT</c:when>
							<c:when test="${state eq 'nt'}">NT</c:when>
							<c:when test="${state eq 'nsw'}">NSW</c:when>
							<c:when test="${state eq 'qld'}">QLD</c:when>
							<c:when test="${state eq 'sa'}">SA</c:when>
							<c:when test="${state eq 'tas'}">TAS</c:when>
							<c:when test="${state eq 'vic'}">VIC</c:when>
							<c:when test="${state eq 'wa'}">WA</c:when>
						</c:choose>
					</span></p>
				</c:if>

                  <div class="group-btn"><a href="#" class="btn btn-primary btn-ok">${okbuttonlabel}</a>
                    <button type="reset" id="btn-popover-reset" name="btn-popover-reset" class="btn-reset-filters title"><span aria-hidden="true" class="icon icon-bin"> </span>${clearallfilters}
                    </button>
                         </div>
                </div>
                        </div>
                        </c:if>
            </div>


