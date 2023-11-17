package com.vishnugan.driver.service;

import com.vishnugan.driver.auth.AuthenticationResponse;
import com.vishnugan.driver.auth.ResType;
import com.vishnugan.driver.auth.UserRequest;
import com.vishnugan.driver.auth.UserToken;
import com.vishnugan.driver.config.JwtService;
import com.vishnugan.driver.dto.UsersDTO;
import com.vishnugan.driver.entity.Role;
import com.vishnugan.driver.entity.Users;
import com.vishnugan.driver.repo.UsersRepository;
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
                        Driver.getDriverid(),
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


    public UsersDTO getUserById(Long id) {
        var user = usersRepository.findById(id).get();
        return new UsersDTO(
                user.getDriverid(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                user.getPhone(),
                user.getEmail(),
                user.getGender(),
                user.getDob(),
                user.getRegisdate(),
                user.getPassword(),
                user.getRole().name()
        );
    }

    public Users updateUser(Long driverId, String firstName, String lastName, String address,
                           String phone, String password, LocalDate dob, String gender) {
        try {
            Optional<Users> user = usersRepository.findById(driverId);

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

            if (dob != null){
                userdata.setDob(dob);
            }

            if (gender != null){
                userdata.setGender(gender);
            }

            usersRepository.save(userdata);

            return userdata;

        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
}
