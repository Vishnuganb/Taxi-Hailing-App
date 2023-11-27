package com.vishnugan.driver.dto;

import com.vishnugan.driver.entity.Ride;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassengerRequestedRideEventWithIdDTO {

    private Long rideId;
    private String pickupLocation;
    private String dropLocation;
    private String vehicleType;
    private Long passengerId;
    private String status;

    public Ride toEntity() {
        return Ride.builder()
                .rideId(rideId)
                .pickupLocation(pickupLocation)
                .dropLocation(dropLocation)
                .vehicleType(vehicleType)
                .passengerId(passengerId)
                .status(status)
                .build();
    }
}
