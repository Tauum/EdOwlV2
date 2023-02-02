package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Match;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepo extends JpaRepository<Match, Long> {

    void deleteMatchById(Long id);

    Match findMatchById(Long id);

    List<Match> findAllByOrderByGeneratedDateDesc();

    List<Match> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);

    Match findFirstByHiddenOrderByIdDesc(boolean hidden);
}
