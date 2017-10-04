
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
 *         &lt;element name="strPk" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="strMd5" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="bMustExist" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
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
    "strPk",
    "strMd5",
    "bMustExist"
})
@XmlRootElement(name = "GetEntityIfMoreRecent")
public class GetEntityIfMoreRecent {

    @XmlElement(required = true)
    protected String sessiontoken;
    @XmlElement(required = true)
    protected String strPk;
    @XmlElement(required = true)
    protected String strMd5;
    protected boolean bMustExist;

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
     * Gets the value of the strPk property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrPk() {
        return strPk;
    }

    /**
     * Sets the value of the strPk property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrPk(String value) {
        this.strPk = value;
    }

    /**
     * Gets the value of the strMd5 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStrMd5() {
        return strMd5;
    }

    /**
     * Sets the value of the strMd5 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStrMd5(String value) {
        this.strMd5 = value;
    }

    /**
     * Gets the value of the bMustExist property.
     * 
     */
    public boolean isBMustExist() {
        return bMustExist;
    }

    /**
     * Sets the value of the bMustExist property.
     * 
     */
    public void setBMustExist(boolean value) {
        this.bMustExist = value;
    }

}
