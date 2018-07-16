package com.web;

import com.common.result.ResultDto;
import com.dto.LoginDto;
import com.dto.UserDto;
import com.model.validate.Login;
import com.service.LoginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

import static com.common.check.CheckUtil.hasErrors;


/**   
 * @author  guolw
 */
@RestController
@Api(tags = {"用户登陆Api文档"})
public class LoginConTroller {
	
	@Autowired
	private LoginService loginService;

	@PostMapping("/loginOut")
	@ApiOperation(value = "退出", notes="退出")
	public ResultDto<Boolean> loginOut(HttpSession session, @RequestBody @Validated(value = { Login.class }) LoginDto loginDto,
									   BindingResult bindingResult) {
		hasErrors (bindingResult);
		ResultDto<Boolean> resultDto = new ResultDto<>();
		resultDto.setData(loginService.loginOut(loginDto));
		return resultDto;
	}

	@PostMapping("/login")
	@ApiOperation(value = "登录", notes="登录")
	public ResultDto<UserDto> login(HttpSession session, @RequestBody @Validated(value = { Login.class }) LoginDto loginDto,
									BindingResult bindingResult) {
		hasErrors(bindingResult);
		ResultDto<UserDto> resultDto = new ResultDto<>();
		resultDto.setData(loginService.login(session,loginDto));
		return resultDto;
	}


}
