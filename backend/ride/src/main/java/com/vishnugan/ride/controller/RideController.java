package com.vishnugan.ride.controller;

import com.vishnugan.ride.config.RideKafkaProducer;
import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import com.vishnugan.ride.entity.Ride;
import com.vishnugan.ride.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("/rides")
public class RideController {

    private final RideService rideService;
    private final RideKafkaProducer rideKafkaProducer;

    @PostMapping("/create")
    public ResponseEntity<Ride> createRide(@RequestBody Ride ride) {
        System.out.println("RideController.createRide");
        Ride createdRide = rideService.createRide(ride);

        if (createdRide != null) {
            PassengerRequestedRideEventDTO kafkaEvent = new PassengerRequestedRideEventDTO();
            kafkaEvent.setRideId(createdRide.getId());
            kafkaEvent.setPickupLocation(createdRide.getPickupLocation());
            kafkaEvent.setDropLocation(createdRide.getDropLocation());
            kafkaEvent.setVehicleType(createdRide.getVehicleType());
            kafkaEvent.setStatus(createdRide.getStatus());

            // Publish the Kafka message
            rideKafkaProducer.sendPassengerRequestedRideEvent(kafkaEvent);
        }

        return new ResponseEntity<>(createdRide, HttpStatus.CREATED);
    }

}
