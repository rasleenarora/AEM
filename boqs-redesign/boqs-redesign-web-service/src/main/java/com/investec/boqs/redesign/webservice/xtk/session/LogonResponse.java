
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
 *         &lt;element name="pstrSessionToken" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="pSessionInfo" type="{urn:xtk:session}Element"/>
 *         &lt;element name="pstrSecurityToken" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "pstrSessionToken",
    "pSessionInfo",
    "pstrSecurityToken"
})
@XmlRootElement(name = "LogonResponse")
public class LogonResponse {

    @XmlElement(required = true)
    protected String pstrSessionToken;
    @XmlElement(required = true)
    protected Element pSessionInfo;
    @XmlElement(required = true)
    protected String pstrSecurityToken;

    /**
     * Gets the value of the pstrSessionToken property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPstrSessionToken() {
        return pstrSessionToken;
    }

    /**
     * Sets the value of the pstrSessionToken property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPstrSessionToken(String value) {
        this.pstrSessionToken = value;
    }

    /**
     * Gets the value of the pSessionInfo property.
     * 
     * @return
     *     possible object is
     *     {@link Element }
     *     
     */
    public Element getPSessionInfo() {
        return pSessionInfo;
    }

    /**
     * Sets the value of the pSessionInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link Element }
     *     
     */
    public void setPSessionInfo(Element value) {
        this.pSessionInfo = value;
    }

    /**
     * Gets the value of the pstrSecurityToken property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPstrSecurityToken() {
        return pstrSecurityToken;
    }

    /**
     * Sets the value of the pstrSecurityToken property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPstrSecurityToken(String value) {
        this.pstrSecurityToken = value;
    }

}
