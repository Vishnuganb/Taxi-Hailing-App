package com.vishnugan.driver;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;

@SpringBootApplication
public class DriverApplication {

	public static void main(String[] args) {
		SpringApplication.run(DriverApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(KafkaTemplate<String, String> kafkaTemplate) {
		return args -> {
			for (int i = 0; i < 100; i++)
				kafkaTemplate.send("vishnugan", "Hello World :)" + i);
		};
	}

}
