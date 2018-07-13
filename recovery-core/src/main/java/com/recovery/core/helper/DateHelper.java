package com.recovery.core.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * 时间格式通用处理
 * @author Yinovo
 *
 */
public class DateHelper {
	public static String DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static String YYYYMMDD = "yyyy-MM-dd";
	public static String HHMMSS = "HH:mm:ss";
	public static final String yyyyMMdd="yyyyMMdd";
	public static final String milliseconds="yyyy-MM-dd HH::mm:ss SSS";
	
	
	public static Date stringToDate(String date) {
		try {
			SimpleDateFormat sf = new SimpleDateFormat(DEFAULT_DATE_FORMAT);
			return sf.parse(date);
		} catch (ParseException e) {

		}
		return null;
	}
	public static Date stringToDate(String date, String format) {
		try {
			SimpleDateFormat sf = new SimpleDateFormat(format);
			return sf.parse(date);
		} catch (ParseException e) {
			
		}
		return null;
	}
	public static String dateToString(Date date) {
		SimpleDateFormat sf = new SimpleDateFormat(DEFAULT_DATE_FORMAT);
		return sf.format(date);
	}

	public static String dateToString(Date date, String format) {
		SimpleDateFormat sf = new SimpleDateFormat(format);
		return sf.format(date);
	}

	public static Date now() {
		return new Date();
	}

	public static String nowStr() {
		return dateToString(new Date());
	}

	public static Date getDate(long timeMillis) {
		return new Date(timeMillis);
	}

	public static String longToString(long timeMillis) {
		return dateToString(getDate(timeMillis));
	}

	public static String stringToLongstr(String date) {
		return String.valueOf(stringToDate(date).getTime());
	}

	public static String addOrMinus(String dateStr, int unit, int cnt) throws Exception {
		Date date = stringToDate(dateStr);
		Date rtn =addOrMinus(date,unit,cnt);
		return dateToString(rtn);
	}

	public static Date addOrMinus(Date date, int unit, int cnt) throws Exception {
		GregorianCalendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.add(unit, cnt);
		return cal.getTime();
	}

	public static String today() {
		return dateToString(now(), YYYYMMDD);
	}

	public static String yestoday() throws Exception {
		return dateToString(addOrMinus(now(), Calendar.DAY_OF_MONTH, -1), "yyyy-MM-dd");
	}

	public static String getMondayOfLastWeek() {
		Calendar c = Calendar.getInstance();
		int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0)
			day_of_week = 7;
		c.add(Calendar.DATE, -day_of_week - 6);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	
	public static String getFirstDayOfThisMonth() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_MONTH,1);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	
	public static String getEndDayOfThisMonth() {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MONTH,1);
		c.set(Calendar.DAY_OF_MONTH,1);
		c.add(Calendar.DATE,-1);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	public static String getFirstDayOfThisYear() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MONTH,0);
		c.set(Calendar.DAY_OF_MONTH,1);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	
	public static String getEndDayOfThisYear() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.MONTH,11);
		c.set(Calendar.DAY_OF_MONTH,31);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	
	public static String getFirstDayOfThisQuarter() {
		Calendar c = Calendar.getInstance();
		int currentMonth = c.get(Calendar.MONTH) + 1;
        try {
            if (currentMonth >= 1 && currentMonth <= 3)
                c.set(Calendar.MONTH, 0);
            else if (currentMonth >= 4 && currentMonth <= 6)
                c.set(Calendar.MONTH, 3);
            else if (currentMonth >= 7 && currentMonth <= 9)
                c.set(Calendar.MONTH, 6);
            else if (currentMonth >= 10 && currentMonth <= 12)
                c.set(Calendar.MONTH, 9);
            c.set(Calendar.DATE, 1);
        } catch (Exception e) {
            e.printStackTrace();
        }
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	
	public static String getEndDayOfThisQuarter() {
		Calendar c = Calendar.getInstance();
		int currentMonth = c.get(Calendar.MONTH) + 1;
		try {
            if (currentMonth >= 1 && currentMonth <= 3) {
                c.set(Calendar.MONTH, 2);
                c.set(Calendar.DATE, 31);
            } else if (currentMonth >= 4 && currentMonth <= 6) {
                c.set(Calendar.MONTH, 5);
                c.set(Calendar.DATE, 30);
            } else if (currentMonth >= 7 && currentMonth <= 9) {
                c.set(Calendar.MONTH, 8);
                c.set(Calendar.DATE, 30);
            } else if (currentMonth >= 10 && currentMonth <= 12) {
                c.set(Calendar.MONTH, 11);
                c.set(Calendar.DATE, 31);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	
	public static String getSundayOfLastWeek() {
		Calendar c = Calendar.getInstance();
		int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0)
			day_of_week = 7;
		c.add(Calendar.DATE, -day_of_week);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	/**
	 * 
	 * @return
	 */
	public static String getMondayOfThisWeek() {
		Calendar c = Calendar.getInstance();
		int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0)
			day_of_week = 7;
		c.add(Calendar.DATE, -day_of_week + 1);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	/**
	 * 
	 * @return
	 */
	public static String getSundayOfThisWeek() {
		Calendar c = Calendar.getInstance();
		int day_of_week = c.get(Calendar.DAY_OF_WEEK) - 1;
		if (day_of_week == 0)
			day_of_week = 7;
		c.add(Calendar.DATE, -day_of_week + 7);
		return new SimpleDateFormat(YYYYMMDD).format(c.getTime());
	}
	/**
	 * 
	 * @param start
	 * @param end
	 * @return
	 */
	public static List<String> getDateList(String start,String end){
		List<String> list=new ArrayList<String>();
		
		return list;
	}
	/**
	 * 
	 * @param strDate
	 * @param format
	 * @return
	 */
	public static Calendar toCalendar(String strDate,String format){
		Calendar c =Calendar.getInstance();
		Date t=stringToDate(strDate,format);
		c.setTime(t);
		return c;
	}
	public static int getMonth(Calendar c){
		return c.get(Calendar.MONTH);
	}
	public static int getYear(Calendar c){
		return c.get(Calendar.YEAR);
	}
	public static int getDay(Calendar c){
		return c.get(Calendar.DAY_OF_MONTH);
	}
	/**
	 * 判断是否是时间类型
	 * @param obj
	 * @return
	 */
	public static boolean isDate(Object obj) {
		if (obj == null)
			return false;
		if (obj instanceof Date) {
			return true;
		}
		Date dateTemp = ObjectHelper.toDate(obj);
		if (dateTemp == null)
			return false;
		return true;
	}

	/**
	 * 格式化为指定格式
	 * 
	 * @param date
	 * @param fmt
	 * @return
	 */
	public static String format(Date date, String fmt) {
		if (date == null)
			return "";
		SimpleDateFormat format = new SimpleDateFormat(fmt);
		return format.format(date);
	}

	/**
	 * 格式化为默认常用时间格式
	 * 
	 * @param date
	 * @return
	 */
	public static String format(Date date) {
		return format(date, DEFAULT_DATE_FORMAT);
	}
/*	public static void main(String[] args) {
		System.out.println(Calendar.DAY_OF_WEEK);
	}*/
}
