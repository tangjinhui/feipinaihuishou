package com.web;


import com.common.result.ResultDto;
import com.service.RedisTestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**   
 * @author  guolw
 */
@RestController
@Api(tags = {"Redis测试类"})
public class RedisTestConTroller {


	@Autowired
	private RedisTestService redisTestService;

	@PostMapping("/redis/saveAndGet")
    @ApiOperation(value = "redis的测试类，传入内容，返回内容", notes="redis的测试类，传入内容，返回内容")
	public ResultDto<String> saveAndGet(@RequestParam String name) {
		ResultDto<String>  resultDto = new ResultDto<>();
		resultDto.setData(redisTestService.saveAndGet(name));
		return resultDto;
	}

	@PostMapping("/redis/saveUserByJson")
	@ApiOperation(value = "传入id，将用户信息以json存到redis中", notes="传入id，将用户信息以json存到redis中")
	public ResultDto<Boolean> saveUserByJson(@RequestParam Integer id) {
		ResultDto<Boolean>  resultDto = new ResultDto<>();
		resultDto.setData(redisTestService.saveUserByJson(id));
		return resultDto;
	}


	@PostMapping("/redis/saveUserBySerializer")
	@ApiOperation(value = "传入id，将用户信息以序列化存到redis中", notes="传入id，将用户信息以序列化存到redis中")
	public ResultDto<Boolean> saveUserBySerializer(@RequestParam Integer id) {
		ResultDto<Boolean>  resultDto = new ResultDto<>();
		resultDto.setData(redisTestService.saveUserBySerializer(id));
		return resultDto;
	}

	/*@PostMapping("/redis/getUserBySerializer")
	@ApiOperation(value = "传入id，将用户信息以序列化存到redis中", notes="传入id，将用户信息以序列化存到redis中")
	public ResultDto<UserDto> getUserBySerializer(@RequestParam String name) {
		ResultDto<UserDto>  resultDto = new ResultDto<>();
		resultDto.setData(redisTestService.getUserBySerializer(name));
		return resultDto;
	}
*/

}
