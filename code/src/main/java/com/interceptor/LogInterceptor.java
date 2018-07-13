package com.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.NamedThreadLocal;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 日志拦截器
 * @author sunruimin
 * @version 2017-11-07
 */
@Slf4j
public class LogInterceptor implements HandlerInterceptor {
    private static final ThreadLocal<Long> START_TIME_THREAD_LOCAL = new NamedThreadLocal<Long>("ThreadLocal Time");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long beginTime = System.currentTimeMillis();
        //线程绑定变量（该数据只有当前请求的线程可见）
        START_TIME_THREAD_LOCAL.set(beginTime);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {
        long beginTime = START_TIME_THREAD_LOCAL.get(); //得到线程绑定的局部变量（开始时间）
        long endTime = System.currentTimeMillis();    //2、结束时间
        log.debug("【URI】: " + request.getRequestURI() + "  【耗时】：" + (endTime - beginTime) + "ms");
    }
}
