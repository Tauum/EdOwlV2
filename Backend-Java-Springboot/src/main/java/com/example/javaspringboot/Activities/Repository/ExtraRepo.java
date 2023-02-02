package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Extra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExtraRepo extends JpaRepository<Extra, Long> {

    void deleteExtraById(Long id);

    List<Extra> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);

    List<Extra> findAllByOrderByGeneratedDateDesc();

    List<Extra> findByTitleContainsAndHiddenEqualsOrderByGeneratedDateDesc(String title, boolean hidden);
    List<Extra> findByTitleContainsOrderByGeneratedDateDesc(String title);

    Optional<Extra> findExtraById(Long id);

    List<Extra> findAllByModuleCodeIsNull();
}