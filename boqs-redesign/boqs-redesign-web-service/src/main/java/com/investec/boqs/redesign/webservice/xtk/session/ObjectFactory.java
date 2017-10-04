
package com.investec.boqs.redesign.webservice.xtk.session;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the xtk.session package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _LoadIfExistsResponse_QNAME = new QName("urn:xtk:session", "LoadIfExistsResponse");
    private final static QName _DuplicateWithMappingIdResponse_QNAME = new QName("urn:xtk:session", "DuplicateWithMappingIdResponse");
    private final static QName _LoadResponse_QNAME = new QName("urn:xtk:session", "LoadResponse");
    private final static QName _RemoveResponse_QNAME = new QName("urn:xtk:session", "RemoveResponse");
    private final static QName _DuplicateResponse_QNAME = new QName("urn:xtk:session", "DuplicateResponse");
    private final static QName _NewInstanceResponse_QNAME = new QName("urn:xtk:session", "NewInstanceResponse");
    private final static QName _ApplyDuplicateRulesResponse_QNAME = new QName("urn:xtk:session", "ApplyDuplicateRulesResponse");
    private final static QName _DuplicateToResponse_QNAME = new QName("urn:xtk:session", "DuplicateToResponse");
    private final static QName _SetDefaultsResponse_QNAME = new QName("urn:xtk:session", "SetDefaultsResponse");
    private final static QName _SetDefaultValuesResponse_QNAME = new QName("urn:xtk:session", "SetDefaultValuesResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: xtk.session
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ServerShutdown }
     * 
     */
    public ServerShutdown createServerShutdown() {
        return new ServerShutdown();
    }

    /**
     * Create an instance of {@link DeleteCollectionResponse }
     * 
     */
    public DeleteCollectionResponse createDeleteCollectionResponse() {
        return new DeleteCollectionResponse();
    }

    /**
     * Create an instance of {@link TestCnxResponse }
     * 
     */
    public TestCnxResponse createTestCnxResponse() {
        return new TestCnxResponse();
    }

    /**
     * Create an instance of {@link Load }
     * 
     */
    public Load createLoad() {
        return new Load();
    }

    /**
     * Create an instance of {@link Element }
     * 
     */
    public Element createElement() {
        return new Element();
    }

    /**
     * Create an instance of {@link LoadIfExists }
     * 
     */
    public LoadIfExists createLoadIfExists() {
        return new LoadIfExists();
    }

    /**
     * Create an instance of {@link Diff }
     * 
     */
    public Diff createDiff() {
        return new Diff();
    }

    /**
     * Create an instance of {@link LogonResponse }
     * 
     */
    public LogonResponse createLogonResponse() {
        return new LogonResponse();
    }

    /**
     * Create an instance of {@link DuplicateTo }
     * 
     */
    public DuplicateTo createDuplicateTo() {
        return new DuplicateTo();
    }

    /**
     * Create an instance of {@link SetDefaults }
     * 
     */
    public SetDefaults createSetDefaults() {
        return new SetDefaults();
    }

    /**
     * Create an instance of {@link EncryptResponse }
     * 
     */
    public EncryptResponse createEncryptResponse() {
        return new EncryptResponse();
    }

    /**
     * Create an instance of {@link GetNewIdsResponse }
     * 
     */
    public GetNewIdsResponse createGetNewIdsResponse() {
        return new GetNewIdsResponse();
    }

    /**
     * Create an instance of {@link GetImagesResponse }
     * 
     */
    public GetImagesResponse createGetImagesResponse() {
        return new GetImagesResponse();
    }

    /**
     * Create an instance of {@link ImportCollection }
     * 
     */
    public ImportCollection createImportCollection() {
        return new ImportCollection();
    }

    /**
     * Create an instance of {@link Logon }
     * 
     */
    public Logon createLogon() {
        return new Logon();
    }

    /**
     * Create an instance of {@link GetServerTimeResponse }
     * 
     */
    public GetServerTimeResponse createGetServerTimeResponse() {
        return new GetServerTimeResponse();
    }

    /**
     * Create an instance of {@link ChangePassword }
     * 
     */
    public ChangePassword createChangePassword() {
        return new ChangePassword();
    }

    /**
     * Create an instance of {@link TestCnx }
     * 
     */
    public TestCnx createTestCnx() {
        return new TestCnx();
    }

    /**
     * Create an instance of {@link GetDefaultEntityResponse }
     * 
     */
    public GetDefaultEntityResponse createGetDefaultEntityResponse() {
        return new GetDefaultEntityResponse();
    }

    /**
     * Create an instance of {@link KillSessionResponse }
     * 
     */
    public KillSessionResponse createKillSessionResponse() {
        return new KillSessionResponse();
    }

    /**
     * Create an instance of {@link DeleteCollection }
     * 
     */
    public DeleteCollection createDeleteCollection() {
        return new DeleteCollection();
    }

    /**
     * Create an instance of {@link GetUserInfoResponse }
     * 
     */
    public GetUserInfoResponse createGetUserInfoResponse() {
        return new GetUserInfoResponse();
    }

    /**
     * Create an instance of {@link GetPkList }
     * 
     */
    public GetPkList createGetPkList() {
        return new GetPkList();
    }

    /**
     * Create an instance of {@link GetNewIdsEx }
     * 
     */
    public GetNewIdsEx createGetNewIdsEx() {
        return new GetNewIdsEx();
    }

    /**
     * Create an instance of {@link EncryptServerPasswordResponse }
     * 
     */
    public EncryptServerPasswordResponse createEncryptServerPasswordResponse() {
        return new EncryptServerPasswordResponse();
    }

    /**
     * Create an instance of {@link LoadAsText }
     * 
     */
    public LoadAsText createLoadAsText() {
        return new LoadAsText();
    }

    /**
     * Create an instance of {@link GetImages }
     * 
     */
    public GetImages createGetImages() {
        return new GetImages();
    }

    /**
     * Create an instance of {@link GetEntityIfMoreRecentResponse }
     * 
     */
    public GetEntityIfMoreRecentResponse createGetEntityIfMoreRecentResponse() {
        return new GetEntityIfMoreRecentResponse();
    }

    /**
     * Create an instance of {@link LogoffResponse }
     * 
     */
    public LogoffResponse createLogoffResponse() {
        return new LogoffResponse();
    }

    /**
     * Create an instance of {@link GetNewIds }
     * 
     */
    public GetNewIds createGetNewIds() {
        return new GetNewIds();
    }

    /**
     * Create an instance of {@link ServerShutdownResponse }
     * 
     */
    public ServerShutdownResponse createServerShutdownResponse() {
        return new ServerShutdownResponse();
    }

    /**
     * Create an instance of {@link GetEntityIfMoreRecent }
     * 
     */
    public GetEntityIfMoreRecent createGetEntityIfMoreRecent() {
        return new GetEntityIfMoreRecent();
    }

    /**
     * Create an instance of {@link FormatDataPolicyResponse }
     * 
     */
    public FormatDataPolicyResponse createFormatDataPolicyResponse() {
        return new FormatDataPolicyResponse();
    }

    /**
     * Create an instance of {@link GetOption }
     * 
     */
    public GetOption createGetOption() {
        return new GetOption();
    }

    /**
     * Create an instance of {@link DiffResponse }
     * 
     */
    public DiffResponse createDiffResponse() {
        return new DiffResponse();
    }

    /**
     * Create an instance of {@link WriteCollection }
     * 
     */
    public WriteCollection createWriteCollection() {
        return new WriteCollection();
    }

    /**
     * Create an instance of {@link FormatDataPolicy }
     * 
     */
    public FormatDataPolicy createFormatDataPolicy() {
        return new FormatDataPolicy();
    }

    /**
     * Create an instance of {@link SetDefaultValues }
     * 
     */
    public SetDefaultValues createSetDefaultValues() {
        return new SetDefaultValues();
    }

    /**
     * Create an instance of {@link WriteCollectionResponse }
     * 
     */
    public WriteCollectionResponse createWriteCollectionResponse() {
        return new WriteCollectionResponse();
    }

    /**
     * Create an instance of {@link GetDirtyCacheEntities }
     * 
     */
    public GetDirtyCacheEntities createGetDirtyCacheEntities() {
        return new GetDirtyCacheEntities();
    }

    /**
     * Create an instance of {@link GetCnxInfoResponse }
     * 
     */
    public GetCnxInfoResponse createGetCnxInfoResponse() {
        return new GetCnxInfoResponse();
    }

    /**
     * Create an instance of {@link GetPkListResponse }
     * 
     */
    public GetPkListResponse createGetPkListResponse() {
        return new GetPkListResponse();
    }

    /**
     * Create an instance of {@link Write }
     * 
     */
    public Write createWrite() {
        return new Write();
    }

    /**
     * Create an instance of {@link WriteResponse }
     * 
     */
    public WriteResponse createWriteResponse() {
        return new WriteResponse();
    }

    /**
     * Create an instance of {@link GetActiveApplicationMenusResponse }
     * 
     */
    public GetActiveApplicationMenusResponse createGetActiveApplicationMenusResponse() {
        return new GetActiveApplicationMenusResponse();
    }

    /**
     * Create an instance of {@link Remove }
     * 
     */
    public Remove createRemove() {
        return new Remove();
    }

    /**
     * Create an instance of {@link ApplyDuplicateRules }
     * 
     */
    public ApplyDuplicateRules createApplyDuplicateRules() {
        return new ApplyDuplicateRules();
    }

    /**
     * Create an instance of {@link GetNewIdsExResponse }
     * 
     */
    public GetNewIdsExResponse createGetNewIdsExResponse() {
        return new GetNewIdsExResponse();
    }

    /**
     * Create an instance of {@link ImportCollectionResponse }
     * 
     */
    public ImportCollectionResponse createImportCollectionResponse() {
        return new ImportCollectionResponse();
    }

    /**
     * Create an instance of {@link GetUserInfo }
     * 
     */
    public GetUserInfo createGetUserInfo() {
        return new GetUserInfo();
    }

    /**
     * Create an instance of {@link LoadAsTextResponse }
     * 
     */
    public LoadAsTextResponse createLoadAsTextResponse() {
        return new LoadAsTextResponse();
    }

    /**
     * Create an instance of {@link GetActiveApplicationMenus }
     * 
     */
    public GetActiveApplicationMenus createGetActiveApplicationMenus() {
        return new GetActiveApplicationMenus();
    }

    /**
     * Create an instance of {@link Logoff }
     * 
     */
    public Logoff createLogoff() {
        return new Logoff();
    }

    /**
     * Create an instance of {@link NewInstance }
     * 
     */
    public NewInstance createNewInstance() {
        return new NewInstance();
    }

    /**
     * Create an instance of {@link EncryptServerPassword }
     * 
     */
    public EncryptServerPassword createEncryptServerPassword() {
        return new EncryptServerPassword();
    }

    /**
     * Create an instance of {@link GetServerTime }
     * 
     */
    public GetServerTime createGetServerTime() {
        return new GetServerTime();
    }

    /**
     * Create an instance of {@link Duplicate }
     * 
     */
    public Duplicate createDuplicate() {
        return new Duplicate();
    }

    /**
     * Create an instance of {@link GetOptionResponse }
     * 
     */
    public GetOptionResponse createGetOptionResponse() {
        return new GetOptionResponse();
    }

    /**
     * Create an instance of {@link KillSession }
     * 
     */
    public KillSession createKillSession() {
        return new KillSession();
    }

    /**
     * Create an instance of {@link DuplicateWithMappingId }
     * 
     */
    public DuplicateWithMappingId createDuplicateWithMappingId() {
        return new DuplicateWithMappingId();
    }

    /**
     * Create an instance of {@link GetDirtyCacheEntitiesResponse }
     * 
     */
    public GetDirtyCacheEntitiesResponse createGetDirtyCacheEntitiesResponse() {
        return new GetDirtyCacheEntitiesResponse();
    }

    /**
     * Create an instance of {@link Encrypt }
     * 
     */
    public Encrypt createEncrypt() {
        return new Encrypt();
    }

    /**
     * Create an instance of {@link GetCnxInfo }
     * 
     */
    public GetCnxInfo createGetCnxInfo() {
        return new GetCnxInfo();
    }

    /**
     * Create an instance of {@link ChangePasswordResponse }
     * 
     */
    public ChangePasswordResponse createChangePasswordResponse() {
        return new ChangePasswordResponse();
    }

    /**
     * Create an instance of {@link GetDefaultEntity }
     * 
     */
    public GetDefaultEntity createGetDefaultEntity() {
        return new GetDefaultEntity();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "LoadIfExistsResponse")
    public JAXBElement<Element> createLoadIfExistsResponse(Element value) {
        return new JAXBElement<Element>(_LoadIfExistsResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "DuplicateWithMappingIdResponse")
    public JAXBElement<Element> createDuplicateWithMappingIdResponse(Element value) {
        return new JAXBElement<Element>(_DuplicateWithMappingIdResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "LoadResponse")
    public JAXBElement<Element> createLoadResponse(Element value) {
        return new JAXBElement<Element>(_LoadResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "RemoveResponse")
    public JAXBElement<Element> createRemoveResponse(Element value) {
        return new JAXBElement<Element>(_RemoveResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "DuplicateResponse")
    public JAXBElement<Element> createDuplicateResponse(Element value) {
        return new JAXBElement<Element>(_DuplicateResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "NewInstanceResponse")
    public JAXBElement<Element> createNewInstanceResponse(Element value) {
        return new JAXBElement<Element>(_NewInstanceResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "ApplyDuplicateRulesResponse")
    public JAXBElement<Element> createApplyDuplicateRulesResponse(Element value) {
        return new JAXBElement<Element>(_ApplyDuplicateRulesResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "DuplicateToResponse")
    public JAXBElement<Element> createDuplicateToResponse(Element value) {
        return new JAXBElement<Element>(_DuplicateToResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "SetDefaultsResponse")
    public JAXBElement<Element> createSetDefaultsResponse(Element value) {
        return new JAXBElement<Element>(_SetDefaultsResponse_QNAME, Element.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Element }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "urn:xtk:session", name = "SetDefaultValuesResponse")
    public JAXBElement<Element> createSetDefaultValuesResponse(Element value) {
        return new JAXBElement<Element>(_SetDefaultValuesResponse_QNAME, Element.class, null, value);
    }

}
