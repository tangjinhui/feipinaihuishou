package com.recovery.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration  
public class SwaggerConfig {
	
	@Bean
	public Docket adminApi(){
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.useDefaultResponseMessages(false);
	}

	/**
	 * 
	 * @return
	 */
	private ApiInfo apiInfo(){
		Contact contact = new Contact("Yinovo", "https://yinovo.com/", "22922803@qq.com");
		return new ApiInfoBuilder()
				.title("River API Document")
				.description("River API Document")
				.license("River Alpha Version")
				.contact(contact)
				.version("1.0")
				.build();
	}
}
