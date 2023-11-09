package com.vishnugan.passenger.controller;

import com.vishnugan.passenger.auth.AuthenticationResponse;
import com.vishnugan.passenger.auth.UserRequest;
import com.vishnugan.passenger.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/passengerRegister")
    public ResponseEntity<AuthenticationResponse> Register(@RequestBody UserRequest userRequest){
        return (ResponseEntity<AuthenticationResponse>)loginService.CustomerRegister(userRequest);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> Login(@RequestBody UserRequest userRequest){
        return (ResponseEntity<AuthenticationResponse>)loginService.Login(userRequest);
    }

}
