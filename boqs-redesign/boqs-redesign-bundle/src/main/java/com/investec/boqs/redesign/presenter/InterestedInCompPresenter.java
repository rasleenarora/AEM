package com.investec.boqs.redesign.presenter;

import javax.jcr.RepositoryException;

import com.investec.boqs.redesign.utils.BOQSConstant;
import com.investec.boqs.redesign.utils.CommonUtils;

public class InterestedInCompPresenter extends AbstractPresenter {

	@Override
	protected void process() throws RepositoryException {
		String[] defaultWouldlikeList = { "becomespecialist", "learnmore", "askevent", "givecompliment", "makecomplaint", "makeenquiry" };
		String[] defaultIntertestedinList = { "savingsaccount", "homeloans", "creditcards", "carloans", "commercialpropertyloan", "equipmentfinance", "partnerbuy-ins", "other" };
		String[] wouldlikeList = properties.get("wouldlikelist", defaultWouldlikeList);
		String[] intertestedinList = properties.get("interestinlist", defaultIntertestedinList);
		String strRequired = properties.get("isrequire", "yes");
		boolean isRequired = true;
		if ("no".equals(strRequired)) {
			isRequired = false;
		}

		putModel("wouldlikelbl", properties.get("wouldlikelbl", BOQSConstant.WOULD_LIKE_LBL));
		putModel("requiredmessage", properties.get("requiredmessage", "It is required."));
		putModel("interestedlbl", properties.get("interestedlbl", BOQSConstant.INTERESTED_LBL));
		putModel("wouldlikeelement", properties.get("wouldlikeelement", BOQSConstant.WOULD_LIKE_NAME));
		putModel("interestedelement", properties.get("interestedelement", BOQSConstant.INTERESTED_NAME));
		putModel("wouldlikeList", wouldlikeList);
		putModel("intertestedinList", intertestedinList);
		putModel("isRequired", isRequired);
		putModel("selectBoxId", CommonUtils.getRandomId("custom-select-box"));
	}

}