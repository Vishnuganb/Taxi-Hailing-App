package com.vishnugan.ride.controller;

import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import com.vishnugan.ride.message.MessageRequest;
import com.vishnugan.ride.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class MessageController {

    private final MessageService messageService;

    @PostMapping("/requestRide")
    public void requestRide(@RequestBody PassengerRequestedRideEventDTO event) {
        messageService.publish(event);
    }

}
