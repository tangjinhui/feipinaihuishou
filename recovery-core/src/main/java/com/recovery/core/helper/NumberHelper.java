package com.recovery.core.helper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberHelper {
	/**
	 * 根据种子生成随机数（最大不超过种子数）
	 * @param seed
	 * @return
	 */
    public static int random(double seed){   
        double temp = Math.random()*seed;   
        int tempint = (int)Math.ceil(temp);
        return tempint;  
    } 
    /**
     * 根据指定长度生成随机数
     * @param len
     * @return
     */
    public static int random(int len){  
       return new RandomString(len).nextInt();
    }
    
    /**
	 * 判断是否为数据类型
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str) {
		if (null == str || "".equals(str)) {
			return false;
		}
		Pattern pattern = Pattern.compile("^[-\\+]?[.\\d]*$");
		Matcher isNum = pattern.matcher(str);
		return isNum.matches();
	}
}
