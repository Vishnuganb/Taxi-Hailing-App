package com.vishnugan.driver.controller;

import com.vishnugan.driver.auth.AuthenticationResponse;
import com.vishnugan.driver.auth.UserRequest;
import com.vishnugan.driver.dto.UsersDTO;
import com.vishnugan.driver.message.ResponseMessage;
import com.vishnugan.driver.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3002")
@RequestMapping("/auth")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/driverRegister")
    public ResponseEntity<AuthenticationResponse> DriverRegister(@RequestBody UserRequest userRequest){
        return (ResponseEntity<AuthenticationResponse>)loginService.DriverRegister(userRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> Login(@RequestBody UserRequest userRequest){
        return (ResponseEntity<AuthenticationResponse>)loginService.Login(userRequest);
    }

    @GetMapping("/getUserById/{id}")
    public UsersDTO getUserById(@PathVariable("id") Long id){
        return loginService.getUserById(id);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<ResponseMessage> updateUser(
            @RequestParam(value = "userId") Long userId,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName",required = false) String lastName,
            @RequestParam(value = "address",required = false) String address,
            @RequestParam(value = "phone",required = false) String phone,
            @RequestParam(value = "password",required = false) String password,
            @RequestParam(value = "dob",required = false)LocalDate dob,
            @RequestParam(value = "gender",required = false) String gender
            ){
        try {
            loginService.updateUser(userId,firstName,lastName,address,phone,password,dob,gender);
            return ResponseEntity.ok(new ResponseMessage("User Updated Successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage("User Update Failed"));
        }
    }

}
