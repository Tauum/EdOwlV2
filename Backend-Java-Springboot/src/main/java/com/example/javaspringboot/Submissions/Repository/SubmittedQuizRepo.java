package com.example.javaspringboot.Submissions.Repository;

import com.example.javaspringboot.Submissions.Model.SubmittedQuiz;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmittedQuizRepo extends JpaRepository<SubmittedQuiz, Long> {


    void deleteSubmittedQuizById(Long id);

    SubmittedQuiz findSubmittedQuizById(Long id);

    //    https://stackoverflow.com/questions/70701668/springboot-list-of-objects-with-child-entities-not-returned/70701882#70701882
    @EntityGraph(attributePaths = {"user", "submittedQuestions", "quiz"})
    List<SubmittedQuiz> findAllByUserIdOrderByGeneratedDateDesc(Long id);

    @EntityGraph(attributePaths = {"user", "submittedQuestions", "quiz"})
    List<SubmittedQuiz> findAllByQuizTitleContains(String title);
}

