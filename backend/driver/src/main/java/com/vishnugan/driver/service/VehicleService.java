package com.vishnugan.driver.service;

import com.vishnugan.driver.entity.Users;
import com.vishnugan.driver.entity.Vehicle;
import com.vishnugan.driver.repo.UsersRepository;
import com.vishnugan.driver.repo.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UsersRepository usersRepository;

    public void updateVehicle(Long driverId, String vehicleNumber, String vehicleType, MultipartFile file) {

        try {
            Optional<Users> user = usersRepository.findById(driverId);
            Vehicle vehicle = new Vehicle();

            if (user.isPresent()) {
                byte[] data = file.getBytes();

                if (vehicleNumber != null) {
                    vehicle.setVehicleNumber(vehicleNumber);
                }

                if (vehicleType != null) {
                    vehicle.setVehicleType(vehicleType);
                }

                if (file != null) {
                    vehicle.setFileName(file.getOriginalFilename());
                    vehicle.setContentType(file.getContentType());
                    vehicle.setData(data);
                }

                vehicle.setUsers(user.get());

                vehicleRepository.save(vehicle);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Vehicle getVehicleByDriverId(Long driverId) {
        Optional<Users> user = usersRepository.findById(driverId);

        if (user.isPresent()) {
            Users foundUser = user.get();

            System.out.println("foundUser: " + foundUser);

            Vehicle vehicle = foundUser.getVehicle();

            System.out.println("vehicle: " + vehicle);

            return vehicle;
        } else {
            return null; // or throw an exception, depending on your requirements
        }
    }

}
