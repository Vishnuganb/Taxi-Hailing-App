package com.vishnugan.passenger.service;

import com.vishnugan.passenger.auth.AuthenticationResponse;
import com.vishnugan.passenger.auth.ResType;
import com.vishnugan.passenger.auth.UserRequest;
import com.vishnugan.passenger.auth.UserToken;
import com.vishnugan.passenger.config.JwtService;
import com.vishnugan.passenger.entity.Role;
import com.vishnugan.passenger.entity.Users;
import com.vishnugan.passenger.repo.UsersRepository;
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

    public ResponseEntity<AuthenticationResponse> CustomerRegister(UserRequest userRequest) {

        if (usersRepository.existsByEmail(userRequest.getEmail())) {
            return ResponseEntity.ok(new AuthenticationResponse("Email already Exists", ResType.BAD));
        } else {

            var Customer = Users.builder()
                    .firstName(userRequest.getFirstName())
                    .lastName(userRequest.getLastName())
                    .phone(userRequest.getPhone())
                    .address(userRequest.getAddress())
                    .email(userRequest.getEmail())
                    .role(Role.PASSENGER)
                    .password(passwordEncoder.encode(userRequest.getPassword()))
                    .build();

            usersRepository.save(Customer);

            var jwtToken = jwtService.generateToken(Customer);

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
            var Customer = usersRepository.findByEmailIgnoreCase(userRequest.getEmail()).get();
            if (passwordEncoder.matches(userRequest.getPassword(), Customer.getPassword())) {
                var jwtToken = jwtService.generateToken(Customer);
                UserToken userToken = new UserToken(
                        Customer.getUserid(),
                        Customer.getEmail(),
                        Customer.getRole().name(),
                        Customer.getFirstName(),
                        Customer.getLastName(),
                        Customer.getPhone(),
                        Customer.getAddress()
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
