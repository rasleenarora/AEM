
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
 *         &lt;element name="pstrValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="pbtType" type="{http://www.w3.org/2001/XMLSchema}byte"/>
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
    "pstrValue",
    "pbtType"
})
@XmlRootElement(name = "GetOptionResponse")
public class GetOptionResponse {

    @XmlElement(required = true)
    protected String pstrValue;
    protected byte pbtType;

    /**
     * Gets the value of the pstrValue property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPstrValue() {
        return pstrValue;
    }

    /**
     * Sets the value of the pstrValue property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPstrValue(String value) {
        this.pstrValue = value;
    }

    /**
     * Gets the value of the pbtType property.
     * 
     */
    public byte getPbtType() {
        return pbtType;
    }

    /**
     * Sets the value of the pbtType property.
     * 
     */
    public void setPbtType(byte value) {
        this.pbtType = value;
    }

}
