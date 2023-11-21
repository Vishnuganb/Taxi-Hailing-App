package com.vishnugan.driver.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic acceptedRideTopic() {
        return TopicBuilder.name("passenger-accepted-ride")
                .build();
    }

    @Bean
    public NewTopic finishedRideTopic() {
        return TopicBuilder.name("passenger-finished-ride")
                .build();
    }
}
