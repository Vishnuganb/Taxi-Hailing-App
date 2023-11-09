package com.vishnugan.driver.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // Spring annotation to mark this class as a bean
@RequiredArgsConstructor // Lombok's annotation to generate constructor with required args or create final fields
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal (
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader ( "Authorization" );
        final String jwt;
        final String userEmail;

        if(authHeader == null || !authHeader.startsWith ( "Bearer " )) {
            filterChain.doFilter ( request, response ); // If no JWT, continue with the next filter
            return;
        }
        jwt = authHeader.substring ( 7 ); // Extract the JWT from the header
        userEmail = jwtService.extractUsername(jwt); // extract the user email from the JWT token;

        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if(jwtService.isTokenValid ( jwt, userDetails )){
                UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken (
                        userDetails, null, userDetails.getAuthorities ( )
                );
                authToken.setDetails (
                        new WebAuthenticationDetailsSource ( ).buildDetails ( request )
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter ( request, response );

    }
}

