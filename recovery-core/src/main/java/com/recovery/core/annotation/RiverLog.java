package com.recovery.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RiverLog {
    /**
     * 日志标题
     * @return
     */
    public String title() default "";
    
    /**
     * 日志描述
     * @return
     */
    public String desc() default "";
}