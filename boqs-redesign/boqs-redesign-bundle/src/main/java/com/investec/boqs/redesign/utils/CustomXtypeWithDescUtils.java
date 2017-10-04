package com.investec.boqs.redesign.utils;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.bean.CustomXtypeWithDesc;

public class CustomXtypeWithDescUtils {
    public static final Logger LOG = LoggerFactory.getLogger(CustomXtypeWithDescUtils.class);
    private static final String SEPARTOR = "#@";
    public static CustomXtypeWithDesc getCustomXtypeWithDesc(String value) {
    	CustomXtypeWithDesc result = new CustomXtypeWithDesc();

        if (StringUtils.isBlank(value)) {
            return result;
        }

        String[] tab = StringUtils.splitByWholeSeparatorPreserveAllTokens(value, SEPARTOR);
        if (tab == null || tab.length < 4) {
            return result;
        }

        int i = 0;
        if (StringUtils.isNotBlank(tab[i])) {
            result.setLinklbl(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setDescription(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setUrl(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setIcon(tab[i]);
        }

        return result;
    }
}
