package com.recovery.core.result;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.github.pagehelper.PageInfo;

@XmlRootElement
@XmlAccessorType(XmlAccessType.NONE)
public class ResponseBodyInfo<T> {
	// 错误代码
	@XmlElement(name = "status")
	protected int status;

	// 错误提示
	@XmlElement(name = "message")
	protected String message;

	// 返回对象
	@XmlElement(name = "data")
	protected T data;

	@XmlTransient
	protected Object page;

	protected ResponseBodyInfo() {
	}

	protected ResponseBodyInfo(int errorCode, String errorText, T data) {
		this.status = errorCode;
		this.message = errorText;
		this.data = data;
	}

	public ResponseBodyInfo(int status, String message, T data, Object page) {
		super();
		this.status = status;
		this.message = message;
		this.data = data;
		this.page = page;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message
	 *            the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the data
	 */
	public T getData() {
		return data;
	}

	/**
	 * @param data
	 *            the data to set
	 */
	public void setData(T data) {
		this.data = data;
	}

	public Object getPage() {
		return page;
	}

	public void setPage(Object page) {
		this.page = page;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("ResponseBodyInfo{");
		sb.append("errorCode=").append(status);
		sb.append(", errorText='").append(message).append('\'');
		sb.append(", data=").append(data);
		sb.append('}');
		return sb.toString();
	}
}