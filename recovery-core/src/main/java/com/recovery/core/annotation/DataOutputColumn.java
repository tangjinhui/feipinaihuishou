package com.recovery.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DataOutputColumn {

	/**
	 * 对应的列名（在excel中对应的列名）
	 * 
	 * @return
	 */
	String columnName();

	/**
	 * 是需要字典翻译
	 * 
	 * @return
	 */
	boolean isDictionary() default false;

	/**
	 * 对应的字典类型
	 * 
	 * @return
	 */
	String dictionaryCode() default "";

	/**
	 * 是否是其他表中的内容
	 * 
	 * @return
	 */
	boolean isConvertValue() default false;

	/**
	 * 对应的Mapper
	 * 
	 * @return
	 */
	String mapperName() default "";

	/**
	 * 对应的方法名
	 * 
	 * @return
	 */
	String mapperMethod() default "";

	/**
	 * 取哪个属性的值
	 * 
	 * @return
	 */
	String resultValue() default "";

	/**
	 * 是否是日期
	 * 
	 * @return
	 */
	boolean isDate() default false;

	/**
	 * 格式
	 * 
	 * @return
	 */
	String fomat() default "yyyy/MM/dd";

}
