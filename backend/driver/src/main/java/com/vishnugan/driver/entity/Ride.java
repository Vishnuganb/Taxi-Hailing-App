package com.vishnugan.driver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="rides")
public class Ride {

    @Id
    @GeneratedValue(generator = "increment")
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
    private Long driverId;

    @PrePersist
    public void prePersist() {
        this.status = "pending";
    }

}
