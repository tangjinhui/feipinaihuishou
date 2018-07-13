package com.recovery.core.helper;

import java.lang.reflect.Field;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.river.core.helper.DateHelper;
import com.river.core.validator.StringValidator;

public class ObjectHelper {
	/**
	 * 判断对象是否为NULL
	 * @param obj
	 * @return
	 */
	public static boolean isNull(Object obj){
		if(obj==null) return true;
		return false;
	}
	/**
	 * 转化为String
	 * @param obj
	 * @return
	 */
	public static String toString(Object obj){
		if(isNull(obj)) return "";
		return obj.toString();
	}
	/**
	 * 转化为时间类型
	 * @param obj
	 * @return
	 */
	public static Date toDate(Object obj,String fmt,Date defaultDate){
		if(isNull(obj)) return defaultDate;
		if(StringValidator.isNullOrEmpty(fmt))
			fmt=DateHelper.DEFAULT_DATE_FORMAT;
		try{
			SimpleDateFormat format=new SimpleDateFormat(fmt);
			System.out.println(obj.toString());
			return format.parse(obj.toString());
		}catch(ParseException ex){
			return defaultDate;
		}
	}
	/**
	 * 
	 * @param obj
	 * @return
	 */
	public static Date toDate(Object obj){
		return toDate(obj,DateHelper.DEFAULT_DATE_FORMAT,null);
	}
	/**
	 * 
	 * @param obj
	 * @param defaultDate 默认时间
	 * @return
	 */
	public static Date toDate(Object obj,Date defaultDate){
		return toDate(obj,DateHelper.DEFAULT_DATE_FORMAT,defaultDate);
	}
	/**
	 * 
	 * @param obj
	 * @return
	 */
	public static Integer toInteger(Object obj){
		return toInteger(obj,null);
	}
	/**
	 * 
	 * @param obj
	 * @param defaultValue 默认整型数值
	 * @return
	 */
	public static Integer toInteger(Object obj,Integer defaultValue){
		if(obj==null) return defaultValue;
		try{
			return Integer.parseInt(obj.toString());
		}catch(NumberFormatException ex){
			return defaultValue;
		}
	}
	/**
	 * 
	 * @param src
	 * @param des
	 */
	public static void Copy(Object src,Object des){
		if(src==null || des==null) return;
		Class<?> srcCls=src.getClass();
		Field[] fields=srcCls.getFields();//这里的异常暂未捕捉
		Field field,f2;
		Object v1=null;//取值
		Class<?> desCls=des.getClass();
		for(int i=0;i<fields.length;i++){
			field=fields[i];
			try {
				v1=field.get(src);
			} catch (IllegalArgumentException | IllegalAccessException e) {
				System.out.println("属性"+field.getName()+"访问异常-跳过");
				continue;
			}
			if(v1==null) continue;//跳过为NULL的值
			try{
				f2=desCls.getField(field.getName());
				f2.set(des, v1);
			}catch(NoSuchFieldException |SecurityException | IllegalArgumentException | IllegalAccessException ex){
				System.out.println("属性"+field.getName()+"不存在或者不允许访问-跳过");
				continue;
			}
		}
	}
}
