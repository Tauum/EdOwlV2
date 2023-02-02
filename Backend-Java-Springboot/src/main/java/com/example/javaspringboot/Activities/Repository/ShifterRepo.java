package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Shifter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShifterRepo extends JpaRepository<Shifter, Long> {

    void deleteShifterById(Long id);

    Shifter findShifterById(Long id);

    List<Shifter> findAllByOrderByGeneratedDateDesc();

    List<Shifter> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);

    Shifter findFirstByHiddenOrderByIdDesc(boolean hidden);

    List<Shifter> findAllByModuleCodeIsNull();
}
