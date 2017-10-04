package com.investec.boqs.redesign.utils;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.bean.CustomXtype;


public class CustomXtypeUtils {
    public static final Logger LOG = LoggerFactory.getLogger(CustomXtypeWithIconUtils.class);
    private static final String SEPARTOR = "#@";
    public static CustomXtype getCustomXtype(String value) {
        CustomXtype result = new CustomXtype();

        if (StringUtils.isBlank(value)) {
            return result;
        }

        String[] tab = StringUtils.splitByWholeSeparatorPreserveAllTokens(value, SEPARTOR);
        if (tab == null || tab.length < 2) {
            return result;
        }

        int i = 0;
        if (StringUtils.isNotBlank(tab[i])) {
            result.setHeading(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setLink(tab[i]);
        }

        return result;
    }
}
