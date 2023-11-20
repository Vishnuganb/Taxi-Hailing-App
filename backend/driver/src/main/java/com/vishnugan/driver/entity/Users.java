package com.vishnugan.driver.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "drivers",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "drivers_email_unique",
                        columnNames = "email"
                )
        }
)
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long driverid;

    @Column(columnDefinition = "Text", nullable = false)
    private String firstName;

    @Column(columnDefinition = "Text", nullable = false)
    private String lastName;

    @Column(columnDefinition = "Text", nullable = false)
    private String address;

    @Column(columnDefinition = "Text", nullable = false)
    private String phone;

    @Column(columnDefinition = "Text")
    private String email;

    @Column(columnDefinition = "Text")
    private String gender;

    @Column(columnDefinition = "Text")
    private LocalDate dob;

    @Column(columnDefinition = "Text", nullable = false)
    private String password;

    @Column(columnDefinition = "Text")
    private LocalDate regisdate;

    @PrePersist
    protected void onCreate() {
        regisdate = LocalDate.now();
    }

    @Enumerated (EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("users")
    private Vehicle vehicle;

    @Override
    public String toString() {
        return "Users{" +
                "driverid=" + driverid +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", gender='" + gender + '\'' +
                ", dob=" + (dob != null ? dob.toString() : "null") +
                ", password='" + password + '\'' +
                ", regisdate=" + (regisdate != null ? regisdate.toString() : "null") +
                ", role=" + role +
                ", vehicle=" + (vehicle != null ? vehicle.getId() : "null") + // assuming Vehicle has an 'id' field
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority(role.name()));

    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

