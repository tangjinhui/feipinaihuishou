package com.recovery.core.utils;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.river.core.entity.UserEntity;

public class SessionUtils {

	/**
	 * 获取用户
	 * @param request
	 * @return
	 */
	public static UserEntity getUser(HttpServletRequest request) {
		Object attribute = request.getSession().getAttribute("user");
		if(attribute != null) {
			return (UserEntity) attribute;
		}
		return null;
	}
	
	/**
	 * 获取请求头信息，用于feign传参数，共享session使用
	 * @param request
	 * @return
	 */
	public static Map<String, Object> getHeaderMap(HttpServletRequest request) {
		Enumeration<String> headerNames = request.getHeaderNames();
		Map<String, Object> headerMap = new HashMap<String, Object>();
		while (headerNames.hasMoreElements()) {
			String nextElement = headerNames.nextElement();
			headerMap.put(nextElement, request.getHeader(nextElement));
		}
		return headerMap;
	}
	
}
