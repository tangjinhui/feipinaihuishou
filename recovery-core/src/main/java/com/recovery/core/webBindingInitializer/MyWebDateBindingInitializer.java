package com.recovery.core.webBindingInitializer;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

public class MyWebDateBindingInitializer implements WebBindingInitializer {

	private String simpleDateFormatStr = "yyyy-MM-dd HH:mm:ss";

	@Override
	public void initBinder(WebDataBinder binder, WebRequest request) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(this.getSimpleDateFormatStr());
		dateFormat.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}

	public String getSimpleDateFormatStr() {
		return simpleDateFormatStr;
	}

	public void setSimpleDateFormatStr(String simpleDateFormatStr) {
		this.simpleDateFormatStr = simpleDateFormatStr;
	}

}
