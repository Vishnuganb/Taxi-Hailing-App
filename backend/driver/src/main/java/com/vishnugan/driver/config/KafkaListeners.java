package com.vishnugan.driver.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vishnugan.driver.entity.Ride;
import com.vishnugan.driver.repo.RideRepository;
import com.vishnugan.driver.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.vishnugan.driver.dto.PassengerRequestedRideEventDTO;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaListeners {

    private final RideRepository rideRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @KafkaListener(
            topics = "passenger-requested-ride",
            groupId = "passenger-requested-ride-group-id-2"
    )
    void listener(
           @Payload String data,
           @Headers MessageHeaders headers
    ) {
        System.out.println("Data received from Kafka: " + data);
        System.out.println("Headers received from Kafka: " + headers);

        // assign data to dto
        PassengerRequestedRideEventDTO passengerRequestedRideEventDTO = parseJsonToDto(data);
        System.out.println("DTO: " + passengerRequestedRideEventDTO);

        // Process the ride request
        var requestStatus = processRideRequest(passengerRequestedRideEventDTO);

        if (requestStatus) {
            storeRideDetails(passengerRequestedRideEventDTO);
        }
//
//        // Respond back to Passenger Microservice or update ride status.
//        sendResponseToPassengerMicroservice(passengerRequestedRideEventDTO.getRideId());
    }

    private PassengerRequestedRideEventDTO parseJsonToDto(String jsonString) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, PassengerRequestedRideEventDTO.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    private Boolean processRideRequest(PassengerRequestedRideEventDTO rideRequest) {
        // Retrieve information from the event DTO
        Long rideId = rideRequest.getRideId();
        String pickupLocation = rideRequest.getPickupLocation();
        String dropLocation = rideRequest.getDropLocation();
        String vehicleType = rideRequest.getVehicleType();

        // Check if the requested vehicle type is acceptable
        boolean isVehicleTypeAcceptable = checkVehicleTypeAcceptability(vehicleType);

        // Check if the pickup and drop locations are within the service area
        boolean isServiceAreaValid = checkServiceAreaValidity(pickupLocation, dropLocation);

        // determine if the ride request can be accepted
        if (isVehicleTypeAcceptable && isServiceAreaValid) {
            // Logic to accept the ride request
            // acceptRideRequest(rideId);
            return true;
        } else {
            // Logic to reject the ride request
            // rejectRideRequest(rideId);
            return false;
        }
    }

    private void storeRideDetails(PassengerRequestedRideEventDTO rideRequest) {
        rideRepository.save(
                new Ride(
                        rideRequest.getRideId(),
                        rideRequest.getPickupLocation(),
                        rideRequest.getDropLocation(),
                        rideRequest.getVehicleType(),
                        rideRequest.getStatus()
                )
        );
    }

    private boolean checkVehicleTypeAcceptability(String vehicleType) {
        // Your logic to check if the vehicle type is acceptable goes here
        // You might want to compare it against a predefined list of acceptable vehicle types
        return true;
    }

    private boolean checkServiceAreaValidity(String pickupLocation, String dropLocation) {
        // Your logic to check if the pickup and drop locations are within the service area goes here
        // You might want to compare them against a predefined service area
        return true; // Replace with actual logic
    }

    private void sendResponseToPassengerMicroservice(Long rideId) {
        // Send a response back to the Passenger Microservice or update ride status.
        // You can use another Kafka topic or make an API call.
        // For simplicity, let's assume you are sending a Kafka message to update ride status.
        kafkaTemplate.send("passenger-ride-status-updated", "Ride with ID " + rideId + " status updated");
    }
}
