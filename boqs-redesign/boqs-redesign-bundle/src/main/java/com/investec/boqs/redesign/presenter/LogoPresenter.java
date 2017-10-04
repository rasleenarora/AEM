package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;

import com.day.cq.wcm.api.Page;
import com.investec.boqs.redesign.utils.CommonUtils;

public class LogoPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
	    int absParent = currentStyle.get("absParent", 2L).intValue();
	    Page homePage = currentPage.getAbsoluteParent(absParent);
	    if(null != homePage){
	    	putModel("homePage", CommonUtils.getProperURL(homePage.getPath(), slingRequest));
	    }
	    
	   	String imagePath = currentStyle.get("imageReference", "");
	   	putModel("imagePath", imagePath);
	   	
	   	String mobileRenditionName = currentStyle.get("mobilerenditionname", "");
	   	String stickyRenditionName = currentStyle.get("stickyrenditionname", "");
	   	
	   	putModel("imagePathMobile", CommonUtils.getImageRenditons(imagePath, mobileRenditionName, slingRequest));
	   	putModel("imagePathSticky", CommonUtils.getImageRenditons(imagePath, stickyRenditionName, slingRequest));
	   	
	    Resource res = currentStyle.getDefiningResource("imageReference");
	    putModel("hasImage", null != res);
	    
	    String logoAltText = currentStyle.get("logoalttext", "BOQ Specialist");
	   	putModel("logoalttext", logoAltText);
	}

}
