package com.recovery.core.utils;

import java.util.List;


public class ListToString {
	
	public static String toString(List list) {
		StringBuffer str = new StringBuffer();
		for(int i = 0 ; i < list.size() ; i++) {
			str.append(list.get(i));
			if(i < list.size() - 1) {
				str.append(",");
			}
		}
		return str.toString();
	}
}
