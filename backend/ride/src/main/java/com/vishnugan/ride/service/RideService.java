package com.vishnugan.ride.service;

import com.vishnugan.ride.entity.Ride;
import com.vishnugan.ride.repo.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;

    public Ride createRide(Ride ride) {
        // Implement logic to create a ride
        return rideRepository.save(ride);
    }

}

