package com.vishnugan.ride.config;

import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @KafkaListener(
            topics = "passenger-requested-ride",
            groupId = "passenger-requested-ride-group-id"
    )
    void listener( String data ) {

        System.out.println("Data received from Kafka: " + data);

    }


}

