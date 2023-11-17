package com.vishnugan.passenger.service;

import com.vishnugan.passenger.auth.AuthenticationResponse;
import com.vishnugan.passenger.auth.ResType;
import com.vishnugan.passenger.auth.UserRequest;
import com.vishnugan.passenger.auth.UserToken;
import com.vishnugan.passenger.config.JwtService;
import com.vishnugan.passenger.dto.UsersDTO;
import com.vishnugan.passenger.entity.Role;
import com.vishnugan.passenger.entity.Users;
import com.vishnugan.passenger.repo.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

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

    public UsersDTO getUserById(Long id) {
        var user = usersRepository.findById(id).get();
        return new UsersDTO(
                user.getUserid(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                user.getPhone(),
                user.getEmail(),
                user.getRegisdate(),
                user.getPassword(),
                user.getRole().name()
        );
    }

    public Users updateUser(Long userId, String firstName, String lastName, String address,
                            String phone, String password) {
        try {
            Optional<Users> user = usersRepository.findById(userId);

            if (user.isEmpty()){
                throw new Exception("User not found");
            }

            Users userdata = user.get();

            if (firstName != null){
                userdata.setFirstName(firstName);
            }

            if (lastName != null){
                userdata.setLastName(lastName);
            }

            if (address != null){
                userdata.setAddress(address);
            }

            if (phone != null){
                userdata.setPhone(phone);
            }

            if (password != null){
                userdata.setPassword(passwordEncoder.encode(password));
            }

            usersRepository.save(userdata);

            return userdata;

        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

}
