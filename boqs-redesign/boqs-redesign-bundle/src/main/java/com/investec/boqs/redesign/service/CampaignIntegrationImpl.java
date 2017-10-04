package com.investec.boqs.redesign.service;

import com.investec.boqs.redesign.bean.StagingSurveyTableBean;
import com.investec.boqs.redesign.utils.StringUtil;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.sling.settings.SlingSettingsService;

import com.investec.boqs.redesign.webservice.xtk.session.XtkSession;
import com.investec.boqs.redesign.webservice.xtk.session.SessionMethodsSoap;
import com.investec.boqs.redesign.webservice.xtk.session.Element;

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.ws.Holder;

import java.text.SimpleDateFormat;
import java.util.Dictionary;
import java.util.Set;

/**
 * Created by rayadav1 on 29/09/2015.
 */

@Component(immediate = true, metatype = true, label = "Campaign Integration")
@Service(value = CampaignIntegration.class)
public class CampaignIntegrationImpl implements CampaignIntegration {


    @Reference
    private SlingSettingsService slingSettingService;


    // logger
    private final Logger LOG = LoggerFactory.getLogger(CampaignIntegrationImpl.class);


    //declaring variables
    String xtkSessionWSDLName;
    String username;
    String password;
    boolean disableSSLChecking;

    @Activate
    public void activate(ComponentContext componentContext) {
        //calling configure method to set the variables
        configure(componentContext.getProperties());
    }

    private void configure(Dictionary<?, ?> properties) {
        //setting the variables
        this.xtkSessionWSDLName = PropertiesUtil.toString(properties.get("xtkSessionWSDLName"), null);
        this.username = PropertiesUtil.toString(properties.get("username"), null);
        this.password = PropertiesUtil.toString(properties.get("password"), null);
        this.disableSSLChecking = PropertiesUtil.toBoolean(properties.get("disableSSLChecking"), false);
        //disableSSLChecking must be false in production server
        if(slingSettingService != null){
            Set<String> slingModes = slingSettingService.getRunModes();
            for(String runMode : slingModes){
                if(StringUtils.isNotBlank(runMode) && runMode.equals("prod")){
                    //if the server is production server, make disableSSLChecking false
                    this.disableSSLChecking = false;
                }
            }
        }
        
    }

    @Override
    public String getSessionToken() {

        String sessionToken = null;
        //checking for username and password
        if(StringUtils.isNotBlank(username) && StringUtils.isNotBlank(password)
                && StringUtils.isNotBlank(xtkSessionWSDLName)){
            XtkSession xtkSession = new XtkSession(getClass().getClassLoader().getResource(xtkSessionWSDLName), disableSSLChecking);
            if(xtkSession != null){
                SessionMethodsSoap sessionMethodsSoap =  xtkSession.getSessionMethodsSoap();
                if(sessionMethodsSoap != null){
                    //declaring variables
                    Element elemParameters = new Element();
                    Holder<String> sessionTokenHolder = new Holder<String>();
                    Holder<Element> sessionInfoHolder = new Holder<Element>();
                    Holder<String> securityTokenHolder = new Holder<String>();
                    try {
                        //calling the logon method
                        sessionMethodsSoap.logon("", username, password, elemParameters,
                                sessionTokenHolder, sessionInfoHolder, securityTokenHolder);
                        sessionToken = sessionTokenHolder.value;
                    }catch (Exception e){
                        //if there is any exception in the call, it basically means that there is some issue in the call
                        //like username and password is wrong or the Frontal server is not responding
                        LOG.error("Exception in getting the sessionToken : " + e);
                    }

                }
            }

        }
        LOG.info("sessionToken is : " + sessionToken);
        return sessionToken;
    }

    @Override
    public boolean insertIntoSurveyTable(StagingSurveyTableBean stagingSurveyTableBean, String sessionToken) {

        boolean success = false;
        //checking for stagingTableBean and sessionToken and xtkSessionWSDLName
        if(stagingSurveyTableBean != null && StringUtils.isNotBlank(sessionToken) &&
                StringUtils.isNotBlank(xtkSessionWSDLName)){
            try {
                //getting the documentBuilderFactory and then documentBuilder
                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();

                //getting the document
                Document document = db.newDocument();

                //creating the staging survey element for pushing to Adobe Campaign
                org.w3c.dom.Element stagingSurveyElement = getStagingSurveyElement(stagingSurveyTableBean);


                if(stagingSurveyElement != null){
                    Element surveyElement = new Element();
                    surveyElement.setAny(stagingSurveyElement);
                    //getting xtkSession object and then the proxy class object
                    XtkSession xtkSession = new XtkSession(getClass().getClassLoader().getResource(xtkSessionWSDLName), disableSSLChecking);
                    if(xtkSession != null) {
                        SessionMethodsSoap sessionMethodsSoap = xtkSession.getSessionMethodsSoap();
                        if (sessionMethodsSoap != null) {
                            sessionMethodsSoap.write(sessionToken, surveyElement);
                            //setting the success to true
                            success = true;
                        }
                    }
                }

            }catch (ParserConfigurationException parserConfException){
                LOG.error("ParserConfigurationException Exception !!! : "+ parserConfException);
            }catch (Exception e){
                LOG.error("Exception (insertIntoSurveyTable) !!! : "+ e);
            }
        }

        LOG.info("success is : " + success);
        return success;
    }

    @Override
    public StagingSurveyTableBean getStagingSurveyTableBean(SlingHttpServletRequest slingRequest) {

        StagingSurveyTableBean surveyTableBean = null;
        //checking the slingRequest
        if(slingRequest != null){
            surveyTableBean = new StagingSurveyTableBean();

            //setting values into the bean from request
            String email = slingRequest.getParameter("email");
            if(StringUtils.isNotBlank(email)){
                surveyTableBean.setEmail(email);
            }

            String salutation = slingRequest.getParameter("salutation");
            if(StringUtils.isNotBlank(salutation)){
                surveyTableBean.setSalutation(salutation);
            }

            String first_name = slingRequest.getParameter("first_name");
            if(StringUtils.isNotBlank(first_name)){
                surveyTableBean.setFirst_name(first_name);
            }

            String last_name = slingRequest.getParameter("last_name");
            if(StringUtils.isNotBlank(last_name)){
                surveyTableBean.setLast_name(last_name);
            }

            String title = slingRequest.getParameter("title");
            if(StringUtils.isNotBlank(title)){
                surveyTableBean.setTitle(title);
            }

            String phone_home = slingRequest.getParameter("phone_home");
            if(StringUtils.isNotBlank(phone_home)){
                surveyTableBean.setPhone_home(phone_home);
            }

            String phone_mobile = slingRequest.getParameter("phone_mobile");
            if(StringUtils.isNotBlank(phone_mobile)){
                surveyTableBean.setPhone_mobile(phone_mobile);
            }

            String phone_work = slingRequest.getParameter("phone_work");
            if(StringUtils.isNotBlank(phone_work)){
                surveyTableBean.setPhone_work(phone_work);
            }

            String phone_other = slingRequest.getParameter("phone_other");
            if(StringUtils.isNotBlank(phone_other)){
                surveyTableBean.setPhone_other(phone_other);
            }

            String phone_fax = slingRequest.getParameter("phone_fax");
            if(StringUtils.isNotBlank(phone_fax)){
                surveyTableBean.setPhone_fax(phone_fax);
            }

            String lead_source = slingRequest.getParameter("lead_source");
            if(StringUtils.isNotBlank(lead_source)){
                surveyTableBean.setLead_source(lead_source);
            }

            String campaign_code_c = slingRequest.getParameter("campaign_code_c");
            if(StringUtils.isNotBlank(campaign_code_c)){
                surveyTableBean.setCampaign_code_c(campaign_code_c);
            }

            String qualification = slingRequest.getParameter("qualification");
            if(StringUtils.isNotBlank(qualification)){
                surveyTableBean.setQualification(qualification);
            }

            String placement = slingRequest.getParameter("placement");
            if(StringUtils.isNotBlank(placement)){
                surveyTableBean.setPlacement(placement);
            }

            Long home_loan_interest_c = getLongParameterValue(slingRequest, "home_loan_interest_c");
            if(home_loan_interest_c != null){
                surveyTableBean.setHome_loan_interest_c(home_loan_interest_c);
            }

            Long car_finance_interest_c = getLongParameterValue(slingRequest, "car_finance_interest_c");
            if(car_finance_interest_c != null){
                surveyTableBean.setCar_finance_interest_c(car_finance_interest_c);
            }

            Long everyday_banking_interest_c = getLongParameterValue(slingRequest, "everyday_banking_interest_c");
            if(everyday_banking_interest_c != null){
                surveyTableBean.setEveryday_banking_interest_c(everyday_banking_interest_c);
            }

            Long credit_card_interest_c = getLongParameterValue(slingRequest, "credit_card_interest_c");
            if(credit_card_interest_c != null){
                surveyTableBean.setCredit_card_interest_c(credit_card_interest_c);
            }

            Long debit_card_interest_c = getLongParameterValue(slingRequest, "debit_card_interest_c");
            if(debit_card_interest_c != null){
                surveyTableBean.setDebit_card_interest_c(debit_card_interest_c);
            }

            Long savings_deposit_interest_c = getLongParameterValue(slingRequest, "savings_deposit_interest_c");
            if(savings_deposit_interest_c != null){
                surveyTableBean.setSavings_deposit_interest_c(savings_deposit_interest_c);
            }

            Long equipment_finance_interest_c = getLongParameterValue(slingRequest, "equipment_finance_interest_c");
            if(equipment_finance_interest_c != null){
                surveyTableBean.setEquipment_finance_interest_c(equipment_finance_interest_c);
            }

            Long commercial_property_interest_c = getLongParameterValue(slingRequest, "commercial_property_interest_c");
            if(commercial_property_interest_c != null){
                surveyTableBean.setCommercial_property_interest_c(commercial_property_interest_c);
            }

            Long smsf_deposits_c = getLongParameterValue(slingRequest, "smsf_deposits_c");
            if(smsf_deposits_c != null){
                surveyTableBean.setSmsf_deposits_c(smsf_deposits_c);
            }

            Long smsf_lending_c = getLongParameterValue(slingRequest, "smsf_lending_c");
            if(smsf_lending_c != null){
                surveyTableBean.setSmsf_lending_c(smsf_lending_c);
            }

            Long goodwill_lending_c = getLongParameterValue(slingRequest, "goodwill_lending_c");
            if(goodwill_lending_c != null){
                surveyTableBean.setGoodwill_lending_c(goodwill_lending_c);
            }

            Long foreign_exchange_c = getLongParameterValue(slingRequest, "foreign_exchange_c");
            if(foreign_exchange_c != null){
                surveyTableBean.setForeign_exchange_c(foreign_exchange_c);
            }

            Long life_insurance_c = getLongParameterValue(slingRequest, "life_insurance_c");
            if(life_insurance_c != null){
                surveyTableBean.setLife_insurance_c(life_insurance_c);
            }

            Long income_protection_c = getLongParameterValue(slingRequest, "income_protection_c");
            if(income_protection_c != null){
                surveyTableBean.setIncome_protection_c(income_protection_c);
            }

            Long medical_indemnity_c = getLongParameterValue(slingRequest, "medical_indemnity_c");
            if(medical_indemnity_c != null){
                surveyTableBean.setMedical_indemnity_c(medical_indemnity_c);
            }

            String occupation_c = slingRequest.getParameter("occupation_c");
            if(StringUtils.isNotBlank(occupation_c)){
                surveyTableBean.setOccupation_c(occupation_c);
            }

            String preferred_contact_time_c = slingRequest.getParameter("preferred_contact_time_c");
            if(StringUtils.isNotBlank(preferred_contact_time_c)){
                surveyTableBean.setPreferred_contact_time_c(preferred_contact_time_c);
            }

            Long overdraft_c = getLongParameterValue(slingRequest, "overdraft_c");
            if(overdraft_c != null){
                surveyTableBean.setOverdraft_c(overdraft_c);
            }

            String lead_type_c = slingRequest.getParameter("lead_type_c");
            if(StringUtils.isNotBlank(lead_type_c)){
                surveyTableBean.setLead_type_c(lead_type_c);
            }

            String record_status_c = slingRequest.getParameter("record_status_c");
            if(StringUtils.isNotBlank(record_status_c)){
                surveyTableBean.setRecord_status_c(record_status_c);
            }

            String degree_c = slingRequest.getParameter("degree_c");
            if(StringUtils.isNotBlank(degree_c)){
                surveyTableBean.setDegree_c(degree_c);
            }

            String referred_by_c = slingRequest.getParameter("referred_by_c");
            if(StringUtils.isNotBlank(referred_by_c)){
                surveyTableBean.setReferred_by_c(referred_by_c);
            }

            String referred_by_others_c = slingRequest.getParameter("referred_by_others_c");
            if(StringUtils.isNotBlank(referred_by_others_c)){
                surveyTableBean.setReferred_by_others_c(referred_by_others_c);
            }

            Long email_unsubscribe_c = getLongParameterValue(slingRequest, "email_unsubscribe_c");
            if(email_unsubscribe_c != null){
                surveyTableBean.setEmail_unsubscribe_c(email_unsubscribe_c);
            }

            // ISMUAT-315
            // 13-Jan-2016
            Long banking_package_interest_c = getLongParameterValue(slingRequest, "banking_package_interest_c");
            if(banking_package_interest_c != null){
                surveyTableBean.setBanking_package_interest_c(banking_package_interest_c);
            }

            Long graduate_package_interest_c = getLongParameterValue(slingRequest, "graduate_package_interest_c");
            if(graduate_package_interest_c != null){
                surveyTableBean.setGraduate_package_interest_c(graduate_package_interest_c);
            }
            
            Long fellowship_package_c = getLongParameterValue(slingRequest, "fellowship_package_c");
            if(fellowship_package_c != null){
                surveyTableBean.setFellowship_package_c(fellowship_package_c);
            }
            
            Long student_package_interest_c = getLongParameterValue(slingRequest, "student_package_interest_c");
            if(student_package_interest_c != null){
                surveyTableBean.setStudent_package_interest_c(student_package_interest_c);
            }
            
            Long privacy_consent_c = getLongParameterValue(slingRequest, "privacy_consent_c");
            if(privacy_consent_c != null){
                surveyTableBean.setPrivacy_consent_c(privacy_consent_c);
            }
            
            String primary_address_state = slingRequest.getParameter("primary_address_state");
            if(StringUtils.isNotBlank(primary_address_state)){
                surveyTableBean.setPrimary_address_state(primary_address_state);
            }

            String notes = slingRequest.getParameter("notes");
            if(StringUtils.isNotBlank(notes)){
                surveyTableBean.setNotes(notes);
            }

            //ISMUAT-340
            //29-May-2016
            String assigned_user_id = slingRequest.getParameter("assigned_user_id");
            if(StringUtils.isNotBlank(assigned_user_id)){
                surveyTableBean.setAssigned_user_id(assigned_user_id);
            }

            //ISMUAT-356
            //9-Aug-2016
            String expected_graduation_date = slingRequest.getParameter("expected_graduation_date");
            if(StringUtils.isNotBlank(expected_graduation_date)){
                surveyTableBean.setExpected_graduation_date(expected_graduation_date);
            }

            
            //ISMUAT-382
            //18-Nov-2016
            String primary_address_street= slingRequest.getParameter("primary_address_street");
            if(StringUtils.isNotBlank(primary_address_street)){
                surveyTableBean.setPrimary_address_street(primary_address_street);
            }
            
            String primary_address_city= slingRequest.getParameter("primary_address_city");
            if(StringUtils.isNotBlank(primary_address_city)){
                surveyTableBean.setPrimary_address_city(primary_address_city);
            }
            
            String primary_address_postalcode= slingRequest.getParameter("primary_address_postalcode");
            if(StringUtils.isNotBlank(primary_address_postalcode)){
                surveyTableBean.setPrimary_address_postalcode(primary_address_postalcode);
            }
            
            Long personal_loan_interest_c= getLongParameterValue(slingRequest,"personal_loan_interest_c");
            if(personal_loan_interest_c !=null){
                surveyTableBean.setPersonal_loan_interest_c(personal_loan_interest_c);
            }
            
            Long fit_out_interest_c= getLongParameterValue(slingRequest,"fit_out_interest_c");
            if(fit_out_interest_c !=null){
                surveyTableBean.setFit_out_interest_c(fit_out_interest_c);
            }
            
            LOG.info("surveyTableBean is : " + surveyTableBean.toString());
        }

        return surveyTableBean;
    }


    /**
     * This method provides the Element needed to send to Adobe Campaign
     * @param stagingTableBean
     * stagingTableBean
     * @return
     * org.w3c.dom.Element
     *
     */
    private org.w3c.dom.Element getStagingSurveyElement(StagingSurveyTableBean stagingTableBean){

        org.w3c.dom.Element stagingSurveyElement = null;
        //checking the stagingTableBean
        if(stagingTableBean != null){
            try {
                //getting the documentBuilderFactory and then documentBuilder
                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();

                //getting the document and then creating the element
                Document document = db.newDocument();
                stagingSurveyElement = document.createElement("extStagingSurvey");

                //setting the main attributes to the element
                stagingSurveyElement.setAttribute("xtkschema", "boqs:extStagingSurvey");
                stagingSurveyElement.setAttribute("aemclientid", String.valueOf(stagingTableBean.getAemclientid()));
                //formatting the date before pushing it
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSZ");
                stagingSurveyElement.setAttribute("record_date_time", simpleDateFormat.format(stagingTableBean.getRecord_date_time()));

                //setting rest of the attributes
                String email = stagingTableBean.getEmail();
                if(StringUtils.isNotBlank(email)){
                    stagingSurveyElement.setAttribute("email", email);
                }

                String salutation = stagingTableBean.getSalutation();
                if(StringUtils.isNotBlank(salutation)){
                    stagingSurveyElement.setAttribute("salutation", salutation);
                }

                String first_name = stagingTableBean.getFirst_name();
                if(StringUtils.isNotBlank(first_name)){
                    stagingSurveyElement.setAttribute("first_name", first_name);
                }

                String last_name = stagingTableBean.getLast_name();
                if(StringUtils.isNotBlank(last_name)){
                    stagingSurveyElement.setAttribute("last_name", last_name);
                }

                String title = stagingTableBean.getTitle();
                if(StringUtils.isNotBlank(title)){
                    stagingSurveyElement.setAttribute("title", title);
                }

                String phone_home = stagingTableBean.getPhone_home();
                if(StringUtils.isNotBlank(phone_home)){
                    stagingSurveyElement.setAttribute("phone_home", phone_home);
                }

                String phone_mobile = stagingTableBean.getPhone_mobile();
                if(StringUtils.isNotBlank(phone_mobile)){
                    stagingSurveyElement.setAttribute("phone_mobile", phone_mobile);
                }

                String phone_work = stagingTableBean.getPhone_work();
                if(StringUtils.isNotBlank(phone_work)){
                    stagingSurveyElement.setAttribute("phone_work", phone_work);
                }

                String phone_other = stagingTableBean.getPhone_other();
                if(StringUtils.isNotBlank(phone_other)){
                    stagingSurveyElement.setAttribute("phone_other", phone_other);
                }

                String phone_fax = stagingTableBean.getPhone_fax();
                if(StringUtils.isNotBlank(phone_fax)){
                    stagingSurveyElement.setAttribute("phone_fax", phone_fax);
                }

                String lead_source = stagingTableBean.getLead_source();
                if(StringUtils.isNotBlank(lead_source)){
                    stagingSurveyElement.setAttribute("lead_source", lead_source);
                }

                String campaign_code_c = stagingTableBean.getCampaign_code_c();
                if(StringUtils.isNotBlank(campaign_code_c)){
                    stagingSurveyElement.setAttribute("campaign_code_c", campaign_code_c);
                }

                String qualification = stagingTableBean.getQualification();
                if(StringUtils.isNotBlank(qualification)){
                    stagingSurveyElement.setAttribute("qualification", qualification);
                }

                String placement = stagingTableBean.getPlacement();
                if(StringUtils.isNotBlank(placement)){
                    stagingSurveyElement.setAttribute("placement", placement);
                }

                Long home_loan_interest_c = stagingTableBean.getHome_loan_interest_c();
                if(home_loan_interest_c != null){
                    stagingSurveyElement.setAttribute("home_loan_interest_c", String.valueOf(home_loan_interest_c));
                }

                Long car_finance_interest_c = stagingTableBean.getCar_finance_interest_c();
                if(car_finance_interest_c != null){
                    stagingSurveyElement.setAttribute("car_finance_interest_c", String.valueOf(car_finance_interest_c));
                }

                Long everyday_banking_interest_c = stagingTableBean.getEveryday_banking_interest_c();
                if(everyday_banking_interest_c != null){
                    stagingSurveyElement.setAttribute("everyday_banking_interest_c", String.valueOf(everyday_banking_interest_c));
                }

                Long credit_card_interest_c = stagingTableBean.getCredit_card_interest_c();
                if(credit_card_interest_c != null){
                    stagingSurveyElement.setAttribute("credit_card_interest_c", String.valueOf(credit_card_interest_c));
                }

                Long debit_card_interest_c = stagingTableBean.getDebit_card_interest_c();
                if(debit_card_interest_c != null){
                    stagingSurveyElement.setAttribute("debit_card_interest_c", String.valueOf(debit_card_interest_c));
                }

                Long savings_deposit_interest_c = stagingTableBean.getSavings_deposit_interest_c();
                if(savings_deposit_interest_c != null){
                    stagingSurveyElement.setAttribute("savings_deposit_interest_c", String.valueOf(savings_deposit_interest_c));
                }

                Long equipment_finance_interest_c = stagingTableBean.getEquipment_finance_interest_c();
                if(equipment_finance_interest_c != null){
                    stagingSurveyElement.setAttribute("equipment_finance_interest_c", String.valueOf(equipment_finance_interest_c));
                }

                Long commercial_property_interest_c = stagingTableBean.getCommercial_property_interest_c();
                if(commercial_property_interest_c != null){
                    stagingSurveyElement.setAttribute("commercial_property_interest_c", String.valueOf(commercial_property_interest_c));
                }

                Long smsf_deposits_c = stagingTableBean.getSmsf_deposits_c();
                if(smsf_deposits_c != null){
                    stagingSurveyElement.setAttribute("smsf_deposits_c", String.valueOf(smsf_deposits_c));
                }

                Long smsf_lending_c = stagingTableBean.getSmsf_lending_c();
                if(smsf_lending_c != null){
                    stagingSurveyElement.setAttribute("smsf_lending_c", String.valueOf(smsf_lending_c));
                }

                Long goodwill_lending_c = stagingTableBean.getGoodwill_lending_c();
                if(goodwill_lending_c != null){
                    stagingSurveyElement.setAttribute("goodwill_lending_c", String.valueOf(goodwill_lending_c));
                }

                Long foreign_exchange_c = stagingTableBean.getForeign_exchange_c();
                if(foreign_exchange_c != null){
                    stagingSurveyElement.setAttribute("foreign_exchange_c", String.valueOf(foreign_exchange_c));
                }

                Long life_insurance_c = stagingTableBean.getLife_insurance_c();
                if(life_insurance_c != null){
                    stagingSurveyElement.setAttribute("life_insurance_c", String.valueOf(life_insurance_c));
                }

                Long income_protection_c = stagingTableBean.getIncome_protection_c();
                if(income_protection_c != null){
                    stagingSurveyElement.setAttribute("income_protection_c", String.valueOf(income_protection_c));
                }

                Long medical_indemnity_c = stagingTableBean.getMedical_indemnity_c();
                if(medical_indemnity_c != null){
                    stagingSurveyElement.setAttribute("medical_indemnity_c", String.valueOf(medical_indemnity_c));
                }

                String occupation_c = stagingTableBean.getOccupation_c();
                if(StringUtils.isNotBlank(occupation_c)){
                    stagingSurveyElement.setAttribute("occupation_c", occupation_c);
                }

                String preferred_contact_time_c = stagingTableBean.getPreferred_contact_time_c();
                if(StringUtils.isNotBlank(preferred_contact_time_c)){
                    stagingSurveyElement.setAttribute("preferred_contact_time_c", preferred_contact_time_c);
                }

                Long overdraft_c = stagingTableBean.getOverdraft_c();
                if(overdraft_c != null){
                    stagingSurveyElement.setAttribute("overdraft_c", String.valueOf(overdraft_c));
                }

                String lead_type_c = stagingTableBean.getLead_type_c();
                if(StringUtils.isNotBlank(lead_type_c)){
                    stagingSurveyElement.setAttribute("lead_type_c", lead_type_c);
                }

                String record_status_c = stagingTableBean.getRecord_status_c();
                if(StringUtils.isNotBlank(record_status_c)){
                    stagingSurveyElement.setAttribute("record_status_c", record_status_c);
                }

                String degree_c = stagingTableBean.getDegree_c();
                if(StringUtils.isNotBlank(degree_c)){
                    stagingSurveyElement.setAttribute("degree_c", degree_c);
                }

                String referred_by_c = stagingTableBean.getReferred_by_c();
                if(StringUtils.isNotBlank(referred_by_c)){
                    stagingSurveyElement.setAttribute("referred_by_c", referred_by_c);
                }

                String referred_by_others_c = stagingTableBean.getReferred_by_others_c();
                if(StringUtils.isNotBlank(referred_by_others_c)){
                    stagingSurveyElement.setAttribute("referred_by_others_c", referred_by_others_c);
                }

                Long email_unsubscribe_c = stagingTableBean.getEmail_unsubscribe_c();
                if(email_unsubscribe_c != null){
                    stagingSurveyElement.setAttribute("email_unsubscribe_c", String.valueOf(email_unsubscribe_c));
                }
                
                // ISMUAT-315
                // 13-Jan-2016
                Long banking_package_interest_c = stagingTableBean.getBanking_package_interest_c();
                if(banking_package_interest_c != null){
                	stagingSurveyElement.setAttribute("banking_package_interest_c", String.valueOf(banking_package_interest_c));
                }

                Long graduate_package_interest_c = stagingTableBean.getGraduate_package_interest_c();
                if(graduate_package_interest_c != null){
                	stagingSurveyElement.setAttribute("graduate_package_interest_c", String.valueOf(graduate_package_interest_c));
                }
                
                Long fellowship_package_c = stagingTableBean.getFellowship_package_c();
                if(fellowship_package_c != null){
                	stagingSurveyElement.setAttribute("fellowship_package_c", String.valueOf(fellowship_package_c));
                }
                
                Long student_package_interest_c = stagingTableBean.getStudent_package_interest_c();
                if(student_package_interest_c != null){
                	stagingSurveyElement.setAttribute("student_package_interest_c", String.valueOf(student_package_interest_c));
                }
                
                Long privacy_consent_c = stagingTableBean.getPrivacy_consent_c();
                if(privacy_consent_c != null){
                	stagingSurveyElement.setAttribute("privacy_consent_c", String.valueOf(privacy_consent_c));
                }
                
                String primary_address_state = stagingTableBean.getPrimary_address_state();
                if(StringUtils.isNotBlank(primary_address_state)){
                    stagingSurveyElement.setAttribute("primary_address_state", primary_address_state);
                }

                String notes = stagingTableBean.getNotes();
                if(StringUtils.isNotBlank(notes)){
                    stagingSurveyElement.setAttribute("notes", notes);
                }

                //ISMUAT-340
                //29-May-2016
                String assigned_user_id = stagingTableBean.getAssigned_user_id();
                if(StringUtils.isNotBlank(assigned_user_id)){
                    stagingSurveyElement.setAttribute("assigned_user_id", assigned_user_id);
                }

                //ISMUAT-356
                //9-Aug-2016
                String expected_graduation_date = stagingTableBean.getExpected_graduation_date();
                if(StringUtils.isNotBlank(expected_graduation_date)){
                    stagingSurveyElement.setAttribute("expected_graduation_date", expected_graduation_date);
                }
                
                //ISMUAT-382
                //18-Nov-2016
                String primary_address_street = stagingTableBean.getPrimary_address_street();
                if(StringUtils.isNotBlank(primary_address_street)){
                    stagingSurveyElement.setAttribute("primary_address_street", primary_address_street);
                }
                
               
                String primary_address_city = stagingTableBean.getPrimary_address_city();
                if(StringUtils.isNotBlank(primary_address_city)){
                    stagingSurveyElement.setAttribute("primary_address_city", primary_address_city);
                }
               
                String primary_address_postalcode = stagingTableBean.getPrimary_address_postalcode();
                if(StringUtils.isNotBlank(primary_address_postalcode)){
                    stagingSurveyElement.setAttribute("primary_address_postalcode", primary_address_postalcode);
                }
                
                Long personal_loan_interest_c = stagingTableBean.getPersonal_loan_interest_c();
                if(personal_loan_interest_c !=null){
                    stagingSurveyElement.setAttribute("personal_loan_interest_c", String.valueOf(personal_loan_interest_c));
                } 
                
                Long fit_out_interest_c = stagingTableBean.getFit_out_interest_c();
                if(fit_out_interest_c!=null){
                    stagingSurveyElement.setAttribute("fit_out_interest_c", String.valueOf(fit_out_interest_c));
                }
                
                
               
            }catch (ParserConfigurationException parserConfException){
                LOG.error("ParserConfigurationException Exception !!! : "+ parserConfException);
            }catch (Exception e){
                LOG.error("Exception !!! : "+ e);
            }

        }

        LOG.info("stagingSurveyElement is : " + stagingSurveyElement);
        return stagingSurveyElement;
    }


    /**
     * This method gives the proper long value of the provided parameter name
     * @param slingRequest
     * slingRequest
     * @param parameterName
     * parameterName
     * @return
     * longParameterValue
     */
    private Long getLongParameterValue(SlingHttpServletRequest slingRequest, String parameterName) {

        Long longParameterValue = null;
        if (slingRequest != null && StringUtils.isNotBlank(parameterName)) {
            String parameterValue = slingRequest.getParameter(parameterName);
            //comparing the value with null as if the parameter doesn't exists, it will be null
            if (parameterValue != null) {
                //checking the value for empty string or white spaces
                if (StringUtils.isNotBlank(parameterValue)) {
                    try {
                        long longValue = Long.parseLong(parameterValue);
                        longParameterValue = longValue;
                    } catch (NumberFormatException numberFormatException) {
                        //not logging the error
                        //setting the value of longParameterValue to 1L as in the case of checkbox, it stores the name of the field
                        //as the value of it when the user checks it, so we will get the exception
                        longParameterValue = 1L;
                    }
                } else {
                    //this scenario comes the user does not clicks on the checkbox, setting the value to 0L
                    longParameterValue = 0L;
                }
            }
        }
        return longParameterValue;
    }






}
