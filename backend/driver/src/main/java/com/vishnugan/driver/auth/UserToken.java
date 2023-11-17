package com.vishnugan.driver.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserToken {
    private Long driverid;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate dob;
    private String gender;
}
