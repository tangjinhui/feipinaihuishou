package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

/**
 * @author guolw
 *
 */
@SpringBootApplication
@Slf4j
public class CodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeApplication.class, args);
		log.info("项目启动成功！");
	}
}
