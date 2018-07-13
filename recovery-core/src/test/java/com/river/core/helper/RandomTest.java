package com.river.core.helper;

import org.junit.Test;
import com.river.core.helper.NumberHelper;
import com.river.core.helper.StringHelper;

public class RandomTest {
	@Test
	public void testRandomInt(){
		double seed=1000;
		int len=5;
		int rdInt=NumberHelper.random(seed);
		System.out.println(rdInt);
		rdInt=NumberHelper.random(len);
		System.out.println(rdInt);
	}
	@Test
	public void testRandomString(){
		int length=6;
		String str=StringHelper.random(length);
		System.out.println(str);
	}
	
}
