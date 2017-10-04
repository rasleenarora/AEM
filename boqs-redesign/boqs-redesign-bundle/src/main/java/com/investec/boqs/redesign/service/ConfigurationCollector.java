package com.investec.boqs.redesign.service;

/**
 * Get configuration from runmodes
 */
public interface ConfigurationCollector {
	
	/**
	 * Get configuration from runmodes by key
	 * @param key
	 * @param defaultValue
	 * @return value or default value if the config not available
	 */
	String getString(String key, String defaultValue);
	
	/**
	 * Get Object from runmodes by key
	 * @param key
	 * @return
	 */
	Object get(String key);
}