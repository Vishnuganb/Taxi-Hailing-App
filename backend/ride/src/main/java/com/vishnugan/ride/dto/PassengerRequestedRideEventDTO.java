package com.vishnugan.ride.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassengerRequestedRideEventDTO {

    private Long rideId;
    private String pickupLocation;
    private String dropLocation;
    private String vehicleType;
    private String status;

}
