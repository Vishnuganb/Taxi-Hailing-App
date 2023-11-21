package com.vishnugan.ride.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ride")
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Pickup location can not be empty.")
    private String pickupLocation;

    @NotBlank(message = "Drop location can not be empty.")
    private String dropLocation;

    @NotBlank(message = "Vehicle type can not be empty.")
    private String vehicleType;

    private String status;

    @PrePersist
    public void prePersist() {
        this.status = "pending";
    }

}
