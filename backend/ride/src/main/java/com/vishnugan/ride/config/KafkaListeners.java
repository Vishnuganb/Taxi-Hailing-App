package com.vishnugan.ride.config;

import com.vishnugan.ride.controller.RideController;
import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

@Component
@RequiredArgsConstructor
public class KafkaListeners {

    private final RideController rideController;

    @KafkaListener(
            topics = "passenger-requested-ride",
            groupId = "passenger-requested-ride-group-id"
    )
    void listener( String data ) {

        System.out.println("Data received from Kafka: " + data);

//        rideController.createRide(@RequestBody data);

    }


}

