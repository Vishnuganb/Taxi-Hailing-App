package com.vishnugan.driver.service;

import com.vishnugan.driver.entity.Ride;
import com.vishnugan.driver.message.MessageRequest;
import com.vishnugan.driver.repo.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RideService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final RideRepository rideRepository;

    public void updateRideAcceptStatus(Long rideId) {
        String message = "Ride with ID " + rideId + " accepted";
        kafkaTemplate.send("passenger-accepted-ride", message);
        // Update the ride status in the database
        updateRideStatus(rideId, "accepted");
    }

    public void updateRideFinishStatus(Long rideId) {
        String message = "Ride with ID " + rideId + " finished";
        kafkaTemplate.send("passenger-finished-ride", message);

        // Update the ride status in the database
        updateRideStatus(rideId, "finished");

    }

    public void updateRideStatus(Long rideId, String newStatus) {
        rideRepository.findById(rideId)
                .ifPresent(ride -> {
                    ride.setStatus(newStatus);
                    rideRepository.save(ride);
                });

    }

    public Ride getAllRideDetails() {
        return rideRepository.findAll().get(0);
    }
}
