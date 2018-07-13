package com.recovery.project;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import com.recovery.core.filter.RiverCrossFilter;
import com.recovery.core.filter.RiverLogFilter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;

@Configuration
public class BootConfig {

	@Value("${riverLogFilter.logIpAddress}")
	private String logIpAddress;

	@Value("${riverLogFilter.port}")
	private int port;

	@Bean
	public ServletRegistrationBean druidServlet() {
		ServletRegistrationBean reg = new ServletRegistrationBean();
		reg.setServlet(new StatViewServlet());
		reg.addUrlMappings("/druid/*");
		reg.addInitParameter("loginUsername", "druid");
		reg.addInitParameter("loginPassword", "huangping");
		return reg;
	}

	/**
	 * 
	 * @return
	 */
	/*
	 * @Bean public FilterRegistrationBean crossServlet() { FilterRegistrationBean
	 * filterRegistrationBean = new FilterRegistrationBean();
	 * filterRegistrationBean.setFilter(new RiverCrossFilter());
	 * filterRegistrationBean.addUrlPatterns("/*"); return filterRegistrationBean; }
	 */

	/**
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new WebStatFilter());
		filterRegistrationBean.addUrlPatterns("/*");
		filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
		filterRegistrationBean.addInitParameter("profileEnable", "true");
		filterRegistrationBean.addInitParameter("principalCookieName", "USER_COOKIE");
		filterRegistrationBean.addInitParameter("principalSessionName", "USER_SESSION");
		return filterRegistrationBean;
	}

	/**
	 * ������־Filter
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean filterRiverLogFilterBean() {
		FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new RiverLogFilter(this.getLogIpAddress(), this.getPort()));
		filterRegistrationBean.addUrlPatterns("/*");
		return filterRegistrationBean;
	}

	public String getLogIpAddress() {
		return logIpAddress;
	}

	public void setLogIpAddress(String logIpAddress) {
		this.logIpAddress = logIpAddress;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

}
