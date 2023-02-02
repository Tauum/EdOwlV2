package com.example.javaspringboot.Activities.Repository;

import com.example.javaspringboot.Activities.Model.Hangman;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HangmanRepo extends JpaRepository<Hangman, Long> {

    void deleteHangmanById(Long id);

    Hangman findHangmanById(Long id);

    Hangman findFirstByHiddenOrderByIdDesc(boolean hidden);

    List<Hangman> findAllByOrderByGeneratedDateDesc();

    List<Hangman> findAllByHiddenOrderByGeneratedDateDesc(boolean hidden);
}
