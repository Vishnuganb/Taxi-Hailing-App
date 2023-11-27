package com.vishnugan.passenger.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ride")
public class Ride {

    @Id
    @GeneratedValue
    private Long rideId;
    private String pickupLocation;
    private String dropLocation;
    private String vehicleType;
    private Long passengerId;
    private String status;
}
