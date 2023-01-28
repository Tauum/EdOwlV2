package com.example.javaspringboot.User.Repository;

import com.example.javaspringboot.User.Model.Role;
import com.example.javaspringboot.User.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findUserById(Long id);
    User findUserByEmail(String email);
    void deleteUserById(Long id);
    List<User> findAllByRolesContains(Role findRole);


}