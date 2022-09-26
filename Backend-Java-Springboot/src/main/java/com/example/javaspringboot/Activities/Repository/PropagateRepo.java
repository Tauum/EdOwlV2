package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Propagate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropagateRepo extends JpaRepository<Propagate, Long> {

    void deletePropagateById(Long id);

    List<Propagate> findAllByOrderByGeneratedDateDesc();

    Propagate findFirstByOrderByIdDesc();

    List<Propagate> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);

    Propagate findFirstByHiddenOrderByIdDesc(boolean hidden);

    Propagate findPropagateById(Long id);

    List<Propagate> findAllByModuleCodeIsNull();
}
