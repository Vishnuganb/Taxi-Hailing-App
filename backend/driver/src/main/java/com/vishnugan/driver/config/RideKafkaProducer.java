package com.vishnugan.driver.config;

import com.vishnugan.driver.dto.PassengerRequestedRideEventWithIdDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RideKafkaProducer {

//    private final KafkaTemplate<String, PassengerRequestedRideEventWithIdDTO> kafkaTemplate;
//
//    public void sendPassengerRequestedRideEvent(PassengerRequestedRideEventWithIdDTO event) {
//        kafkaTemplate.send("ride-requests-vehicle-pending", event);
//    }

}
