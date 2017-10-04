
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
 *         &lt;element name="ppklPkList" type="{http://www.w3.org/2001/XMLSchema}string"/>
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
    "ppklPkList"
})
@XmlRootElement(name = "GetPkListResponse")
public class GetPkListResponse {

    @XmlElement(required = true)
    protected String ppklPkList;

    /**
     * Gets the value of the ppklPkList property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPpklPkList() {
        return ppklPkList;
    }

    /**
     * Sets the value of the ppklPkList property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPpklPkList(String value) {
        this.ppklPkList = value;
    }

}
