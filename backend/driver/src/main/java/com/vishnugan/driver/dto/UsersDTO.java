package com.vishnugan.driver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersDTO {

    private Long userid;
    private String firstName;
    private String lastName;
    private String address;
    private String phone;
    private String email;
    private String gender;
    private LocalDate dob;
    private LocalDate regisdate;
    private String password;
    private String role;

}
