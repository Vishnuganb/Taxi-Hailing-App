package com.vishnugan.passenger.controller;

import com.vishnugan.passenger.auth.AuthenticationResponse;
import com.vishnugan.passenger.config.RideKafkaProducer;
import com.vishnugan.passenger.dto.PassengerRequestedRideEventDTO;
import com.vishnugan.passenger.entity.Ride;
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

    private final RideService rideService;

    @PostMapping("/rides/create")
    public Ride publish(@RequestBody PassengerRequestedRideEventDTO rideRequest) {
        return rideService.createRide(rideRequest);

    }

    public void updateRideStatus(Long rideId) {
        rideService.updateRideStatus(rideId);
    }

    public void updateRideFinishStatus(Long rideId) {
        rideService.updateRideFinishStatus(rideId);
    }

    @PostMapping("/confirmation")
    public ResponseEntity<AuthenticationResponse> confirmation(@RequestBody Ride rideRequest) {
        System.out.println(rideRequest);
        return (ResponseEntity<AuthenticationResponse>)rideService.confirmation(rideRequest);
    }

}
