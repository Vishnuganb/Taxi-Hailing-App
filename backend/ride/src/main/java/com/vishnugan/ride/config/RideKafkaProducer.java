package com.vishnugan.ride.config;

import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RideKafkaProducer {

    private final KafkaTemplate<String, PassengerRequestedRideEventDTO> kafkaTemplate;

    public void sendPassengerRequestedRideEvent(PassengerRequestedRideEventDTO event) {
        kafkaTemplate.send("passenger-requested-ride", event);
    }

}
