package com.vishnugan.driver.repo;

import com.vishnugan.driver.dto.PassengerRequestedRideEventWithIdDTO;
import com.vishnugan.driver.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    @Query("SELECT new com.vishnugan.driver.dto.PassengerRequestedRideEventWithIdDTO(r.rideId, r.pickupLocation, r.dropLocation, r.fromLat, r.fromLon, r.toLat, r.toLon,  r.vehicleType, r.passengerId, r.status) FROM Ride r WHERE r.vehicleType = ?1")
    List<PassengerRequestedRideEventWithIdDTO> findAllByVehicleType(String driverVehicleType);

    Optional<Object> findByRideId(Long rideId);
}
