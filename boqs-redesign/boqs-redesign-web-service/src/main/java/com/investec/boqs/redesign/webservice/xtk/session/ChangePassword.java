
package com.investec.boqs.redesign.webservice.xtk.session;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="sessiontoken" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="strOldPassword" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="strNewPassword" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "sessiontoken",
    "strOldPassword",
    "strNewPassword"
})
@XmlRootElement(name = "ChangePassword")
public class ChangePassword {

    @XmlElement(required = true)
    protected String sessiontoken;
    @XmlElement(required = true)
    protected String strOldPassword;
    @XmlElement(required = true)
    protected String strNewPassword;

    /**
     * Gets the value of the sessiontoken property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSessiontoken() {
        return sessiontoken;
    }

    /**
     * Sets the value of the sessiontoken property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSessiontoken(String value) {
        this.sessiontoken = value;
    }

    /**
     * Gets the value of the strOldPassword property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrOldPassword() {
        return strOldPassword;
    }

    /**
     * Sets the value of the strOldPassword property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrOldPassword(String value) {
        this.strOldPassword = value;
    }

    /**
     * Gets the value of the strNewPassword property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrNewPassword() {
        return strNewPassword;
    }

    /**
     * Sets the value of the strNewPassword property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrNewPassword(String value) {
        this.strNewPassword = value;
    }

}
