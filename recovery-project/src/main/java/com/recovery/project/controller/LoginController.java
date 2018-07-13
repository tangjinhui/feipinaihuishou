package com.recovery.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {
  
	@RequestMapping("/index")
	public String loginIndex(){
		return "login";
	}
	
}
