package com.vishnugan.passenger.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationResponse {
    private Object payload;
    private String token;
    private String message;
    private ResType type;

    public AuthenticationResponse(String message) {
        this.message = message;
    }
    public AuthenticationResponse(String message, ResType type) {
        this.message = message;
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}