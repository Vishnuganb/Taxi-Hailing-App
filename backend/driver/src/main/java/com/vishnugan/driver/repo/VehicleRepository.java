package com.vishnugan.driver.repo;

import com.vishnugan.driver.entity.Users;
import com.vishnugan.driver.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    @Query("SELECT v.vehicleType FROM Vehicle v WHERE v.users.driverid = :driverId")
    String findVehicleTypeByDriverId(Long driverId);
}
