package com.vishnugan.driver.service;

import com.vishnugan.driver.auth.AuthenticationResponse;
import com.vishnugan.driver.auth.ResType;
import com.vishnugan.driver.auth.UserRequest;
import com.vishnugan.driver.auth.UserToken;
import com.vishnugan.driver.config.JwtService;
import com.vishnugan.driver.entity.Role;
import com.vishnugan.driver.entity.Users;
import com.vishnugan.driver.repo.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ResponseEntity<AuthenticationResponse> DriverRegister(UserRequest userRequest) {

        if (usersRepository.existsByEmail(userRequest.getEmail())) {
            return ResponseEntity.ok(new AuthenticationResponse("Email already Exists", ResType.BAD));
        } else {

            var user = Users.builder()
                    .firstName(userRequest.getFirstName())
                    .lastName(userRequest.getLastName())
                    .phone(userRequest.getPhone())
                    .address(userRequest.getAddress())
                    .email(userRequest.getEmail())
                    .dob(userRequest.getDob())
                    .gender(userRequest.getGender())
                    .role(Role.DRIVER)
                    .password(passwordEncoder.encode(userRequest.getPassword()))
                    .build();

            usersRepository.save(user);

            var jwtToken = jwtService.generateToken(user);

            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .token(jwtToken)
                    .message("Account created successfully")
                    .type(ResType.OK)
                    .build());
        }
    }

    public ResponseEntity<AuthenticationResponse> Login(UserRequest userRequest) {

        if (!usersRepository.existsByEmail(userRequest.getEmail())) {
            return ResponseEntity.ok(new AuthenticationResponse("Email not Exists", ResType.BAD));
        } else {
            var Driver = usersRepository.findByEmailIgnoreCase(userRequest.getEmail()).get();
            if (passwordEncoder.matches(userRequest.getPassword(), Driver.getPassword())) {
                var jwtToken = jwtService.generateToken(Driver);
                UserToken userToken = new UserToken(
                        Driver.getUserid(),
                        Driver.getEmail(),
                        Driver.getRole().name(),
                        Driver.getFirstName(),
                        Driver.getLastName(),
                        Driver.getPhone(),
                        Driver.getAddress(),
                        Driver.getDob(),
                        Driver.getGender()
                );
                return ResponseEntity.ok(AuthenticationResponse.builder()
                        .token(jwtToken)
                        .payload(userToken)
                        .message("Login successfully")
                        .type(ResType.OK)
                        .build());
            } else {
                return ResponseEntity.ok(new AuthenticationResponse("Password is incorrect", ResType.BAD));
            }
        }

    }

}
