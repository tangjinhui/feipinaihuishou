package com.recovery.core.filter;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.recovery.core.helper.IpAddress;

public class RiverLogFilter implements Filter {

	private String logIpAddress = "localhost";

	private int port = 5426;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		// System.out.println("address" + this.getLogIpAddress());
		// System.out.println("port" + this.getPort());

		String socketData = this.getSocketData(httpRequest);
		this.sedSocketData(socketData);
		chain.doFilter(httpRequest, httpResponse);
	}

	@Override
	public void destroy() {
	}

	/**
	 * 发送log内容
	 * 
	 * @param socketData
	 */
	public void sedSocketData(String socketData) {
		try {
			InetAddress address = InetAddress.getByName(this.getLogIpAddress());
			DatagramSocket socket = new DatagramSocket();
			String s = new String(socketData.toString());
			byte[] data = s.getBytes();
			DatagramPacket packet = new DatagramPacket(data, data.length, address, this.getPort());
			socket.send(packet);
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 从request中获取要存入日志的内容
	 * 
	 * @param httpRequest
	 * @return
	 */
	public String getSocketData(HttpServletRequest httpRequest) {

		// URI
		String requestURI = httpRequest.getRequestURI();
		// method
		String method = httpRequest.getMethod();
		// IPaddress
		String ipAddress = IpAddress.getIpAddress(httpRequest);
		Map<String, String[]> parameterMap = httpRequest.getParameterMap();
		// 参数
		// System.out.println("================log start======================");
		Set<Entry<String, String[]>> entrySet = parameterMap.entrySet();

		// System.out.println("requestURI:" + requestURI);
		// System.out.println("method:" + method);
		// System.out.println("parameterMap:");

		Map<String, List<String>> parameterMapList = new HashMap<>();
		for (Entry<String, String[]> e : entrySet) {
			List<String> list = Arrays.asList(e.getValue());
			// System.out.println(e.getKey() + ":");
			// String[] value = e.getValue();

			// for (String s : value) {
			// System.out.println(s);
			// }

			parameterMapList.put(e.getKey(), list);
		}
		// System.out.println("================log end ======================");

		Map<String, Object> socketData = new HashMap<>();
		socketData.put("createTime", new Date().getTime());
		socketData.put("uri", requestURI);
		socketData.put("parameter", parameterMapList);
		socketData.put("method", method);
		socketData.put("ipAddress", ipAddress);

		JSONObject json = new JSONObject(socketData);
		return json.toString();
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

	public RiverLogFilter() {
		super();
	}

	public RiverLogFilter(String logIpAddress, int port) {
		super();
		this.logIpAddress = logIpAddress;
		this.port = port;
	}

}