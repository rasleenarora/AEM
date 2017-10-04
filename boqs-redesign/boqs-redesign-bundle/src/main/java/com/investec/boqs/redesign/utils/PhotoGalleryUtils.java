package com.investec.boqs.redesign.utils;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.investec.boqs.redesign.bean.PhotoList;


public class PhotoGalleryUtils {
    public static final Logger LOG = LoggerFactory.getLogger(PhotoGalleryUtils.class);
    private static final String SEPARTOR = "#@";
    public static PhotoList getPhotoGallery(String value) {
        PhotoList result = new PhotoList();

        if (StringUtils.isBlank(value)) {
            return result;
        }

        String[] tab = StringUtils.splitByWholeSeparatorPreserveAllTokens(value, SEPARTOR);
        if (tab == null || tab.length < 2) {
            return result;
        }

        int i = 0;
        if (StringUtils.isNotBlank(tab[i])) {
            result.setSrc(tab[i]);
            result.setThumbSrc(tab[i]+ BOQSConstant.PHOTOGALLERY_THUMB_PATH);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setCaption(tab[i]);
        }
        if (StringUtils.isNotBlank(tab[++i])) {
            result.setAlt(tab[i]);
        }

        return result;
    }
}
