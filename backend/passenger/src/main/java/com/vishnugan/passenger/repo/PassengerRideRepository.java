package com.vishnugan.passenger.repo;

import com.vishnugan.passenger.entity.PassengerRide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerRideRepository extends JpaRepository<PassengerRide, Long> {
}
