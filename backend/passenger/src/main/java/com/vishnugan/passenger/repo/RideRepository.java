package com.vishnugan.passenger.repo;

import com.vishnugan.passenger.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long>{
    Optional<Object> findByRideId(Long rideId);

    List<Ride> findByPassengerIdAndStatusIn(Long passengerId, List<String> list);
}
