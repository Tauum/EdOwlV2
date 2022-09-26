package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepo extends JpaRepository<Quiz, Long> {

    void deleteQuizById(Long id);

    Quiz findQuizById(Long id);

    List<Quiz> findAllByOrderByGeneratedDateDesc();

    Quiz findFirstByOrderByIdDesc();

    List<Quiz> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);

    Quiz findFirstByHiddenOrderByIdDesc(boolean hidden);

    List<Quiz> findAllByModuleCodeIsNull();
}
