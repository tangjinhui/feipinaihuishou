package com.recovery.core.annotation;

import java.lang.Class;
import java.lang.reflect.Method;

public class AnnotationHelper {

	/**
	 * 日志信息
	 * @param method
	 * @return
	 */
	public static RiverLog getLog(Method method) {
		if(method==null) return null;
		if (method.isAnnotationPresent(RiverLog.class)) {
			return (RiverLog) method.getAnnotation(RiverLog.class);
		}
		return null;
	}
	/**
	 * 获取类的申明
	 * @param entityClass
	 * @return
	 */
	public static RiverTable getTable(Class<?> entityClass){
		if(entityClass==null) return null;
		if (entityClass.isAnnotationPresent(RiverTable.class)) {
			return (RiverTable) entityClass.getAnnotation(RiverTable.class);
		}
		return null;
	}
}
