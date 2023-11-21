package com.vishnugan.ride.config;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @KafkaListener(topics  = "ride-requests",
            groupId = "ride-requests-group-id"
    )
    void listener (String data){

        System.out.println("Data received from Kafka: " + data );

    }

}
