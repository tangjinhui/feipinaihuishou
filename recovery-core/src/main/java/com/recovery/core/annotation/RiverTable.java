package com.recovery.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RiverTable {
    /**
     * 数据表名
     * @return
     */
    public String Name() default "";
    
    /**
     * 数据表主键
     * @return
     */
    public long PK() default -1;
    /**
     * 
     * @return
     */
    public String Code() default "";
    /**
     * 是否树形结构
     * @return
     */
    public boolean isTree() default false;
}