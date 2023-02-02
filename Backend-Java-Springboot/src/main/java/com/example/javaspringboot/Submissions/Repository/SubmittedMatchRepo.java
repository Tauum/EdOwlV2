package com.example.javaspringboot.Submissions.Repository;

import com.example.javaspringboot.Submissions.Model.SubmittedMatch;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmittedMatchRepo extends JpaRepository<SubmittedMatch, Long> {


    void deleteSubmittedMatchById(Long id);

    SubmittedMatch findSubmittedMatchById(Long id);

    //    https://stackoverflow.com/questions/70701668/springboot-list-of-objects-with-child-entities-not-returned/70701882#70701882
    @EntityGraph(attributePaths = {"user"})
    List<SubmittedMatch> findAllByUserIdOrderByGeneratedDateDesc(Long id);

    @EntityGraph(attributePaths = {"user"})
    List<SubmittedMatch> findAllByMatchTitleContains(String title);
}

