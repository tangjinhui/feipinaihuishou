package com.recovery.core.helper;

import java.util.TreeMap;

/**
 * 导出的字段，排序
 * @author my
 *
 */
public interface DataOutputColumnOrder {
	
	/**
	 * Map key 为数字，数字越小，越靠前，value 为字段名称
	 * @return
	 */
	TreeMap<Integer,String> columnOrder();
}
