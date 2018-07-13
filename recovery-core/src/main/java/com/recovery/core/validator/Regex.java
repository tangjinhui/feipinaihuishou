package com.recovery.core.validator;

/**
 * 常用正则表达式，部分未经过验证核对，使用时请务必检查
 * @author Yinovo
 *
 */
public class Regex {
	//全部是数字
	public final static String NUMBER_ONLY="^[0-9]*$ ";
	//正整数
	public final static String UNSIGNED_INT="^[1-9][0-9]\\d*$";
	//中文字符
	public final static String CHINESE="^[\u4e00-\u9fa5]{0,}$";
	//大小写字母、数字、下划线
	public final static String CODE="^[A-Za-z0-9_]+$";
	//仅英文字母
	public final static String ONLY_EN="^[A-Za-z]+$";
	//中文、字母、数字、下划线
	public final static String CN_EN_NUM="^[\u4E00-\u9FA5A-Za-z0-9_]+$";
	//电子邮件
	public final static String EMAIL="^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
	//域名
	public final static String DOMAIN="[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?";
	//URL
	public final static String URL="^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$";
	//国内手机号码
	public final static String MOBILE="^(1[1-9][0-9])\\d{8}$";
	//国内座机
	public final static String TELEPHONE="^0\\d{2,3})-\\d{7,8}$";
	//国内身份证号码
	public final static String CARD_NO="^[1-9]\\d{5}\\d{4}((0[1-9])|(1[0-2]))((0[1-9])|([1|2][0-9]|)|(3[0|1]))\\d{3}[0-9Xx]$";
	//双字节
	public final static String DOUBLE_BYTE="[^\\x00-\\xff]";
	//邮政编码
	public final static String POST_CODE="^[1-9]\\d{5}(?!\\d)$";
	//IP地址
	public final static String IP_ADDRESS="((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))";
}
