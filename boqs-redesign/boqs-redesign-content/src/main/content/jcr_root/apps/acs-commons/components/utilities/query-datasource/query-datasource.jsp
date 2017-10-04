<%--
  ADOBE CONFIDENTIAL

  Copyright 2014 Adobe Systems Incorporated
  All Rights Reserved.

  NOTICE:  All information contained herein is, and remains
  the property of Adobe Systems Incorporated and its suppliers,
  if any.  The intellectual and technical concepts contained
  herein are proprietary to Adobe Systems Incorporated and its
  suppliers and may be covered by U.S. and Foreign Patents,
  patents in process, and are protected by trade secret or copyright law.
  Dissemination of this information or reproduction of this material
  is strictly forbidden unless prior written permission is obtained
  from Adobe Systems Incorporated.
--%><%
%><%@page session="false"
            import="com.adobe.granite.ui.components.Config,
                    com.adobe.granite.ui.components.ExpressionHelper,
                    com.adobe.granite.ui.components.ds.AbstractDataSource,
                    com.adobe.granite.ui.components.ds.DataSource,
                    com.adobe.granite.ui.components.ds.EmptyDataSource,
                    com.day.cq.search.Predicate,
                    com.day.cq.search.PredicateGroup,
                    com.day.cq.search.Query,
                    com.day.cq.search.QueryBuilder,
                    com.day.cq.search.eval.PathPredicateEvaluator,
                    com.day.cq.search.result.SearchResult,
                    org.apache.commons.collections.Transformer,
                    org.apache.commons.collections.iterators.TransformIterator,
                    org.apache.sling.api.resource.Resource,
                    org.apache.sling.api.resource.ResourceWrapper,
                    javax.jcr.Session,
                    java.util.Iterator" %><%
%><%@include file="/libs/granite/ui/global.jsp" %><%
    final Config dsCfg = new Config(resource.getChild(Config.DATASOURCE));
    final String itemRT = dsCfg.get("itemResourceType", String.class);

    ExpressionHelper ex = cmp.getExpressionHelper();
    final Integer offset = ex.get(dsCfg.get("offset", String.class), Integer.class);
    final Integer limit = ex.get(dsCfg.get("limit", String.class), Integer.class);

    QueryBuilder builder = sling.getService(QueryBuilder.class);
    PredicateGroup group = PredicateGroup.create(request.getParameterMap());
    group.add(new Predicate("workflowModelPath", "path")
                    .set(PathPredicateEvaluator.PATH, "/etc/acs-commons/lists"));

    if (request.getParameter("type") == null) {
        group.add(new Predicate("pageType", "type").set("type", "cq:Page"));
    }

    // for now we're going to sort by last modified newest first
    group.add(new Predicate("orderByLastModified", "orderby")
                    .set(Predicate.ORDER_BY, "@jcr:content/cq:lastModified")
                    .set(Predicate.PARAM_SORT, Predicate.SORT_DESCENDING));

    Query query = builder.createQuery(group, resourceResolver.adaptTo(Session.class));
    query.setStart(offset);
    query.setHitsPerPage(limit);

    SearchResult result = query.getResult();
    final Iterator<Resource> allResources = result.getResources();

    DataSource ds;
    if (result.getTotalMatches() == 0) {
        ds = EmptyDataSource.instance();
    } else {
        ds = new AbstractDataSource() {
            @Override
            public Iterator<Resource> iterator() {
                return new TransformIterator(allResources, new Transformer() {
                    public Object transform(Object input) {
                        final Resource resource = (Resource)input;
                        ResourceWrapper wrapper = new ResourceWrapper(resource) {
                            @Override
                            public String getResourceType() {
                                return itemRT;
                            }
                        };
                        return wrapper;
                    }
                });
            }
        };
    }

    request.setAttribute(DataSource.class.getName(), ds);
%>