package com.vishnugan.passenger.config;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaListeners {

        private final RideRepository rideRepository;
        private final KafkaTemplate<String, String> kafkaTemplate;

        @KafkaListener(
                topics = "passenger-accepted-ride",
                groupId = "passenger-accepted-ride-group-id"
        )
        void handleRideAcceptance(@Payload String message) { // Handle the ride acceptance here
            // extract relevant information from the message or adjust the message structure
            // Update the ride status in the database or perform any other necessary actions
            System.out.println("Received message from Kafka: " + message);
            // Extract ride ID and update the ride status
            Long rideId = extractRideIdFromMessage(message);
            updateRideStatus(rideId, "accepted");
        }

        // Your existing methods for processing ride requests, updating ride status, etc.
        // ...

        private Long extractRideIdFromMessage(String message) {
            // Example logic to extract ride ID from the message
            // You need to implement logic based on the actual message structure
            // For simplicity, let's assume the message is in the format "Ride with ID {rideId} accepted"
            String[] parts = message.split(" ");
            return Long.parseLong(parts[4]);
        }

        private void updateRideStatus(Long rideId, String status) {

        }

}
