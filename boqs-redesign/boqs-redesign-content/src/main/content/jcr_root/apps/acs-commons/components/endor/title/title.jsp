<%--
  ~ #%L
  ~ ACS AEM Commons
  ~ %%
  ~ Copyright (C) 2015 Adobe
  ~ %%
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~      http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~ #L%
  --%><%@page session="false"
          import="com.adobe.granite.ui.components.AttrBuilder,
                  com.adobe.granite.ui.components.Tag"%><%
%><%@include file="/libs/granite/ui/global.jsp" %><%
    Tag tag = cmp.consumeTag();
    AttrBuilder attrs = tag.getAttrs();
    attrs.add("role", "heading");
    attrs.add("aria-level", 1);

    String title = cmp.getConfig().get("jcr:title", String.class);


%><div <%= attrs.build() %>><%= xssAPI.encodeForHTML(i18n.getVar(title)) %></div>