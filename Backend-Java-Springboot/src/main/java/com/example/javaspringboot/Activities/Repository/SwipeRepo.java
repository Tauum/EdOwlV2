package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Quiz;
import com.example.javaspringboot.Activities.Model.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SwipeRepo extends JpaRepository<Swipe, Long> {

    void deleteSwipeById(Long id);

    List<Swipe> findAllByOrderByGeneratedDateDesc();

    Swipe findFirstByOrderByIdDesc();

    List<Swipe> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);

    Swipe findFirstByHiddenOrderByIdDesc(boolean hidden);

    Swipe findSwipeById(Long id);

    List<Swipe> findAllByModuleCodeIsNull();
}
