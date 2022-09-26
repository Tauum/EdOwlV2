package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Additional.Model.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleRepo extends JpaRepository<Module, Long> {

    void deleteModuleById(Long id);

    Module findModuleById(Long id);

    List<Module> findAll();

    List<Module> findByCodeContains(String code);

    Module findFirstByCodeContains(String code);


//    @EntityGraph(attributePaths = {"user"})
    List<Module> findByStudentsId(long id);
}
