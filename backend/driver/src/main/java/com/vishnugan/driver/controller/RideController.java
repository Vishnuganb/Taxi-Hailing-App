package com.vishnugan.driver.controller;


import com.vishnugan.driver.entity.Ride;
import com.vishnugan.driver.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3002")
@RequestMapping("/auth")
public class RideController {

    private final RideService rideService;

    @PutMapping("/updateRideAcceptStatus")
    public ResponseEntity<String> updateRideAcceptStatus(@RequestParam Long rideId) {
        rideService.updateRideAcceptStatus(rideId);
        return ResponseEntity.ok("Ride accepted successfully");
    }

    @PutMapping("/updateRideFinishStatus")
    public ResponseEntity<String> updateRideFinishStatus(@RequestParam Long rideId) {
        rideService.updateRideFinishStatus(rideId);
        return ResponseEntity.ok("Ride finished successfully");
    }

    @GetMapping("/getAllRideDetails")
    public ResponseEntity<List<Ride>> getAllRideDetails() {
        List<Ride> rideDetails = rideService.getAllRideDetails();

        // Print the list of Ride objects in the desired format
        System.out.println("Ride Details:");
        for (Ride ride : rideDetails) {
            System.out.println(ride);
        }
        return ResponseEntity.ok(rideDetails);
    }

}
