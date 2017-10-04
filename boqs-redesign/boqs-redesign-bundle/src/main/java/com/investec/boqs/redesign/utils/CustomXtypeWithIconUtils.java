package com.investec.boqs.redesign.utils;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.bean.CustomXtypeWithIcon;


public class CustomXtypeWithIconUtils {
    public static final Logger LOG = LoggerFactory.getLogger(CustomXtypeWithIconUtils.class);
    private static final String SEPARTOR = "#@";
    public static CustomXtypeWithIcon getCustomXtypeWithIcon(String value) {

        CustomXtypeWithIcon result = new CustomXtypeWithIcon();
        if (StringUtils.isBlank(value)) {
            return result;
        }

        String[] tab = StringUtils.splitByWholeSeparatorPreserveAllTokens(value, SEPARTOR);
        if (tab == null || tab.length < 3) {
            return result;
        }

        int i = 0;
        if (StringUtils.isNotBlank(tab[i])) {
            result.setIcon(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setLabel(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setLink(tab[i]);
        }

        return result;
    }
}
