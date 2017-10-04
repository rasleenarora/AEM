
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
 *         &lt;element name="entity" type="{urn:xtk:session}Element"/>
 *         &lt;element name="pkPk" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="pkFolder" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "entity",
    "pkPk",
    "pkFolder"
})
@XmlRootElement(name = "DuplicateTo")
public class DuplicateTo {

    @XmlElement(required = true)
    protected String sessiontoken;
    @XmlElement(required = true)
    protected Element entity;
    @XmlElement(required = true)
    protected String pkPk;
    @XmlElement(required = true)
    protected String pkFolder;

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
     *     {@link Element }
     *     
     */
    public Element getEntity() {
        return entity;
    }

    /**
     * Sets the value of the entity property.
     * 
     * @param value
     *     allowed object is
     *     {@link Element }
     *     
     */
    public void setEntity(Element value) {
        this.entity = value;
    }

    /**
     * Gets the value of the pkPk property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPkPk() {
        return pkPk;
    }

    /**
     * Sets the value of the pkPk property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPkPk(String value) {
        this.pkPk = value;
    }

    /**
     * Gets the value of the pkFolder property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPkFolder() {
        return pkFolder;
    }

    /**
     * Sets the value of the pkFolder property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPkFolder(String value) {
        this.pkFolder = value;
    }

}
