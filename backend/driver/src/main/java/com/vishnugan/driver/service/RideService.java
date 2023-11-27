package com.vishnugan.driver.service;

import com.vishnugan.driver.dto.PassengerRequestedRideEventWithIdDTO;
import com.vishnugan.driver.entity.Ride;
import com.vishnugan.driver.repo.RideRepository;
import com.vishnugan.driver.repo.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService {

    private final VehicleRepository vehicleRepository;
    private final RideRepository rideRepository;

    public List<PassengerRequestedRideEventWithIdDTO> getAllRideDetails(Long driverId) {
        // Retrieve the driver's vehicle type from the repository
        String driverVehicleType = vehicleRepository.findVehicleTypeByDriverId(driverId);
        System.out.println(driverVehicleType);

        // Filter the ride details list based on the driver's vehicle type
        List<PassengerRequestedRideEventWithIdDTO> filteredRideDetails = rideRepository.findAllByVehicleType(driverVehicleType);
        System.out.println(filteredRideDetails);

        System.out.println(filteredRideDetails);

        return filteredRideDetails;
    }

    public void updateRideAcceptStatus(Long rideId, Long driverId) {
        Ride ride = (Ride) rideRepository.findByRideId(rideId).orElseThrow();
        ride.setDriverId(driverId);
        ride.setStatus("accepted");
        rideRepository.save(ride);

    }

    public void updateRideFinishStatus(Long rideId) {
            Ride ride = (Ride) rideRepository.findByRideId(rideId).orElseThrow();
            ride.setStatus("finished");
            rideRepository.save(ride);
    }
}
