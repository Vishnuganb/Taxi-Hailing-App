package com.vishnugan.driver.controller;


import com.vishnugan.driver.dto.PassengerRequestedRideEventWithIdDTO;
import com.vishnugan.driver.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3002")
@RequestMapping("/auth")
public class RideController {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final RideService rideService;

    @PutMapping("/updateRideAcceptStatus")
    public ResponseEntity<String> updateRideAcceptStatus(@RequestParam Long rideId, @RequestParam Long driverId) {
        String message = "Ride with ID " + rideId + " " + driverId + " accepted";
        System.out.println(message);
        kafkaTemplate.send("passenger-accepted-ride", message);
        rideService.updateRideAcceptStatus(rideId, driverId);
        return ResponseEntity.ok("Ride accepted successfully");
    }

    @PutMapping("/updateRideFinishStatus")
    public ResponseEntity<String> updateRideFinishStatus(@RequestParam Long rideId, @RequestParam Long driverId) {
        String message = "Ride with ID " + rideId + " " + driverId +" finished";
        rideService.updateRideFinishStatus(rideId);
        kafkaTemplate.send("passenger-finished-ride", message);
        return ResponseEntity.ok("Ride finished successfully");
    }

    @GetMapping("/getAllRideDetails/{driverId}")
    public ResponseEntity<List<PassengerRequestedRideEventWithIdDTO>> getAllRideDetails(@PathVariable("driverId") Long driverId) {
        System.out.println("Hiiiiiii");
        return ResponseEntity.ok(rideService.getAllRideDetails(driverId));

    }

}
