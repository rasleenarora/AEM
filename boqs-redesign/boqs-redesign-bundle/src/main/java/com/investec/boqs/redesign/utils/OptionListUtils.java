package com.investec.boqs.redesign.utils;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.bean.OptionListBean;


public class OptionListUtils {
    public static final Logger LOG = LoggerFactory.getLogger(OptionListUtils.class);
    private static final String SEPARTOR = "#@";
    public static OptionListBean getOptionList(String value) {
    	OptionListBean result = new OptionListBean();

        if (StringUtils.isBlank(value)) {
            return result;
        }

        String[] tab = StringUtils.splitByWholeSeparatorPreserveAllTokens(value, SEPARTOR);
        if (tab == null || tab.length < 2) {
            return result;
        }

        int i = 0;
        if (StringUtils.isNotBlank(tab[i])) {
            result.setItem(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setName(tab[i]);
        }

        return result;
    }
}
