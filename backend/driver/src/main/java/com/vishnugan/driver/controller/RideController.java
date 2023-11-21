package com.vishnugan.driver.controller;


import com.vishnugan.driver.service.RideService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
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
    public ResponseEntity<String> getAllRideDetails() {
        rideService.getAllRideDetails();
        return ResponseEntity.ok("Ride details fetched successfully");
    }

}
