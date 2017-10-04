
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
 *         &lt;element name="pdomDirtyEntities" type="{urn:xtk:session}Element"/>
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
    "pdomDirtyEntities"
})
@XmlRootElement(name = "GetDirtyCacheEntitiesResponse")
public class GetDirtyCacheEntitiesResponse {

    @XmlElement(required = true)
    protected Element pdomDirtyEntities;

    /**
     * Gets the value of the pdomDirtyEntities property.
     * 
     * @return
     *     possible object is
     *     {@link Element }
     *     
     */
    public Element getPdomDirtyEntities() {
        return pdomDirtyEntities;
    }

    /**
     * Sets the value of the pdomDirtyEntities property.
     * 
     * @param value
     *     allowed object is
     *     {@link Element }
     *     
     */
    public void setPdomDirtyEntities(Element value) {
        this.pdomDirtyEntities = value;
    }

}
