package com.example.javaspringboot.User.Repository;

import com.example.javaspringboot.User.Model.EnumRole;
import com.example.javaspringboot.User.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(EnumRole name);

    Role findRoleById(Long roleId);
}