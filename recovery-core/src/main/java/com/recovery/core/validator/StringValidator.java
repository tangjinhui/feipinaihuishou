package com.recovery.core.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * 字符串验证通用类
 * @author Yinovo
 *
 */
public class StringValidator {
	/**
	 * 判断字符串是否为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNullOrEmpty(String str) {
		if (str == null || str.isEmpty())
			return true;
		return false;
	}
	/**
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNull(String str){
		return str==null;
	}
	/**
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str){
		if(str!=null && str.isEmpty()) return true;
		return false;
	}
	/**
	 * 获取字符串长度
	 * 
	 * @param str
	 * @return
	 */
	public static int getLength(String str) {
		if (isNullOrEmpty(str))
			return 0;
		int length = 0;
		for (int i = 0; i < str.length(); i++) {
			int ascii = Character.codePointAt(str, i);
			if (ascii >= 0 && ascii <= 255)
				length++;
			else
				length += 2;

		}
		return length;
	}

	/**
	 * 判断是否超过限制长度
	 * 
	 * @param str
	 * @param maxLength
	 * @return
	 */
	public static boolean outLength(String str, int maxLength) {
		if (getLength(str) > maxLength)
			return true;
		return false;
	}

	/**
	 * 是否符合正则要求
	 * 
	 * @param str
	 * @param regex
	 * @return
	 */
	public static boolean match(String str, String regex) {
		try {
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(str);
			return matcher.matches();
		} catch (PatternSyntaxException ex) {
			return false;
		}
	}
}
