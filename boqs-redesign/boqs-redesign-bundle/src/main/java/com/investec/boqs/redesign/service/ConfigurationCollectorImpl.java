package com.investec.boqs.redesign.service;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(immediate = true, metatype = true, label = "Read Configuration Service Client")
@Service(value = ConfigurationCollector.class)
public class ConfigurationCollectorImpl implements ConfigurationCollector {

	protected final Logger LOG = LoggerFactory.getLogger(ConfigurationCollectorImpl.class);
	private ComponentContext compContext;
	
	@Activate
	public void activate(ComponentContext componentContext) {
		this.compContext = componentContext;

	}

	public String getString(String key, String defaultValue) {
		if(null == compContext){
			return defaultValue;
		}
		return PropertiesUtil.toString(compContext.getProperties().get(key), defaultValue);
	}
	
	public Object get(String key) {
		if(null == compContext){
			return null;
		}
		return compContext.getProperties().get(key);
	}
}