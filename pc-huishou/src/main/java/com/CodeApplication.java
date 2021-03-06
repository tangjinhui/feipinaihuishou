package com;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author guolw
 *
 */
@SpringBootApplication
@Slf4j
public class CodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeApplication.class, args);
		log.info("***哟哟切克闹 项目启动啦  哟哟切克闹***");
	}
}
