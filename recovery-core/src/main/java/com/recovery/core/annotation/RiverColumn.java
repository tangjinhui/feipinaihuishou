package com.recovery.core.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RiverColumn {
    /**
     * 数据表字段名
     * @return
     */
    public String Name() default "";
    
    /**
     * 字段描述
     * @return
     */
    public String desc() default "";
    /**
     * 是否自增
     * @return
     */
    public boolean isAutoKey() default false;
    /**
     * GUID
     * @return
     */
    public boolean isGUID() default false;
    /**
     * 是否是创建时间
     * @return
     */
    public boolean isCreateTime() default false;
    public boolean isUpdateTime() default false;
    public boolean isDisableTime() default false;
    public boolean isDeleteTime() default false;
    public boolean isParentId() default false;
}