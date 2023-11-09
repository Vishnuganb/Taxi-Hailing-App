package com.vishnugan.passenger.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250655368566D5971";

    public String extractUsername ( String token ) {

        return extractClaim ( token, Claims::getSubject ); // todo extract the username from the token
    }

    public <T> T extractClaim ( String token, Function<Claims, T> claimsResolver ) { // extract the claims from the token
        final Claims claims = extractAllClaims ( token ); // extract all the claims
        return claimsResolver.apply ( claims ); // return the claims
    }

    private Claims extractAllClaims ( String token ) {
        return Jwts.
                parserBuilder () //  parse the token and return the claims
                .setSigningKey ( getSignInKey() ) //  set the signing key
                .build () //  build the parser
                .parseClaimsJws ( token ) //  parse the claims
                .getBody (); // we can get all the claims within this token
    }

    private Key getSignInKey () {
        byte[] keyBytes = Decoders.BASE64.decode ( SECRET_KEY );
        return Keys.hmacShaKeyFor ( keyBytes);
    }

    public boolean isTokenValid ( String token, UserDetails userDetails ) {

        final String username = extractUsername ( token ); // extract the username from the token
        return ( username.equals ( userDetails.getUsername () )) && !isTokenExpired ( token ) ; // validate the token
    }

    private boolean isTokenExpired ( String token ) {
        return extractExpiration ( token ).before ( new Date (  ) ); // check if the token is expired
    }

    private Date extractExpiration (String token ) {
        return extractClaim ( token, Claims::getExpiration ); // extract the expiration date from the token
    }

    public String generateToken ( UserDetails userDetails ) {
        return generateToken ( new HashMap<>(), userDetails ); // generate the token
    }

    public String generateToken (Map<String, Object> extraclaims , UserDetails userDetails ) {

        return Jwts
                .builder ()
                .setClaims ( extraclaims )
                .setSubject ( userDetails.getUsername () )
                .setIssuedAt ( new Date ( System.currentTimeMillis () ) )
                .setExpiration ( new Date ( System.currentTimeMillis () + 1000 * 60 * 60 * 10 ) )
                .signWith ( getSignInKey (), SignatureAlgorithm.HS256 )
                .compact ();

    }

}

