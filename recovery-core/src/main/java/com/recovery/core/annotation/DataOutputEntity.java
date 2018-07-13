package com.recovery.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataOutputEntity {
	
	/**
	 * 设置要导出的文件名
	 * @return
	 */
	/*String excelName() default "";*/
	
	/**
	 * 设置excel表格中的表头
	 * @return
	 */
	String titleName() default "";
	
	/**
	 * 设置导出的文件名是否需要加时间
	 * @return
	 */
	/*boolean isAppendTimeToExcelName() default false;*/
	
	/**
	 * 导出时，是否需要设置序号
	 * @return
	 */
	boolean isNum() default false;
}
