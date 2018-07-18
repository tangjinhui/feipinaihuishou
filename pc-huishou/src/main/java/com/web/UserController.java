package com.web;

import com.common.result.PageDto;
import com.common.result.ResultDto;
import com.dto.UserDto;
import com.model.User;
import com.model.validate.Save;
import com.model.validate.Update;
import com.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static com.common.check.CheckUtil.hasErrors;


/**   
 * Description: 用户管理的基础类
 * @author guolw
 */
@RestController
@Slf4j
@Api(tags = {"用户管理的基础类Api文档"})
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/user/save",method = RequestMethod.GET)
    @ApiOperation(value = "保存用户")
	@ApiImplicitParams({
			@ApiImplicitParam(paramType = "query", name = "name", value = "用户名字"),
			@ApiImplicitParam(paramType = "query", name = "phone", value = "用户手机号"),
			@ApiImplicitParam(paramType = "query", name = "token", value = "登录token"),
	})
	public void saveUser(HttpServletRequest request, String name, String phone, String token){
		UserDto userDto = UserDto.builder().name(name).phone(phone).token(token).build();
		userService.saveUser(userDto);
	}
	
	
	@PostMapping("/user/delete")
    @ApiOperation(value = "删除用户")
	public ResultDto<Boolean> deleteUser(@RequestParam Integer id){
		ResultDto<Boolean> resultDto = new ResultDto<>();
		resultDto.setData(userService.deleteUser(id));
		return resultDto;
	}
	
	
	@PostMapping("/user/update")
    @ApiOperation(value = "更新用户,使用@Validated分组{update}校验数据")
	public ResultDto<Boolean> updateUser(@RequestBody @Validated(value={Update.class})User user, BindingResult bindingResult){
		ResultDto<Boolean> resultDto = new ResultDto<>();
		//分组数据校验校验处理，返回的处理
		hasErrors(bindingResult);
		resultDto.setData(userService.updateUser(user));
		return resultDto;
	}
	
	
	@GetMapping("/user/getUserByid")
    @ApiOperation(value = "根据id查询用户")
	public ResultDto<User> getUserByid(@RequestParam Integer id){
		ResultDto<User> resultDto = new ResultDto<>();
		resultDto.setData(userService.getUserByid(id));
		return resultDto;
	}
	
	
	@GetMapping("/user/list")
    @ApiOperation(value = "获得用户列表")
	public ResultDto<PageDto<User>> listUser(){
		ResultDto<PageDto<User>> resultDto = new ResultDto<>();
		resultDto.setData(userService.listUser());
		return resultDto;
	}
	
	@GetMapping("/user/listPage")
    @ApiOperation(value = "获得用户列表")
	public ResultDto<PageDto<User>> listPage(@RequestParam Integer page,@RequestParam Integer size){
		ResultDto<PageDto<User>> resultDto = new ResultDto<>();
		resultDto.setData(userService.listPage(page,size));
		return resultDto;
	}
	
	@GetMapping("/user/countUser")
    @ApiOperation(value = "获得用户总数，在dao接口中写sql")
	public ResultDto<Integer> countUser(){
		ResultDto<Integer> resultDto = new ResultDto<>();
		resultDto.setData(userService.countUser());
		return resultDto;
	}
	
	@GetMapping("/user/countUser2")
    @ApiOperation(value = "获得用户总数，在xml文件中写sql")
	public ResultDto<Integer> countUser2(){
		ResultDto<Integer> resultDto = new ResultDto<>();
		resultDto.setData(userService.countUser2());
		return resultDto;
	}
	
	
	@GetMapping("/user/testList")
    @ApiOperation(value = "后台处理数据使用到流")
	public ResultDto<PageDto<User>> testList(){
		ResultDto<PageDto<User>> resultDto = new ResultDto<>();
		resultDto.setData(userService.testList());
		return resultDto;
	}
	
	@GetMapping("/user/testparalle")
    @ApiOperation(value = "测试并行流")
	public ResultDto<PageDto<User>> testparalle(){
		ResultDto<PageDto<User>> resultDto = new ResultDto<>();
		resultDto.setData(userService.testparalle());
		return resultDto;
	}
	
	@GetMapping("/user/testLog")
    @ApiOperation(value = "后台测试log级别的")
	public ResultDto<Boolean> testLog(){
		log.info("info ....");
		log.debug("debug ...");
		ResultDto<Boolean> resultDto = new ResultDto<>();
		return resultDto;
	}





}
