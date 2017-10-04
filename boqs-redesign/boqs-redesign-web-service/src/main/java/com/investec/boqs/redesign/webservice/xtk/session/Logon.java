
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
 *         &lt;element name="strLogin" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="strPassword" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="elemParameters" type="{urn:xtk:session}Element"/>
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
    "strLogin",
    "strPassword",
    "elemParameters"
})
@XmlRootElement(name = "Logon")
public class Logon {

    @XmlElement(required = true)
    protected String sessiontoken;
    @XmlElement(required = true)
    protected String strLogin;
    @XmlElement(required = true)
    protected String strPassword;
    @XmlElement(required = true)
    protected Element elemParameters;

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
     * Gets the value of the strLogin property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrLogin() {
        return strLogin;
    }

    /**
     * Sets the value of the strLogin property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrLogin(String value) {
        this.strLogin = value;
    }

    /**
     * Gets the value of the strPassword property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrPassword() {
        return strPassword;
    }

    /**
     * Sets the value of the strPassword property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrPassword(String value) {
        this.strPassword = value;
    }

    /**
     * Gets the value of the elemParameters property.
     * 
     * @return
     *     possible object is
     *     {@link Element }
     *     
     */
    public Element getElemParameters() {
        return elemParameters;
    }

    /**
     * Sets the value of the elemParameters property.
     * 
     * @param value
     *     allowed object is
     *     {@link Element }
     *     
     */
    public void setElemParameters(Element value) {
        this.elemParameters = value;
    }

}
