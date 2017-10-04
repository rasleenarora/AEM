package com.investec.boqs.redesign.bean;

import java.util.Date;

/**
 * Created by rayadav1 on 29/09/2015.
 */
public class StagingSurveyTableBean {

	private long aemclientid;
	private String email;
	private String salutation;
	private String first_name;
	private String last_name;
	private String title;
	private String phone_home;
	private String phone_mobile;
	private String phone_work;
	private String phone_other;
	private String phone_fax;
	private String lead_source;
	private String campaign_code_c;
	private String qualification;
	private String placement;
	private Long home_loan_interest_c;
	private Long car_finance_interest_c;
	private Long everyday_banking_interest_c;
	private Long credit_card_interest_c;
	private Long debit_card_interest_c;
	private Long savings_deposit_interest_c;
	private Long equipment_finance_interest_c;
	private Long commercial_property_interest_c;
	private Long smsf_deposits_c;
	private Long smsf_lending_c;
	private Long goodwill_lending_c;
	private Long foreign_exchange_c;
	private Long life_insurance_c;
	private Long income_protection_c;
	private Long medical_indemnity_c;
	private String occupation_c;
	private String preferred_contact_time_c;
	private Long overdraft_c;
	private String lead_type_c;
	private String record_status_c;
	private String degree_c;
	private String referred_by_c;
	private String referred_by_others_c;
	private Long email_unsubscribe_c;
	private Date record_date_time;

	// ISMUAT-315
	// 13-Jan-2016
	private Long banking_package_interest_c;
	private Long graduate_package_interest_c;
	private Long fellowship_package_c;
	private Long student_package_interest_c;
	private Long privacy_consent_c;
	private String primary_address_state;
	private String notes;

	// ISMUAT-340
	// 29-May-2016
	private String assigned_user_id;

	// ISMUAT-356
	// 9-Aug-2016
	private String expected_graduation_date;

	// ISMUAT-382
	// 18-Nov-2016
	private String primary_address_street;
	private String primary_address_city;
	private String primary_address_postalcode;
	private Long personal_loan_interest_c;
	private Long fit_out_interest_c;

	


	public StagingSurveyTableBean() {

		// setting some default values
		// aemclientid and record_date_time makes the primary key of the staging
		// table
		this.aemclientid = new Date().getTime();
		String longAsString = String.valueOf(this.aemclientid);
		String requiredString = longAsString;
		int len = longAsString.length();
		// when the length is 10, only truncate 1 the value from the end
		if (len == 10) {
			int endIndex = len - 1;
			requiredString = longAsString.substring(0, endIndex);
		} else if (len >= 11) { // when the length is 11 or more, truncate 2
								// from the end and required from the start to
								// get 9 digit number
			int endIndex = len - 2;
			int beginIndex = endIndex - 9;
			requiredString = longAsString.substring(beginIndex, endIndex);
		}

		// setting the 9 digit value to the aemClientId as the database can only
		// have maximum of 10 digits
		this.aemclientid = Long.parseLong(requiredString);

		record_date_time = new Date();
	}

	public long getAemclientid() {
		return aemclientid;
	}

	public void setAemclientid(long aemclientid) {
		this.aemclientid = aemclientid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSalutation() {
		return salutation;
	}

	public void setSalutation(String salutation) {
		this.salutation = salutation;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPhone_home() {
		return phone_home;
	}

	public void setPhone_home(String phone_home) {
		this.phone_home = phone_home;
	}

	public String getPhone_mobile() {
		return phone_mobile;
	}

	public void setPhone_mobile(String phone_mobile) {
		this.phone_mobile = phone_mobile;
	}

	public String getPhone_work() {
		return phone_work;
	}

	public void setPhone_work(String phone_work) {
		this.phone_work = phone_work;
	}

	public String getPhone_other() {
		return phone_other;
	}

	public void setPhone_other(String phone_other) {
		this.phone_other = phone_other;
	}

	public String getPhone_fax() {
		return phone_fax;
	}

	public void setPhone_fax(String phone_fax) {
		this.phone_fax = phone_fax;
	}

	public String getLead_source() {
		return lead_source;
	}

	public void setLead_source(String lead_source) {
		this.lead_source = lead_source;
	}

	public String getCampaign_code_c() {
		return campaign_code_c;
	}

	public void setCampaign_code_c(String campaign_code_c) {
		this.campaign_code_c = campaign_code_c;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getPlacement() {
		return placement;
	}

	public void setPlacement(String placement) {
		this.placement = placement;
	}

	public Long getHome_loan_interest_c() {
		return home_loan_interest_c;
	}

	public void setHome_loan_interest_c(Long home_loan_interest_c) {
		this.home_loan_interest_c = home_loan_interest_c;
	}

	public Long getCar_finance_interest_c() {
		return car_finance_interest_c;
	}

	public void setCar_finance_interest_c(Long car_finance_interest_c) {
		this.car_finance_interest_c = car_finance_interest_c;
	}

	public Long getEveryday_banking_interest_c() {
		return everyday_banking_interest_c;
	}

	public void setEveryday_banking_interest_c(Long everyday_banking_interest_c) {
		this.everyday_banking_interest_c = everyday_banking_interest_c;
	}

	public Long getCredit_card_interest_c() {
		return credit_card_interest_c;
	}

	public void setCredit_card_interest_c(Long credit_card_interest_c) {
		this.credit_card_interest_c = credit_card_interest_c;
	}

	public Long getDebit_card_interest_c() {
		return debit_card_interest_c;
	}

	public void setDebit_card_interest_c(Long debit_card_interest_c) {
		this.debit_card_interest_c = debit_card_interest_c;
	}

	public Long getSavings_deposit_interest_c() {
		return savings_deposit_interest_c;
	}

	public void setSavings_deposit_interest_c(Long savings_deposit_interest_c) {
		this.savings_deposit_interest_c = savings_deposit_interest_c;
	}

	public Long getEquipment_finance_interest_c() {
		return equipment_finance_interest_c;
	}

	public void setEquipment_finance_interest_c(
			Long equipment_finance_interest_c) {
		this.equipment_finance_interest_c = equipment_finance_interest_c;
	}

	public Long getCommercial_property_interest_c() {
		return commercial_property_interest_c;
	}

	public void setCommercial_property_interest_c(
			Long commercial_property_interest_c) {
		this.commercial_property_interest_c = commercial_property_interest_c;
	}

	public Long getSmsf_deposits_c() {
		return smsf_deposits_c;
	}

	public void setSmsf_deposits_c(Long smsf_deposits_c) {
		this.smsf_deposits_c = smsf_deposits_c;
	}

	public Long getSmsf_lending_c() {
		return smsf_lending_c;
	}

	public void setSmsf_lending_c(Long smsf_lending_c) {
		this.smsf_lending_c = smsf_lending_c;
	}

	public Long getGoodwill_lending_c() {
		return goodwill_lending_c;
	}

	public void setGoodwill_lending_c(Long goodwill_lending_c) {
		this.goodwill_lending_c = goodwill_lending_c;
	}

	public Long getForeign_exchange_c() {
		return foreign_exchange_c;
	}

	public void setForeign_exchange_c(Long foreign_exchange_c) {
		this.foreign_exchange_c = foreign_exchange_c;
	}

	public Long getLife_insurance_c() {
		return life_insurance_c;
	}

	public void setLife_insurance_c(Long life_insurance_c) {
		this.life_insurance_c = life_insurance_c;
	}

	public Long getIncome_protection_c() {
		return income_protection_c;
	}

	public void setIncome_protection_c(Long income_protection_c) {
		this.income_protection_c = income_protection_c;
	}

	public Long getMedical_indemnity_c() {
		return medical_indemnity_c;
	}

	public void setMedical_indemnity_c(Long medical_indemnity_c) {
		this.medical_indemnity_c = medical_indemnity_c;
	}

	public String getOccupation_c() {
		return occupation_c;
	}

	public void setOccupation_c(String occupation_c) {
		this.occupation_c = occupation_c;
	}

	public String getPreferred_contact_time_c() {
		return preferred_contact_time_c;
	}

	public void setPreferred_contact_time_c(String preferred_contact_time_c) {
		this.preferred_contact_time_c = preferred_contact_time_c;
	}

	public Long getOverdraft_c() {
		return overdraft_c;
	}

	public void setOverdraft_c(Long overdraft_c) {
		this.overdraft_c = overdraft_c;
	}

	public String getLead_type_c() {
		return lead_type_c;
	}

	public void setLead_type_c(String lead_type_c) {
		this.lead_type_c = lead_type_c;
	}

	public String getRecord_status_c() {
		return record_status_c;
	}

	public void setRecord_status_c(String record_status_c) {
		this.record_status_c = record_status_c;
	}

	public String getDegree_c() {
		return degree_c;
	}

	public void setDegree_c(String degree_c) {
		this.degree_c = degree_c;
	}

	public String getReferred_by_c() {
		return referred_by_c;
	}

	public void setReferred_by_c(String referred_by_c) {
		this.referred_by_c = referred_by_c;
	}

	public String getReferred_by_others_c() {
		return referred_by_others_c;
	}

	public void setReferred_by_others_c(String referred_by_others_c) {
		this.referred_by_others_c = referred_by_others_c;
	}

	public Long getEmail_unsubscribe_c() {
		return email_unsubscribe_c;
	}

	public void setEmail_unsubscribe_c(Long email_unsubscribe_c) {
		this.email_unsubscribe_c = email_unsubscribe_c;
	}

	public Date getRecord_date_time() {
		return record_date_time;
	}

	public void setRecord_date_time(Date record_date_time) {
		this.record_date_time = record_date_time;
	}

	public Long getBanking_package_interest_c() {
		return banking_package_interest_c;
	}

	public void setBanking_package_interest_c(Long banking_package_interest_c) {
		this.banking_package_interest_c = banking_package_interest_c;
	}

	public Long getGraduate_package_interest_c() {
		return graduate_package_interest_c;
	}

	public void setGraduate_package_interest_c(Long graduate_package_interest_c) {
		this.graduate_package_interest_c = graduate_package_interest_c;
	}

	public Long getFellowship_package_c() {
		return fellowship_package_c;
	}

	public void setFellowship_package_c(Long fellowship_package_c) {
		this.fellowship_package_c = fellowship_package_c;
	}

	public Long getStudent_package_interest_c() {
		return student_package_interest_c;
	}

	public void setStudent_package_interest_c(Long student_package_interest_c) {
		this.student_package_interest_c = student_package_interest_c;
	}

	public Long getPrivacy_consent_c() {
		return privacy_consent_c;
	}

	public void setPrivacy_consent_c(Long privacy_consent_c) {
		this.privacy_consent_c = privacy_consent_c;
	}

	public String getPrimary_address_state() {
		return primary_address_state;
	}

	public void setPrimary_address_state(String primary_address_state) {
		this.primary_address_state = primary_address_state;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getAssigned_user_id() {
		return assigned_user_id;
	}

	public void setAssigned_user_id(String assigned_user_id) {
		this.assigned_user_id = assigned_user_id;
	}

	public String getExpected_graduation_date() {
		return expected_graduation_date;
	}

	public void setExpected_graduation_date(String expected_graduation_date) {
		this.expected_graduation_date = expected_graduation_date;
	}

	@Override
	public String toString() {

		String toString = "aemclientid is : " + this.aemclientid
				+ " email is : " + email + " salutation is : " + salutation
				+ " first_Name is : " + first_name + " last_Name is : "
				+ last_name + " credit_card_interest_c is : "
				+ credit_card_interest_c + " primary_address_state is : "
				+ primary_address_state + " notes is : " + notes
				+ "fit_out_interests_c : " + fit_out_interest_c
				+ " record_date_time" + record_date_time.toString();
		return toString;
	}

	public void setPrimary_address_street(String primary_address_street) {

		this.primary_address_street = primary_address_street;

	}

	public String getPrimary_address_street() {
		return primary_address_street;
	}
	public String getPrimary_address_city() {
		return primary_address_city;
	}

	public void setPrimary_address_city(String primary_address_city) {
		this.primary_address_city = primary_address_city;
	}

	public String getPrimary_address_postalcode() {
		return primary_address_postalcode;
	}

	public void setPrimary_address_postalcode(String primary_address_postalcode) {
		this.primary_address_postalcode = primary_address_postalcode;
	}
	public Long getPersonal_loan_interest_c() {
		return personal_loan_interest_c;
	}

	public void setPersonal_loan_interest_c(Long personal_loan_interest_c) {
		this.personal_loan_interest_c = personal_loan_interest_c;
	}

	public Long getFit_out_interest_c() {
		return fit_out_interest_c;
	}

	public void setFit_out_interest_c(Long fit_out_interest_c) {
		this.fit_out_interest_c = fit_out_interest_c;
	}

}
