package com.vishnugan.driver.controller;

import com.vishnugan.driver.entity.Vehicle;
import com.vishnugan.driver.message.ResponseMessage;
import com.vishnugan.driver.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3002")
@RequestMapping("/auth")
public class VehicleController {

    private final VehicleService vehicleService;

    @PutMapping("/updateVehicle")
    public ResponseEntity<ResponseMessage> updateVehicle(
            @RequestParam(value = "driverId") Long driverId,
            @RequestParam(value = "vehicleNumber", required = false) String vehicleNumber,
            @RequestParam(value = "vehicleType", required = false) String vehicleType,
            @RequestParam(value = "file",required = false) MultipartFile file
    ){
        try {
            // print all the things
            System.out.println("driverId: " + driverId);
            System.out.println("vehicleNumber: " + vehicleNumber);
            System.out.println("vehicleType: " + vehicleType);
            System.out.println("file: " + file);

            vehicleService.updateVehicle(driverId, vehicleNumber, vehicleType, file);
            return ResponseEntity.ok(new ResponseMessage("Vehicle Updated Successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage("Vehicle Update Failed"));
        }
    }

    @GetMapping("/getVehicleById/{driverid}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable("driverid") Long driverid) {
        try {
            Vehicle vehicle = vehicleService.getVehicleByDriverId(driverid);

            if (vehicle != null) {
                return new ResponseEntity<>(vehicle, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
