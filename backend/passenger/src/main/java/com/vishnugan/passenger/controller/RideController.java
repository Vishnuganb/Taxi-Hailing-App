package com.vishnugan.passenger.controller;

import com.vishnugan.passenger.config.RideKafkaProducer;
import com.vishnugan.passenger.dto.PassengerRequestedRideEventDTO;
import com.vishnugan.passenger.message.MessageRequest;
import com.vishnugan.passenger.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/auth")
public class RideController {

    private final RideKafkaProducer rideKafkaProducer;

    @PostMapping("/rides/create")
    public void publish(@RequestBody PassengerRequestedRideEventDTO rideRequest) {

        rideKafkaProducer.sendPassengerRequestedRideEvent(rideRequest);

    }

}
