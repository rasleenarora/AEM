
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
 *         &lt;element name="pdomCnxInfo" type="{urn:xtk:session}Element"/>
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
    "pdomCnxInfo"
})
@XmlRootElement(name = "GetCnxInfoResponse")
public class GetCnxInfoResponse {

    @XmlElement(required = true)
    protected Element pdomCnxInfo;

    /**
     * Gets the value of the pdomCnxInfo property.
     * 
     * @return
     *     possible object is
     *     {@link Element }
     *     
     */
    public Element getPdomCnxInfo() {
        return pdomCnxInfo;
    }

    /**
     * Sets the value of the pdomCnxInfo property.
     * 
     * @param value
     *     allowed object is
     *     {@link Element }
     *     
     */
    public void setPdomCnxInfo(Element value) {
        this.pdomCnxInfo = value;
    }

}
