package com.vishnugan.passenger.controller;

import com.vishnugan.passenger.auth.AuthenticationResponse;
import com.vishnugan.passenger.auth.UserRequest;
import com.vishnugan.passenger.dto.UsersDTO;
import com.vishnugan.passenger.message.ResponseMessage;
import com.vishnugan.passenger.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
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
            @RequestParam(value = "password",required = false) String password
    ){
        try {
            loginService.updateUser(userId,firstName,lastName,address,phone,password);
            return ResponseEntity.ok(new ResponseMessage("User Updated Successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseMessage("User Update Failed"));
        }
    }

}
