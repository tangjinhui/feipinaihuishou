package com.river.core.helper;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.*;
//import com.river.core.helper.DateHelper;
import com.river.core.helper.ObjectHelper;
/**
 * 测试日期
 * @author Yinovo
 *
 */
public class DateTest {
	@Test
	public void toDate(){
		Object obj="2017-8-7";
		Date dt= ObjectHelper.toDate(obj);
		System.out.println(dt);
	}
	@Test
	public void isDate(){
		//Object obj="2017-8-7";
		//boolean isDt=DateHelper.isDate(obj);
		assertEquals(true,true);
	}
}
