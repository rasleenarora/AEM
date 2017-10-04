package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;

import com.google.gson.Gson;
import com.investec.boqs.redesign.bean.PromoCarousel;
import com.investec.boqs.redesign.utils.CommonUtils;

public class PromoBannerCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String mobileRenditionName = properties.get("mobilerenditionname", "");

		final String[] promocarouselsProps = properties.get("promocarousel", String[].class);

		Gson gson = new Gson();
		List<PromoCarousel> promocarousels = new ArrayList<PromoCarousel>();
		if (null != promocarouselsProps) {
			for (String promocarouselProp : promocarouselsProps) {
				PromoCarousel promocarousel = gson.fromJson(promocarouselProp, PromoCarousel.class);
				if (null != promocarousel) {
					promocarousel.setPromoimageMobile(CommonUtils.getImageRenditons(promocarousel.getPromoimage(), mobileRenditionName, slingRequest));
					promocarousel.setTargeturl(CommonUtils.getProperURL(promocarousel.getTargeturl(), slingRequest));
					promocarousel.setTargeturl2(CommonUtils.getProperURL(promocarousel.getTargeturl2(), slingRequest));
					if(StringUtils.isBlank(promocarousel.getCtatextoverride())){
						promocarousel.setCtatextoverride("Learn more");
						
					}
					
					if(StringUtils.isBlank(promocarousel.getCtatextoverride2())){
						promocarousel.setCtatextoverride2("View all");
					}
					promocarousels.add(promocarousel);
				}
			}
		}
		putModel("promocarousels", promocarousels);

	}
}
/*putModel("fileReferenceMobile", CommonUtils.getImageRenditons(properties.get("fileReference", ""), mobileRenditionName, slingRequest));		
putModel("fileReferenceDesktop", properties.get("fileReference", ""));
putModel("alternatetext", properties.get("alternatetext", ""));
putModel("promotext", properties.get("promotext", ""));
putModel("ctatextoverride", properties.get("ctatextoverride", "Learn more"));
putModel("targeturl", CommonUtils.getProperURL(properties.get("targeturl", currentPage.getPath()), slingRequest));
putModel("openinnewtab", properties.get("openinnewtab", "false"));*/