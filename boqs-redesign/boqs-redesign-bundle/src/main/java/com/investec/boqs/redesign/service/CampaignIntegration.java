package com.investec.boqs.redesign.service;

import com.investec.boqs.redesign.bean.StagingSurveyTableBean;
import org.apache.sling.api.SlingHttpServletRequest;


/**
 * This interface has function to insert data into Adobe Campaign
 * Created by rayadav1 on 29/09/2015.
 */
public interface CampaignIntegration {

    /**
     * This method provides the session token from Adobe Campaign
     * @return
     */
    public String getSessionToken();

    /**
     * This method inserts the data into the survey table of staging database
     * @param stagingSurveyTableBean
     * stagingSurveyTableBean.
     * @param sessionToken
     * sessionToken.
     * @return
     * Whether the insertion was successful or not.
     */
    public boolean insertIntoSurveyTable(StagingSurveyTableBean stagingSurveyTableBean, String sessionToken);


    /**
     * This method gives the stagingSurveyTableBean
     * @param slingRequest
     * slingRequest
     * @return
     * StagingSurveyTableBean
     */
    public StagingSurveyTableBean getStagingSurveyTableBean(SlingHttpServletRequest slingRequest);
}
