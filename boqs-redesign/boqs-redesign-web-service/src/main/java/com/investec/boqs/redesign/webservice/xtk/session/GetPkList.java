
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
 *         &lt;element name="entity" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "entity"
})
@XmlRootElement(name = "GetPkList")
public class GetPkList {

    @XmlElement(required = true)
    protected String sessiontoken;
    @XmlElement(required = true)
    protected String entity;

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
     * Gets the value of the entity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEntity() {
        return entity;
    }

    /**
     * Sets the value of the entity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEntity(String value) {
        this.entity = value;
    }

}
