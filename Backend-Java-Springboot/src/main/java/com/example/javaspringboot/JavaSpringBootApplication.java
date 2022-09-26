package com.example.javaspringboot;

//import com.example.javaspringboot.User.Model.User.Role;
//import com.example.javaspringboot.Service.User.RoleService;
//import com.example.javaspringboot.Service.User.UserService;
import com.example.javaspringboot.User.Model.EnumRole;
import com.example.javaspringboot.User.Model.Role;
import com.example.javaspringboot.User.Repository.RoleRepository;
import com.example.javaspringboot.User.Service.MyUserDetailsService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.security.KeyStore;
import java.security.Security;

@SpringBootApplication
//@EnableJpaRepositories(basePackageClasses =  UserRepository.class)
public class JavaSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(JavaSpringBootApplication.class, args);
    }

    @Bean
    CommandLineRunner run(MyUserDetailsService myUserDetailsService, RoleRepository roleRepository){ // MOCK DATA
        return args -> {
            if (roleRepository.findAll().size() < 3){ // BELOW ONLY RUNS IF MISSING ROLES
                if (roleRepository.findByName(EnumRole.ROLE_UNDEFINED) == null){ roleRepository.save(new Role(EnumRole.ROLE_UNDEFINED)) ; }
                if (roleRepository.findByName(EnumRole.ROLE_STUDENT) == null){ roleRepository.save(new Role(EnumRole.ROLE_STUDENT)) ; }
                if (roleRepository.findByName(EnumRole.ROLE_STAFF) == null){ roleRepository.save(new Role(EnumRole.ROLE_STAFF)) ; }
                if (roleRepository.findByName(EnumRole.ROLE_ADMIN) == null){ roleRepository.save(new Role(EnumRole.ROLE_ADMIN)) ; }
            }
        };
    }
}
