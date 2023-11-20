package com.vishnugan.driver.repo;

import com.vishnugan.driver.entity.Users;
import com.vishnugan.driver.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByUsers(Users users);
}
