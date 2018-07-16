package com.service;

import com.common.check.CheckUtil;
import com.common.util.MyToken;
import com.common.util.UserUtil;
import com.dao.UserDao;
import com.dto.LoginDto;
import com.dto.UserDto;
import com.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;


/**
 * Description: 登陆的类
 * @author  guolw
 */
@Service
@Slf4j
public class LoginService {
	
	@Autowired
	private UserDao userDao;
	
	public UserDto login(HttpSession session, LoginDto loginDto) {
		// TODO 校验logintime sign等
		User user = User.builder()
						.name(loginDto.getName())
						.password(loginDto.getPassword())
						.build();
		user = userDao.selectOne(user);
		CheckUtil.notNull(user, "用户名或密码错误");
		String Token = MyToken.getToken(loginDto);
		UserDto userDto = UserDto.builder()
				.name(user.getName())
				.phone(user.getPhone())
				.token(Token)
				.build();
		//需要将用户信息存放到静态类中，或者redis中
		session.setAttribute(UserUtil.KEY_USER, user.getName());
		return userDto;
	}


	public Boolean loginOut(LoginDto loginDto) {
		return null;
	}


}

