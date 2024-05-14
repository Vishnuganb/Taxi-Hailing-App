package com.vishnugan.passenger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassengerRequestedRideEventDTO {

    private String pickupLocation;
    private String dropLocation;
    private Double fromLat;
    private Double fromLon;
    private Double toLat;
    private Double toLon;
    private String vehicleType;
    private Long passengerId;
    private String status;

}
