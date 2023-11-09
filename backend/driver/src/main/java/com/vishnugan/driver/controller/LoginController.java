package com.vishnugan.driver.controller;

import com.vishnugan.driver.auth.AuthenticationResponse;
import com.vishnugan.driver.auth.UserRequest;
import com.vishnugan.driver.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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

}
