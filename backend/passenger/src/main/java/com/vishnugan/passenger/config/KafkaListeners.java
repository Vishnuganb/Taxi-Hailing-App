package com.vishnugan.passenger.config;

import com.vishnugan.passenger.controller.RideController;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaListeners {

    private final RideController rideController;

    @KafkaListener(
            topics = "passenger-accepted-ride",
            groupId = "passenger-accepted-ride-group-id-3"
    )
    void handleRideAcceptance(@Payload String message) { // Handle the ride acceptance here
        System.out.println("Received message from Kafka: " + message);
        Long rideId = extractRideIdFromMessage(message);
        rideController.updateRideStatus(rideId);
    }

    @KafkaListener(
            topics = "passenger-finished-ride",
            groupId = "passenger-accepted-ride-group-id-5"
    )
    void handleRideFinished(@Payload String message) { // Handle the ride acceptance here
        Long rideId = extractRideIdFromMessage(message);
        rideController.updateRideFinishStatus(rideId);
    }

    private Long extractRideIdFromMessage(String message) {
        try {
            String[] parts = message.split(" ");
            return Long.parseLong(parts[3]);
        } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
            e.printStackTrace();
            return null;
        }
    }

}
