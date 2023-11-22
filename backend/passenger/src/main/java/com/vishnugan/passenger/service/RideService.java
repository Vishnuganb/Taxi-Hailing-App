package com.vishnugan.passenger.service;

import com.vishnugan.passenger.message.MessageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RideService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void publish(MessageRequest messageRequest) {
        kafkaTemplate.send("ride-requests", messageRequest.message());
    }
}
