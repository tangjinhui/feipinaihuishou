package com.recovery.core.result;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import com.github.pagehelper.PageInfo;

/**
 * 
 * @author Yinovo
 *
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.NONE)
public class JsonResult extends ResponseBodyInfo<Object> {

	@XmlTransient
	public final static JsonResult SUCCESS = new JsonResult(0, "OK");
	@XmlTransient
	public final static JsonResult FAILURE = new JsonResult(-1, "Failure");
	@XmlTransient
	public final static JsonResult ARGUMENT_NULL = new JsonResult(021, "传递的参数为null");
	@XmlTransient
	public final static JsonResult AUTHORIZE_FAILURE = new JsonResult(030, "未经授权访问");
	@XmlTransient
	public final static JsonResult NO_JURISDICTION = new JsonResult(-5, "没有权限访问，请登陆!");
	@XmlTransient
	public final static JsonResult CODE_ISEMPTY = new JsonResult(040, "编码不能为空");
	@XmlTransient
	public final static JsonResult CODE_SPECAIL_WORD = new JsonResult(041, "编码格式不正确");
	@XmlTransient
	public final static JsonResult CODE_ISEXIST = new JsonResult(042, "编码已存在");
	@XmlTransient
	public final static JsonResult HAS_CHILD = new JsonResult(060, "当前节点包含子级");

	public JsonResult(int status, String message) {
		super(status, message, null);
	}

	public JsonResult(int status, String message, Object obj) {
		super(status, message, obj);
	}

	public JsonResult(int status, String message, Object obj, Object page) {
		super(status, message, obj, page);
	}

	@Override
	public String toString() {
		return String.format("%d:%s:%s", status, message,data!=null?data.toString():"");
	}

	/**
	 * 
	 */
	public static JsonResult BindingError(BindingResult res) {
		if (!res.hasErrors())
			return SUCCESS;
		List<ObjectError> list = res.getAllErrors();
		ObjectError error;
		for (int i = 0; i < res.getErrorCount(); i++) {
			error = list.get(i);
			String message = error.getDefaultMessage();
			System.out.println(message);// 方便测试
		}
		int status = -1;
		error = list.get(0);
		String message = error.getDefaultMessage();
		String[] mess = message.split(":");
		if (mess.length > 1) {
			status = Integer.parseInt(mess[0]);
			return new JsonResult(status, mess[1]);
		}
		return new JsonResult(status, message);
	}

	public JsonResult() {
		super();
	}

	public static JsonResult success(Object obj) {
		return new JsonResult(0, "OK", obj);
	}

	/**
	 * 
	 * @param obj
	 * @return
	 */
	public static JsonResult failure(Object obj) {
		return failure(-1, obj);
	}

	/**
	 * 
	 * @param errorCode
	 * @param obj
	 * @return
	 */
	public static JsonResult failure(int errorCode, Object obj) {
		return new JsonResult(errorCode, "error", obj);
	}

	public static JsonResult successPage(Object obj, Object page) {
		return new JsonResult(0, "OK", obj, page);
	}
}
