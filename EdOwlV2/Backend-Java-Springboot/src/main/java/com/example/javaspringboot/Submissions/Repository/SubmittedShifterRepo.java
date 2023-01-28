package com.example.javaspringboot.Submissions.Repository;

import com.example.javaspringboot.Submissions.Model.SubmittedShifter;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmittedShifterRepo extends JpaRepository<SubmittedShifter, Long> {


    void deleteSubmittedShifterById(Long id);

    SubmittedShifter findSubmittedShifterById(Long id);

    //    https://stackoverflow.com/questions/70701668/springboot-list-of-objects-with-child-entities-not-returned/70701882#70701882
    @EntityGraph(attributePaths = {"user"})
    List<SubmittedShifter> findAllByUserIdOrderByGeneratedDateDesc(Long id);

//    @EntityGraph(attributePaths = {"user"})
//    List<SubmittedMatch> findAllByMatchTitleContains(String title);
}

