package com.vishnugan.ride.service;

import com.vishnugan.ride.message.MessageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

    private KafkaTemplate<String, String> kafkaTemplate;

    public void publish(MessageRequest messageRequest) {
        kafkaTemplate.send("vishnugan", messageRequest.message());
    }
}
