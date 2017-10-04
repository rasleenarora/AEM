package com.investec.boqs.redesign.utils;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.HtmlEmail;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.jcr.api.SlingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import com.investec.boqs.redesign.bean.EventResultBean;

public class MailUtil {
	/**
	 * Logger of this class
	 */
	private static final Logger log = LoggerFactory.getLogger(MailUtil.class);

	private static final String MAIL_SERVICE_CONFIG = "/apps/system/config/com.day.cq.mailer.DefaultMailService.config";

	public static String emailPattern = "^[a-zA-Z][\\w\\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\\w\\.-]*[a-zA-Z0-9]\\.[a-zA-Z][a-zA-Z\\.]*[a-zA-Z]$";

	public static final String PATTERN_PHONE = "^[+]?[0-9]*[0-9]+$";

	public static int sendMail(ValueMap properties, SlingHttpServletRequest request, SlingRepository repo, String mailTemplateRootPath) {
		/* Variable to check send mail successful or not */
		int result = 0;
        Session session = null;
		try {

			String[] mailto = properties.get("mailto", new String[0]);
			String[] mailCC = properties.get("cc", new String[0]);
			String[] mailBCC = properties.get("bcc", new String[0]);
			String subject = properties.get("subject", "");
			String template = properties.get("template", String.class);

			/* begin get info MailServer */
			session = repo.loginAdministrative(null);
			Node node = session.getNode(MAIL_SERVICE_CONFIG);
			Properties pros = new Properties();
			InputStream is = readFile(node);
			pros.load(is);
			String smtp_port = pros.getProperty("smtp.port");
			smtp_port = StringUtil.isEmpty(smtp_port) ? "" : smtp_port.replaceAll("[^0-9]", "");
			String host = pros.getProperty("smtp.host");
			int port = 0;
			if (StringUtils.isNumeric(smtp_port)) {
				port = Integer.parseInt(smtp_port);
			}
			String userMailServer = pros.getProperty("smtp.user");
			String passMailServer = pros.getProperty("smtp.password");
			String fromAddress = pros.getProperty("from.address");
			String useSSL = pros.getProperty("smtp.ssl", "false");

			/* check if exist mail server in "Day CQ Mail Service" is send mail */
			if (!StringUtil.isEmpty(host) && port != 0 && !StringUtil.isEmpty(userMailServer) && !StringUtil.isEmpty(passMailServer)) {
				host = host.replaceAll("\"", "");
				userMailServer = userMailServer.replace("\"", "").replaceAll("'\'", "");
				passMailServer = passMailServer.replaceAll("\"", "").replaceAll("'\'", "");
				fromAddress = fromAddress.replaceAll("'\'", "").replaceAll("\"", "");
				useSSL = useSSL.replaceAll("'\'", "").replaceAll("\"", "");
			}
			/* end get info MailServer */

			SlingBindings slingBindings = (SlingBindings) request.getAttribute(SlingBindings.class.getName());
			MessageGatewayService messageGatewayService = slingBindings.getSling().getService(MessageGatewayService.class);

			List<InternetAddress> lstMailToIntAddress = new ArrayList<InternetAddress>();
			List<InternetAddress> lstMailCcIntAddress = new ArrayList<InternetAddress>();
			List<InternetAddress> lstMailBccIntAddress = new ArrayList<InternetAddress>();

			/* Get content from chosen template */
			String content = "";
			if (template != null) {
				content = MailUtil.getHTMLFromTemplate(request, mailTemplateRootPath, template);
			}
			if (mailto != null) {
				for (int i = 0; i < mailto.length; i++) {
					String mTo = mailto[i];
					if (!StringUtil.isEmpty(mTo) && MailUtil.isEmail(mTo)) {
						lstMailToIntAddress.add(new InternetAddress(mTo));
					}
				}
			}
			/* Get List Receiver */
			String receiver = (String) request.getParameter("receiver");
			if (!StringUtil.isEmpty(receiver) && isEmail(receiver)) {
				lstMailToIntAddress.add(new InternetAddress(receiver));
			}
			/* Get List CC */
			if (mailCC != null) {
				for (int i = 0; i < mailCC.length; i++) {
					String mCC = mailCC[i];
					if (!StringUtil.isEmpty(mCC) && MailUtil.isEmail(mCC)) {
						lstMailCcIntAddress.add(new InternetAddress(mCC));
					}
				}
			}
			/* Get List BCC */
			if (mailBCC != null) {
				for (int i = 0; i < mailBCC.length; i++) {
					String mBcc = mailBCC[i];
					if (!StringUtil.isEmpty(mBcc) && MailUtil.isEmail(mBcc)) {
						lstMailBccIntAddress.add(new InternetAddress(mBcc));
					}
				}
			}

			/* Set needed info to send mail */
			HtmlEmail htmlEmail = new HtmlEmail();
			htmlEmail.setTo(lstMailToIntAddress);
			htmlEmail.setFrom(fromAddress, "BOQ Specialist");
			if (lstMailCcIntAddress != null && lstMailCcIntAddress.size() > 0) {
				htmlEmail.setCc(lstMailCcIntAddress);
			}
			if (lstMailBccIntAddress != null && lstMailBccIntAddress.size() > 0) {
				htmlEmail.setBcc(lstMailBccIntAddress);
			}
			htmlEmail.setSubject(subject);
			htmlEmail.setContent(content, "text/html; charset=utf-8");
			/* End setting */

			MessageGateway<HtmlEmail> messageGateway = messageGatewayService.getGateway(HtmlEmail.class);
			messageGateway.send(htmlEmail);
			log.info("\n\n EMAIL END");
			/* successful state */
			result = 1;
		} catch (Exception ex) {
			log.error("\n\n EMAIL Exception: " + ex.toString());
			/* error state */
			result = -1;
		}finally{
            //logging out of the session
            if (session != null) {
                session.logout();
            }
        }
		return result;
	}

	/**
	 * Check is Email
	 * 
	 * @param email
	 * @return true if is email else return false
	 */
	public static boolean isEmail(String email) {
		Pattern p = Pattern.compile(emailPattern); // Set the email pattern
													// string
		Matcher m = p.matcher(email); // Match the given string with the pattern
		return m.matches();
	}

	/**
	 * Replace Values from HTML Template
	 * 
	 * @param request
	 *            SlingHttpServletRequest
	 * @param HTMLTemplate
	 *            String
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String getHTMLFromTemplate(SlingHttpServletRequest request, String mailTemplateRootPath, String template) {
		String HTMLTemplate = "";
		// Get template's content
		StringBuilder strBuiler = new  StringBuilder(HTMLTemplate);  
		int ind =0;  
		try {
			Node node2 = JcrUtils.getNode(request, mailTemplateRootPath + "/" + template + ".html/jcr:content/renditions/original");
			if (node2 != null) {
				InputStream in = readFile(node2);
				byte[] b = new byte[in.available()];
				in.read(b);
				HTMLTemplate = new String(b);
				strBuiler.append(HTMLTemplate);  
			}
			if (!StringUtil.isEmpty(HTMLTemplate)) {
				// replace Event detail
				HTMLTemplate = parseEvent(HTMLTemplate, request);
				
				Map m = request.getParameterMap();
				Set s = m.entrySet();
				Iterator it = s.iterator();
				while (it.hasNext()) {
					Map.Entry<String, String[]> entry = (Map.Entry<String, String[]>) it.next();
					String key = entry.getKey();
					String[] value = entry.getValue();
					String valueResult = "";

					if (value.length > 1) {
						boolean isFirst = true;
						valueResult += "{";
						for (int i = 0; i < value.length; i++) {
							if (!isFirst) {
								valueResult += ",";
							}
							valueResult += value[i].toString();
							isFirst = false;

						}
						valueResult += "}";
					} else {
						valueResult += value[0].toString();
					}
					valueResult = valueResult.replaceAll("<", "&lt;");  
					if (HTMLTemplate.contains(key)) {
						String old = "<" + key + ">"; // <lfirst>
						HTMLTemplate = HTMLTemplate.replaceAll(old, "");  
					 	ind = strBuiler.indexOf(old);  
					 	strBuiler.delete(ind, ind + old.length());  
					 	strBuiler.insert(ind, valueResult);  
					}
				}
			}
			
		} catch (Exception e) {
			log.error("Error get Template :" + e.toString());
		}

		return strBuiler.toString(); 
	}
	
	/**
	 * Replace Event Detail to template
	 * @param templateContent
	 * @param request
	 * @return
	 */
	private static String parseEvent(String templateContent, SlingHttpServletRequest request){
		String htmlTemplate = templateContent;
		String eventPage = request.getParameter(BOQSConstant.PARAM_EVENT_PAGE);
		if(StringUtils.isNotBlank(eventPage) && StringUtils.isNotBlank(htmlTemplate)){
			EventResultBean eventResultBean = CommonUtils.parseEventFromPath(request, eventPage);
			htmlTemplate = htmlTemplate.replaceAll("<eventname>", eventResultBean.getName());
			htmlTemplate = htmlTemplate.replaceAll("<eventtime>", eventResultBean.getTime());
			htmlTemplate = htmlTemplate.replaceAll("<eventdesc>", eventResultBean.getDesc());
			htmlTemplate = htmlTemplate.replaceAll("<eventicon>", eventResultBean.getIcon());
			htmlTemplate = htmlTemplate.replaceAll("<eventimage>", eventResultBean.getImage());
			htmlTemplate = htmlTemplate.replaceAll("<eventlocation>", eventResultBean.getLocation());
			htmlTemplate = htmlTemplate.replaceAll("<eventmoredetaillink>", eventResultBean.getMoreDetailLink());
			htmlTemplate = htmlTemplate.replaceAll("<eventenddate>", String.valueOf(eventResultBean.getEndDate()));
			htmlTemplate = htmlTemplate.replaceAll("<eventstartdate>", String.valueOf(eventResultBean.getStartDate()));
		}
		return htmlTemplate;
	}

	/**
	 * Returns a stream for reading the contents of the file stored at the given
	 * node. This method works with both on nt:file and nt:resource and on any
	 * other similar node types, as it only looks for the jcr:data property or a
	 * jcr:content child node.
	 * <p>
	 * The returned stream contains a reference to the underlying {@link Binary}
	 * value instance that will be disposed when the stream is closed. It is the
	 * responsibility of the caller to close the stream once it is no longer
	 * needed.
	 * 
	 * @since Apache Jackrabbit 2.3
	 * @param node
	 *            node to be read
	 * @return stream for reading the file contents
	 * @throws RepositoryException
	 *             if the file can not be accessed
	 */
	private static InputStream readFile(Node node) throws RepositoryException {
		if (node.hasProperty(Property.JCR_DATA)) {
			Property data = node.getProperty(Property.JCR_DATA);
			final Binary binary = data.getBinary();
			return new FilterInputStream(binary.getStream()) {
				@Override
				public void close() throws IOException {
					super.close();
					binary.dispose();
				}
			};
		} else if (node.hasNode(Node.JCR_CONTENT)) {
			return readFile(node.getNode(Node.JCR_CONTENT));
		} else {
			throw new RepositoryException("Unable to read file node: " + node.getPath());
		}
	}

}
