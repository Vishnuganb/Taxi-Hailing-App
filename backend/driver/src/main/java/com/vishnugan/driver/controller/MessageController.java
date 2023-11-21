package com.vishnugan.driver.controller;

import com.vishnugan.driver.message.MessageRequest;
import com.vishnugan.driver.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class MessageController {

    private final MessageService messageService;

    @PostMapping("/messages")
    public void publish(@RequestBody MessageRequest messageRequest) {

        messageService.publish(messageRequest);

    }

}
