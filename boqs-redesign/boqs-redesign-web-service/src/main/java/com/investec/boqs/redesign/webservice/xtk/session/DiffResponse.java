
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
 *         &lt;element name="pstrOriginal" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="pstrCurrent" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "pstrOriginal",
    "pstrCurrent"
})
@XmlRootElement(name = "DiffResponse")
public class DiffResponse {

    @XmlElement(required = true)
    protected String pstrOriginal;
    @XmlElement(required = true)
    protected String pstrCurrent;

    /**
     * Gets the value of the pstrOriginal property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPstrOriginal() {
        return pstrOriginal;
    }

    /**
     * Sets the value of the pstrOriginal property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPstrOriginal(String value) {
        this.pstrOriginal = value;
    }

    /**
     * Gets the value of the pstrCurrent property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPstrCurrent() {
        return pstrCurrent;
    }

    /**
     * Sets the value of the pstrCurrent property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPstrCurrent(String value) {
        this.pstrCurrent = value;
    }

}
