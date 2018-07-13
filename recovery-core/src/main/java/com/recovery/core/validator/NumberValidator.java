package com.recovery.core.validator;

import com.river.core.helper.ObjectHelper;

/**
 * 数值类型通用处理
 * 
 * @author Yinovo
 *
 */
public class NumberValidator {

	/**
	 * 判断是否为数值
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isNumber(Object obj) {
		if (obj == null)
			return false;
		if (obj instanceof Integer) {
			return true;
		}
		Integer intTemp = ObjectHelper.toInteger(obj, null);
		if (intTemp == null)
			return false;
		return true;
	}

	/**
	 * 判断数值是否在区间范围内
	 * 
	 * @param intValue
	 * @param min
	 * @param max
	 * @return
	 */
	public static boolean out(Integer intValue, int min, int max) {
		if (intValue < min || intValue > max)
			return true;
		return false;
	}
}
