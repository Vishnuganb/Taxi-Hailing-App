package com.vishnugan.ride.controller;

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

    @PostMapping("/create")
    public ResponseEntity<Ride> createRide(@RequestBody Ride ride) {
        System.out.println("RideController.createRide");
        // see the ride
        System.out.println(ride);
        Ride createdRide = rideService.createRide(ride);
        return new ResponseEntity<>(createdRide, HttpStatus.CREATED);
    }

}
