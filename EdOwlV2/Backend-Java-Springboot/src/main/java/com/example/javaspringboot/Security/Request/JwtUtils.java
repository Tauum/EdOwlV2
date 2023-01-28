package com.example.javaspringboot.Security.Request;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.example.javaspringboot.User.Model.MyUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;
import io.jsonwebtoken.*;


@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${Edowl.app.jwtSecret}")
    private String jwtSecret;

    @Value("${Edowl.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Value("${Edowl.app.jwtCookieName}")
    private String jwtCookie;

    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
        if (cookie != null) { return cookie.getValue(); }
        else {  return null; }
    }

    public ResponseCookie generateJwtCookie(MyUserDetails userPrincipal) {
        String jwt = generateTokenFromUsername(userPrincipal.getEmail());
        return ResponseCookie.from(jwtCookie, jwt)
                .path("/")
                .maxAge(24 * 60 * 60)
                .httpOnly(true)
                .sameSite("None") // None, Lax, Strict,
//                .domain("localhost") //192.168.2.128 //edowl.online
                .secure(true)
                .build();
    }

    public ResponseCookie getCleanJwtCookie() {
        return ResponseCookie.from(jwtCookie, null)
                .path("/")
                .maxAge(1)
                .httpOnly(true)
                .sameSite("None") // None, Lax, Strict,
//                .domain("localhost") //192.168.2.128 //edowl.online
                .secure(true)
                .build();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }
        catch (SignatureException e) { logger.error("Invalid JWT signature: {}", e.getMessage()); }
        catch (MalformedJwtException e) { logger.error("Invalid JWT token: {}", e.getMessage()); }
        catch (ExpiredJwtException e) { logger.error("JWT token is expired: {}", e.getMessage()); }
        catch (UnsupportedJwtException e) { logger.error("JWT token is unsupported: {}", e.getMessage());}
        catch (IllegalArgumentException e) { logger.error("JWT claims string is empty: {}", e.getMessage()); }
        return false;
    }

    public String generateTokenFromUsername(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
