package com.miniproject.omakase.backend;

import com.miniproject.omakase.backend.utils.ListMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	@Bean
	public ListMapper listMapper(){
		return ListMapper.getInstance();
	}
}
