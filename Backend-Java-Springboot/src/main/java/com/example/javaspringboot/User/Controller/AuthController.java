package com.example.javaspringboot.User.Controller;

import com.example.javaspringboot.User.Model.MyUserDetails;
import com.example.javaspringboot.User.Model.User;
import com.example.javaspringboot.Security.Request.JwtUtils;
import com.example.javaspringboot.User.Repository.RoleRepository;
import com.example.javaspringboot.Security.Response.MessageResponse;
import com.example.javaspringboot.User.Service.UserService;
import org.aspectj.weaver.ast.Var;
import org.hibernate.query.internal.NativeQueryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import java.util.*;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());

        return  ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(userService.findUserProfileUserByEmail(userDetails.getEmail()));
    }

    @GetMapping("/whoami")
    public ResponseEntity<?> whoAmI(HttpServletRequest request) {

        String jwt = jwtUtils.getJwtFromCookies(request);

        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (userDetails.isActive()){
                ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

                return  ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(
                        userService.findUserProfileUserByEmail(
                                jwtUtils.getEmailFromJwtToken(jwt)
                        ));
            }
        }
        return  ResponseEntity.status(401).body(new MessageResponse("You're not signed in!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User signUp) {

        if(userService.findUserByEmail(signUp.getEmail()) != null){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        userService.addUser(signUp);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() { // something is throwing an error here on sign out

        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }

}


