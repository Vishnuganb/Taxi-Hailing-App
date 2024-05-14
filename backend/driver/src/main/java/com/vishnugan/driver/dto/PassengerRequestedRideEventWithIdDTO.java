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
    private Double fromLat;
    private Double fromLon;
    private Double toLat;
    private Double toLon;
    private String vehicleType;
    private Long passengerId;
    private String status;

    public Ride toEntity() {
        return Ride.builder()
                .rideId(rideId)
                .pickupLocation(pickupLocation)
                .dropLocation(dropLocation)
                .fromLat(fromLat)
                .fromLon(fromLon)
                .toLat(toLat)
                .toLon(toLon)
                .vehicleType(vehicleType)
                .passengerId(passengerId)
                .status(status)
                .build();
    }
}
