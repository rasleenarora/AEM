<%@page import="com.investec.boqs.redesign.presenter.ExpandableContentAreaComponentCompPresenter"%>
<%@page import="com.investec.boqs.redesign.utils.PresenterUtils"%>
<%@ include file="/apps/boqs-redesign/global.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.investec.boqs.redesign.utils.StringUtil"%>

<%
  PresenterUtils.makePresenter(ExpandableContentAreaComponentCompPresenter.class, slingRequest, properties, currentNode);
%>

<c:if test="${isEditMode }">
  <%=StringUtil.getLabelAuthorMode("Expandable Content Area Component")%>
</c:if>

<c:choose>
  <c:when test="${visiblecontent ne '' and visiblecontenttextstyle eq 'whitetext' or visiblecontenttextstyle eq ''}">
    <div class="row">
      <div class="${componentalignment} col-sm-${width}">
        <div class="collapse-cmp content-area-cmp">
          <div data-expand-handle="" data-target="#collapse-${collapseId}" class="heading">
            <h3 class="title">${visiblecontent}</h3>
            <a href="javascript:;" class="link-1"><span class="icon icon-next-gold" aria-hidden="true"></span></a>
          </div>
          <div id="collapse-${collapseId}" data-expand-content="" class="collapse ${contenttype eq 'parsys' ? 'collapse-content' : ''}">
            <c:choose>
              <c:when test="${contenttype eq 'parsys' }">
                <cq:include path="expandablecontentarea" resourceType="foundation/components/parsys"/>
              </c:when>
                <c:otherwise>
                  <div class="desc">
                    ${hiddencontent}
                  </div>
                </c:otherwise>
            </c:choose>
          </div>
        </div>
      </div>
    </div>
  </c:when>

  <c:when test="${visiblecontent ne '' and visiblecontenttextstyle eq 'bluetext'}">
    <div class="row">
      <div class="${componentalignment} col-sm-${width}">
        <div class="collapse-cmp content-area-cmp">
          <div data-expand-handle="" data-target="#collapse-${collapseId}" class="similar heading">
            <h3 class="title">${visiblecontent}</h3>
            <a href="javascript:;" class="link-1"><span class="icon icon-next-gold" aria-hidden="true"></span></a>
          </div>
          <div id="collapse-${collapseId}" data-expand-content="" class="collapse ${contenttype eq 'parsys' ? 'collapse-content' : ''}">
            <c:choose>
              <c:when test="${contenttype eq 'parsys' }">
                 <cq:include path="expandablecontentarea" resourceType="foundation/components/parsys"/>
              </c:when>
              <c:otherwise>
                <div class="desc">
                  ${hiddencontent}
                </div>
              </c:otherwise>
            </c:choose>
          </div>
        </div>
      </div>
    </div>
  </c:when>

  <c:when test="${visiblecontent ne '' and visiblecontenttextstyle eq 'bluetextgreybg'}">
    <div class="row">
      <div class="${componentalignment} col-sm-${width}">
        <div class="collapse-cmp content-area-cmp">
          <div data-expand-handle="" data-target="#collapse-${collapseId}" class="similar heading grey">
            <h3 class="title">${visiblecontent}</h3>
            <a href="javascript:;" class="link-1"><span class="icon icon-next-gold" aria-hidden="true"></span></a>
          </div>
          <div id="collapse-${collapseId}" data-expand-content="" class="collapse ${contenttype eq 'parsys' ? 'collapse-content' : ''} grey">
            <c:choose>
              <c:when test="${contenttype eq 'parsys' }">
                 <cq:include path="expandablecontentarea" resourceType="foundation/components/parsys"/>
              </c:when>
              <c:otherwise>
                <div class="desc">
                  ${hiddencontent}
                </div>
              </c:otherwise>
            </c:choose>
          </div>
        </div>
      </div>
    </div>
  </c:when>
</c:choose>
