package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.RepositoryException;

import org.apache.sling.api.SlingHttpServletRequest;

import com.investec.boqs.redesign.bean.OptionListBean;
import com.investec.boqs.redesign.bean.PhotoList;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.OptionListUtils;
import com.investec.boqs.redesign.utils.PhotoGalleryUtils;
import com.investec.boqs.redesign.utils.StringUtil;

public class DropdownCompPresenter extends AbstractPresenter{

    @Override
    protected void process() throws RepositoryException {
    	String strRequired = properties.get("isrequire",BOQSConstant.NO_VALUE);
		boolean isRequired = false;
		if (BOQSConstant.YES_VALUE.equals(strRequired)){
			isRequired = true;
		}
		String[] dropdownlist = properties.get("dropdownlist",String[].class);
		List<OptionListBean> itemsList = this.getItemsList(dropdownlist, slingRequest); 
        putModel("dropdownlbl",properties.get("dropdownlbl", ""));
        putModel("dropdownElement",properties.get("dropdownelement", "").toLowerCase());
        putModel("isRequired", isRequired);
        putModel("itemsList", itemsList);
        putModel("requiredmessage", properties.get("requiredmessage", "It is required."));
        
    }
    
    public List<OptionListBean> getItemsList(String[] dropdownListOption,SlingHttpServletRequest slingRequest){
        List<OptionListBean> optionList = new ArrayList<OptionListBean>();
        try{
            if(dropdownListOption != null){
                for (int i = 0; i < dropdownListOption.length; i++) {
                    if (!StringUtil.isEmpty(dropdownListOption[i])) {
                    	OptionListBean optionItem = OptionListUtils.getOptionList(dropdownListOption[i]);
                    	optionList.add(optionItem);
                    }
                }
            }
        }catch(Exception e){
            LOG.error("Error getItemsList(String[], slingRequest):" + e.toString());
        }
        return optionList;
    }
}