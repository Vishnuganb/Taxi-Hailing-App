package com.vishnugan.driver.entity;

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
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "users_email_unique",
                        columnNames = "email"
                )
        }
)
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long userid;

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

