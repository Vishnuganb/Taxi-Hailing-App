package com.vishnugan.driver.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "Text")
    private String vehicleNumber;

    @Column(columnDefinition = "Text")
    private String vehicleType;

    @Column(columnDefinition = "Text")
    private String fileName;

    @Column(columnDefinition = "Text")
    private String contentType;

    @Lob
    private byte[] data;

    @OneToOne
    @JoinColumn(name = "driverid")
    @JsonBackReference
    private Users users;

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", fileName='" + fileName + '\'' +
                ", contentType='" + contentType + '\'' +
                ", users=" + users +
                '}';
    }

}
