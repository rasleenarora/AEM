
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
 *         &lt;element name="pdomDoc" type="{urn:xtk:session}Element"/>
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
    "pdomDoc"
})
@XmlRootElement(name = "GetActiveApplicationMenusResponse")
public class GetActiveApplicationMenusResponse {

    @XmlElement(required = true)
    protected Element pdomDoc;

    /**
     * Gets the value of the pdomDoc property.
     * 
     * @return
     *     possible object is
     *     {@link Element }
     *     
     */
    public Element getPdomDoc() {
        return pdomDoc;
    }

    /**
     * Sets the value of the pdomDoc property.
     * 
     * @param value
     *     allowed object is
     *     {@link Element }
     *     
     */
    public void setPdomDoc(Element value) {
        this.pdomDoc = value;
    }

}
