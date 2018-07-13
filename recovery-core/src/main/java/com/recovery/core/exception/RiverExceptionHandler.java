package com.recovery.core.exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.river.core.helper.StringHelper;

@ControllerAdvice
public class RiverExceptionHandler {
	  private static final Logger logger = LoggerFactory.getLogger(RiverExceptionHandler.class);
	    
	    /**
	     * 
	     * 功能描述: <br>
	     * 应用上下文设值给Model对象
	     * 在jsp中使用:${ctx}
	     *
	     * @param request
	     * @return
	     * @see [相关类/方法](可选)
	     * @since [产品/模块版本](可选)
	     */
	    @ModelAttribute(value="ctx")
	    public String setContextPath(HttpServletRequest request){
	        return request.getContextPath();
	    }
	    
	    /**
	     * 
	     * 错误处理器
	     *
	     * @param e
	     * @return
	     * @see [相关类/方法](可选)
	     * @since [产品/模块版本](可选)
	     */
	    @ExceptionHandler
	    public String handleIOException(HttpServletRequest request,HttpServletResponse response,Model model,Exception e) {
	        String requestType = request.getHeader("X-Requested-With");
	        if(StringHelper.isNotEmpty(requestType)){
	            try {
	                response.setCharacterEncoding("UTF-8");  
	                response.setContentType("application/json; charset=utf-8");
	                PrintWriter writer = response.getWriter();
	                //具体操作
	                writer.write("json...");
	                //
	                writer.flush();
	                writer.close();
	                return null;
	            } catch (IOException e1) {
	            	logger.error(e1.getMessage());
	            }
	            
	        }
	        return "redirect:/error";
	    }

}  