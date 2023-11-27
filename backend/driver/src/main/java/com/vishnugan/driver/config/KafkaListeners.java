package com.vishnugan.driver.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vishnugan.driver.repo.RideRepository;
import com.vishnugan.driver.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.vishnugan.driver.dto.PassengerRequestedRideEventWithIdDTO;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;

@Component
@RequiredArgsConstructor
public class KafkaListeners {

    private final RideRepository rideRepository;

    @KafkaListener(
            topics = "passenger-requested-ride",
            groupId = "passenger-requested-ride-group-id"
    )
    void listener(
           @Payload String data,
           @Headers MessageHeaders headers
    ) {
        System.out.println("Data received from Kafka: " + data);
        System.out.println("Headers received from Kafka: " + headers);

        // assign data to dto
        PassengerRequestedRideEventWithIdDTO passengerRequestedRideEventDTO = parseJsonToDto(data);
        System.out.println("DTO: " + passengerRequestedRideEventDTO);

        // save to database
        rideRepository.save(
                passengerRequestedRideEventDTO.toEntity()
        );

    }

    private PassengerRequestedRideEventWithIdDTO parseJsonToDto(String jsonString) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonString, PassengerRequestedRideEventWithIdDTO.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
