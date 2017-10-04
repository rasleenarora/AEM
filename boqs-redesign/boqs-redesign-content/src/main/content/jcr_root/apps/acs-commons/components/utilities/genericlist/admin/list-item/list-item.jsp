<%
%><%@ page session="false"
           import="java.util.Calendar,
                 org.apache.sling.api.resource.ResourceResolver,
                 org.apache.sling.api.resource.Resource,
                 com.day.cq.wcm.api.Page,
                 com.day.text.Text,
                 org.apache.sling.api.resource.ValueMap"%><%
%><%@include file="/libs/granite/ui/global.jsp"%><%

    String modelPath = resource.getPath();
    Page listItemPage = resource.adaptTo(Page.class);

    String thumbnailUrl = "/libs/cq/core/content/projects/templates/default/thumbnail.png";

    final String ctx = request.getContextPath();
    thumbnailUrl = xssAPI.getValidHref(ctx + thumbnailUrl);

    String xssTitle = xssAPI.encodeForHTML(i18n.getVar(listItemPage.getTitle()));

    String xssModelPath = xssAPI.getValidHref(resource.getPath());

    // last mod
    Calendar lastModified = listItemPage.getLastModified();
    boolean isNew = false;
    if (lastModified != null) {
        Calendar oneDayAgo = Calendar.getInstance();
        oneDayAgo.add(Calendar.DATE, -1);
        isNew = lastModified.getTimeInMillis() >= oneDayAgo.getTimeInMillis();
    }
%>
<article class="card-generic-list-model foundation-collection-item" role="option" data-foundation-collection-item-id="<%= xssModelPath %>">
    <i class="select"></i>
    <i class="sort"></i>
    <div class="card">
       <% if (isNew) { %>
       <span class="flag info"><%= i18n.get("New") %></span>
       <% } %>
       <span class="image">
           <img class="show-grid" src="<%= thumbnailUrl %>" alt="">
           <img class="show-list" src="<%= thumbnailUrl %>" alt="">
       </span>
        <div class="label">
            <div class="main">
                <h4><%= xssTitle %></h4>
            </div>

        </div>
    </div>
</article>