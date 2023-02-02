package com.example.javaspringboot.Submissions.Repository;

import com.example.javaspringboot.Submissions.Model.SubmittedPropagate;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmittedPropagateRepo extends JpaRepository<SubmittedPropagate, Long> {


    void deleteSubmittedQuizById(Long id);

    @EntityGraph(attributePaths = {"user", "submittedPropagateAttempts"})
    SubmittedPropagate findSubmittedPropagateById(Long id);

    //    https://stackoverflow.com/questions/70701668/springboot-list-of-objects-with-child-entities-not-returned/70701882#70701882
    @EntityGraph(attributePaths = {"user", "submittedPropagateAttempts"})
    List<SubmittedPropagate> findAllByUserIdOrderByGeneratedDateDesc(Long id);

    void deleteSubmittedPropagateById(Long id);
}

