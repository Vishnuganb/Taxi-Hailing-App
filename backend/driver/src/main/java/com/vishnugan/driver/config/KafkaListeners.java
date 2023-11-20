package com.vishnugan.driver.config;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @KafkaListener(topics  = "vishnugan",
            groupId = "vishnugan-group-id"
    )
    void listener (String data){

        System.out.println("Data received from Kafka: " + data );

    }

}
