package com.interceptor;

/*import com.chngc.core.common.ResponseResult;
import com.chngc.core.util.JsonUtils;
import com.chngc.front.common.Constants;
import com.chngc.front.service.EsMemberService;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;*/
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class LoginInterceptor extends HandlerInterceptorAdapter {
    @Autowired
   // private EsMemberService esMemberService;

   /* @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        String memberId = esMemberService.getOnlineMemberId(request, response);
		//String memberId="360255";//392029  1408883  360255
        if (StringUtils.isBlank(memberId)) {
            ResponseResult responseResult = new ResponseResult();
            responseResult.setCode(Constants.NOLOGIN_CODE);
            responseResult.setMsg("未登陆");
            responseResult.setData(Maps.newHashMap());
            response.setHeader("content-type", "application/json;charset=UTF-8");
            String result = JsonUtils.toJsonStr(responseResult);
            String callback = request.getParameter("callback");
            if (StringUtils.isNotBlank(callback)) {
                result = callback + "(" + result + ")";
            }
            response.getWriter().write(result);
            return false;
        } else {
            log.debug("会员" + memberId + "在登录状态");
            request.setAttribute(Constants.ONLINE_MEMBERID, memberId);
            return true;
        }
    }*/

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }
}
