package com.investec.boqs.redesign.presenter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.jcr.RepositoryException;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

public class MegaNavigationPresenter extends AbstractPresenter {

	private static final String SPECIALTIES = "Specialties";
	private static final String PERSONAL_BANKING = "Personal Banking";
	private static final String PRACTICE_FINANCE = "Practice Finance";
	private static final String EXPERTISE = "Expertise";
	@Override
	protected void process() throws RepositoryException {
		
		if (null == currentNode) {
			return;
		}

		InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resourceResolver.getResource(currentNode.getPath()));


		final String logoImage = iProperties.getInherited("logoImage", String.class);
		final String[] specialtiesProps = iProperties.getInherited("specialitiesitems", String[].class);
		final String[] personalBankingProps = iProperties.getInherited("personalbankingitems", String[].class);
		final String[] practiceFinanceProps = iProperties.getInherited("practicefinanceitems", String[].class);
		final String[] expertiseProps = iProperties.getInherited("expertiseitems", String[].class);
		final String specialtiesTitle = iProperties.getInherited("specialtiestitle", SPECIALTIES);
		final String personalBankingTitle = iProperties.getInherited("personalbankingtitle", PERSONAL_BANKING);
		final String practiceFinanceTitle = iProperties.getInherited("practicefinancetitle", PRACTICE_FINANCE);
		final String expertiseTitle = iProperties.getInherited("expertisetitle", EXPERTISE);
		String expertiseFilterPageUrl = iProperties.getInherited("expertiseTargeturl", BOQSConstant.SHARP);
		expertiseFilterPageUrl = BOQSConstant.SHARP.equals(expertiseFilterPageUrl) ? expertiseFilterPageUrl : CommonUtils.getProperURL(expertiseFilterPageUrl, slingRequest);

		List<HashMap<String, String>> specialtiesList = new ArrayList<HashMap<String, String>>();
		List<HashMap<String, String>> personalBankingList = new ArrayList<HashMap<String, String>>();
		List<HashMap<String, String>> practiceFinanceList = new ArrayList<HashMap<String, String>>();
		List<HashMap<String, String>> expertiseList = new ArrayList<HashMap<String, String>>();

		specialtiesList = CommonUtils.getMapFromJSON(specialtiesProps, slingRequest);
		putModel("specialtiesitems", specialtiesList);
		
		personalBankingList = CommonUtils.getMapFromJSON(personalBankingProps, slingRequest);
		putModel("personalbankingitems", personalBankingList);
		
		practiceFinanceList = CommonUtils.getMapFromJSON(practiceFinanceProps, slingRequest);
		putModel("practicefinanceitems", practiceFinanceList);
		
		expertiseList = CommonUtils.getMapFromJSON(expertiseProps, slingRequest);
		putModel("expertiseitems", expertiseList);
		
		putModel("specialtiestitle", specialtiesTitle);
		putModel("personalbankingtitle", personalBankingTitle);
		putModel("practicefinancetitle", practiceFinanceTitle);
		putModel("expertisetitle", expertiseTitle);
		putModel("expertiseTargeturl", expertiseFilterPageUrl);
		putModel("logoImage", logoImage);

		
		

	}
}