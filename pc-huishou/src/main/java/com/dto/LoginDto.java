package com.dto;

import com.model.validate.Login;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Size;
import java.util.Date;

/**   
 * Description: TODO
 * @author  guolw
 */
@Data
@Api(value="用户登陆传入的对象")
public class LoginDto {
	
	@ApiModelProperty(value = "用户名")
    @Size(min = 2, max = 8,message="名字长度不必须是2-8个字符",groups = {Login.class})
	private String name;
	
	@ApiModelProperty(value = "密码")
    @Size(min = 6, max = 8,message="登陆密码输入长度错误",groups={Login.class})
	private String password;
	
	@ApiModelProperty(value = "登陆时间")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date loginTime;
	
	@ApiModelProperty(value = "签名证书")
	private String sign;

}
