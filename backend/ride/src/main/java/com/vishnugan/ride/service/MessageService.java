package com.vishnugan.ride.service;

import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final KafkaTemplate<String, PassengerRequestedRideEventDTO> kafkaTemplate;

    public void publish(PassengerRequestedRideEventDTO event) {
        kafkaTemplate.send("passenger-requested-ride", event);
    }
}